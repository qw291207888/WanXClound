<script lang="ts" setup>
  definePageMeta({
    layout: 'equipment',
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

  import { ref, computed, watch, onMounted } from 'vue'
  import type { ComponentSize } from 'element-plus'
  import { utils, writeFile } from 'xlsx'

  import ChartComponentFive from '~/components/ChartComponentFive.vue';
  import ChartComponentSix from '~/components/ChartComponentSix.vue';
  import ChartComponentEvent from '~/components/ChartComponentEvent.vue';
  import ChartComponentSeven from '~/components/ChartComponentSeven.vue';

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

  const imgEquipment = ref('')
  const imgTick = ref('')

  const tableData5 = ref([])

  const tableData6 = ref([])

  const imgXLD = ref('/xiaolvdian.png')

  const handleClick8 = () => {
    console.log('click')
  }
  
  const tableData8 = ref([])

  import { useRegisterApi } from '~/composables/user';
  const { getEquipmentDetail, getAlarmFrequency, getJobPrinting, getWaxConsumption, getEquipmentHistory } = useRegisterApi();

  import { useRoute } from '#app';

  const route = useRoute();
  console.log(route.query.deviceSn)

  const modelName = ref('')
  const modelMAC = ref('')
  const modelSN = ref('')
  const modelIP = ref('')
  const modelLocation = ref('')
  const productionTime = ref('')
  const modelStatus = ref('')
  const modelStartTime = ref('')
  const modelEndTime = ref('')

  const softwareVersion = ref('')
  const softwareReleaseDate = ref('')
  const deviceStatus = ref('')
  const deviceColor = ref('');
  const isActive1 = ref(false)
  const isActive2 = ref(false)
  const isActive3 = ref(false)
  const isActive4 = ref(false)
  const isActive7 = ref(false)
  const isActive8 = ref(false)
  const isActive9 = ref(false)
  const isActive10 = ref(false)
  const isActive11 = ref(false)
  const isActive12 = ref(false)

  const iPStatus = ref('')

  const salesOrderNumber = ref('')
  const salesman = ref('')
  const customerName = ref('')
  const outboundTime = ref('')
  const outboundOrderNumber = ref('')

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从 0 开始，需要加 1，并确保是两位数
    const day = date.getDate().toString().padStart(2, '0'); // 确保是两位数
    return `${year}-${month}-${day}`;
  }

  const fetchEquipmentDetail = async () => {
    const deviceSn = route.query.deviceSn
    console.log(deviceSn)
    try {
      const response = await getEquipmentDetail(deviceSn);
      console.log('User account details fetched successfully:', response);
      console.log(response.data)
      modelName.value = response.data.base.model
      modelMAC.value = response.data.base.mac
      modelSN.value = response.data.base.sn
      modelIP.value = response.data.base.ip
      modelLocation.value = response.data.base.ip_location
      productionTime.value = formatDate(response.data.base.production_time)
      modelStatus.value = response.data.base.activation_status === 1 ? '已激活' : '未激活'
      modelStartTime.value = formatDate(response.data.base.maintenance_date.start_at)
      modelEndTime.value = formatDate(response.data.base.maintenance_date.end_at)
      softwareVersion.value = response.data.base.software_version
      if (response.data.base.software_release_date !== '') {
        softwareReleaseDate.value = formatDate(response.data.base.software_release_date)
      }

      if (response.data.status === 0) {
        deviceStatus.value = '工作中：正在打印'
        isActive1.value = true
        isActive2.value = false
        isActive3.value = false
        isActive4.value = false

        isActive7.value = true
        isActive8.value = false
        isActive9.value = false
        isActive10.value = false
      } else if (response.data.status === 1) {
        deviceStatus.value = '待机：设备空闲'
        isActive1.value = false
        isActive2.value = true
        isActive3.value = false
        isActive4.value = false

        isActive7.value = false
        isActive8.value = true
        isActive9.value = false
        isActive10.value = false
      } else if (response.data.status === 2) {
        deviceStatus.value = '故障告警：处理中，设备已停用'
        isActive1.value = false
        isActive2.value = false
        isActive3.value = true
        isActive4.value = false

        isActive7.value = false
        isActive8.value = false
        isActive9.value = true
        isActive10.value = false
      } else if (response.data.status === 3) {
        deviceStatus.value = '脱机：设备未联网'
        isActive1.value = false
        isActive2.value = false
        isActive3.value = false
        isActive4.value = true

        isActive7.value = false
        isActive8.value = false
        isActive9.value = false
        isActive10.value = true
      }

      if (response.data.base.ip_status === 0) {
        iPStatus.value = 'IP异常'
        isActive12.value = true
        isActive11.value = false
        imgTick.value = '/tick-icon.png'
      } else if (response.data.base.ip_status === 1) {
        iPStatus.value = 'IP正常'
        isActive11.value = true
        isActive12.value = false
        imgTick.value = '/tick.png'
      }

      salesOrderNumber.value = response.data.order.id.replace(/"/g, "")
      salesman.value = response.data.order.seller
      customerName.value = response.data.order.customer
      outboundTime.value = formatDate(response.data.order.out_depot_at)
      outboundOrderNumber.value = response.data.order.inventory_order_id
      imgEquipment.value = response.data.image
      tableData5.value = response.data.cards
      tableData6.value = response.data.parts
    } catch (err) {
      console.error('Failed to fetch account details:', err);
      throw err; // 如果需要，可以重新抛出错误
    }
  };

  const countryData1 = ref({
    supportWax: [],
    stateDate: []
  })

  const fetchAlarmFrequency = async () => {
    const deviceSn = route.query.deviceSn
    console.log(deviceSn)
    try {
      const response = await getAlarmFrequency(deviceSn);
      console.log('User account details fetched successfully:', response);
      if (response.data.list !== null) {
        countryData1.value.supportWax = [];
        countryData1.value.stateDate = [];

        response.data.list.map(item => {
          countryData1.value.supportWax.push(item.num);
          countryData1.value.stateDate.push(item.date)
        });
      }
    } catch (err) {
      console.error('Failed to fetch account details:', err);
      throw err; // 如果需要，可以重新抛出错误
    }
  };

  const jobCompletionRate = ref('')
  const totalRunningTime = ref('')

  const countryData2 = ref({
    completedNum: [],
    failedNum: [],
    cancelledNum: [],
    stateDate: []
  })

  const fetchJobPrinting = async () => {
    const deviceSn = route.query.deviceSn
    console.log(deviceSn)
    try {
      const response = await getJobPrinting(deviceSn);
      console.log('User account details fetched successfully:', response);

      jobCompletionRate.value = response.data.completion_7day
      totalRunningTime.value = (response.data.total_running_duration / 3600).toFixed(2)
   
      if (response.data.list !== null) {
        countryData2.value.completedNum = [];
        countryData2.value.failedNum = [];
        countryData2.value.cancelledNum = [];
        countryData2.value.stateDate = [];

        response.data.list.map(item => {
          countryData2.value.completedNum.push(item.completed_num);
          countryData2.value.failedNum.push(item.failed_num);
          countryData2.value.cancelledNum.push(item.cancelled_num);
          countryData2.value.stateDate.push(item.date);
        });
      }
    } catch (err) {
      console.error('Failed to fetch account details:', err);
      throw err; // 如果需要，可以重新抛出错误
    }
  };

  const getFormattedAvgCompletion = (value: string) => {
    const numValue = parseFloat(value); // 确保转换为数值类型
    if (isNaN(numValue)) return '0'; // 如果转换失败返回 '0'
    if (numValue === 0) {
      return '0';
    } else if (Number.isInteger(numValue)) {
      return numValue.toString();
    } else {
      return numValue.toFixed(2).replace(/\.?0+$/, '');
    }
  };

  const supportingWaxMaterial = ref('0')
  const supportingWaxMaterialDuration = ref('0')
  const structuralWax = ref('0')
  const structuralWaxDuration = ref('0')

  const countryData3 = ref({
    dateNum: [],
    dateNum2: [],
    stateDate: []
  })

  const fetchWaxConsumption = async () => {
    const deviceSn = route.query.deviceSn
    console.log(deviceSn)
    try {
      const response = await getWaxConsumption(deviceSn);
      console.log('User account details fetched successfully:', response);

      if (response.data.card_remain_list !== []) {
        response.data.card_remain_list.map(item => {
          if (item.class === 0) {
            supportingWaxMaterial.value = (item.num / 1000).toFixed(2)
            supportingWaxMaterialDuration.value = (item.duration / 3600).toFixed(2)
          } else if (item.class === 1) {
            structuralWax.value = (item.num / 1000).toFixed(2)
            structuralWaxDuration.value = (item.duration / 3600).toFixed(2)
          }
        })
      }
   
      if (response.data.list !== null) {
        countryData3.value.dateNum = [];
        countryData3.value.dateNum2 = [];
        countryData3.value.stateDate = [];

        response.data.list.map(item => {
          if (item.class === 0) {
            countryData3.value.dateNum2.push(item.num);
          } else if (item.class === 1) {
            countryData3.value.dateNum.push(item.num);
          }
          countryData3.value.stateDate.push(item.date);
        });
      }
    } catch (err) {
      console.error('Failed to fetch account details:', err);
      throw err; // 如果需要，可以重新抛出错误
    }
  };

  const fetchEquipmentHistory = async () => {
    const deviceSn = route.query.deviceSn
    console.log(deviceSn)
    try {
      const response = await getEquipmentHistory(deviceSn);
      console.log('User account details fetched successfully:', response);
      if (response.data.list === null) {
        tableData8.value = []
        return
      }
      tableData8.value = response.data.list
    } catch (err) {
      console.error('Failed to fetch account details:', err);
      throw err; // 如果需要，可以重新抛出错误
    }
  };

  const formatAlarmType = (row, column, value) => {
    switch (value) {
      case 1:
        return '设备故障';
      case 2:
        return '设备窜货';
      case 3:
        return '蜡材窜货';
      case 4:
        return '蜡材用伪';
      default:
        return '未知';
    }
  };

  onMounted(() => {
    fetchEquipmentDetail()
    fetchAlarmFrequency()
    fetchJobPrinting()
    fetchWaxConsumption()
    fetchEquipmentHistory()
  });
</script>

<template>
  <div class="client-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备信息概览</el-breadcrumb-item>
      <el-breadcrumb-item>设备详情信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="detail-box">
      <div class="flex justify-between items-center" style="margin-bottom: 40px;">
        <div class="flex items-center">
          <span class="deviceName">{{modelName}}</span> 
          <div class="flex items-center">
            <span class="smallDot" :class="[{ 'smallDotClass7': isActive7 }, { 'smallDotClass8': isActive8 }, { 'smallDotClass9': isActive9 }, { 'smallDotClass10': isActive10 }]"></span>
            <span class="smallDot-content" :class="[{ 'smallDotClass1': isActive1 }, { 'smallDotClass2': isActive2 }, { 'smallDotClass3': isActive3 }, { 'smallDotClass4': isActive4 }]">{{deviceStatus}}</span>
          </div>
        </div>
        <div>
          <el-button class="authorityManagement">设备及蜡材权限管理</el-button>
        </div>
      </div>
      <div class="flex justify-around">
        <div>
          <el-image :src="imgEquipment" style="width: 248px; height: 290px;" />
        </div>
        <div style="width: 70%;">
          <div class="basicInformation flex justify-around" style="margin-bottom: 40px;">
            <div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">设备型号：</span>
                <span class="type-content">{{modelName}}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">设备MAC：</span>
                <span class="type-content">{{modelMAC}}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">设备SN：</span>
                <span class="type-content">{{modelSN}}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span class="type-title" >设备IP：</span>
                <span class="type-content" >{{modelIP}}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">IP位置：</span>
                <span class="type-content">{{modelLocation}}</span>
              </div>
              <div class="flex items-center">
                <span class="type-title">IP状态：</span>
                <div class="flex items-center">
                  <el-image :src="imgTick" style="width: 20px; height: 20px;" />
                  <span class="iPIsNormal" :class="[{ 'iPIsNormal1': isActive11 }, { 'iPIsNormal2': isActive12 }]">{{iPStatus}}</span>
                </div>
              </div>
            </div>
            <div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">生产日期（入库时间）：</span>
                <span class="type-content">{{productionTime}}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">设备激活状态：</span>
                <span class="type-content">{{modelStatus}}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">维保日期：</span>
                <span class="type-content">{{modelStartTime}}至{{modelEndTime}}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">软件版本：</span>
                <span class="type-content">{{softwareVersion}}</span>
              </div>
              <div>
                <span class="type-title">软件发布日期：</span>
                <span class="type-content">{{softwareReleaseDate}}</span>
              </div>
            </div>
          </div>
          <div class="basicInformation basicInformation-one flex justify-around" style="margin-bottom: 40px;">
            <div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">销售订单号：</span>
                <span class="type-content">{{salesOrderNumber}}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">客户名称：</span>
                <span class="type-content">{{customerName}}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">出库订单号：</span>
                <span class="type-content">{{outboundOrderNumber}}</span>
              </div>
            </div>
            <div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">销售员：</span>
                <span class="type-content">{{salesman}}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <span class="type-title">出库时间：</span>
                <span class="type-content">{{outboundTime}}</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between" style="margin-bottom: 40px;">
            <div class="basicInformation basicInformation-one basicInformation-two flex justify-center items-center" style="width: 30%;">
              <el-table :data="tableData5" border style="width: 100%; height: 180px;">
                <el-table-column type="index" label="序号" />
                <el-table-column prop="card_model" label="蜡材类型" />
                <el-table-column prop="card_uid" label="蜡材UID" />
              </el-table>
            </div>
            <div class="basicInformation basicInformation-one basicInformation-three flex justify-center items-center" style="width: 65%;">
              <el-table :data="tableData6" border style="width: 100%; height: 220px;">
                <el-table-column type="index" label="序号" />
                <el-table-column prop="type" label="喷头类型" />
                <el-table-column prop="sn" label="喷头序列号" />
              </el-table>
            </div>
          </div>
          <div class="flex justify-center" style="margin-bottom: 40px;">
            <!-- <div class="availability">
              <ChartComponentFive />
            </div> -->
            <div class="availability-one justify-center" style="width: 100%; height: 320px;">
              <ChartComponentSix :countryData1="countryData1" />
            </div>
          </div>
          <div class="lineOne"></div>
          <div class="monthly-statistical flex" style="margin-bottom: 40px;">
            <div class="statistical-content" style="width: 30%;">
              <div class="flex items-center gap-4" style="margin-bottom: 10px;">
                <el-image :src="imgXLD" style="width: 15px; height: 15px;" />
                <span class="accomplishment">打印完成率</span>
              </div>
              <div class="jobCompletionRate" style="margin-bottom: 10px;padding-left: 30px;">
                <span>7天内作业完成率：</span>
                <span>{{getFormattedAvgCompletion(jobCompletionRate)}}%</span>
              </div>
              <div class="totalRunningTime" style="padding-left: 30px;">
                <span>总运行时长：</span>
                <span>{{totalRunningTime}}h</span>
              </div>
            </div>
            <div class="flex-1">
              <ChartComponentEvent :countryData2="countryData2" />
            </div>
          </div>
          <div class="monthly-statistical flex" style="margin-bottom: 40px;">
            <div class="statistical-content" style="width: 30%;">
              <div class="flex items-center gap-4" style="margin-bottom: 10px;">
                <el-image :src="imgXLD" style="width: 15px; height: 15px;" />
                <span class="accomplishment" style="width: 133px;">当前蜡材余量/预计剩余使用时长</span>
              </div>
              <div class="jobCompletionRate" style="margin-bottom: 10px;padding-left: 30px;">
                <span>结构蜡材：</span>
                <span>{{supportingWaxMaterial}}kg，{{supportingWaxMaterialDuration}}h</span>
              </div>
              <div class="totalRunningTime" style="padding-left: 30px;">
                <span>支撑蜡材：</span>
                <span>{{structuralWax}}kg，{{structuralWaxDuration}}h</span>
              </div>
            </div>
            <div class="flex-1">
              <ChartComponentSeven :countryData3="countryData3" />
            </div>
          </div>
          <div class="historicalAlarm flex flex-col justify-center items-center">
            <div style="width: 100%;" class="historicalAlarmSituation">设备历史报警情况统计表</div>
            <div style="width: 100%;">
              <el-table :data="tableData8" border style="width: 100%; height: 307px;">
                <el-table-column prop="create_at" label="告警时间" width="163" />
                <el-table-column
                  prop="type"
                  label="告警类型"
                  :formatter="formatAlarmType"
                />
                <el-table-column prop="name" label="告警名称" />
                <el-table-column prop="source" label="告警源" />
                <el-table-column prop="reason" label="告警原因" />
                <el-table-column fixed="right" label="操作" width="130">
                  <template #default>
                    <el-button link type="primary" size="small" @click="handleClick8"
                      >查看告警事件详情</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 设备及蜡材权限管理弹窗 -->
    <div class="popUpWindow">11111</div>
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
  .historicalAlarmSituation {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: #1890FF;
  }

  .historicalAlarm {
    height: 381px;
    border: 1px solid rgba(215, 215, 215, 1);
    border-radius: 9px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .statistical-content {
    padding-top: 30px;
    padding-left: 20px;
  }

  .jobCompletionRate {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #333333;
  }

  .totalRunningTime {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #333333;
  }

  .accomplishment {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #027DB4;
  }

  .monthly-statistical {
    border: 1px solid rgba(215, 215, 215, 1);
    border-radius: 9px;
  }

  .lineOne {
    border: 1px solid rgba(215, 215, 215, 1);
    margin-bottom: 15px;
  }

  .availability {
    border: 1px solid rgba(215, 215, 215, 1);
    border-radius: 9px;
  }

  .availability-one {
    border: 1px solid rgba(215, 215, 215, 1);
    border-radius: 9px;
  }

  .type-content {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #000000;
  }

  .type-title {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #333333;
  }

  .iPIsNormal {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;
    // color: #00FF00;
  }

  .basicInformation::before {
    content: '设备基本信息';
    position: absolute;
    top: -15px;
    left: 15px;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    color: #333333;
    background: white;
  }

  .basicInformation {
    position: relative;
    padding-top: 20px;
    border: 1px solid rgba(127, 127, 127, 1);
    border-radius: 10px;
    height: 243px;
  }

  .basicInformation-one {
    height: 140px;
  }

  .basicInformation-one::before {
    content: '设备订单信息';
    position: absolute;
    top: -15px;
    left: 15px;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    color: #333333;
    background: white;
  }

  .basicInformation-two::before {
    content: '蜡材信息';
    position: absolute;
    top: -15px;
    left: 15px;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    color: #333333;
    background: white;
  }

  .basicInformation-two {
    height: 289px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .basicInformation-three::before {
    content: '喷头信息';
    position: absolute;
    top: -15px;
    left: 15px;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    color: #333333;
    background: white;
  }

  .basicInformation-three {
    height: 289px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .smallDot {
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 100%;
    // background-color: #FF0000;
    margin-right: 10px;
  }

  .smallDot-content {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    //color: #D9001B;
  }

  .deviceName {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    color: #555555;
    margin-right: 10px;
  }

  .authorityManagement {
    width: 158px !important;
    height: 40px !important;
    background-color: rgba(22, 155, 213, 1);
    border: none;
    border-radius: 5px;
    box-shadow: none;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #FFFFFF;
  }

  :deep(.el-button:hover) {
    background-color: rgba(22, 155, 213, 1);
    border-color: none;
    color: #FFFFFF;
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
    position: reactive;
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

  .detail-box {
    border: 1px solid rgba(121, 121, 121, 1);
    border-radius: 9px;
    padding: 10px;
  }

  .smallDotClass1 {
    color: #70B603;
  }

  .smallDotClass2 {
    color: #F59A23;
  }

  .smallDotClass3 {
    color: #D9001B;
  }

  .smallDotClass4 {
    color: #7F7F7F;
  }

  .smallDotClass7 {
    background-color: #70B603;
  }

  .smallDotClass8 {
    background-color: #F59A23;
  }

  .smallDotClass9 {
    background-color: #D9001B;
  }

  .smallDotClass10 {
    background-color: #7F7F7F;
  }

  .iPIsNormal1 {
    color: #00FF00;
  }

  .iPIsNormal2 {
    color: #D9001B;
  }

  .popUpWindow {
    position: absolute;
    top: 100px;
    right: 20px;
    width: 416px;
    height: 518px;
    background-color: #ffffff;
    z-index: 9999;
    display: none;
  }
</style>