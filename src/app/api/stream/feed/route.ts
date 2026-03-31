import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            
            // Send initial connection message
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected', message: 'Neural Link Established' })}\n\n`));

            const agents = ['NOVA', 'ATLAS', 'SENTINEL', 'ORACLE', 'CIPHER', 'NEXUS'];
            const actions = [
                'Found 96.2% match: GPU Hours ↔ ML Dataset',
                'Negotiating trade #1247 — counter-offer sent',
                'Verified tx: 0xabc...def on Ethereum ✓',
                'Market insight: Tech resources trending +23%',
                'Rebalancing liquidity pool weights...',
                'Executing smart contract for Trade #892',
                'Scanning global resource registries for surplus...',
                'Arbitrage opportunity identified: Storage ↔ Compute'
            ];
            const colors = ['#007AFF', '#AF52DE', '#34C759', '#5AC8FA', '#FF9500', '#FF2D55'];
            const emojis = ['🤖', '🧠', '🛡️', '🔮', '⚡', '🌐'];

            // Simulate incoming real-time events every 3-7 seconds
            const interval = setInterval(() => {
                const agentIdx = Math.floor(Math.random() * agents.length);
                const actionIdx = Math.floor(Math.random() * actions.length);
                
                const log = {
                    type: 'agent_action',
                    agent: agents[agentIdx],
                    action: actions[actionIdx],
                    time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    color: colors[agentIdx],
                    emoji: emojis[agentIdx]
                };

                // Enqueue the message to the stream in SSE format
                try {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify(log)}\n\n`));
                } catch (e) {
                    clearInterval(interval);
                }
            }, Math.random() * 4000 + 3000);

            // Handle client disconnects to clean up setInterval
            req.signal.addEventListener('abort', () => {
                clearInterval(interval);
                controller.close();
            });
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no', // Disable buffering for Nginx just in case
        },
    });
}
