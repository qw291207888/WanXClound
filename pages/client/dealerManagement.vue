<script lang="ts" setup>
  definePageMeta({
    layout: 'client',
    middleware: 'auth'
  })

  const handleClick = (row: any) => {
    console.log(row.id)
    navigateTo({
      path: '/client/dealerDetails',
      query: {userId:row.id}
    })
  }

  const searchClickType = ref(false)

  interface TableData {
    name: string;
    email: string;
    country: string;
    proxy_country: string;
    customer_num: number;
    device_num: number;
    wax_num: number;
    transfer_alert_num: number;
    illegal_alert_num: number;
    alert_at: number;
  }

  const countryMap: Record<string, string> = {
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

  const convertCountryToChinese = (list: any[]) => {
    return list.map(item => ({
      ...item,
      country: countryMap[item.country] || item.country, // 如果找不到对应的中文名，保留原始值
      proxy_country: countryMap[item.proxy_country] || item.proxy_country
    }));
  };
  
  // const initialTableData: TableData[] = [
  //   {
  //     dealerName: '经销商名称1',
  //     emailAddress: '2912078565@qq.com',
  //     country: '土耳其',
  //     proxyArea: '区域A',
  //     numberOfCustomers: '1',
  //     numberOfDevices: '5',
  //     waxMaterialNumber: '5',
  //     fleeGoods: '',
  //     useFalsehood: '',
  //     alarmTime: ''
  //   },
  //   {
  //     dealerName: '经销商名称2',
  //     emailAddress: '2912078545@qq.com',
  //     country: '泰国',
  //     proxyArea: '区域B',
  //     numberOfCustomers: '2',
  //     numberOfDevices: '4',
  //     waxMaterialNumber: '4',
  //     fleeGoods: '4',
  //     useFalsehood: '4',
  //     alarmTime: '2035-09-19 9:39:39'
  //   },
  //   {
  //     dealerName: '经销商名称3',
  //     emailAddress: '29120178565@qq.com',
  //     country: '英国',
  //     proxyArea: '区域C',
  //     numberOfCustomers: '3',
  //     numberOfDevices: '6',
  //     waxMaterialNumber: '6',
  //     fleeGoods: '5',
  //     useFalsehood: '5',
  //     alarmTime: '2035-09-18 9:39:39'
  //   },
  //   {
  //     dealerName: '经销商名称4',
  //     emailAddress: '29120785656@qq.com',
  //     country: '美国',
  //     proxyArea: '区域D',
  //     numberOfCustomers: '4',
  //     numberOfDevices: '7',
  //     waxMaterialNumber: '7',
  //     fleeGoods: '2',
  //     useFalsehood: '2',
  //     alarmTime: '2035-09-17 9:39:39'
  //   },
  //   {
  //     dealerName: '经销商名称5',
  //     emailAddress: '29120748565@qq.com',
  //     country: '法国',
  //     proxyArea: '区域E',
  //     numberOfCustomers: '5',
  //     numberOfDevices: '8',
  //     waxMaterialNumber: '8',
  //     fleeGoods: '1',
  //     useFalsehood: '1',
  //     alarmTime: '2035-09-18 9:39:39'
  //   },
  //   {
  //     dealerName: '经销商名称6',
  //     emailAddress: '29127078565@qq.com',
  //     country: '西班牙',
  //     proxyArea: '区域F',
  //     numberOfCustomers: '6',
  //     numberOfDevices: '10',
  //     waxMaterialNumber: '10',
  //     fleeGoods: '',
  //     useFalsehood: '',
  //     alarmTime: ''
  //   }
  // ]

  // const tableData = ref([...initialTableData])
  // const rawData = ref([...initialTableData]) 

  const tableData = ref<TableData[]>([])
  const rawData = ref<TableData[]>([])

  const totalItems = ref(0);

  import { ref, computed, watch, onMounted } from 'vue'
  import type { ComponentSize } from 'element-plus'
  import { utils, writeFile } from 'xlsx'

  const currentPage4 = ref(1)
  const pageSize4 = ref(5)
  const size = ref<ComponentSize>('default')
  const background = ref(false)
  const disabled = ref(false)


  const paginatedData = computed(() => {
    // const start = (currentPage4.value - 1) * pageSize4.value
    const start = 0
    const end = start + pageSize4.value
    console.log(start)
    console.log(end)
    return tableData.value.slice(start, end)
  })

  const handleSizeChange = async (val: number) => {
    pageSize4.value = val
    currentPage4.value = 1
    console.log(`${val} items per page`)
    const pageId = currentPage4.value
    const pageSize = pageSize4.value
    let dlearName = selectedDealer.value
    let Country = selectedCountry.value
    let proxyCountry = selectedAgency.value

    console.log(dlearName)
    console.log(Country)
    try {
      const response = await getDealerList(pageId, pageSize, dlearName, Country, proxyCountry);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)

      console.log(paginatedData.value)

      if (response.data.list !== null) {
        const responseName = response.data.list.map((item: { id: any; }) => item.id);
        console.log(responseName)
        const responseCountry = response.data.list.map((item: { country: any; }) => item.country);
        console.log(responseCountry)
        const responseProxyCountry = response.data.list.map((item: { proxy_country: any; }) => item.proxy_country);
        console.log(responseProxyCountry)
        if ((responseName.includes(dlearName) || responseCountry.includes(Country) || responseProxyCountry.includes(proxyCountry)) && (searchClickType.value === false)) {
          dlearName = ''
          Country = ''
          proxyCountry = ''
          try {
            const response = await getDealerList(pageId, pageSize, dlearName, Country, proxyCountry);
            console.log('User account details fetched successfully:', response);
            console.log(response.data.list)
      
            console.log(paginatedData.value)
      
            if (response.data.list !== null) {
              tableData.value = response.data.list
              rawData.value = response.data.list
        
              totalItems.value = response.data.total;
            }
          } catch (err) {
            console.error('Failed to fetch account details:', err);
          }
        } else {
          tableData.value = response.data.list
          rawData.value = response.data.list
    
          totalItems.value = response.data.total;
        }
      } else {
        dlearName = ''
        Country = ''
        proxyCountry = ''
        try {
          const response = await getDealerList(pageId, pageSize, dlearName, Country, proxyCountry);
          console.log('User account details fetched successfully:', response);
          console.log(response.data.list)
    
          console.log(paginatedData.value)
    
          if (response.data.list !== null) {
            tableData.value = response.data.list
            rawData.value = response.data.list
      
            totalItems.value = response.data.total;
          }
        } catch (err) {
          console.error('Failed to fetch account details:', err);
        }
      }
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }
  }

  const handleCurrentChange = async (val: number) => {
    currentPage4.value = val
    console.log(`current page: ${val}`)

    const pageId = currentPage4.value

    console.log(pageId)
    const pageSize = pageSize4.value

    console.log(pageSize)
    let dlearName = selectedDealer.value
    let Country = selectedCountry.value
    let proxyCountry = selectedAgency.value
    try {
      const response = await getDealerList(pageId, pageSize, dlearName, Country, proxyCountry);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)

      console.log(paginatedData.value)

      if (response.data.list !== null) {
        const responseName = response.data.list.map((item: { id: any; }) => item.id);
        console.log(responseName)
        const responseCountry = response.data.list.map((item: { country: any; }) => item.country);
        console.log(responseCountry)
        const responseProxyCountry = response.data.list.map((item: { proxy_country: any; }) => item.proxy_country);
        console.log(responseProxyCountry)
        if ((responseName.includes(dlearName) || responseCountry.includes(Country) || responseProxyCountry.includes(proxyCountry)) && (searchClickType.value === false)) {
          dlearName = ''
          Country = ''
          proxyCountry = ''
          try {
            const response = await getDealerList(pageId, pageSize, dlearName, Country, proxyCountry);
            console.log('User account details fetched successfully:', response);
            console.log(response.data.list)
      
            console.log(paginatedData.value)
      
            if (response.data.list !== null) {
              tableData.value = response.data.list
              rawData.value = response.data.list
        
              totalItems.value = response.data.total;
            }
          } catch (err) {
            console.error('Failed to fetch account details:', err);
          }
        } else {
          tableData.value = response.data.list
          rawData.value = response.data.list
    
          totalItems.value = response.data.total;
        }
      } else {
        dlearName = ''
        Country = ''
        proxyCountry = ''
        try {
          const response = await getDealerList(pageId, pageSize, dlearName, Country, proxyCountry);
          console.log('User account details fetched successfully:', response);
          console.log(response.data.list)
    
          console.log(paginatedData.value)
    
          if (response.data.list !== null) {
            tableData.value = response.data.list
            rawData.value = response.data.list
      
            totalItems.value = response.data.total;
          }
        } catch (err) {
          console.error('Failed to fetch account details:', err);
        }
      }
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }
  }

  // const handleSortChange = ({ prop, order }: { prop: keyof TableData, order: string }) => {
  //   if (prop && order) {
  //     if (order === 'ascending') {
  //       tableData.value.sort((a, b) => a[prop] > b[prop] ? 1 : -1)
  //     } else if (order === 'descending') {
  //       tableData.value.sort((a, b) => a[prop] < b[prop] ? 1 : -1)
  //     }
  //   } else {
  //     tableData.value = [...rawData.value]
  //   }
  // }

  // const handleSortChange = ({ prop, order }) => {
  //   const data = [...tableData.value];
  //   data.sort((a, b) => {
  //     if (order === 'ascending') {
  //       return a[prop] > b[prop] ? 1 : -1;
  //     } else if (order === 'descending') {
  //       return a[prop] < b[prop] ? 1 : -1;
  //     }
  //     return 0;
  //   });
  //   tableData.value = data;
  //   currentPage4.value = 1; // 重置到第一页
  // };

  interface SortChangeEvent {
  prop: keyof TableData;
  order: 'ascending' | 'descending';
}

const handleSortChange = ({ prop, order }: SortChangeEvent) => {
  const data = [...tableData.value];

  data.sort((a, b) => {
    const aValue = a[prop];
    const bValue = b[prop];

    if (order === 'ascending') {
      return aValue > bValue ? 1 : -1;
    } else if (order === 'descending') {
      return aValue < bValue ? 1 : -1;
    }
    return 0;
  });

  tableData.value = data;
  currentPage4.value = 1; // 重置到第一页
};

  const selectedCountry = ref('')
  const selectedDealer = ref('')
  const selectedAgency = ref('')

  interface Option {
    value: string;
    label: string;
  }
  
  const options = ref<Option[]>([])

  const options1 = ref<Option[]>([])

  const options2 = ref<Option[]>([])

  const handleCountryChange = (value: any) => {
    console.log('Selected country changed:', value)
    searchClickType.value = false
  }

  const handleCountryChange1 = (value: any) => {
    console.log('Selected country changed:', value)
    searchClickType.value = false
  }

  const handleCountryChange2 = (value: any) => {
    console.log('Selected country changed:', value)
    searchClickType.value = false
  }

  // const handleSearch = () => {
  //   if (selectedCountry.value) {
  //     tableData.value = rawData.value.filter(item => item.country === selectedCountry.value)
  //   } else {
  //     tableData.value = [...rawData.value]
  //   }
  // }

  const handleSearch = async () => {
    console.log(selectedDealer.value)
    searchClickType.value = true
    if (selectedDealer.value || selectedCountry.value || selectedAgency.value) {
      console.log(selectedDealer.value)
      const pageId = currentPage4.value
      const pageSize = pageSize4.value
      const dlearName = selectedDealer.value
      const Country = selectedCountry.value
      const proxyCountry = selectedAgency.value

      console.log(dlearName)
      try {
        const response = await getDealerList(pageId, pageSize, dlearName, Country, proxyCountry);
        console.log('User account details fetched successfully:', response);
        console.log(response.data.list)

        totalItems.value = response.data.total;

        if (response.data.list === null) {
          tableData.value = []
          return
        }
  
        const dataList = response.data.list;
  
        const convertedData = convertCountryToChinese(dataList);
  
        tableData.value = convertedData
        rawData.value = convertedData
  
        
      } catch (err) {
        console.error('Failed to fetch account details:', err);
      }
    } else {
      console.log(selectedDealer.value)
      const pageId = currentPage4.value
      const pageSize = pageSize4.value
      const dlearName = selectedDealer.value
      const Country = selectedCountry.value
      const proxyCountry = selectedAgency.value

      console.log(dlearName)
      try {
        const response = await getDealerList(pageId, pageSize, dlearName, Country, proxyCountry);
        console.log('User account details fetched successfully:', response);
        console.log(response.data.list)

        totalItems.value = response.data.total;

        if (response.data.list === null) {
          tableData.value = []
          return
        }
  
        const dataList = response.data.list;
  
        const convertedData = convertCountryToChinese(dataList);
  
        tableData.value = convertedData
        rawData.value = convertedData
  
        
      } catch (err) {
        console.error('Failed to fetch account details:', err);
      }
    }
    // tableData.value = rawData.value.filter(item => {
    //   let matches = true;

    //   if (selectedDealer.value && item.name !== selectedDealer.value) {
    //     matches = false
    //   }

    //   if (selectedCountry.value && item.country !== selectedCountry.value) {
    //     matches = false
    //   }

    //   if (selectedAgency.value && item.proxy_country !== selectedAgency.value) {
    //     matches = false
    //   }

      // if (selectedDate.value  && Array.isArray(selectedDate.value) && selectedDate.value.length === 2) {
      //   const [startDate, endDate] = selectedDate.value;
      //   const itemDate = new Date(item.alarmTime)

      //   if (isNaN(itemDate.getTime()) || itemDate < new Date(startDate) || itemDate > new Date(endDate)) {
      //     matches = false;
      //   }
      // }

    //   return matches;
    // })
  }

  const exportToExcel = () => {
    const headerMap = {
      name: '经销商名称',
      email: '邮箱地址',
      country: '国家',
      proxy_country: '代理区域',
      customer_num: '客户数',
      device_num: '购入设备数',
      wax_num: '购入蜡材数',
      transfer_alert_num: '设备及蜡材窜货报警数',
      illegal_alert_num: '蜡材用伪报警数',
      alert_at: '最近触发报警时间'
    };

    const dataWithChineseHeaders = tableData.value.map((item) => {
      return {
        [headerMap.name]: item.name,
        [headerMap.email]: item.email,
        [headerMap.country]: item.country,
        [headerMap.proxy_country]: item.proxy_country,
        [headerMap.customer_num]: item.customer_num,
        [headerMap.device_num]: item.device_num,
        [headerMap.wax_num]: item.wax_num,
        [headerMap.transfer_alert_num]: item.transfer_alert_num,
        [headerMap.illegal_alert_num]: item.illegal_alert_num,
        [headerMap.alert_at]: item.alert_at
      };
    });

    const ws = utils.json_to_sheet(dataWithChineseHeaders)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Sheet1')
    writeFile(wb, '经销商数据.xlsx')
  }

  const selectedDate = ref([])

  import { useRegisterApi } from '~/composables/user';
  const { getDealerList, getUserList, getCountriesList } = useRegisterApi();

  const fetchUserList = async () => {
    try {
      const response = await getUserList(1);
      console.log(response.data.list)
      options1.value = response.data.list.map((item: { id: any; last_name: any; first_name: any; }) => ({
        value: item.id,
        label: item.last_name + item.first_name
      }));
    } catch (error) {
      console.error('Failed to fetch country list:', error);
    }
  };

  const fetchCountriesList = async () => {
    try {
      const response = await getCountriesList();
      console.log(response.data)
      options.value = response.data.list.map((countryCode: string) => ({
        value: countryCode,
        label: countryMap[countryCode] || countryCode
      }));
    } catch (error) {
      console.error('Failed to fetch country list:', error);
    }
  };

  const fetchZoneList = async () => {
    try {
      const response = await getCountriesList();
      console.log(response.data)
      options2.value = response.data.list.map((countryCode: string) => ({
        value: countryCode,
        label: countryMap[countryCode] || countryCode
      }));
    } catch (error) {
      console.error('Failed to fetch country list:', error);
    }
  };

  const resetClick = async () => {
    selectedDealer.value = ''
    selectedCountry.value = ''
    selectedAgency.value = ''
    const pageId = currentPage4.value
    const pageSize = pageSize4.value
    const dlearName = selectedDealer.value
    const Country = selectedCountry.value
    const proxyCountry = selectedAgency.value
    try {
      const response = await getDealerList(pageId, pageSize, dlearName, Country, proxyCountry);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)

      const dataList = response.data.list;

      const convertedData = convertCountryToChinese(dataList);

      tableData.value = convertedData
      rawData.value = convertedData

      totalItems.value = response.data.total;
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }
  }


  onMounted(async () => {
    const pageId = currentPage4.value
    const pageSize = pageSize4.value
    const dlearName = selectedDealer.value
    const Country = selectedCountry.value
    const proxyCountry = selectedAgency.value
    try {
      const response = await getDealerList(pageId, pageSize, dlearName, Country, proxyCountry);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)

      const dataList = response.data.list;

      const convertedData = convertCountryToChinese(dataList);

      tableData.value = convertedData
      rawData.value = convertedData

      totalItems.value = response.data.total;
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }

    fetchUserList()
    fetchCountriesList()
    fetchZoneList()
  });
</script>

<template>
  <div class="client-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>经销商管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="dealer-box">
      <div class="search-box">
        <div style="width: 85%;" class="flex flex-col gap-7">
          <div class="flex items-center">
            <el-select
              v-model="selectedDealer"
              class="m-2 dealer-Name"
              placeholder="经销商名称"
              style="margin-right: 1.25rem;"
              clearable
              @change="handleCountryChange"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="selectedCountry"
              class="m-2 countryBox"
              placeholder="国家"
              style="margin-right: 1.25rem;"
              clearable
              @change="handleCountryChange1"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="selectedAgency"
              class="m-2 proxyArea"
              placeholder="代理区域"
              clearable
              @change="handleCountryChange2"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex items-center" style="display: none;">
            <!-- <span class="search-name search-name-first">触发报警时间段</span> -->
            <span class="triggerAlarm">触发报警时间段</span>
            <div style="width: 20rem;">
              <el-date-picker
                v-model="selectedDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :size="size"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center gap-4">
          <el-button 
            type="primary" 
            @click="handleSearch"
            class="searchButton"
          >搜索</el-button>
          <el-button
            @click="resetClick"
            class="resetButton"
          >重置</el-button>
          <el-button
            @click="exportToExcel"
            class="deriveButton"
          >导出Excel</el-button>
        </div>
      </div>
      <div class="tabel-box">
        <el-table
          :data="paginatedData"
          border
          style="width: 100%"
          @sort-change="handleSortChange"
        >
          <el-table-column type="index" label="序号" width="128" />
          <el-table-column prop="name" label="经销商名称" width="216">
            <template #default="{ row, column, $index }">
              <span>{{ row.name !== '' ? row.name : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱地址" width="216">
            <template #default="{ row, column, $index }">
              <span>{{ row.email !== '' ? row.email : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="country" label="国家" width="210">
            <template #default="{ row, column, $index }">
              <span>{{ row.country !== '' ? row.country : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="proxy_country" label="代理区域" width="171">
            <template #default="{ row, column, $index }">
              <span>{{ row.proxy_country !== '' ? row.proxy_country : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="customer_num" label="客户数" sortable width="146">
            <template #default="{ row, column, $index }">
              <span>{{ row.customer_num !== '' ? row.customer_num : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="device_num" label="购入设备数" sortable width="132">
            <template #default="{ row, column, $index }">
              <span>{{ row.device_num !== '' ? row.device_num : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="wax_num" label="购入蜡材数" sortable width="134">
            <template #default="{ row, column, $index }">
              <span>{{ row.wax_num !== '' ? row.wax_num : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="transfer_alert_num" label="设备及蜡材窜货报警数" sortable width="230">
            <template #default="{ row, column, $index }">
              <span>{{ row.transfer_alert_num !== '' ? row.transfer_alert_num : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="illegal_alert_num" label="蜡材用伪报警数" sortable width="172">
            <template #default="{ row, column, $index }">
              <span>{{ row.illegal_alert_num !== '' ? row.illegal_alert_num : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="alert_at" label="最近触发报警时间" sortable width="215">
            <template #default="{ row, column, $index }">
              <span>{{ row.alert_at !== '' ? row.alert_at : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="137">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleClick(scope.row)" class="checkDealer">
                查看经销商详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginate">
          <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[5, 10, 20, 30]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItems"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  :deep(.el-breadcrumb__separator) {
    color: #333333;
    font-size: 14px;
  }

  :deep(.el-breadcrumb__item .el-breadcrumb__inner) {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #333333;
  }

  :deep(.el-breadcrumb) {
    border-left: 4px solid rgba(64, 158, 255, 1);
    padding-left: 15px;
  }

  .client-box {
    padding: 1.25rem 2.5rem 2.5rem 2.5rem;
    // height: calc(100vh - 60px);
  }

  :deep(.el-table .cell) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // .tabel-box {
  //   border: 1px solid #333333;
  //   padding: 20px 10px 30px 10px;
  //   border-radius: 10px;
  // }

  .paginate {
    margin-top: 15px;
  }

  .search {
    display: flex;
    align-items: center;
    border: 1px solid #333333;
    border-radius: 10px;
    // height: 109px;
    // padding-left: 20px;
    margin-bottom: 20px;
    padding: 10px 70px 10px 10px;
  }

  .country-search {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #232B40;
    line-height: 22px;
    font-size: 14px;
    margin-right: 10px;
  }

  :deep(.el-select--large .el-select__wrapper) {
    min-height: 36px;
  }

  :deep(.el-select__placeholder.is-transparent span) {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #989DAA;
  }

  .el-button {
    width: 93px;
    height: 36px;
  }

  .el-breadcrumb {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    border-left: 0.1875rem solid rgb(0, 160, 233);
    padding-left: 0.5rem;
    margin-bottom: 2.5rem;
  }

  .el-button+.el-button {
    margin-left: 0;
  }

  .country-box {
    width: 600px;
  }

  .search-box {
    // height: 172px;
    // border: 1px solid rgba(121, 121, 121, 1);
    // border-radius: 8px;
    // margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    // padding-left: 15px;
    // padding-right: 70px;
  }

  .search-name {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #232B40;
    line-height: 22px;
    font-size: 14px;
    width: 60%;
  }

  .search-name-first {
    width: 26%;
  }

  .search-name-one {
    width: 35%;
  }

  .search-name-two {
    width: 15%;
  }

  .search-name-three {
    width: 30%;
  }

  :deep(.el-range-editor.el-input__wrapper) {
    width: 200px;
  }

  .dealer-box {
    background: rgb(255, 255, 255);
    padding: 2rem;
    border-radius: 1.25rem;
  }

  .el-select {
    width: 17.5rem;
    margin: 0;
  }

  :deep(.el-select__placeholder.is-transparent span) {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }
 
  :deep(.dealer-Name > .el-select__wrapper) {
    background: rgb(245, 245, 245);
    min-height: 2.6875rem;
  }

  :deep(.countryBox > .el-select__wrapper) {
    background: rgb(245, 245, 245);
    min-height: 2.6875rem;
  }

  :deep(.proxyArea > .el-select__wrapper) {
    background: rgb(245, 245, 245);
    min-height: 2.6875rem;
  }

  :deep(.el-range-editor.el-input__wrapper) {
    width: 20rem;
    height: 2.6875rem;
  }

  .triggerAlarm {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.3125rem;
    margin-right: 1.25rem;
  }

  .searchButton {
    width: 7.375rem;
    height: 2.6875rem;
    background: rgb(0, 160, 233);
    border-radius: 0.5rem;
  }

  :deep(.searchButton>span) {
    color: rgb(255, 255, 255);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  .resetButton {
    width: 7.375rem;
    height: 2.6875rem;
    background: rgb(0, 160, 233);
    border-radius: 0.5rem;
  }

  :deep(.resetButton>span) {
    color: rgb(255, 255, 255);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  .deriveButton {
    width: 7.375rem;
    height: 2.6875rem;
    background: rgb(255, 255, 255);
    border-radius: 0.5rem;
  }

  :deep(.deriveButton>span) {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  :deep(.el-table th.el-table__cell) {
    background: rgb(252, 252, 252);
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.3125rem;
  }

  :deep(.el-table thead) {
    height: 3.75rem;
  }

  :deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
    height: 3.1875rem;
    color: rgb(84, 84, 84);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  :deep(.checkDealer>span) {
    color: rgb(0, 160, 233);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }
</style>