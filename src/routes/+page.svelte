<script lang="ts">
	import ChartInput from "../component/ChartInput.svelte";

  //폼 바인딩용
  let newLabel = $state('')
  let newValues= $state('')

  let labels = $state(['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'])
  let values = $state(['12', '19', '3', '5', '2', '3']);


  function addData(e:Event){
    e.preventDefault()
    if (!newLabel || !newValues) return

    labels = [...labels, ...newLabel.split(",")]
    values = [...values, ...newValues.split(",")]
  }

  $effect(()=>{
    console.log("현재의 labels, values", labels, values)
  })
  
  $effect(()=>{
    console.log(newLabel, newValues)
  })
</script>

<style>
  .main {
    width: 100%;
    height: 100dvh;
    position: relative;             
  }

  .chartWrap {
    width : 100%;
    height : 100%;
  }
</style>

<div class="main">
  <form>
    <input placeholder="라벨 입력(,로 구분)" bind:value={newLabel}/>
    <input placeholder="데이터 입력(,로 구분)" bind:value={newValues}/>
    <button type="submit" onclick={addData}>+</button>
  </form>
 
  <div class="chartWrap">
    <ChartInput {labels} {values}/>
  </div> 
</div>