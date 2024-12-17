<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import NodeWrapper from "./NodeWrapper.svelte";
  import type { NodeData } from "./nodes-and-edges";

  type $$Props = NodeProps;
  export let data: NodeData;
  const { label, flowState } = data;

  let value = $flowState.zoom;
  $: {
    $flowState.zoom = value;
  }

  const min = 1;
  const max = 22;
</script>

<NodeWrapper {label}>
  <Handle type="source" position={Position.Right} />
  <input
    class="nodrag accent-[#0040ff]"
    style="direction: ltr;"
    type="range"
    {min}
    {max}
    bind:value
  />
</NodeWrapper>
