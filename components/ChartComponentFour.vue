<template>
  <div class="chart-container">
    <div ref="chart" class="chart"></div>
  </div> 
</template>

<script setup>
import { onMounted, ref, watch, defineProps } from 'vue';
import { useNuxtApp } from '#app';

const props = defineProps({
  selectedCountry: {
    type: String,
    required: true
  },
  countryData: {
    type: Object,
    required: true
  }
})

const chart = ref(null);

const updateChart = () => {
  const { $echarts } = useNuxtApp();
  const myChart = $echarts.getInstanceByDom(chart.value);

  // 指定图表的配置项和数据
  const option = {
    title: {
      text: `{a|${props.selectedCountry}-}{b|蜡材整体消耗量统计}`,
      left: '3%',
      top: '3%',
      textStyle: {
        rich: {
          a: {
            color: '#0000FF',
            fontweight: 700,
            fontSize: 18
          },
          b: {
            color: '#333333',
            fontweight: 400,
            fontSize: 18
          }
        }
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['支撑蜡', '结构蜡'],
      icon: 'rect',
      itemWidth: 11,
      itemHeight: 3,
      textStyle: {
        color: '#B2B2B2',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'PingFangSC-Regular, PingFang SC, sans-serif',
        lineHeight: 22
      },
      right: '3%',
      top: '3%',
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '6%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['07/21', '07/28', '08/03', '08/10', '08/17', '08/24', '08/31']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 万' // 设置Y轴标签的格式，添加单位
      }
    },
    series: [
      {
        name: '支撑蜡',
        data: props.countryData.supportWax,
        type: 'line',
        showSymbol: false
      },
      {
        name: '结构蜡',
        data: props.countryData.structureWax,
        type: 'line',
        showSymbol: false
      }
    ]
  };

  // 使用配置项和数据显示图表
  if (myChart) {
    // 更新图表配置
    myChart.setOption(option);
  } else {
    // 初始化图表
    const newChart = $echarts.init(chart.value);
    newChart.setOption(option);
  }
}

onMounted(() => {
  updateChart();
});

watch(() => props.selectedCountry, (newCountry) => {
  updateChart();
});
</script>

<style lang="scss" scoped>
  .chart-container {
    width: 100%;
    height: 246px;
    border-radius: 15px;
    overflow: hidden;
    background: white; /* 确保有背景以显示圆角 */
    padding: 0px; /* 添加内边距以确保图表不紧贴边缘 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 可选：添加阴影改善视觉效果 */
  }

  .chart {
    width: 100%;
    height: 100%;
  }
</style>