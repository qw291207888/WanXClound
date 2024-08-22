<template>
  <div ref="chart" style="width: 734px; height: 300px;"></div>
</template>

<script setup>
import { onMounted, ref, watch, defineProps } from 'vue';
import { useNuxtApp } from '#app';

const props = defineProps({
  trendAnalysis4: {
    type: Object,
    required: true
  }
});

const chart = ref(null);
const chartInstance = ref(null);

const updateChart = (data) => {
  if (!chartInstance.value) return;

  const categories = data.map(item => item.name);
  const values = data.map(item => item.value);

  // 指定图表的配置项和数据
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    color: ['#5470c6', '#ee6666', '#91cc75', '#fac858'],
    legend: {
      top: 'top'
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      name: '单位：件'
    },
    series: [
      {
        name: '设备故障告警数',
        type: 'line',
        data: values,
      }
    ]
  };

  chartInstance.value.setOption(option);
};

const processTrendAnalysisData = (trendAnalysis4) => {
  const dateArray = trendAnalysis4.date || [];
  const numArray = trendAnalysis4.num || [];
  return dateArray.map((date, index) => ({
    name: date,
    value: numArray[index] || 0
  }));
};

watch(() => props.trendAnalysis4, (newValue) => {
  console.log('trendAnalysis1 updated in child:', newValue);
  const processedData = processTrendAnalysisData(newValue);
  updateChart(processedData);
}, { deep: true });

onMounted(() => {
  const { $echarts } = useNuxtApp();
  chartInstance.value = $echarts.init(chart.value);

  // 组件挂载时初始化图表
  const initialData = processTrendAnalysisData(props.trendAnalysis4);
  updateChart(initialData);
});
</script>
