import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Sidebar from './components/sidebar';
import UserNode from './components/nodeTypes/user';
import HabitNode from './components/nodeTypes/habit';
import { useAppStore } from './store';

const nodeTypes = {
  user: UserNode,
  habit: HabitNode,
};

export default function App() {
  const { setSelectedNode, liveNodes, liveEdges } = useAppStore()
  const [nodes, setNodes, onNodesChange] = useNodesState(liveNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(liveEdges);

  useEffect(() => {
    setNodes(liveNodes)
  }, [liveNodes])

  useEffect(() => {
    setEdges(liveEdges)
  }, [liveEdges])

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = (event, node) => {
    setSelectedNode(node)
  }
  return (
    <div style={{ width: '100vw', height: '100vh' }} className="flex relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
      <Sidebar />
    </div>
  );
}