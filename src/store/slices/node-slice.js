
export const createNodeSlice = (set, get) => ({
    selectedNode: null,
    currentType: '',
    liveNodes: [],
    liveEdges: [],
    addNode: (type, name) => {
        const { liveNodes, liveEdges } = get()
        const newNodeId = `${liveNodes.length + 1}`
        const newNode = {
            id: newNodeId,
            type,
            position: { x: Math.floor(Math.random() * 500), y: Math.floor(Math.random() * 500), },
            data: { label: name },
        };

        const newEdge = liveNodes.length
            ? { id: `e${liveNodes.length}-${newNodeId}`, source: `${liveNodes.length}`, target: newNodeId }
            : null;

        set(() => ({
            liveNodes: [...liveNodes, newNode],
            liveEdges: newEdge ? [...liveEdges, newEdge] : liveEdges,
        }));
    },

    editNode: (updatedNode) => {
        set((state) => ({
            liveNodes: state.liveNodes.map((node) =>
                node.id === updatedNode.id ? { ...node, data: { ...node.data, ...updatedNode.data } } : node
            ),
        }));
    },


    setCurrentType: (type) => set(() => ({
        currentType: type
    })),
    setSelectedNode: (node) => set(() => ({
        selectedNode: node
    })),
});