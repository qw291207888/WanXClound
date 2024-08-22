<template>
  <div ref="chart" style="width: 100%; height: 300px;"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useNuxtApp } from '#app';

const props = defineProps({
  trendAnalysis1: {
    type: Object,
    required: true
  },
  trendAnalysis2: {
    type: Object,
    required: true
  }
});

const chart = ref(null);
const chartInstance = ref(null);

const updateChart = (data1, data2) => {
  console.log(data1)
  console.log(data2)
  if (!chartInstance.value) return;

  let categories = [];

  if (data1.length !== 0 && data2.length !== 0) {
    if (data1.length >= data2.length) {
      categories = data1.map(item => item.name);
    } else {
      categories = data2.map(item => item.name);
    }
  } else if (data1.length !== 0 && data2.length === 0) {
    categories = data1.map(item => item.name);
  } else if (data1.length === 0 && data2.length === 0) {
    categories = [];
  } else if (data1.length === 0 && data2.length !== 0) {
    categories = data2.map(item => item.name);
  }
  
  console.log(categories)

  // 指定图表的配置项和数据
  const option = {
    title: {
      text: '窜货量月趋势图',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['设备窜货', '蜡材窜货'],
      top: 'top',
      left: 'right'
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisTick: { alignWithLabel: true },
      axisLabel: { // 添加这部分来确保标签显示
        formatter: function (value) {
          return value;
        }
      },
      name: '单位：月'
    },
    yAxis: {
      type: 'value',
      name: '单位：台/个'
    },
    series: [
      {
        name: '设备窜货',
        type: 'line',
        data: data1.map(item => item.value),
        symbol: 'none'
      },
      {
        name: '蜡材窜货',
        type: 'line',
        data: data2.map(item => item.value),
        symbol: 'none'
      }
    ]
  };

  chartInstance.value.setOption(option);
};

const processTrendAnalysisData = (trendAnalysis) => {
  const dateArray = trendAnalysis.date || [];
  const numArray = trendAnalysis.num || [];
  return dateArray.map((date, index) => ({
    name: date,
    value: numArray[index] || 0
  }));
};

// 监听 props.trendAnalysis1 和 props.trendAnalysis2 变化
watch(
  [() => props.trendAnalysis1, () => props.trendAnalysis2],
  ([newTrendAnalysis1, newTrendAnalysis2]) => {
    console.log('trendAnalysis1 or trendAnalysis2 updated:', newTrendAnalysis1, newTrendAnalysis2);
    const processedData1 = processTrendAnalysisData(newTrendAnalysis1);
    const processedData2 = processTrendAnalysisData(newTrendAnalysis2);
    updateChart(processedData1, processedData2);
  },
  { deep: true }
);

onMounted(() => {
  const { $echarts } = useNuxtApp();
  chartInstance.value = $echarts.init(chart.value);

  // 组件挂载时初始化图表
  const initialData1 = processTrendAnalysisData(props.trendAnalysis1);
  const initialData2 = processTrendAnalysisData(props.trendAnalysis2);
  updateChart(initialData1, initialData2);
});
</script>