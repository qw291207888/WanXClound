<template>
  <div ref="chart" style="width: 100%; height: 300px;"></div>
</template>

<script setup>
  import { onMounted, ref, watch, defineProps } from 'vue';
  import { useNuxtApp } from '#app';

  const props = defineProps({
    countryData3: {
      type: Object,
      required: true
    }
  })
  
  const chart = ref(null);

  onMounted(() => {
    const { $echarts } = useNuxtApp();
    const myChart = $echarts.init(chart.value);

    const stateDate = props.countryData3.stateDate || [];
    const dateNum = props.countryData3.dateNum || [];
    const dateNum2 = props.countryData3.dateNum2 || [];
    
    const option = {
        title: {
          text: '蜡材消耗情况-月度统计表',
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
          // data: ['结构蜡用量', '支撑蜡用量', '蜡材总用量'],
          data: ['结构蜡用量', '支撑蜡用量'],
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
            name: '单位：年/月/日',
            data: stateDate,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：kg'
          }
        ],
        series: [
          {
            name: '结构蜡用量',
            type: 'bar',
            barWidth: '20%',
            data: dateNum2,
            itemStyle: {
              color: '#1f77b4'
            }
          },
          {
            name: '支撑蜡用量',
            type: 'bar',
            barWidth: '20%',
            data: dateNum,
            itemStyle: {
              color: '#ff7f0e'
            }
          },
          // {
          //   name: '蜡材总用量',
          //   type: 'bar',
          //   barWidth: '20%',
          //   data: [60, 72, 71, 74, 190, 130, 110],
          //   itemStyle: {
          //     color: '#d62728'
          //   }
          // }
        ] 
    }

    // 使用配置项和数据显示图表
    myChart.setOption(option);
  })
</script>