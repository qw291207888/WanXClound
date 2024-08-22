<template>
  <div ref="chart" class="chart-container"></div>
</template>
  
<script setup>
  import { onMounted, ref, watch, defineProps } from 'vue';
  import { useNuxtApp } from '#app';

  const props = defineProps({
    countryData1: {
      type: Object,
      required: true
    }
  })
  
  const chart = ref(null);
  
  onMounted(() => {
    const { $echarts } = useNuxtApp();
    const myChart = $echarts.init(chart.value);

    const stateDate = props.countryData1.stateDate || [];
    const supportWax = props.countryData1.supportWax || [];
  
    // const data = [
    //   { value: 1321, name: 'WJ 400' },
    //   { value: 1498, name: 'WJ 410' },
    //   { value: 109, name: 'WJ 510' },
    //   { value: 12, name: 'WJ 530' },
    // ];
  
    // 指定图表的配置项和数据
    const option = {
        title: {
          text: '设备报警次数-月统计',
          left: 'left'
        },
        legend: {
           data: ['报警次数'],
           left: 'right'
         },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // name: '单位：月',
            // nameLocation: 'end',
            // nameTextStyle: {
            //   align: 'right',
            // },
            data: stateDate,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：次'
          }
        ],
        series: [
          {
            name: '报警次数',
            type: 'bar',
            barWidth: '60%',
            data: supportWax
          }
        ],
        graphic: [
          {
            type: 'text',
            left: '93%', // 位置与x轴末端对齐
            top: '93%', // 调整此值以控制垂直位置
            style: {
              text: '单位：月',
              textAlign: 'right'
            }
          }
        ]
    };
  
    // 使用配置项和数据显示图表
    myChart.setOption(option);
  });

  // watch(
  //   () => props.countryData1,
  //   (newData) => {
  //     updateChart();
  //   },
  //   { deep: true }
  // );
  
  // watch(
  //   () => props.countryData.supportWax,
  //   (newSupportWax) => {
  //     updateChart();
  //   },
  //   { deep: true }
  // );
  
  // watch(
  //   () => props.countryData.stateDate,
  //   (newStateDate) => {
  //     updateChart();
  //   },
  //   { deep: true }
  // );
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>