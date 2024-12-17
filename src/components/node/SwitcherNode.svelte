<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import NodeWrapper from "./NodeWrapper.svelte";
  import type { NodeData } from "./nodes-and-edges";

  type $$Props = NodeProps;
  export let data: NodeData;
  const { label, flowState } = data;

  const options = ["VOYAGER", "DARK_MATTER"];

  let selectedShape = $flowState.shape;
  $: {
    $flowState.shape = selectedShape;
  }
</script>

<NodeWrapper {label}>
  <Handle type="source" position={Position.Right} />
  <div class="flex flex-col nodrag">
    {#each options as option}
      <label class="flex">
        <input
          bind:group={selectedShape}
          class="accent-[#0040ff]"
          type="radio"
          value={option}
          checked={selectedShape === option}
        />
        <span class="ml-2">{option}</span>
      </label>
    {/each}
  </div>
</NodeWrapper>
