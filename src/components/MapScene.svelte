<script lang="ts">
  import type { FlowState } from "./node/nodes-and-edges";
  import type { Writable } from "svelte/store";
  import maplibregl from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";

  import { onMount } from "svelte";

  export let flowState: Writable<FlowState>;

  let map: maplibregl.Map;

  $: if (map && $flowState) {
    switch ($flowState.shape) {
      case "VOYAGER":
        mapSetStyle(
          "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        );
        break;
      case "DARK_MATTER":
        mapSetStyle(
          "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        );
        break;
    }

    map.setZoom($flowState.zoom);

    if (map.getLayer("roadside-station")) {
      map.setPaintProperty(
        "roadside-station",
        "circle-color",
        $flowState.color
      );
    }
  }

  onMount(() => {
    map = new maplibregl.Map({
      container: "map",
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      center: [139.7673068, 35.6809591],
      zoom: 3,
    });
    map.on("load", async () => {
      map.addSource("roadside-station-source", {
        type: "geojson",
        data: "Roadside_Station.geojson",
      });
      map.addLayer({
        id: "roadside-station",
        type: "circle",
        source: "roadside-station-source",
        paint: {
          "circle-radius": 2,
          "circle-color": "#0040ff",
        },
      });
    });
  });

  const mapSetStyle = (style: string) => {
    map.setStyle(style, {
      transformStyle: (previousStyle, nextStyle) => {
        if (!previousStyle) {
          return nextStyle;
        }
        const custom_layers = previousStyle.layers.filter((layer) => {
          return layer.id.startsWith("roadside-station");
        });
        const layers = nextStyle.layers.concat(custom_layers);

        const sources = nextStyle.sources;
        for (const [key, value] of Object.entries(previousStyle.sources)) {
          if (key.startsWith("roadside-station")) {
            sources[key] = value;
          }
        }
        return {
          ...nextStyle,
          sources: sources,
          layers: layers,
        };
      },
    });
  };
</script>

<div id="map" class="w-full h-full"></div>
