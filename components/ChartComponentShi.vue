<template>
  <div ref="chart" style="width: 500px; height: 300px;"></div>
</template>

<script setup>
import { onMounted, ref, watch, defineProps } from 'vue';
import { useNuxtApp } from '#app';

const props = defineProps({
  quarterlyStatistics: {
    type: Object,
    required: true
  }
});

const chart = ref(null);
let myChart = null;

const { $echarts } = useNuxtApp();

const updateChart = () => {
  if (!myChart) return;

  // 从 props 中获取字段
  const {
    age = '未知年份',
    quarter = '未知季度',
    equipmentChanneling = 0,
    waxMaterialFleeingGoods = 0,
    waxPseudo = 0,
    equipmentFailure = 0
  } = props.quarterlyStatistics;

  const data = [
    { value: equipmentChanneling, name: '设备窜货' },
    { value: waxMaterialFleeingGoods, name: '蜡材窜货' },
    { value: waxPseudo, name: '蜡材用伪' },
    { value: equipmentFailure, name: '设备故障' }
  ];

  const option = {
    title: {
      text: '告警类型分析-季度统计：',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    color: ['#5470c6', '#ee6666', '#91cc75', '#fac858'],
    series: [
      {
        name: '告警类型分析-季度统计：',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%',
          fontSize: 14
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: data
      }
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: `${age}年${quarter}季度`,
          textAlign: 'center',
          fill: '#000',
          fontSize: 18,
          fontWeight: 'bold'
        }
      }
    ]
  };

  myChart.setOption(option);
};

onMounted(() => {
  myChart = $echarts.init(chart.value);
  updateChart();
});

watch(
  () => props.quarterlyStatistics,
  (newData) => {
    updateChart();
  },
  { deep: true }
);
</script>