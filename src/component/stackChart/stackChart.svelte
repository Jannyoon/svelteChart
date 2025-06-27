<script lang="ts">
	import { onMount } from "svelte";
  import { type ChartData, type ChartOptions, type ChartConfiguration, Chart, registerables, } from 'chart.js'
	import type { propsType } from "../../domain/stackChart";

  //폼 바인딩용
  const {chartData, columnTotal} = $props()

  
  /* Config - chart 초기 세팅 */
  const type = 'bar'
  const data = $state({
    labels: chartData[0].key,
    datasets: 
   chartData.map((item:propsType, idx:number) => {
    return {
      label: "Votes",
      data: item.value.map((val, i)=>val*100/columnTotal[i]),
        backgroundColor: item.backgroundColor,
        borderColor: item.backgroundColor,
        borderWidth: 1
    }
   })
  })

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
      legend: {
        display: true
      }
    },
    //부모 width 기준으로 자동 scaling
    //높이 비율을 본인 것으로 그대로 유지하고 싶다면 아래는 주석처리
    //maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true
        //stacked: false //위로 쌓을 것인지.
      },
      y: {
        stacked: true,
        min: 0,
        max: 100, //최대 100으로 고정
        ticks: {
          stepSize: 10, // 눈금 간격
          callback: function(value:number|string) {
            if (typeof value==='number') return value.toString() + "%"
            return value + '%';  // y축 눈금에 % 붙이기
          },
          color: '#666',  // 눈금 숫자 색상
          font: {
            size: 14,
            weight: 'bold' as 'bold'
          }
        }
      }
    },
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
    data.labels = chartData[0].key,
    data.datasets = chartData.map((item:propsType, idx:number) => {
    return {
      label: "Votes",
      data: item.value.map((val, i)=>val*100/columnTotal[i]),
      backgroundColor: item.backgroundColor,
      borderColor: item.backgroundColor,
      borderWidth: 1
    }
   })
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
