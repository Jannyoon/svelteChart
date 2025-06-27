<script lang="ts">
	import { onMount } from "svelte";
  import { Chart, registerables, } from 'chart.js'
  import ChartDataLabels, { type Context } from 'chartjs-plugin-datalabels'
	import type { propsType } from "../../domain/stackChart"
	import { toPadding } from "chart.js/helpers";
  

  //폼 바인딩용
  const {chartData, columnTotal} = $props()

  
  /* Config - chart 초기 세팅 */
  const type = 'bar'
  const data = $state({
    labels: chartData[0].key,
    datasets: chartData.map((item:propsType, idx:number) => {
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
        text: 'Chart.js Bar Chart - Stacked',
        padding: {
            top:20,
            bottom: 20
        }
      },
      legend: {
        display: true,
        position: 'top' as const,
        padding: {
          top: 10,
          bottom: 10
        }
      },
      tooltip: { //기존 툴팁 사용 안함
        enabled: false
      },
      animation: { // 차트 애니메이션 사용 안 함 (옵션)
          duration: 0,
        },
        datalabels: { // datalables 플러그인 세팅
          anchor: 'end' as const, //막대의 끝 기준
          //clamp: true, //차트 영역 자른다고? 뭔소리여
          align: 'center' as const,  //위쪽에 표시
          offset: 0, // 간격 0으로 표기
          formatter: function (value: number, context:any) {
            var idx = context.dataIndex; // 각 데이터 인덱스 dataIndex: The index of the associated data

            // 출력 텍스트
            return context.chart.data.labels[idx] + value.toFixed(3) + '%';
          },
          font: { // font 설정
          	weight: 'bold' as 'bold',
            size: 12,
          },
          /* css가 그대로 적용된다고 생각하라*/
          color: '#222', // font color
          backgroundColor: '#fff',
          borderWidth: 1,
          borderRadius: 4
      },
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
        max: 110, //최대 100으로 고정
        ticks: {
          stepSize: 10, // 눈금 간격
          callback: function(value:number|string) {
            if (typeof value==='number' && value<=100) return value.toString() + "%"
            return '';  // y축 눈금에 % 붙이기
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
    Chart.register(...registerables, ChartDataLabels); //꼭 필요함

    if (canvasRef){
      chart = new Chart(ctx, {
        plugins: [ChartDataLabels],
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
