<script lang="ts">
  import { 
    Chart,
    registerables,
    type ChartConfiguration 
  } from "chart.js";
	import { onMount } from "svelte";

  let chart: Chart | null = null;
  let canvasEl: HTMLCanvasElement;

  const {type, data, options} = $props()
  /*
  export let type: ChartConfiguration['type'] = 'bar';
  export let data: ChartConfiguration['data'];
  export let options:ChartConfiguration['options'] = {}
  */
  onMount(()=>{
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    Chart.register(...registerables); //꼭 필요함

    chart = new Chart(ctx, {
      type,
      data: data,
      options
    });
  })
</script>

<canvas bind:this={canvasEl} ></canvas>
