'use client';

import { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

// Sample simulated live data
const generateData = () => {
    const nodes = [
        { id: '1', name: 'You', val: 20, color: '#007AFF' }, // Blue
        { id: '2', name: 'Maria', val: 12, color: '#5AC8FA' }, // Light Blue
        { id: '3', name: 'Alex', val: 15, color: '#AF52DE' }, // Purple
        { id: '4', name: 'Sarah', val: 10, color: '#FF2D55' }, // Pink
        { id: '5', name: 'James', val: 8, color: '#34C759' }, // Green
        { id: '6', name: 'Chen', val: 14, color: '#FF9500' }, // Orange
        // Adding more nodes to make it look "big data"
        ...Array.from({ length: 15 }).map((_, i) => ({
            id: `sys_${i}`,
            name: `User ${i}`,
            val: Math.random() * 5 + 2,
            color: ['#007AFF', '#5AC8FA', '#AF52DE', '#FF2D55', '#34C759', '#FF9500'][Math.floor(Math.random() * 6)]
        }))
    ];

    const links = [
        { source: '1', target: '2' },
        { source: '1', target: '3' },
        { source: '2', target: '4' },
        { source: '3', target: '5' },
        { source: '4', target: '6' },
        { source: '1', target: '6' },
        ...Array.from({ length: 20 }).map(() => ({
            source: nodes[Math.floor(Math.random() * nodes.length)].id,
            target: nodes[Math.floor(Math.random() * nodes.length)].id,
        }))
    ];

    return { nodes, links };
};

export default function LiveNetworkGraph() {
    const fgRef = useRef<any>();
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 400, height: 250 });

    useEffect(() => {
        setGraphData(generateData() as any);
        
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();
        
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[250px] relative rounded-xl overflow-hidden cursor-move">
            <ForceGraph2D
                ref={fgRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={graphData}
                nodeRelSize={4}
                nodeColor={node => (node as any).color}
                nodeLabel="name"
                linkColor={() => 'rgba(255,255,255,0.1)'}
                linkWidth={1}
                backgroundColor="transparent"
                d3VelocityDecay={0.1}
                onEngineStop={() => {
                    // fgRef.current?.zoomToFit(400);
                }}
            />
        </div>
    );
}
