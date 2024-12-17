<script lang="ts">
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import NodeWrapper from "./NodeWrapper.svelte";
  import type { NodeData } from "./nodes-and-edges";

  //import maplibregl from "maplibre-gl";
  //import "maplibre-gl/dist/maplibre-gl.css";

  type $$Props = NodeProps;
  export let data: NodeData;
  const { label, flowState } = data;
  import MapScene from "../MapScene.svelte";
</script>

<NodeWrapper {label}>
  <div class="w-full h-[300px]">
    <MapScene {flowState} />
    <Handle
      type="target"
      position={Position.Left}
      style="top:20px;"
      id="color"
    />
    <Handle
      type="target"
      position={Position.Left}
      style="top:40px;"
      id="shape"
    />
    <Handle
      type="target"
      position={Position.Left}
      style="top:60px;"
      id="zoom"
    />
  </div>
</NodeWrapper>
