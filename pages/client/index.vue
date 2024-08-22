<script lang="ts" setup>
  definePageMeta({
    layout: 'client',
    middleware: 'auth'
  })

  const handleClick = (row: any) => {
    console.log(row.id)
    navigateTo({
      path: '/client/endCustomerDetails',
      query: {userId:row.id}
    })
  }

  interface TableData {
    country: string;
    city: string;
    name: string;
    email: string;
    device_num: number;
    distributor: string;
  }

  interface ApiResponse {
    data: {
      list: TableData[] | null | undefined; // 同时接受 null 和 undefined
    };
  }

  const searchClickType = ref(false)
  
  // const initialTableData: TableData[] = [
  //   {
  //     country: '土耳其',
  //     region: '伊斯坦布尔',
  //     endCustomerName: '土耳其XXX珠宝设计工作室',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 5,
  //     channel: '经销商A',
  //   },
  //   {
  //     country: '泰国',
  //     region: '清迈',
  //     endCustomerName: '泰国XXX珠宝品牌公司',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 4,
  //     channel: '经销商B',
  //   },
  //   {
  //     country: '英国',
  //     region: '伦敦',
  //     endCustomerName: '客户名称3',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 6,
  //     channel: '经销商A',
  //   },
  //   {
  //     country: '美国',
  //     region: '佛罗里达',
  //     endCustomerName: '客户名称4',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 7,
  //     channel: '经销商B',
  //   },
  //   {
  //     country: '法国',
  //     region: '意大利',
  //     endCustomerName: '客户名称5',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 8,
  //     channel: '经销商A',
  //   },
  //   {
  //     country: '西班牙',
  //     region: '马德里',
  //     endCustomerName: '客户名称6',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 10,
  //     channel: '经销商B',
  //   },
  //   {
  //     country: '中国',
  //     region: '香港',
  //     endCustomerName: '客户名称7',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 11,
  //     channel: '经销商A',
  //   },
  //   {
  //     country: '中国',
  //     region: '台湾',
  //     endCustomerName: '客户名称8',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 14,
  //     channel: '销售员B',
  //   },{
  //     country: '中国',
  //     region: '香港',
  //     endCustomerName: '客户名称7',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 11,
  //     channel: '经销商A',
  //   },
  //   {
  //     country: '中国',
  //     region: '台湾',
  //     endCustomerName: '客户名称8',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 14,
  //     channel: '销售员B',
  //   },{
  //     country: '中国',
  //     region: '香港',
  //     endCustomerName: '客户名称7',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 11,
  //     channel: '经销商A',
  //   },
  //   {
  //     country: '中国',
  //     region: '台湾',
  //     endCustomerName: '客户名称8',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 14,
  //     channel: '销售员B',
  //   },{
  //     country: '中国',
  //     region: '香港',
  //     endCustomerName: '客户名称7',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 11,
  //     channel: '经销商A',
  //   },
  //   {
  //     country: '中国',
  //     region: '台湾',
  //     endCustomerName: '客户名称8',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 14,
  //     channel: '销售员B',
  //   },{
  //     country: '中国',
  //     region: '香港',
  //     endCustomerName: '客户名称7',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 11,
  //     channel: '经销商A',
  //   },
  //   {
  //     country: '中国',
  //     region: '台湾',
  //     endCustomerName: '客户名称8',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 14,
  //     channel: '销售员B',
  //   },{
  //     country: '中国',
  //     region: '香港',
  //     endCustomerName: '客户名称7',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 11,
  //     channel: '经销商A',
  //   },
  //   {
  //     country: '中国',
  //     region: '台湾',
  //     endCustomerName: '客户名称8',
  //     emailAddress: '2912078565@qq.com',
  //     numberOfDevices: 14,
  //     channel: '销售员B',
  //   },
  // ]

  // const tableData = ref([...initialTableData])
  // const rawData = ref([...initialTableData]) 

  const tableData = ref<TableData[]>([])
  const rawData = ref<TableData[]>([])

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
    console.log(list)
    if (list === null) {
      return
    }
    return list.map(item => ({
      ...item,
      country: countryMap[item.country] || item.country // 如果找不到对应的中文名，保留原始值
    }));
  };

  import { ref, computed, watch, onMounted, nextTick } from 'vue'
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
    return tableData.value.slice(start, end)
  })

  // watch(tableData, () => {
  //   currentPage4.value = 1
  // })

  const handleSizeChange = async (val: number) => {
    pageSize4.value = val
    currentPage4.value = 1
    console.log(`${val} items per page`)
    const pageId = currentPage4.value
    const pageSize = pageSize4.value
    let Country = selectedCountry.value

    console.log(Country)
    try {
      const response = await getEndCustomerList(pageId, pageSize, Country);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)


      if (response.data.list !== null) {
        const responseCountry = response.data.list.map((item: { country: any; }) => item.country);
        console.log(responseCountry)
        if (responseCountry.includes(Country) && (searchClickType.value === false)) {
          Country = ''
          try {
            const response = await getEndCustomerList(pageId, pageSize, Country);
            console.log('User account details fetched successfully:', response);
            console.log(response.data.list)
      
            if (response.data.list !== null) {
              const dataList = response.data.list;
        
              const convertedData = convertCountryToChinese(dataList);
        
              tableData.value = convertedData
              rawData.value = convertedData
        
              console.log(tableData.value)
              console.log(rawData.value)
        
              // const countries: string[] = [...new Set(dataList.map((item: { country: string; }) => item.country))];
        
              const countrySet = new Set<string>(
                dataList.map((item: { country: string }) => item.country).filter((country: string) => country)
              );
              const countries: string[] = Array.from(countrySet);
        
              options.value = countries.map((country: string) => ({
                value: country,
                label: countryMap[country] || country
              }))
              totalItems.value = response.data.total;
            }
          } catch (err) {
            console.error('Failed to fetch account details:', err);
          }
        } else {
          const dataList = response.data.list;
  
          const convertedData = convertCountryToChinese(dataList);
    
          tableData.value = convertedData
          rawData.value = convertedData
    
          console.log(tableData.value)
          console.log(rawData.value)
    
          // const countries: string[] = [...new Set(dataList.map((item: { country: string; }) => item.country))];
    
          const countrySet = new Set<string>(
            dataList.map((item: { country: string }) => item.country).filter((country: string) => country)
          );
          const countries: string[] = Array.from(countrySet);
    
          options.value = countries.map((country: string) => ({
            value: country,
            label: countryMap[country] || country
          }))
          totalItems.value = response.data.total;
        }
      } else {
        Country = ''
        try {
          const response = await getEndCustomerList(pageId, pageSize, Country);
          console.log('User account details fetched successfully:', response);
          console.log(response.data.list)
    
          if (response.data.list !== null) {
            const dataList = response.data.list;
      
            const convertedData = convertCountryToChinese(dataList);
      
            tableData.value = convertedData
            rawData.value = convertedData
      
            console.log(tableData.value)
            console.log(rawData.value)
      
            // const countries: string[] = [...new Set(dataList.map((item: { country: string; }) => item.country))];
      
            const countrySet = new Set<string>(
              dataList.map((item: { country: string }) => item.country).filter((country: string) => country)
            );
            const countries: string[] = Array.from(countrySet);
      
            options.value = countries.map((country: string) => ({
              value: country,
              label: countryMap[country] || country
            }))
            totalItems.value = response.data.total;
          }
        } catch (err) {
          console.error('Failed to fetch account details:', err);
        }
      }
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }

    fetchCountriesList();
  }

  const handleCurrentChange = async (val: number) => {
    currentPage4.value = val
    console.log(`current page: ${val}`)
    const pageId = currentPage4.value
    const pageSize = pageSize4.value
    let Country = selectedCountry.value
    console.log(Country)
    try {
      const response = await getEndCustomerList(pageId, pageSize, Country);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)
      
      if (response.data.list !== null) {
        const responseCountry = response.data.list.map((item: { country: any; }) => item.country);
        console.log(responseCountry)
        if (responseCountry.includes(Country) && (searchClickType.value === false)) {
          Country = ''
          try {
            const response = await getEndCustomerList(pageId, pageSize, Country);
            console.log('User account details fetched successfully:', response);
            console.log(response.data.list)
      
            if (response.data.list !== null) {
              const dataList = response.data.list;
        
              const convertedData = convertCountryToChinese(dataList);
        
              tableData.value = convertedData
              rawData.value = convertedData
        
              console.log(tableData.value)
              console.log(rawData.value)
        
              // const countries: string[] = [...new Set(dataList.map((item: { country: string; }) => item.country))];
        
              const countrySet = new Set<string>(
                dataList.map((item: { country: string }) => item.country).filter((country: string) => country)
              );
              const countries: string[] = Array.from(countrySet);
        
              options.value = countries.map((country: string) => ({
                value: country,
                label: countryMap[country] || country
              }))
              totalItems.value = response.data.total;
            }
          } catch (err) {
            console.error('Failed to fetch account details:', err);
          }
        } else {
          const dataList = response.data.list;
  
          const convertedData = convertCountryToChinese(dataList);
    
          tableData.value = convertedData
          rawData.value = convertedData
    
          console.log(tableData.value)
          console.log(rawData.value)
    
          // const countries: string[] = [...new Set(dataList.map((item: { country: string; }) => item.country))];
    
          const countrySet = new Set<string>(
            dataList.map((item: { country: string }) => item.country).filter((country: string) => country)
          );
          const countries: string[] = Array.from(countrySet);
    
          options.value = countries.map((country: string) => ({
            value: country,
            label: countryMap[country] || country
          }))
          totalItems.value = response.data.total;
        }
      } else {
        Country = ''
        try {
          const response = await getEndCustomerList(pageId, pageSize, Country);
          console.log('User account details fetched successfully:', response);
          console.log(response.data.list)
          
          if (response.data.list !== null) {
            const dataList = response.data.list;
      
            const convertedData = convertCountryToChinese(dataList);
      
            tableData.value = convertedData
            rawData.value = convertedData
      
            console.log(tableData.value)
            console.log(rawData.value)
      
            // const countries: string[] = [...new Set(dataList.map((item: { country: string; }) => item.country))];
            const countrySet = new Set<string>(
              dataList.map((item: { country: string }) => item.country).filter((country: string) => country)
            );
            const countries: string[] = Array.from(countrySet);
      
            options.value = countries.map((country: string) => ({
              value: country,
              label: countryMap[country] || country
            }))
          }
        } catch (err) {
          console.error('Failed to fetch account details:', err);
        }
      }
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }

    fetchCountriesList();
  }

  const handleSortChange = ({ prop, order }: { prop: keyof TableData, order: string }) => {
    if (prop && order) {
      if (order === 'ascending') {
        tableData.value.sort((a, b) => a[prop] > b[prop] ? 1 : -1)
      } else if (order === 'descending') {
        tableData.value.sort((a, b) => a[prop] < b[prop] ? 1 : -1)
      }
    } else {
      tableData.value = [...rawData.value]
    }
  }

  const selectedCountry = ref('')
  
  // const options = [
  //   {
  //     value: '土耳其',
  //     label: '土耳其',
  //   },
  //   {
  //     value: '泰国',
  //     label: '泰国',
  //   },
  //   {
  //     value: '英国',
  //     label: '英国',
  //   },
  //   {
  //     value: '美国',
  //     label: '美国',
  //   },
  //   {
  //     value: '法国',
  //     label: '法国',
  //   },
  //   {
  //     value: '西班牙',
  //     label: '西班牙',
  //   },
  //   {
  //     value: '中国',
  //     label: '中国',
  //   }
  // ]

  interface Option {
    value: string;
    label: string;
  }

  // 国家缩写到中文名称的映射表
  // const countryMapping: { [key: string]: string } = {
  //   "AM": "亚美尼亚",
  //   "AR": "阿根廷",
  //   "AU": "澳大利亚",
  //   "BE": "比利时",
  //   "BG": "保加利亚",
  //   "BR": "巴西",
  //   "CA": "加拿大",
  //   "CH": "瑞士",
  //   "CL": "智利",
  //   "CN": "中国",
  //   "CO": "哥伦比亚",
  //   "DE": "德国",
  //   "EG": "埃及",
  //   "ES": "西班牙",
  //   "FR": "法国",
  //   "GB": "英国",
  //   "GD": "格林纳达",
  //   "GR": "希腊",
  //   "GS": "南乔治亚岛与南桑威奇群岛",
  //   "HK": "香港",
  //   "ID": "印度尼西亚",
  //   "IN": "印度",
  //   "IT": "意大利",
  //   "JP": "日本",
  //   "KR": "韩国",
  //   "MA": "摩洛哥",
  //   "MX": "墨西哥",
  //   "MY": "马来西亚",
  //   "NL": "荷兰",
  //   "NZ": "新西兰",
  //   "PH": "菲律宾",
  //   "PL": "波兰",
  //   "RS": "塞尔维亚",
  //   "RU": "俄罗斯",
  //   "SE": "瑞典",
  //   "SG": "新加坡",
  //   "TH": "泰国",
  //   "TR": "土耳其",
  //   "US": "美国",
  //   "VN": "越南",
  //   "WF": "瓦利斯和富图纳"
  // };

  const options = ref<Option[]>([]);

  const searchQuery = ref('')

  interface Option {
    value: string;
    label: string;
    isPlaceholder?: boolean;
  }

  const filteredOptions = ref<Option[]>([]);

  // const filteredOptions = computed<Option[]>(() => {
  //   console.log(searchQuery.value)
  //   if (!searchQuery.value) {
  //     return options.value;
  //   }
  //   return options.value.filter(option =>
  //     option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  //   );
  // });
  // 过滤选项
  // 过滤选项
  const filterOptions = () => {
    if (!searchQuery.value) {
      filteredOptions.value = options.value;
    } else {
      const filtered = options.value.filter(option =>
        option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
  
      if (filtered.length === 0) {
        filteredOptions.value = [{ value: 'no-matches-found', label: '无数据', isPlaceholder: true }];
      } else {
        filteredOptions.value = filtered;
      }
    }
  };
  
  // 当下拉框显示时，进行过滤操作
  const handleVisibleChange = (isVisible: boolean) => {
    if (isVisible) {
      filterOptions();
    }
  };

  const handleCountryChange = (value: any) => {
    console.log('Selected country changed:', value)
    searchClickType.value = false
  }


  // 获取国家列表并设置到 options
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

  // const handleSearch = () => {
  //   if (selectedCountry.value) {
  //     tableData.value = rawData.value.filter(item => item.country === selectedCountry.value)
  //   } else {
  //     tableData.value = [...rawData.value]
  //   }
  // }

  const totalItems = ref(0);

  const handleSearch = async () => {
    searchClickType.value = true
    if (selectedCountry.value) {
      const pageId = currentPage4.value
      const pageSize = pageSize4.value
      const Country = selectedCountry.value
  
      try {
        const response = await getEndCustomerList(pageId, pageSize, Country);
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
  
        console.log(tableData.value)
      } catch (err) {
        console.error('Failed to fetch account details:', err);
      }
    } else {
      const pageId = currentPage4.value
      const pageSize = pageSize4.value
      const Country = selectedCountry.value
  
      try {
        const response = await getEndCustomerList(pageId, pageSize, Country);
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
  
        console.log(tableData.value)
      } catch (err) {
        console.error('Failed to fetch account details:', err);
      }
    }
  }

  const resetClick = async () => {
    selectedCountry.value = ''
    const pageId = currentPage4.value
    const pageSize = pageSize4.value
    const Country = selectedCountry.value

    try {
      const response = await getEndCustomerList(pageId, pageSize, Country);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)

      const dataList = response.data.list;
      totalItems.value = response.data.total;

      const convertedData = convertCountryToChinese(dataList);

      tableData.value = convertedData

      console.log(tableData.value)
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }
  }

  const exportToExcel = () => {
    const headerMap = {
      country: '国家',
      city: '地区',
      name: '终端客户名称',
      email: '邮箱地址',
      device_num: '购入设备数',
      distributor: '购入渠道',
    };

    const dataWithChineseHeaders = tableData.value.map((item) => {
      return {
        [headerMap.country]: item.country,
        [headerMap.city]: item.city,
        [headerMap.name]: item.name,
        [headerMap.email]: item.email,
        [headerMap.device_num]: item.device_num,
        [headerMap.distributor]: item.distributor,
      };
    });

    const ws = utils.json_to_sheet(dataWithChineseHeaders)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Sheet1')
    writeFile(wb, '客户数据.xlsx')
  }

  // import type { ElSelect } from 'element-plus';

  // const countrySelect = ref<InstanceType<typeof ElSelect> | null>(null);

  //   const openDropdown = () => {
  //     nextTick(() => {
  //       if (countrySelect.value) {
  //         countrySelect.value.toggleMenu();
  //       }
  //     });
  //   }
  
  // const handleFocus = () => {
  //   openDropdown();
  // };
  
  // const handleClick1 = () => {
  //   openDropdown();
  // };

  import { useRegisterApi } from '~/composables/user';
  const { getEndCustomerList, getCountriesList } = useRegisterApi();

  
  onMounted(async () => {
    const pageId = currentPage4.value
    const pageSize = pageSize4.value
    const Country = selectedCountry.value
    try {
      const response = await getEndCustomerList(pageId, pageSize, Country);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)

      const dataList = response.data.list;

      const convertedData = convertCountryToChinese(dataList);

      tableData.value = convertedData
      rawData.value = convertedData

      totalItems.value = response.data.total;

      console.log(tableData.value)
      console.log(rawData.value)

      // const countries: string[] = [...new Set(dataList.map((item: { country: string; }) => item.country))];

      const countrySet = new Set<string>(
        dataList.map((item: { country: string }) => item.country).filter((country: string) => country)
      );
      const countries: string[] = Array.from(countrySet);

      options.value = countries.map((country: string) => ({
        value: country,
        label: countryMap[country] || country
      }))
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }

    fetchCountriesList();
    // openDropdown();
    nextTick(() => {
      const dropdown = document.querySelector('.el-select-dropdown') as HTMLElement;
      if (dropdown) {
        dropdown.style.paddingLeft = '10px';
        dropdown.style.paddingRight = '10px';
      }
    });
  });

  const searchName = ref('/search_name.svg')
</script>

<template>
  <div class="client-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>终端客户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="client-box-first">
      <div class="search">
        <div class="flex justify-center items-center">
          <div class="country-box">
            <!-- <span class="country-search">国家</span> -->
            <el-select
              v-model="selectedCountry"
              placeholder="请选择国家"
              size="large"
              :filterable="true"
              @visible-change="handleVisibleChange"
              @change="handleCountryChange"
            >
              <el-input v-model="searchQuery" placeholder="搜索名称" @input="filterOptions">
                <template #prefix>
                  <img :src="searchName" alt="search-icon" class="search-icon"/>
                </template>
              </el-input>
              <el-option
                v-for="item in filteredOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-button class="searchButton" type="primary" @click="handleSearch">搜索</el-button>
            <el-button class="resetButton" @click="resetClick">重置</el-button>
            <el-button class="deriveButton" @click="exportToExcel">导出Excel</el-button>
          </div>
        </div>
      </div>
      <div class="tabel-box">
        <el-table
          :data="paginatedData"
          border
          style="width: 100%;"
          @sort-change="handleSortChange"
        >
          <el-table-column type="index" label="序号" width="74" />
          <el-table-column prop="country" label="国家" width="105">
            <template #default="{ row, column, $index }">
              <span>{{ row.country !== '' ? row.country : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="city" label="地区" width="153">
            <template #default="{ row, column, $index }">
              <span>{{ row.city !== '' ? row.city : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="终端客户名称" width="414">
            <template #default="{ row, column, $index }">
              <span>{{ row.name !== '' ? row.name : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱地址" width="250">
            <template #default="{ row, column, $index }">
              <span>{{ row.email !== '' ? row.email : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="device_num" label="购入设备数" sortable width="205">
            <template #default="{ row, column, $index }">
              <span>{{ row.device_num !== '' ? row.device_num : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="distributor" label="购入渠道" width="377">
            <template #default="{ row, column, $index }">
              <span>{{ row.distributor !== '' ? row.distributor : '—' }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="137">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleClick(scope.row)" class="examineButton">
                查看客户详情
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
    // height: calc(100vh - 5.5rem);
  }

  :deep(.el-table .cell) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .paginate {
    margin-top: 15px;
  }

  .search {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
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

  .country-box {
    margin-right: 20px;
  }

  .el-breadcrumb {
    margin-bottom: 2.5rem;
  }

  :deep(.el-breadcrumb) {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    border-left: 0.1875rem solid rgb(0, 160, 233);
    padding-left: 0.5rem;
  }

  .client-box-first {
    background: rgb(255, 255, 255);
    border-radius: 1.25rem;
    padding: 2rem;
  }

  .el-select {
    width: 17.5rem;
    border-radius: 0.5rem;
  }

  :deep(.el-select--large .el-select__wrapper) {
    min-height: 2.6875rem;
    background: rgb(245, 245, 245);
  }

  :deep(.el-select__placeholder.is-transparent span) {
    color: rgb(129, 129, 129);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  .el-button {
    width: 5rem;
    height: 2.6875rem;
    border-radius: 0.5rem;
  }

  .searchButton {
    background: rgb(0, 160, 233);
  }

  .deriveButton {
    width: 7.375rem;
  }

  :deep(.searchButton>span) {
    color: rgb(255, 255, 255);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  :deep(.resetButton>span) {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  :deep(.deriveButton>span) {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  :deep(.el-table thead) {
    height: 3.75rem;
  }

  :deep(.el-table th.el-table__cell) {
    background: rgb(252, 252, 252);
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.3125rem;
  }

  :deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
    height: 3.1875rem;
    color: rgb(84, 84, 84);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  :deep(.examineButton>span) {
    color: rgb(0, 160, 233);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  // :deep(.el-input__wrapper) {
  //   height: 40px;
  //   background: rgb(245, 245, 245);
  //   border-radius: 8px;
  //   margin-bottom: 8px;
  // }

  .search-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.25rem;
  }

  // @media (min-width: 911px) and (max-width: 1287px) {

  // }
</style>