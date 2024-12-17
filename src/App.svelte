<script lang="ts">
  import { writable } from "svelte/store";
  import { SvelteFlow, Background, type Node, type Edge } from "@xyflow/svelte";
  import {
    initialNodes,
    initialEdges,
  } from "./components/node/nodes-and-edges";
  import ColorPickerNode from "./components/node/PickColorNode.svelte";
  import SliderNode from "./components/node/SliderNode.svelte";
  import SwitcherNode from "./components/node/SwitcherNode.svelte";
  import MapNode from "./components/node/MapNode.svelte";

  import "@xyflow/svelte/dist/style.css";

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const nodeTypes = {
    colorpicker: ColorPickerNode,
    slider: SliderNode,
    switcher: SwitcherNode,
    map: MapNode,
  };
</script>

<SvelteFlow {nodes} {nodeTypes} {edges} fitView>
  <Background />
</SvelteFlow>
