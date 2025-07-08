<script lang="ts">
	import Example1Chart from "../../component/ex_1/example1Chart.svelte";

    let labels = ['Jan', 'Feb', 'Mar', 'Apr']
    let data = [10, 20, 3, 25]




</script>
<style>
    .main {
        width: 100%;
        height: 800px;
        position: relative;
    }
</style>
<div class="main">
    <Example1Chart {labels} {data}/>
</div>