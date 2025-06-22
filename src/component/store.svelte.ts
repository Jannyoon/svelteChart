export function store(key:string, init:string){
  let value = $state(init)

  if (typeof window !== 'undefined'){
    const cached = localStorage.getItem(key)
    if (cached) value = JSON.parse(cached)
  }

  return {
    get value(){
      $effect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
      })
      return value
    },
    set value(v) {
      value = v
    }
  }
}