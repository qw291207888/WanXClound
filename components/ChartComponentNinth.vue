<template>
  <div ref="chart" style="width: 100%;height: 100%;"></div>
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

console.log(props.countryData)
console.log(props.countryData.structureWax)
console.log(props.countryData.supportWax)

console.log(props.selectedCountry)

const countryMapping = {
    AF: '阿富汗',
    AL: '阿尔巴尼亚',
    DZ: '阿尔及利亚',
    AS: '美属萨摩亚',
    AD: '安道尔',
    AO: '安哥拉',
    AG: '安提瓜和巴布达',
    AR: '阿根廷',
    AM: '亚美尼亚',
    AU: '澳大利亚',
    AT: '奥地利',
    AZ: '阿塞拜疆',
    BS: '巴哈马',
    BH: '巴林',
    BD: '孟加拉国',
    BB: '巴巴多斯',
    BY: '白俄罗斯',
    BE: '比利时',
    BZ: '伯利兹',
    BJ: '贝宁',
    BM: '百慕大',
    BT: '不丹',
    BO: '玻利维亚',
    BA: '波斯尼亚和黑塞哥维那',
    BW: '博茨瓦纳',
    BR: '巴西',
    BN: '文莱',
    BG: '保加利亚',
    BF: '布基纳法索',
    BI: '布隆迪',
    CV: '佛得角',
    KH: '柬埔寨',
    CM: '喀麦隆',
    CA: '加拿大',
    KY: '开曼群岛',
    CF: '中非共和国',
    TD: '乍得',
    CL: '智利',
    CN: '中国',
    CO: '哥伦比亚',
    KM: '科摩罗',
    CR: '哥斯达黎加',
    HR: '克罗地亚',
    CU: '古巴',
    CY: '塞浦路斯',
    CZ: '捷克共和国',
    DK: '丹麦',
    DJ: '吉布提',
    DM: '多米尼克',
    DO: '多米尼加共和国',
    EC: '厄瓜多尔',
    EG: '埃及',
    SV: '萨尔瓦多',
    GQ: '赤道几内亚',
    ER: '厄立特里亚',
    EE: '爱沙尼亚',
    SZ: '斯威士兰',
    ET: '埃塞俄比亚',
    FJ: '斐济',
    FI: '芬兰',
    FR: '法国',
    GA: '加蓬',
    GM: '冈比亚',
    GE: '格鲁吉亚',
    DE: '德国',
    GH: '加纳',
    GR: '希腊',
    GD: '格林纳达',
    GT: '危地马拉',
    GN: '几内亚',
    GW: '几内亚比绍',
    GY: '圭亚那',
    HT: '海地',
    HN: '洪都拉斯',
    HU: '匈牙利',
    IS: '冰岛',
    IN: '印度',
    ID: '印度尼西亚',
    IR: '伊朗',
    IQ: '伊拉克',
    IE: '爱尔兰',
    IL: '以色列',
    IT: '意大利',
    JM: '牙买加',
    JP: '日本',
    JO: '约旦',
    KZ: '哈萨克斯坦',
    KE: '肯尼亚',
    KI: '基里巴斯',
    KP: '朝鲜',
    KR: '韩国',
    KW: '科威特',
    KG: '吉尔吉斯斯坦',
    LA: '老挝',
    LV: '拉脱维亚',
    LB: '黎巴嫩',
    LS: '莱索托',
    LR: '利比里亚',
    LY: '利比亚',
    LI: '列支敦士登',
    LT: '立陶宛',
    LU: '卢森堡',
    MG: '马达加斯加',
    MW: '马拉维',
    MY: '马来西亚',
    MV: '马尔代夫',
    ML: '马里',
    MT: '马耳他',
    MH: '马绍尔群岛',
    MR: '毛里塔尼亚',
    MU: '毛里求斯',
    MX: '墨西哥',
    FM: '密克罗尼西亚',
    MD: '摩尔多瓦',
    MC: '摩纳哥',
    MN: '蒙古',
    ME: '黑山',
    MA: '摩洛哥',
    MZ: '莫桑比克',
    MM: '缅甸',
    NA: '纳米比亚',
    NR: '瑙鲁',
    NP: '尼泊尔',
    NL: '荷兰',
    NZ: '新西兰',
    NI: '尼加拉瓜',
    NE: '尼日尔',
    NG: '尼日利亚',
    MK: '北马其顿',
    NO: '挪威',
    OM: '阿曼',
    PK: '巴基斯坦',
    PW: '帕劳',
    PA: '巴拿马',
    PG: '巴布亚新几内亚',
    PY: '巴拉圭',
    PE: '秘鲁',
    PH: '菲律宾',
    PL: '波兰',
    PT: '葡萄牙',
    QA: '卡塔尔',
    RO: '罗马尼亚',
    RU: '俄罗斯',
    RW: '卢旺达',
    KN: '圣基茨和尼维斯',
    LC: '圣卢西亚',
    VC: '圣文森特和格林纳丁斯',
    WS: '萨摩亚',
    SM: '圣马力诺',
    ST: '圣多美和普林西比',
    SA: '沙特阿拉伯',
    SN: '塞内加尔',
    RS: '塞尔维亚',
    SC: '塞舌尔',
    SL: '塞拉利昂',
    SG: '新加坡',
    SK: '斯洛伐克',
    SI: '斯洛文尼亚',
    SB: '所罗门群岛',
    SO: '索马里',
    ZA: '南非',
    SS: '南苏丹',
    ES: '西班牙',
    LK: '斯里兰卡',
    SD: '苏丹',
    SR: '苏里南',
    SE: '瑞典',
    CH: '瑞士',
    SY: '叙利亚',
    TJ: '塔吉克斯坦',
    TZ: '坦桑尼亚',
    TH: '泰国',
    TL: '东帝汶',
    TG: '多哥',
    TO: '汤加',
    TT: '特立尼达和多巴哥',
    TN: '突尼斯',
    TR: '土耳其',
    TM: '土库曼斯坦',
    TV: '图瓦卢',
    UG: '乌干达',
    UA: '乌克兰',
    AE: '阿拉伯联合酋长国',
    GB: '英国',
    US: '美国',
    UY: '乌拉圭',
    UZ: '乌兹别克斯坦',
    VU: '瓦努阿图',
    VE: '委内瑞拉',
    VN: '越南',
    YE: '也门',
    ZM: '赞比亚',
    ZW: '津巴布韦',
    GS: '南乔治亚岛和南桑威奇群岛',
    TW: '中国台湾省',
    WF: '瓦利斯和富图纳群岛(法国海外领地)',
    PN: '皮特凯恩群岛(英国海外领地)',
    CI: '科特迪瓦',
    BQ: '荷兰加勒比海属地',
    MP: '北马里亚纳群岛',
    BL: '圣巴特岛',
    GG: '根西岛(英国的海外属地)',
    SJ: '斯瓦尔巴和扬马延',
    FO: '法罗群岛',
    PS: '帕勒斯坦',
    AW: '‌阿鲁巴',
    CK: '库克群岛',
    CX: '圣诞岛(澳大利亚印度洋岛屿)',
    TK: '托克劳群岛',
    RE: '留尼汪',
    MS: '蒙特塞拉特',
    VI: '美属维尔京群岛',
    AQ: '南极洲',
    PR: '波多黎各',
    YT: '马约特',
    NF: '诺福克岛',
    BV: '布韦岛',
    IM: '马恩岛',
    GL: '格陵兰',
    TF: '法属南部和南极领地',
    PM: '圣皮埃尔和密克隆',
    MO: '澳门',
    SX: '荷属圣马丁',
    TC: '特克斯和凯科斯群岛',
    CC: '科科斯（基林）群岛',
    EH: '西撒哈拉',
    PF: '法属波利尼西亚',
    GP: '瓜德罗普',
    GI: '直布罗陀',
    CD: '刚果民主共和国',
    NC: '新喀里多尼亚',
    SH: '圣赫勒拿、阿森松和特里斯坦-达库尼亚',
    VG: '英属维尔京群岛',
    NU: '纽埃',
    HM: '赫德岛和麦克唐纳群岛',
    VA: '梵蒂冈城',
    HK: '香港',
    CW: '库拉索',
    GF: '法属圭亚那',
    AX: '奥兰群岛',
    UM: '美国本土外小岛屿',
    FK: '福克兰群岛',
    JE: '泽西岛',
    IO: '英属印度洋领地',
    MQ: '马提尼克',
    XK: '科索沃',
    GU: '关岛',
    MF: '圣马丁（法属）',
    CG: '刚果共和国',
    AI: '安圭拉'
  };

  const mapCountryToChinese = (countryCode) => {
    return countryMapping[countryCode] || '—'; // 如果没有匹配的国家代码，显示 '—'
  };

const chart = ref(null);

const updateChart = () => {
  const { $echarts } = useNuxtApp();
  const myChart = $echarts.getInstanceByDom(chart.value);

  // 指定图表的配置项和数据
  const option = {
    title: {
      text: `{a|${mapCountryToChinese(props.selectedCountry)}-}{b|蜡材消耗量月统计}`,
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
      data: props.countryData.stateDate
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

watch(
  () => props.countryData.supportWax,
  (newSupportWax) => {
    updateChart();
  },
  { deep: true }
);

watch(
  () => props.countryData.structureWax,
  (newStructureWax) => {
    updateChart();
  },
  { deep: true }
);

watch(
  () => props.countryData.stateDate,
  (newStateDate) => {
    updateChart();
  },
  { deep: true }
);
</script>
