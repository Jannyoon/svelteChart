<script lang="ts">
  let count = $state(0)
  const sleep = (ms: number) => new Promise((resolve, reject)=>{
    setTimeout(resolve, ms)
  })

  $effect(()=>{
    console.log(count)

    return ()=>console.log('cleanup')
  })

</script>
<button onclick={()=> count++}>
  {count}
</button>