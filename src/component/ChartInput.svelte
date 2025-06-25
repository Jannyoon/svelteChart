<script lang="ts">
	import { onMount } from "svelte";
  import { type ChartData, type ChartOptions, type ChartConfiguration, Chart, registerables, } from 'chart.js'

  //폼 바인딩용
  const {labels, values} = $props()
  let a = $state(null)
  let b = $state(null)

  /* chart 초기 세팅 */
  const type = 'bar'
  const data = $state({
    labels,
    datasets: [{
      label: "Votes",
      data: values,
      backgroundColor: 
      [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',        
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54,162,235,1)',
      ],
      borderWidth: 1
    }]
  })

  const options = {
    scales: {
      y: {
        beginAtZero:true
      }

    },
    //부모 width 기준으로 자동 scaling
    //높이 비율을 본인 것으로 그대로 유지하고 싶다면 아래는 주석처리
    //maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  }

  const updateMode = 'default'
  let chart: Chart | null = null;
  let canvasRef: HTMLCanvasElement;
  onMount(()=>{
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;
    Chart.register(...registerables); //꼭 필요함

    if (canvasRef){
      chart = new Chart(ctx, {
        type,
        data: $state.snapshot(data),
        options
      });
    }
  })


  $effect(()=>{
    data.labels = labels
    data.datasets[0].data = values.map((v:string)=>+v)
  })

  $effect(()=>{
    if (chart){
      chart.data = $state.snapshot(data)
      chart?.update(updateMode)      
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


<canvas bind:this={canvasRef} ></canvas>
