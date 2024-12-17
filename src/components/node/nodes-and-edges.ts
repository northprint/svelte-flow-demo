import type { Node, Edge } from '@xyflow/svelte';
import { writable, type Writable } from 'svelte/store';
 
export type FlowState = {
  color: string;
  zoom: number;
  shape: string;
};
 
const flowState = writable<FlowState>({
  color: '#0040ff',
  zoom: 3,
  shape: 'VOYAGER'
});
 
export type NodeData = {
  flowState: Writable<FlowState>;
  label: string;
};
 
export const initialNodes: Node[] = [
  {
    id: 'map',
    type: 'map',
    position: { x: 390, y: 0 },
    data: {
      flowState,
      label: 'output'
    },
    class: 'w-[600px]'
  },
  {
    id: 'color',
    type: 'colorpicker',
    position: { x: 50, y: 0 },
    data: {
      flowState,
      label: 'point color'
    },
    class: 'w-[150px]'
  },
  {
    id: 'shape',
    type: 'switcher',
    position: { x: 0, y: 125 },
    data: {
      flowState,
      label: 'base map'
    },
    class: 'w-[150px]'
  },
  {
    id: 'zoom',
    type: 'slider',
    position: { x: 40, y: 280 },
    data: {
      flowState,
      label: 'zoom level'
    },
    class: 'w-[150px]'
  }
];
 
const edgeStyle = 'stroke:#D2D2D2; stroke-width:2;';
 
export const initialEdges: Edge[] = [
  {
    id: 'color->map',
    source: 'color',
    target: 'map',
    targetHandle: 'color',
    style: edgeStyle,
    animated: true
  },
  {
    id: 'shape->map',
    source: 'shape',
    target: 'map',
    targetHandle: 'shape',
    style: edgeStyle,
    animated: true
  },
  {
    id: 'zoom->map',
    source: 'zoom',
    target: 'map',
    targetHandle: 'zoom',
    style: edgeStyle,
    animated: true
  }
];