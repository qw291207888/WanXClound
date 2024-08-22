<script lang="ts" setup>
  definePageMeta({
    layout: 'emergency',
    middleware: 'auth'
  })

  const handleClick = () => {
    console.log('click')
  }

  interface TableData {
    country: string;
    region: string;
    endCustomerName: string;
    emailAddress: string;
    numberOfDevices: number;
    channel: string;
  }
  
  const initialTableData: TableData[] = [
    {
      country: '土耳其',
      region: '伊斯坦布尔',
      endCustomerName: '土耳其XXX珠宝设计工作室',
      emailAddress: '2912078565@qq.com',
      numberOfDevices: 5,
      channel: '经销商A',
    },
    {
      country: '泰国',
      region: '清迈',
      endCustomerName: '泰国XXX珠宝品牌公司',
      emailAddress: '2912078565@qq.com',
      numberOfDevices: 4,
      channel: '经销商B',
    },
    {
      country: '英国',
      region: '伦敦',
      endCustomerName: '客户名称3',
      emailAddress: '2912078565@qq.com',
      numberOfDevices: 6,
      channel: '经销商A',
    },
    {
      country: '美国',
      region: '佛罗里达',
      endCustomerName: '客户名称4',
      emailAddress: '2912078565@qq.com',
      numberOfDevices: 7,
      channel: '经销商B',
    },
    {
      country: '法国',
      region: '意大利',
      endCustomerName: '客户名称5',
      emailAddress: '2912078565@qq.com',
      numberOfDevices: 8,
      channel: '经销商A',
    },
    {
      country: '西班牙',
      region: '马德里',
      endCustomerName: '客户名称6',
      emailAddress: '2912078565@qq.com',
      numberOfDevices: 10,
      channel: '经销商B',
    },
    {
      country: '中国',
      region: '香港',
      endCustomerName: '客户名称7',
      emailAddress: '2912078565@qq.com',
      numberOfDevices: 11,
      channel: '经销商A',
    },
    {
      country: '中国',
      region: '台湾',
      endCustomerName: '客户名称8',
      emailAddress: '2912078565@qq.com',
      numberOfDevices: 14,
      channel: '销售员B',
    },
  ]

  const tableData = ref([...initialTableData])
  const rawData = ref([...initialTableData]) 

  import { ref, computed, watch, nextTick, onMounted  } from 'vue'
  import type { ComponentSize } from 'element-plus'
  import { utils, writeFile } from 'xlsx'

  const currentPage4 = ref(1)
  const pageSize4 = ref(5)
  const size = ref<ComponentSize>('default')
  const background = ref(false)
  const disabled = ref(false)

  const paginatedData = computed(() => {
    const start = (currentPage4.value - 1) * pageSize4.value
    const end = start + pageSize4.value
    return tableData.value.slice(start, end)
  })

  watch(tableData, () => {
    currentPage4.value = 1
  })

  const handleSizeChange = (val: number) => {
    pageSize4.value = val
    currentPage4.value = 1
    console.log(`${val} items per page`)
  }
  const handleCurrentChange = (val: number) => {
    currentPage4.value = val
    console.log(`current page: ${val}`)
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
  
  const options = [
    {
      value: '土耳其',
      label: '土耳其',
    },
    {
      value: '泰国',
      label: '泰国',
    },
    {
      value: '英国',
      label: '英国',
    },
    {
      value: '美国',
      label: '美国',
    },
    {
      value: '法国',
      label: '法国',
    },
    {
      value: '西班牙',
      label: '西班牙',
    },
    {
      value: '中国',
      label: '中国',
    }
  ]

  const handleSearch = () => {
    if (selectedCountry.value) {
      tableData.value = rawData.value.filter(item => item.country === selectedCountry.value)
    } else {
      tableData.value = [...rawData.value]
    }
  }

  const exportToExcel = () => {
    const headerMap = {
      country: '国家',
      region: '地区',
      endCustomerName: '终端客户名称',
      emailAddress: '邮箱地址',
      numberOfDevices: '购入设备数',
      channel: '购入渠道',
    };

    const dataWithChineseHeaders = tableData.value.map((item) => {
      return {
        [headerMap.country]: item.country,
        [headerMap.region]: item.region,
        [headerMap.endCustomerName]: item.endCustomerName,
        [headerMap.emailAddress]: item.emailAddress,
        [headerMap.numberOfDevices]: item.numberOfDevices,
        [headerMap.channel]: item.channel,
      };
    });

    const ws = utils.json_to_sheet(dataWithChineseHeaders)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Sheet1')
    writeFile(wb, '客户数据.xlsx')
  }

  const imgEventTotalPolyline = ref('/event_total_polyline.png')

  const imgGoodsFleeing = ref('/goodsFleeing.png')

  const imgUsePseudoNumbers = ref('/use_pseudo_numbers.png')

  import type { TabsPaneContext } from 'element-plus'

  const activeName = ref('1')
  
  const handleClick7 = (tab: TabsPaneContext, event: Event) => {
    const tabName = tab.props.name ?? '';
    console.log(tabName);
    activeName.value = String(tabName);
    console.log(activeName.value);
    fetchLatestPendingProcessing()
  }

  const handleClickOne = () => {
    console.log('click')
  }
  
  const tableDataOne = ref([])

  const tableDataTwo = ref([])

  const tableDataThree = ref([])

  const tableDataFour = ref([])

  import ChartComponentShi from '~/components/ChartComponentShi.vue';

  import ChartComponentHyu from '~/components/ChartComponentHyu.vue';

  import ChartComponentHyuOne from '~/components/ChartComponentHyuOne.vue';

  import ChartComponentHyuTwo from '~/components/ChartComponentHyuTwo.vue';

  import ChartComponentHyuThree from '~/components/ChartComponentHyuThree.vue';

  interface ChartComponent {
    chartInstance: any;
  }

  const activeNameOne = ref('1')

  const chartComponentHyu = ref<ChartComponent | null>(null);
  const chartComponentHyuOne = ref<ChartComponent | null>(null);
  const chartComponentHyuTwo = ref<ChartComponent | null>(null);
  const chartComponentHyuThree = ref<ChartComponent | null>(null);

  // const handleClickTwo = (tab: TabsPaneContext, event: Event) => {
  //   console.log(tab, event)
  // }
  const handleClickTwo = (tab: TabsPaneContext, event: Event) => {
    const tabName = tab.props.name ?? '';
    console.log(tabName);
    activeNameOne.value = String(tabName);
    console.log(activeNameOne.value);
    fetchAlarmTrend()
    // await nextTick(); // 等待 DOM 更新
    // const chartRefs: Record<string, typeof chartComponentHyu> = {
    //   first: chartComponentHyu,
    //   second: chartComponentHyuOne,
    //   third: chartComponentHyuTwo,
    //   fourth: chartComponentHyuThree
    // };
  
    // const currentChartRef = chartRefs[activeNameOne.value as keyof typeof chartRefs];
    // if (currentChartRef.value?.chartInstance) {
    //   currentChartRef.value.chartInstance.resize(); // 调整图表尺寸
    // }
  };

  import { useRegisterApi } from '~/composables/user';
  const { getAlarmStatistics, getLatestPendingProcessing, getAlarmTrend } = useRegisterApi();

  const eventTotal = ref('0')
  const equipmentFaultTree = ref('0')
  const equipmentChanneling = ref('0')
  const waxMaterials = ref('0')
  const waxPseudo = ref('0')

  const quarterlyStatistics = ref({
    // 设备窜货
    equipmentChanneling: '',
    // 蜡材窜货
    waxMaterialFleeingGoods: '',
    // 蜡材用伪
    waxPseudo: '',
    // 设备故障
    equipmentFailure: '',
    age: '',
    quarter: ''
  })


  const fetchAlarmStatistics = async () => {
      try {
        const response = await getAlarmStatistics();
        console.log('User account details fetched successfully:', response);
        console.log(response.data)
        if (response.data.stats_24h.list !== null) {
          eventTotal.value = response.data.stats_24h.total
          response.data.stats_24h.list.map((item: any) => {
            if (item.type === 1) {
              equipmentFaultTree.value = item.num
            } else if (item.type === 2) {
              equipmentChanneling.value = item.num
            } else if (item.type === 3) {
              waxMaterials.value = item.num
            } else if (item.type === 4) {
              waxPseudo.value = item.num
            }
          })
        }

        if (response.data.stats_quarter.list !== null) {
          quarterlyStatistics.value.age = response.data.stats_quarter.year
          quarterlyStatistics.value.quarter = response.data.stats_quarter.quarter
          response.data.stats_quarter.list.map((item: any) => {
            if (item.type === 1) {
              quarterlyStatistics.value.equipmentFailure = item.num
            } else if (item.type === 2) {
              quarterlyStatistics.value.equipmentChanneling = item .num
            } else if (item.type === 3) {
              quarterlyStatistics.value.waxMaterialFleeingGoods = item .num
            } else if (item.type === 4) {
              quarterlyStatistics.value.waxPseudo = item .num
            }
          })
          console.log(quarterlyStatistics.value)
        }
      } catch (err) {
        console.error('Failed to fetch account details:', err);
        throw err; // 如果需要，可以重新抛出错误
      }
    };

    interface ItemType {
      create_at: number;
      reason: string;
      device_model: string;
      device_sn: string;
      device_mac: string;
      device_status: 0 | 1 | 2 | 3;  // 显式声明可能的状态值
      customer: string;
    }

    const processingDate = ref('')

    // 时间格式化函数
   const formatTimestamp = (timestamp: number) => {
     const date = new Date(timestamp * 1000);
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     const hours = String(date.getHours()).padStart(2, '0');
     const minutes = String(date.getMinutes()).padStart(2, '0');
     const seconds = String(date.getSeconds()).padStart(2, '0');
     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
   };

   const deviceStatusMap: { [key in ItemType['device_status']]: string } = {
     0: '正常',
     1: '待机',
     2: '异常',
     3: '脱机'
   };

    const fetchLatestPendingProcessing = async () => {
      const type = Number(activeName.value)
      try {
        const response = await getLatestPendingProcessing(type);
        console.log('User account details fetched successfully:', response);
        console.log(response.data.date)
        processingDate.value = response.data.date

        if (type === 1) {
          if (response.data.list.length === 0) {
            tableDataOne.value = []
          } else if (response.data.length !== 0) {
            tableDataOne.value = response.data.list.map((item: ItemType) => ({
              faultReportingTime: formatTimestamp(item.create_at),
              alarmCause: item.reason,
              equipmentType: item.device_model,
              equipmentSN: item.device_sn,
              deviceMAC: item.device_mac,
              deviceStatus: deviceStatusMap[item.device_status] || '',
              associatedEndCustomer: item.customer
            }))
          }
        } else if (type === 2) {
          if (response.data.list.length === 0) {
            tableDataTwo.value = []
          } else if (response.data.length !== 0) {
            tableDataTwo.value = response.data.list.map((item: { create_at: number; device_model: any; device_sn: any; device_mac: any; ip: any; ip_location: any; country: any; distributor: any; }) => ({
              faultReportingTime: formatTimestamp(item.create_at),
              alarmCause: item.device_model,
              equipmentType: item.device_sn,
              equipmentSN: item.device_mac,
              deviceMAC: item.ip,
              deviceStatus: item.ip_location,
              associatedEndCustomer: item.country,
              associatedEndCustomer1: item.distributor
            }))
          }
        } else if (type === 3) {
          if (response.data.list.length === 0) {
            tableDataThree.value = []
          } else if (response.data.length !== 0) {
            tableDataThree.value = response.data.list.map((item: { create_at: number; card_uid: any; device_model: any; device_sn: any; device_mac: any; ip: any; ip_location: any; country: any; distributor: any; }) => ({
              faultReportingTime: formatTimestamp(item.create_at),
              alarmCause: item.card_uid,
              equipmentType: item.device_model,
              equipmentSN: item.device_sn,
              deviceMAC: item.device_mac,
              deviceStatus: item.ip,
              associatedEndCustomer: item.ip_location,
              deviceStatus1: item.country,
              associatedEndCustomer1: item.distributor
            }))
          }
        } else if (type === 4) {
          if (response.data.list.length === 0) {
            tableDataFour.value = []
          } else if (response.data.length !== 0) {
            tableDataFour.value = response.data.list.map((item: { create_at: number; card_uid: any; device_model: any; device_sn: any; device_mac: any; distributor: any; customer: any; }) => ({
              faultReportingTime1: formatTimestamp(item.create_at),
              alarmCause1: item.card_uid,
              equipmentType1: item.device_model,
              equipmentSN1: item.device_sn,
              deviceMAC1: item.device_mac,
              deviceStatus1: item.distributor,
              associatedEndCustomer1: item.customer
            }))
          }
        }
      } catch (err) {
        console.error('Failed to fetch account details:', err);
        throw err; // 如果需要，可以重新抛出错误
      }
    };

    const trendAnalysis1 = ref({
      num: [],
      date: []
    })

    const trendAnalysis2 = ref({
      num: [],
      date: []
    })

    const trendAnalysis3 = ref({
      num: [],
      date: []
    })

    const trendAnalysis4 = ref({
      num: [],
      date: []
    })

    interface ListItem {
      num: number;
      date: string;
    }

    const fetchAlarmTrend = async () => {
      const type = Number(activeNameOne.value)

      const date = dateValue.value ? dateValue.value.toString() : ''
      try {
        const response = await getAlarmTrend(type, date);
        console.log('User account details fetched successfully:', response);
        if(response.code === 0) {
          if (response.data.list !== null) {
            if (type === 1) {
              trendAnalysis1.value.num = []
              trendAnalysis1.value.date = []
              response.data.list.map((item: ListItem) => {
                trendAnalysis1.value.num.push(item.num)
                trendAnalysis1.value.date.push(item.date)
              })
  
              console.log(trendAnalysis1.value)
            } else if (type === 2) {
              trendAnalysis2.value.num = []
              trendAnalysis2.value.date = []
              response.data.list.map((item: ListItem) => {
                trendAnalysis2.value.num.push(item.num)
                trendAnalysis2.value.date.push(item.date)
              })
  
              console.log(trendAnalysis2.value)
            } else if (type === 3) {
              trendAnalysis3.value.num = []
              trendAnalysis3.value.date = []
              response.data.list.map((item: ListItem) => {
                trendAnalysis3.value.num.push(item.num)
                trendAnalysis3.value.date.push(item.date)
              })
  
              console.log(trendAnalysis3.value)
            } else if (type === 4) {
              trendAnalysis4.value.num = []
              trendAnalysis4.value.date = []
              response.data.list.map((item: ListItem) => {
                trendAnalysis4.value.num.push(item.num)
                trendAnalysis4.value.date.push(item.date)
              })
  
              console.log(trendAnalysis4.value)
            }
          } else if (response.data.list === null) {
            if (type === 1) {
              trendAnalysis1.value.num = []
              trendAnalysis1.value.date = []
  
              console.log(trendAnalysis1.value)
            } else if (type === 2) {
              trendAnalysis2.value.num = []
              trendAnalysis2.value.date = []
            } else if (type === 3) {
              trendAnalysis3.value.num = []
              trendAnalysis3.value.date = []
            } else if (type === 4) {
              trendAnalysis4.value.num = []
              trendAnalysis4.value.date = []
  
              console.log(trendAnalysis4.value)
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch account details:', err);
        throw err; // 如果需要，可以重新抛出错误
      }
    };

    const dateValue = ref<Date | null>(null);

    watch(dateValue, (newValue) => {
      console.log('选择的日期:', newValue);
      if (newValue === null) {
        trendAnalysis1.value.num = []
        trendAnalysis1.value.date = []

        trendAnalysis2.value.num = []
        trendAnalysis2.value.date = []

        trendAnalysis3.value.num = []
        trendAnalysis3.value.date = []

        trendAnalysis4.value.num = []
        trendAnalysis4.value.date = []
      }
      fetchAlarmTrend()
    });

  onMounted(() => {
    fetchAlarmStatistics()
    fetchLatestPendingProcessing()
    fetchAlarmTrend()
  })
</script>

<template>
  <div class="client-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>告警中心</el-breadcrumb-item>
      <el-breadcrumb-item>告警统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex justify-between" style="margin-bottom: 30px;">
      <div class="eventTotal flex justify-center items-center">
        <div>
          <div class="eventTitle">24h告警事件总计</div>
          <div class="flex gap-4">
            <div class="eventTitleNumber">{{eventTotal}}</div>
            <div>
              <el-image :src="imgEventTotalPolyline" style="width: 126px;height: 46px;" />
            </div>
          </div>
        </div>
      </div>
      <div class="eventTotal flex justify-center items-center">
        <div>
          <div class="eventTitle">24h设备&蜡材窜货数</div>
          <div class="flex gap-4">
            <div class="eventTitleNumber">{{ Number(equipmentChanneling) + Number(waxMaterials) }}</div>
            <div>
              <el-image :src="imgGoodsFleeing" style="width: 126px;height: 46px;" />
            </div>
          </div>
        </div>
      </div>
      <div class="eventTotal flex justify-center items-center">
        <div>
          <div class="eventTitle">24h蜡材用伪数</div>
          <div class="flex gap-4">
            <div class="eventTitleNumber">{{ waxPseudo }}</div>
            <div>
              <el-image :src="imgUsePseudoNumbers" style="width: 126px;height: 46px;" />
            </div>
          </div>
        </div>
      </div>
      <div class="eventTotal flex justify-center items-center">
        <div>
          <div class="eventTitle">24h设备故障数</div>
          <div class="flex gap-4">
            <div class="eventTitleNumber">{{ equipmentFaultTree }}</div>
            <div>
              <el-image :src="imgUsePseudoNumbers" style="width: 126px;height: 46px;" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="alarmEvent" style="margin-bottom: 30px;">
      <div>{{ processingDate }} 最新待处理告警事件：</div>
      <div>
        <el-tabs
          v-model="activeName"
          type="card"
          class="demo-tabs"
          @tab-click="handleClick7"
        >
          <el-tab-pane label="设备故障" name="1">
            <el-table :data="tableDataOne" border style="width: 100%;" max-height="250">
              <el-table-column prop="faultReportingTime" label="故障上报时间" width="229" />
              <el-table-column prop="alarmCause" label="告警原因" width="189" />
              <el-table-column prop="equipmentType" label="设备型号" width="189" />
              <el-table-column prop="equipmentSN" label="设备SN" width="192" />
              <el-table-column prop="deviceMAC" label="设备MAC" width="192" />
              <el-table-column prop="deviceStatus" label="设备状态" width="157" />
              <el-table-column prop="associatedEndCustomer" label="关联终端客户" width="193" />
              <el-table-column fixed="right" label="操作" min-width="120">
                <template #default>
                  <el-button link type="primary" size="small" @click="handleClickOne">
                    查看告警详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="设备窜货" name="2">
            <el-table :data="tableDataTwo" border style="width: 100%;" max-height="250">
              <el-table-column prop="faultReportingTime" label="设备窜货上报时间" width="229" />
              <el-table-column prop="alarmCause" label="设备型号" width="189" />
              <el-table-column prop="equipmentType" label="设备SN" width="189" />
              <el-table-column prop="equipmentSN" label="设备MAC" width="192" />
              <el-table-column prop="deviceMAC" label="当前IP地址" width="192" />
              <el-table-column prop="deviceStatus" label="IP所在区域" width="157" />
              <el-table-column prop="associatedEndCustomer" label="销售区域" width="193" />
              <el-table-column prop="associatedEndCustomer1" label="关联经销商" width="193" />
              <el-table-column fixed="right" label="操作" min-width="120">
                <template #default>
                  <el-button link type="primary" size="small" @click="handleClickOne">
                    查看告警详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="蜡材窜货" name="3">
            <el-table :data="tableDataThree" border style="width: 100%;" max-height="250">
              <el-table-column prop="faultReportingTime" label="蜡材窜货上报时间" width="229" />
              <el-table-column prop="alarmCause" label="蜡材UID" width="189" />
              <el-table-column prop="equipmentType" label="设备型号" width="189" />
              <el-table-column prop="equipmentSN" label="设备SN" width="192" />
              <el-table-column prop="deviceMAC" label="设备MAC" width="192" />
              <el-table-column prop="deviceStatus" label="当前IP地址" width="157" />
              <el-table-column prop="associatedEndCustomer" label="IP所在区域" width="193" />
              <el-table-column prop="deviceStatus1" label="销售区域" width="157" />
              <el-table-column prop="associatedEndCustomer1" label="关联经销商" width="193" />
              <el-table-column fixed="right" label="操作" min-width="120">
                <template #default>
                  <el-button link type="primary" size="small" @click="handleClickOne">
                    查看告警详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="蜡材用伪" name="4">
            <el-table :data="tableDataFour" border style="width: 100%;" max-height="250">
              <el-table-column prop="faultReportingTime1" label="蜡材用伪上报时间" width="229" />
              <el-table-column prop="alarmCause1" label="蜡材UID" width="189" />
              <el-table-column prop="equipmentType1" label="关联设备型号" width="189" />
              <el-table-column prop="equipmentSN1" label="关联设备SN" width="192" />
              <el-table-column prop="deviceMAC1" label="关联设备MAC" width="192" />
              <el-table-column prop="deviceStatus1" label="关联经销商" width="157" />
              <el-table-column prop="associatedEndCustomer1" label="关联终端客户" width="193" />
              <el-table-column fixed="right" label="操作" min-width="120">
                <template #default>
                  <el-button link type="primary" size="small" @click="handleClickOne">
                    查看告警详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="flex gap-3" style="padding-bottom: 20px;">
      <div class="quarterlyStatistics">
        <ChartComponentShi :quarterlyStatistics="quarterlyStatistics" />
      </div>
      <div class="trendAnalysis flex justify-center items-center flex-1">
        <div style="width: 100%; position: relative;">
          <div class="alarmTrend">告警趋势分析：</div>
          <el-tabs
            v-model="activeNameOne"
            type="card"
            class="demo-tabs"
            @tab-click="handleClickTwo"
            style="width: 100%;"
          >
            <el-tab-pane label="设备故障" name="1">
              <ChartComponentHyu ref="chartComponentHyu" :trendAnalysis1="trendAnalysis1" />
            </el-tab-pane>
            <el-tab-pane label="设备窜货" name="2">
              <ChartComponentHyuOne ref="chartComponentHyuOne" :trendAnalysis2="trendAnalysis2" />
            </el-tab-pane>
            <el-tab-pane label="蜡材窜货" name="3">
              <ChartComponentHyuTwo ref="chartComponentHyuTwo" :trendAnalysis3="trendAnalysis3" />
            </el-tab-pane>
            <el-tab-pane label="蜡材用伪" name="4">
              <ChartComponentHyuThree ref="chartComponentHyuThree" :trendAnalysis4="trendAnalysis4" />
            </el-tab-pane>
          </el-tabs>
          <div class="dateSelector">
            <el-date-picker
              v-model="dateValue"
              type="month"
              placeholder="选择年月"
              format="YYYY年MM月"
              value-format="YYYY-MM"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="search">
      <div class="flex justify-center items-center">
        <div class="country-box">
          <span class="country-search">国家</span>
          <el-select
            v-model="selectedCountry"
            placeholder="请选择"
            size="large"
            style="width: 225px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="() => { selectedCountry = ''; handleSearch(); }">重置</el-button>
          <el-button @click="exportToExcel">导出Excel</el-button>
        </div>
      </div>
    </div>
    <div class="tabel-box">
      <el-table
        :data="paginatedData"
        border
        style="width: 100%"
        @sort-change="handleSortChange"
      >
        <el-table-column type="index" label="序号" width="74" />
        <el-table-column prop="country" label="国家" width="105" />
        <el-table-column prop="region" label="地区" width="153" />
        <el-table-column prop="endCustomerName" label="终端客户名称" width="414" />
        <el-table-column prop="emailAddress" label="邮箱地址" width="205" />
        <el-table-column prop="numberOfDevices" label="购入设备数" sortable width="205" />
        <el-table-column prop="channel" label="购入渠道" width="377" />
        <el-table-column fixed="right" label="操作" min-width="137">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick">
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
          :total="tableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
  .trendAnalysis {
    border: 1px solid rgba(215, 215, 215, 1);
    padding: 10px;
  }

  .quarterlyStatistics {
    border: 1px solid rgba(215, 215, 215, 1);
    padding: 10px;
  }

  .alarmEvent {
    padding: 20px 30px 20px 30px;
  }

  :deep(.el-tabs--card>.el-tabs__header) {
    display: flex;
    justify-content: end;
    border-bottom: none;
  }

  :deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
    border-bottom: 1px solid var(--el-border-color-light);
  }

  .alarmEvent {
    border: 1px solid rgba(215, 215, 215, 1);
    border-radius: 8px;
    box-sizing: border-box;
    background: inherit;
  }

  .eventTitleNumber {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 36px;
    color: #F59A23;
  }

  .eventTitle {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: #000000;
  }

  .eventTotal {
    border: 1px solid rgba(242, 242, 242, 1);
    border-radius: 13px;
    box-sizing: border-box;
    background: inherit;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
    height: 119px;
    width: 282px;
  }

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
    padding: 15px;
    height: calc(100vh - 60px);
  }

  :deep(.el-table .cell) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tabel-box {
    border: 1px solid #333333;
    padding: 20px 10px 30px 10px;
    border-radius: 10px;
  }

  .paginate {
    margin-top: 15px;
  }

  .search {
    display: flex;
    align-items: center;
    border: 1px solid #333333;
    border-radius: 10px;
    height: 109px;
    padding-left: 20px;
    margin-bottom: 20px;
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
    margin-bottom: 20px;
  }

  .alarmTrend {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    position: relative;
    top: 20px;
  }

  :deep(.trendAnalysis .el-tabs--card>.el-tabs__header) {
    justify-content: center;
  }

  .dateSelector {
    position: absolute;
    top: 35px;
    right: 20px;
  }

  :deep(.el-date-editor.el-input) {
    width: 130px !important;
  }
</style>