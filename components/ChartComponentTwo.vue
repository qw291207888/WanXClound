<template>
  <div ref="chart" style="width: 440px; height: 300px;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';

const chart = ref(null);

onMounted(() => {
  const { $echarts } = useNuxtApp();
  const myChart = $echarts.init(chart.value);

  const data = [
    { value: 333, name: '中国境内区' },
    { value: 278, name: '亚太区' },
    { value: 389, name: '欧非区' },
    { value: 198, name: '美洲区' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // 指定图表的配置项和数据
  const option = {
    title: {
      text: '设备区域分布',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    color: ['#5470c6', '#ee6666', '#91cc75', '#fac858'],
    legend: {
      top: 'center',
      orient: 'vertical',
      right: 10,
      icon: 'circle',
      itemGap: 25,
      textStyle: {
        fontSize: 14,
        lineHeight: 10,
        padding: [0, 0, 0, 0],
        baseline: 'bottom',
        rich: {
          name: {
            align: 'left',
            width: 100,
            fontSize: 14,
            verticalAlign: 'middle',
            padding: [3, 0, 0, 0],
          },
          value: {
            align: 'right',
            width: 50,
            fontSize: 14,
            padding: [3, 10, 0, 0],
            verticalAlign: 'middle'
          }
        }
      },
      itemWidth: 10,
      itemHeight: 10,
      formatter: function (name) {
        const item = data.find(d => d.name === name);
        return `{name|${item.name}}{value|${item.value}台}`;
      }
    },
    series: [
      {
        name: '设备型号分类统计',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['25%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ],
    graphic: [
      {
        type: 'group',
        left: '14%',
        top: 'middle',
        children: [
          {
            type: 'text',
            z: 100,
            left: 'center',
            top: 'middle',
            style: {
              text: total.toString() + '台',
              textAlign: 'center',
              fill: '#000',
              fontSize: 30,
              fontWeight: 'bold'
            }
          },
          {
            type: 'text',
            z: 100,
            left: 'center',
            top: 20,
            style: {
              text: '已售出设备总数',
              textAlign: 'center',
              fill: '#000',
              fontSize: 14,
            }
          }
        ]
      }
    ]
  };

  // 使用配置项和数据显示图表
  myChart.setOption(option);
});
</script>