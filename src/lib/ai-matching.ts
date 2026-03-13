import prisma from './prisma';

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
    // Get the source resource
    const resource = await prisma.resource.findUnique({
        where: { id: resourceId },
        include: { owner: true },
    });

    if (!resource) return [];

    // Find available resources from other users
    const candidates = await prisma.resource.findMany({
        where: {
            id: { not: resourceId },
            ownerId: { not: userId },
            status: 'available',
        },
        include: {
            owner: { select: { name: true, id: true, reputation: true } },
        },
        take: 100, // Top 100 candidates
    });

    // Score each candidate
    const scored: MatchResult[] = candidates.map(candidate => {
        const reasons: string[] = [];
        let score = 0;

        // 1. Value similarity (0-40 points)
        const valueDiff = Math.abs(resource.estimatedValue - candidate.estimatedValue);
        const maxVal = Math.max(resource.estimatedValue, candidate.estimatedValue);
        const valueSimilarity = maxVal > 0 ? (1 - valueDiff / maxVal) * 40 : 0;
        score += valueSimilarity;
        if (valueSimilarity > 30) reasons.push('Excellent value match');
        else if (valueSimilarity > 20) reasons.push('Good value alignment');

        // 2. Category complementarity (0-20 points)
        const complementaryCategories: Record<string, string[]> = {
            'Computing': ['Data', 'Blockchain', 'IoT'],
            'Data': ['Computing', 'Services', 'Education'],
            'Services': ['Design', 'Education', 'Data'],
            'Education': ['Services', 'Computing', 'Data'],
            'Design': ['Services', 'Computing', 'Education'],
            'IoT': ['Computing', 'Blockchain', 'Data'],
            'Blockchain': ['Computing', 'IoT', 'Data'],
        };

        if (complementaryCategories[resource.category]?.includes(candidate.category)) {
            score += 20;
            reasons.push(`Complementary: ${resource.category} ↔ ${candidate.category}`);
        } else if (resource.category === candidate.category) {
            score += 10;
            reasons.push('Same category');
        }

        // 3. Tag overlap (0-20 points)
        const sharedTags = resource.tags.filter(t =>
            candidate.tags.map(ct => ct.toLowerCase()).includes(t.toLowerCase())
        );
        const tagScore = Math.min(20, sharedTags.length * 7);
        score += tagScore;
        if (sharedTags.length > 0) {
            reasons.push(`Shared interests: ${sharedTags.join(', ')}`);
        }

        // 4. Owner reputation bonus (0-10 points)
        const repScore = Math.min(10, (candidate.owner.reputation || 0) * 2);
        score += repScore;
        if (repScore > 6) reasons.push('Highly trusted owner');

        // 5. Freshness bonus (0-10 points - newer listings get a boost)
        const daysOld = (Date.now() - new Date(candidate.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        const freshnessScore = Math.max(0, 10 - daysOld);
        score += freshnessScore;
        if (freshnessScore > 7) reasons.push('Recently listed');

        return {
            resourceId: candidate.id,
            resourceName: candidate.name,
            ownerName: candidate.owner.name,
            ownerId: candidate.owner.id,
            score: Math.round(Math.min(100, score)),
            reasons,
        };
    });

    // Sort by score and return top matches
    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

// Background AI matching job — finds matches for all available resources
export async function runMatchingJob() {
    const resources = await prisma.resource.findMany({
        where: { status: 'available' },
        take: 50,
    });

    const results = [];
    for (const resource of resources) {
        const matches = await findMatches(resource.id, resource.ownerId, 3);
        if (matches.length > 0 && matches[0].score >= 60) {
            // Create notification for resource owner
            await prisma.notification.create({
                data: {
                    userId: resource.ownerId,
                    type: 'match',
                    title: 'New AI Match Found!',
                    message: `"${matches[0].resourceName}" by ${matches[0].ownerName} is a ${matches[0].score}% match for your "${resource.name}"`,
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
            action: 'batch_matching',
            details: JSON.stringify({
                resourcesScanned: resources.length,
                matchesFound: results.length,
            }),
            status: 'success',
        },
    });

    return results;
}
