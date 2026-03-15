import prisma from './prisma';
import { pipeline, env } from '@xenova/transformers';

// Tell transformers.js we are running in a Node.js environment (Next.js server edge/node)
env.allowLocalModels = false;

// Singleton for the feature extraction pipeline
class SemanticPipeline {
    static instance: any = null;
    static async getInstance() {
        if (!this.instance) {
            // using a small, extremely fast model for sentence embeddings
            this.instance = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        }
        return this.instance;
    }
}

// Calculate Cosine Similarity between two numeric vectors
function cosineSimilarity(vecA: number[], vecB: number[]) {
    let dotProduct = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

interface MatchResult {
    resourceId: string;
    resourceName: string;
    ownerName: string;
    ownerId: string;
    score: number;
    reasons: string[];
}

export async function findMatches(
    resourceId: string,
    userId: string,
    limit: number = 10
): Promise<MatchResult[]> {
    // 1. Fetch source resource
    const sourceResource = await prisma.resource.findUnique({
        where: { id: resourceId },
        include: { owner: true },
    });

    if (!sourceResource) return [];

    // 2. Fetch candidates
    const candidates = await prisma.resource.findMany({
        where: {
            id: { not: resourceId },
            ownerId: { not: userId },
            status: 'available',
        },
        include: {
            owner: { select: { name: true, id: true, reputation: true } },
        },
        take: 100, // Top 100 candidates to run ML on
    });

    if (candidates.length === 0) return [];

    // 3. Prepare AI NLP Pipeline
    const embedder = await SemanticPipeline.getInstance();

    // Generate embedding vector for the source resource description + tags
    const sourceText = `${sourceResource.name}. ${sourceResource.description}. Tags: ${sourceResource.tags.join(', ')}`;
    const sourceOutput = await embedder(sourceText, { pooling: 'mean', normalize: true });
    const sourceVector = Array.from(sourceOutput.data) as number[];

    // 4. Score each candidate using Math + ML
    const scoredPromises = candidates.map(async (candidate) => {
        const reasons: string[] = [];
        let score = 0;

        // --- NLP SEMANTIC SIMILARITY (0-50 points) ---
        const candidateText = `${candidate.name}. ${candidate.description}. Tags: ${candidate.tags.join(', ')}`;
        const candidateOutput = await embedder(candidateText, { pooling: 'mean', normalize: true });
        const candidateVector = Array.from(candidateOutput.data) as number[];
        
        // ML score gives 0 to 1 value
        const semSim = cosineSimilarity(sourceVector, candidateVector);
        
        // Map 0.3 - 1.0 similarity to 0 - 50 score
        const mlScore = Math.max(0, (semSim - 0.3) / 0.7) * 50; 
        score += mlScore;

        if (semSim > 0.85) reasons.push('High semantic NLP match');
        else if (semSim > 0.65) reasons.push('Good contextual correlation');

        // --- Value similarity (0-20 points) ---
        const valueDiff = Math.abs(sourceResource.estimatedValue - candidate.estimatedValue);
        const maxVal = Math.max(sourceResource.estimatedValue, candidate.estimatedValue);
        const valueSimilarity = maxVal > 0 ? (1 - valueDiff / maxVal) * 20 : 0;
        score += valueSimilarity;
        if (valueSimilarity > 15) reasons.push('Excellent value parity');

        // --- Category complementarity (0-15 points) ---
        const complementaryCategories: Record<string, string[]> = {
            'Computing': ['Data', 'Blockchain', 'IoT'],
            'Data': ['Computing', 'Services', 'Education'],
            'Services': ['Design', 'Education', 'Data'],
            'Education': ['Services', 'Computing', 'Data'],
            'Design': ['Services', 'Computing', 'Education'],
            'IoT': ['Computing', 'Blockchain', 'Data'],
            'Blockchain': ['Computing', 'IoT', 'Data'],
        };
        if (complementaryCategories[sourceResource.category]?.includes(candidate.category)) {
            score += 15;
            reasons.push(`Complementary: ${sourceResource.category} ↔ ${candidate.category}`);
        } else if (sourceResource.category === candidate.category) {
            score += 10;
        }

        // --- Owner reputation bonus (0-15 points) ---
        const repScore = Math.min(15, (candidate.owner.reputation || 0) * 3);
        score += repScore;
        if (repScore > 10) reasons.push('Highly trusted owner');

        return {
            resourceId: candidate.id,
            resourceName: candidate.name,
            ownerName: candidate.owner.name,
            ownerId: candidate.owner.id,
            score: Math.round(Math.min(100, score)),
            reasons,
        };
    });

    const scored = await Promise.all(scoredPromises);

    // 5. Sort by score and return top matches
    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

// Background AI matching job
export async function runMatchingJob() {
    const resources = await prisma.resource.findMany({
        where: { status: 'available' },
        take: 20, // Smaller batch size due to ML computation cost
    });

    const results = [];
    for (const resource of resources) {
        const matches = await findMatches(resource.id, resource.ownerId, 3);
        if (matches.length > 0 && matches[0].score >= 70) { // Higher threshold for ML matches
            // Create notification for resource owner
            await prisma.notification.create({
                data: {
                    userId: resource.ownerId,
                    type: 'match',
                    title: 'New AI Semantic Match!',
                    message: `"${matches[0].resourceName}" by ${matches[0].ownerName} is a ${matches[0].score}% AI match for your "${resource.name}"`,
                    link: '/exchange',
                },
            });

            results.push({
                resourceId: resource.id,
                matchCount: matches.length,
                topScore: matches[0].score,
            });
        }
    }

    // Log the job
    await prisma.aIAgentLog.create({
        data: {
            agentType: 'matcher',
            action: 'batch_nlp_matching',
            details: JSON.stringify({
                resourcesScanned: resources.length,
                matchesFound: results.length,
            }),
            status: 'success',
        },
    });

    return results;
}
