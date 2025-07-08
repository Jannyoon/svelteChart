<script lang="ts">
	import { Chart, registerables } from "chart.js";
	import { onMount } from "svelte";

    const {labels, data}:{
        labels: string[],
        data: number[]
    } = $props()


    let chart: Chart;
    let canvas: HTMLCanvasElement;

    onMount(()=>{
        /* 필수 */
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        Chart.register(...registerables)

        chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: '매출',
                    data,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.3
                }]
            }, options: {
                responsive: true,
                maintainAspectRatio: false
            }
        })
    })

    $effect(()=>{
        if (chart){
            chart.data.labels = $state.snapshot(labels)
            chart.data.datasets[0].data = $state.snapshot(data)
            chart.update()
        }
    })

</script>
<style>
    canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
<canvas bind:this={canvas}></canvas>
