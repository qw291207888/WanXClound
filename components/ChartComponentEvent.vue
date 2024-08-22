<template>
  <div ref="chart" style="width: 100%; height: 300px;"></div>
</template>

<script setup>
  import { onMounted, ref, watch, defineProps } from 'vue';
  import { useNuxtApp } from '#app';

  const props = defineProps({
    countryData2: {
      type: Object,
      required: true
    }
  })
  
  const chart = ref(null);

  onMounted(() => {
    const { $echarts } = useNuxtApp();
    const myChart = $echarts.init(chart.value);

    const stateDate = props.countryData2.stateDate || [];
    const completedNum = props.countryData2.completedNum || [];
    const failedNum = props.countryData2.failedNum || [];
    const cancelledNum = props.countryData2.cancelledNum || [];
    
    const option = {
        title: {
          text: '作业打印情况-月度统计表',
          left: 'center',
          textStyle: {
            color: '#1890FF'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['完成订单数', '失败订单数', '取消订单数'],
          orient: 'vertical',
          right: '5%',
          y: 'middle',
          itemGap: 10,
          padding: [0, 10],
          itemWidth: 12,
          itemHeight: 4,
        },
        grid: {
          left: '3%',
          right: '20%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: '单位：年/月',
            data: stateDate,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：个'
          }
        ],
        series: [
          {
            name: '完成订单数',
            type: 'bar',
            barWidth: '20%',
            data: completedNum,
            itemStyle: {
              color: '#1f77b4'
            }
          },
          {
            name: '失败订单数',
            type: 'bar',
            barWidth: '20%',
            data: failedNum,
            itemStyle: {
              color: '#ff7f0e'
            }
          },
          {
            name: '取消订单数',
            type: 'bar',
            barWidth: '20%',
            data: cancelledNum,
            itemStyle: {
              color: '#d62728'
            }
          }
        ] 
    }

    // 使用配置项和数据显示图表
    myChart.setOption(option);
  })

  // watch(
  //   () => props.countryData2,
  //   (newData) => {
  //     updateChart();
  //   },
  //   { deep: true }
  // );
</script>