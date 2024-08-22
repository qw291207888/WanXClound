<template>
  <div ref="chart" style="width: 440px; height: 250px;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';

const chart = ref(null);

onMounted(() => {
  const { $echarts } = useNuxtApp();
  const myChart = $echarts.init(chart.value);

  const data = [
    { value: 10, name: '脱机数' },
    { value: 28, name: '异常数' },
    { value: 30, name: '待机数' },
    { value: 40, name: '正常数' }
  ]

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const getFontSize = (value) => {
    const percentage = (value / totalValue) * 100;
    return 10 + (percentage * 0.5);
  };

  // 指定图表的配置项和数据
  const option = {
    tooltip: {
      trigger: 'item'
    },
    color: ['#7F7F7F', '#F10303', '#81D3F8', '#70B603'],
    legend: {
      orient: 'vertical',
      right: 30,
      top: 'center',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 25,
      textStyle: {
        fontSize: 14,
      },
      data: ['正常数', '待机数', '异常数', '脱机数'],
    },
    series: [
      {
        name: '设备状态统计',
        type: 'pie',
        radius: ['10%', '90%'],
        center: ['40%', '50%'],
        roseType: 'radius',
        avoidLabelOverlap: false,
        startAngle: 20,
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => {
            const fontSize = getFontSize(params.value);
            return `{value|${params.percent.toFixed()}%}`;
          },
          rich: {
            value: {
              fontSize: 12,
              color: '#FFFFFF',
              lineHeight: 30,
              align: 'center',
              verticalAlign: 'middle'
            }
          }
        },
        labelLine: {
          show: false
        },
        data: data.map(item => ({
          ...item,
          label: {
            ...item.label,
            rich: {
              value: {
                fontSize: getFontSize(item.value),
                color: '#FFFFFF',
                lineHeight: 30,
                align: 'center',
                verticalAlign: 'middle'
              }
            }
          }
        }))
      }
    ]
  };

  // 使用配置项和数据显示图表
  myChart.setOption(option);
});
</script>