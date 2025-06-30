<script lang="ts">
    import StackChart from "../../component/stackChart/stackChart.svelte"
	import type { propsType } from "../../domain/stackChart";

    const data = $state<propsType[]>([
        {
            key: ['aa', 'bb', 'cc'],  //라벨 명은 동일할 수 밖에 없겠구나...
            value: [5,4,2],
            backgroundColor: ['#FFB30D', '#7A7A7A']  //데이터 별로 번갈아가면서 보이고 싶은 색깔
        },
        {
            key: ['aa', 'bb', 'cc'],
            value: [13,5,6],
            backgroundColor: ['#085454', '#001542'],
        }
    ])
    
    const columnTotal = $derived.by(()=>{
        let total = Array.from({length:data[0].value.length},()=>0)
        data.forEach((item)=>{
            item.value.forEach((v, i)=>{
                total[i]+=v
            })
        }) 
        return total
    })

    $effect(()=>{
        console.log("각 라벨별 total 출력", columnTotal)
    })
    

    //데이터가 들어온다면 [{},{},{}] 형태라고 가정하자
    // const props = $state({
    //     key:['aa','bb', '54'],
    //     value:['5','4','2']
    // })
</script>
<style>
  .main {
    width : 100%;
    height : 800px;
    position: relative;
  }
</style>

<div class="main">
    <StackChart chartData={data} {columnTotal}/>
</div>