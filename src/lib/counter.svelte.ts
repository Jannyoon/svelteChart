export function createCounter(initial = 0){
  //일종의 store
  let value = $state(initial)

  if (typeof window !== 'undefined'){
    const cached = localStorage.getItem('count')
    if (cached) value = JSON.parse(cached)
  }

  return {
    get value(){
      if (typeof window!=='undefined') console.log(localStorage)
      return value
    },
    set value(val){
      if (typeof window!=='undefined'){
        localStorage.setItem('count', JSON.stringify(value))        
      }
      console.log("set!")
      value = val
    }
  }
}


