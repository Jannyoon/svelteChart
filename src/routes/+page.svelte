<script lang="ts">
  import ChartTest from "../component/ChartTest.svelte";

  const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  const data = {
    labels,
    datasets: [{
      label: "Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54,162,235,1)',
        'rgba(255,206,86,1)',
        'rgba(75,192,192,1)',
        'rgba(153,102,255,1)',
        'rgba(255,159,64,1)'
      ],
      borderWidth: 1
    }]
  }

  const options = {
    scales: {
      y: {
        beginAtZero:true
      }

    },
    //부모 width 기준으로 자동 scaling
    //높이 비율을 본인 것으로 그대로 유지하고 싶다면 아래는 주석처리
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  }

</script>

<style>
  .main {
    width: 200px;
    height: 400px;
    position: relative;
  }
</style>

<div class="main">
  <ChartTest {data} {options} type="bar"/>

</div>