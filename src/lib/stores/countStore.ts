import {writable, derived} from 'svelte/store'

function countStore(){
  const count = writable({
    open: false,
    count:0
  });
  const double = derived(count, ($count) => $count.count*2)

  function increase(){
    count.update(prev => prev+1)
  }

  function decrease(){
    count.update(prev => prev-1)
  }

  function reset(){
    count.set(0)
  }

  return {
    subscribe: count.subscribe,
    set: count.set,
    double,
    increase,
    decrease,
    reset
  }
}

export default countStore()