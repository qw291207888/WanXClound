<script lang="ts" setup>
  import { ref, computed, reactive, watch, nextTick, onMounted  } from 'vue';
  import type { TabsPaneContext } from 'element-plus'
  import type { ComponentSize } from 'element-plus'
  import { utils, writeFile } from 'xlsx';

  definePageMeta({
    layout: 'equipment',
    middleware: 'auth'
  });

  interface TableDataType {
    equipmentType: string;
    equipmentSN: string;
    deviceMAC: string;
    salesTerritory: string;
    purchaseChannel: string;
    status: string;
    time: string;
    deviceIPAddress: string;
    iPArea: string;
    operationState: string;
    malfunctionAlarm: string;
    alarmOfGoodsFleeing: string;
    triggerAlarm: string;
  }

  interface TableDataType1 {
    waxUID: string;
    waxMaterialType: string;
    waxMaterialModel: string;
    salesOrderNumber: string;
    outboundOrderNumber: string;
    outboundTime: string;
    salesman: string;
    customerName: string;
    orderAddress: string;
    // 继续其他属性定义
    attributionToSalesArea: string;
    equipmentType: string;
    equipmentMAC: string;
    equipmentSN: string;
    equipmentIP: string;
    iPArea: string;
    waxActivationState: string;
    fleeGoods: string;
    reportingTime: string;
    latestProcessingProgress: string;
  }
  
  type TableDataKeys = keyof TableDataType;
  type TableDataKeys1 = keyof TableDataType1;

  const handleClick = () => {
    console.log(111111)
  }

  import ChartComponentNinth from '~/components/ChartComponentNinth.vue';
  
  const tableData = ref<TableDataType[]>([
    {
      equipmentType: 'WJ400',
      equipmentSN: '34567S',
      deviceMAC: 'X2-5P-QQ-EA-ER-B0',
      salesTerritory: '俄罗斯',
      purchaseChannel: '',
      status: '已激活',
      time: '2035-09-19 9:39:39',
      deviceIPAddress: '168.123.213.12',
      iPArea: '俄罗斯',
      operationState: '作业中',
      malfunctionAlarm: '否',
      alarmOfGoodsFleeing: '否',
      triggerAlarm: ''
    },
    {
      equipmentType: 'WJ401',
      equipmentSN: '14567S',
      deviceMAC: 'X2-5P-QQ-EA-ER-B1',
      salesTerritory: '土耳其',
      purchaseChannel: '土耳其供应商1',
      status: '',
      time: '',
      deviceIPAddress: '',
      iPArea: '',
      operationState: '',
      malfunctionAlarm: '',
      alarmOfGoodsFleeing: '',
      triggerAlarm: ''
    },
    {
      equipmentType: 'WJ402',
      equipmentSN: '24567S',
      deviceMAC: 'X2-5P-QQ-EA-ER-B3',
      salesTerritory: '法国',
      purchaseChannel: '',
      status: '已激活',
      time: '2035-09-17 9:39:39',
      deviceIPAddress: '168.123.213.13',
      iPArea: '俄罗斯',
      operationState: '脱机',
      malfunctionAlarm: '否',
      alarmOfGoodsFleeing: '是',
      triggerAlarm: '2035-09-17 9:39:39'
    },
    {
      equipmentType: 'WJ401',
      equipmentSN: '44567S',
      deviceMAC: 'X2-5P-QQ-EA-ER-B4',
      salesTerritory: '土耳其',
      purchaseChannel: '土耳其供应商1',
      status: '已激活',
      time: '2035-09-19 9:39:39',
      deviceIPAddress: '168.123.213.12',
      iPArea: '土耳其',
      operationState: '故障',
      malfunctionAlarm: '是',
      alarmOfGoodsFleeing: '否',
      triggerAlarm: '2035-09-19 9:39:39'
    },
    {
      equipmentType: 'WJ400',
      equipmentSN: '94567S',
      deviceMAC: 'X2-5P-QQ-EA-ER-B5',
      salesTerritory: '美国',
      purchaseChannel: '',
      status: '',
      time: '',
      deviceIPAddress: '',
      iPArea: '',
      operationState: '',
      malfunctionAlarm: '',
      alarmOfGoodsFleeing: '',
      triggerAlarm: ''
    },
    {
      equipmentType: 'WJ400',
      equipmentSN: '04567S',
      deviceMAC: 'X2-5P-QQ-EA-ER-B6',
      salesTerritory: '中国香港',
      purchaseChannel: '',
      status: '已解绑',
      time: '2035-09-19 9:39:39',
      deviceIPAddress: '',
      iPArea: '',
      operationState: '',
      malfunctionAlarm: '',
      alarmOfGoodsFleeing: '',
      triggerAlarm: ''
    },
    {
      equipmentType: 'WJ401',
      equipmentSN: '74567S',
      deviceMAC: 'X2-5P-QQ-EA-ER-B7',
      salesTerritory: '泰国',
      purchaseChannel: '',
      status: '已激活',
      time: '2035-09-18 9:39:39',
      deviceIPAddress: '168.123.213.19',
      iPArea: '中国香港',
      operationState: '待机中',
      malfunctionAlarm: '否',
      alarmOfGoodsFleeing: '是',
      triggerAlarm: '2035-09-18 9:39:39'
    }
  ])

  // const getColor = (state: any) => {
  //   switch (state) {
  //     case '作业中':
  //       return '#19B243';
  //     case '脱机':
  //       return '#FB7B13';
  //     case '故障':
  //       return '#FB7B13';
  //     case '待机中':
  //       return '#02A7F0';
  //     default:
  //       return '#000000'; // 默认颜色
  //   }
  // };


  const getColor = (value: string, prop: string) => {
    if (prop === 'operationState') {
      switch (value) {
        case '作业中':
          return { color: '#19B243' }; // 绿色
        case '脱机':
        case '故障':
          return { color: '#FB7B13' }; // 橙色
        case '待机中':
          return { color: '#02A7F0' }; // 蓝色
        default:
          return {};
      }
    } else if (prop === 'malfunctionAlarm' || prop === 'alarmOfGoodsFleeing') {
      return value === '是' ? { color: '#D9001B' } : { color: '#5B5E68' }; // 是：红色，否：灰色
    }
    return {};
  };

  // const getColor1 = (state: any) => {
  //   switch (state) {
  //     case '是':
  //       return '#D9001B';
  //     case '否':
  //       return '#5B5E68';
  //     default:
  //       return '#000000'; // 默认颜色
  //   }
  // };

  const getColor1 = (value: string, prop: string) => {
    if ((prop === 'goodsfleeing' || prop === 'falseAlarm') && value === '是') {
      return { color: '#D9001B' };
    } else if ((prop === 'goodsfleeing' || prop === 'falseAlarm') && value === '否') {
      return { color: '#7F7F7F' };
    }
    return {};
  };

  const statusFilter = ref('all');

  const malfunctionAlarmFilter = ref('all');

  const alarmOfGoodsFleeingFilter = ref('all');
  
  // const filteredTableData = computed(() => {
  //   if (statusFilter.value === 'all') {
  //     return tableData.value;
  //   }
  //   return tableData.value.filter(item => item.status === statusFilter.value);
  // });

  // const filteredTableData = computed(() => {
  //   return tableData.value.filter(item => {
  //     const statusMatch = statusFilter.value === 'all' || item.status === statusFilter.value;
  //     const malfunctionAlarmMatch = malfunctionAlarmFilter.value === 'all' || 
  //                                    (malfunctionAlarmFilter.value === '是' && item.malfunctionAlarm === '是') ||
  //                                    (malfunctionAlarmFilter.value === '否' && item.malfunctionAlarm === '否');
  //     const alarmOfGoodsFleeingMatch = alarmOfGoodsFleeingFilter.value === 'all' ||
  //                                      (alarmOfGoodsFleeingFilter.value === '是' && item.alarmOfGoodsFleeing === '是') ||
  //                                      (alarmOfGoodsFleeingFilter.value === '否' && item.alarmOfGoodsFleeing === '否');
  //     return statusMatch && malfunctionAlarmMatch && alarmOfGoodsFleeingMatch;
  //   });
  // });

  const filteredTableData = computed(() => {
    let filteredData = tableData.value;

    if (selectedModel.value) {
      filteredData = filteredData.filter(item => item.equipmentType === selectedModel.value);
    }

    if (selectedSN.value) {
      filteredData = filteredData.filter(item => item.equipmentSN === selectedSN.value);
    }
    if (selectedMAC.value) {
      filteredData = filteredData.filter(item => item.deviceMAC === selectedMAC.value);
    }
    if (selectedTerritory.value) {
      filteredData = filteredData.filter(item => item.salesTerritory === selectedTerritory.value);
    }


    for (const key in filters.value) {
      const filteredKey = key as TableDataKeys; // 使用类型断言
      const filterValue = filters.value[filteredKey];
  
      if (filterValue && filterValue !== 'all') {
        filteredData = filteredData.filter(item => item[filteredKey] === filterValue);
      }
    }
  
    return filteredData;
  });

  const activeName = ref('second')

  watch(activeName, (newValue) => {
    if (newValue === 'first') {
      const firstBox = document.getElementById('first-box');
      const secondBox = document.getElementById('second-box');
      if (firstBox) {
        firstBox.style.display = 'block';
      }

      if (secondBox) {
        secondBox.style.display = 'none';
      }
    } else if (newValue === 'second') {
      const firstBox = document.getElementById('first-box');
      const secondBox = document.getElementById('second-box');
      if (firstBox) {
        firstBox.style.display = 'none';
      }

      if (secondBox) {
        secondBox.style.display = 'block';
      }
    }
  });

  const currentPage4 = ref(1)
  const pageSize4 = ref(5)
  const size = ref<ComponentSize>('default')
  const background = ref(false)
  const disabled = ref(false)

  const paginatedTableData = computed(() => {
    const start = (currentPage4.value - 1) * pageSize4.value;
    const end = start + pageSize4.value;
    return filteredTableData.value.slice(start, end);
  });
  
  const handleSizeChange = (val: number) => {
    pageSize4.value = val;
    currentPage4.value = 1; // Reset to first page
  };
  
  const handleCurrentChange = (val: number) => {
    currentPage4.value = val;
  };


  const tableData1 = ref<TableDataType1[]>([])

  const currentPage5 = ref(1)
  const pageSize5 = ref(5)
  const size1 = ref<ComponentSize>('default')
  const background1 = ref(false)
  const disabled1 = ref(false)

  const statusFilter1 = ref('all');
  const malfunctionAlarmFilter1 = ref('all');
  const malfunctionAlarmFilter2 = ref('all');

  const filteredTableData1 = computed(() => {
    // return tableData1.value.filter(item => {
    //   const statusMatch1 = statusFilter1.value === 'all' || item.activationState === statusFilter1.value;
    //   const malfunctionAlarmMatch1 = malfunctionAlarmFilter1.value === 'all' || 
    //                                  (malfunctionAlarmFilter1.value === '是' && item.goodsfleeing === '是') ||
    //                                  (malfunctionAlarmFilter1.value === '否' && item.goodsfleeing === '否');
      
    //   const malfunctionAlarmMatch2 = malfunctionAlarmFilter2.value === 'all' || 
    //                                  (malfunctionAlarmFilter2.value === '是' && item.falseAlarm === '是') ||
    //                                  (malfunctionAlarmFilter2.value === '否' && item.falseAlarm === '否');
    //   return statusMatch1 && malfunctionAlarmMatch1 && malfunctionAlarmMatch2;
    // });
    let filteredData1 = tableData1.value;

    // if (selectedType.value) {
    //   filteredData1 = filteredData1.filter(item => item.waxMaterialType === selectedType.value);
    // }

    // if (selectedUID.value) {
    //   filteredData1 = filteredData1.filter(item => item.waxUID === selectedUID.value);
    // }
    // if (selectedsales.value) {
    //   filteredData1 = filteredData1.filter(item => item.salesTerritory === selectedsales.value);
    // }
    // if (selectedChannel.value) {
    //   filteredData1 = filteredData1.filter(item => item.purchaseChannel === selectedChannel.value);
    // }

    for (const key in filters1.value) {
      const filteredKey1 = key as TableDataKeys1; // 使用类型断言
      const filterValue1 = filters1.value[filteredKey1];
  
      if (filterValue1 && filterValue1 !== 'all') {
        filteredData1 = filteredData1.filter(item => item[filteredKey1] === filterValue1);
      }
    }
  
    return filteredData1;
  });

  const paginatedTableData1 = computed(() => {
    const start = 0
    const end = start + pageSize5.value;
    return filteredTableData1.value.slice(start, end);
  });

  const handleSizeChange1 = async (val: number) => {
    pageSize5.value = val;
    const page_Id = currentPage5.value;
      const page_Size = pageSize5.value;
      let cardUid = selectedType.value;
      // const cardType = selectedUID.value;
      let deviceModel = equipmentType3.value;
      let deviceMac = selectedsales.value;
      let country = selectedChannel.value

      // console.log(cardUid)
      // console.log(cardType)
    
      try {
        const response = await getWaxList(page_Id, page_Size, cardUid, deviceModel, deviceMac, country);
        console.log('User account details fetched successfully:', response);
        console.log(response.data.list);
        if (response.data.list !== null) {
        
          const responseData = response.data.list;
  
          
          console.log(responseData)
          tableData1.value = responseData.map((item:  {
            card_info: {
              uid: string;
              type: string;
              sn: string;
            };
            order: {
              id: string;
              seller: string;
              customer: string;
              address: string;
              country: string;
              inventory_order_id: string;
              out_depot_at: string;
              receive_at: string;
            };
            device_info: {
              model: string;
              mac: string;
              sn: string;
              ip: string;
              ip_location: string;
            };
            transfer: {
              activation_status: string;
              alert: string;
              create_at: string;
              alert_status: string;
            };
          }) => {
            // 设置runningState值
            let latestProcessingProgress = '';
             switch(item.transfer.alert_status) {
               case 0:
                 latestProcessingProgress = '未处理';
                 break;
               case 1:
                 latestProcessingProgress = '处理中';
                 break;
               case 2:
                 latestProcessingProgress = '已完成';
                 break;
               case 3:
                 latestProcessingProgress = '已关闭';
                 break;
               default:
                 latestProcessingProgress = '未知'; // 处理未知状态
             }
            return {
              waxUID: item.card_info.uid,
              waxMaterialType: item.card_info.type === 1 ? '已激活' : '未激活',
              waxMaterialModel: item.card_info.sn,
              salesOrderNumber: item.order.id.replace(/"/g, ""),
              outboundOrderNumber: item.order.inventory_order_id,
              outboundTime: new Date(item.order.out_depot_at * 1000).toLocaleString(),
              salesman: item.order.seller,
              customerName: item.order.customer,
              orderAddress: item.order.address,
              attributionToSalesArea: mapCountryToChinese(item.order.country),
              equipmentType: item.device_info.model,
              equipmentMAC: item.device_info.mac,
              equipmentSN: item.device_info.sn,
              equipmentIP: item.device_info.ip,
              iPArea: item.device_info.ip_location,
              waxActivationState: item.transfer.activation_status === 1 ? '已激活' : '未激活',
              fleeGoods: item.transfer.alert ? '是' : '否',
              reportingTime: item.transfer.create_at,
              latestProcessingProgress
            }
          });
  
          totalItems.value = response.data.total;
          return response.data; // 可以返回数据以便进一步处理
        } else {
          cardUid = ''
          // const cardType = selectedUID.value;
          deviceModel = ''
          deviceMac = ''
          country = ''
          try {
            const response = await getWaxList(page_Id, page_Size, cardUid, deviceModel, deviceMac, country);
            console.log('User account details fetched successfully:', response);
            console.log(response.data.list);
            if (response.data.list !== null) {
            
              const responseData = response.data.list;
      
              
              console.log(responseData)
              tableData1.value = responseData.map((item:  {
                card_info: {
                  uid: string;
                  type: string;
                  sn: string;
                };
                order: {
                  id: string;
                  seller: string;
                  customer: string;
                  address: string;
                  country: string;
                  inventory_order_id: string;
                  out_depot_at: string;
                  receive_at: string;
                };
                device_info: {
                  model: string;
                  mac: string;
                  sn: string;
                  ip: string;
                  ip_location: string;
                };
                transfer: {
                  activation_status: string;
                  alert: string;
                  create_at: string;
                  alert_status: string;
                };
              }) => {
                // 设置runningState值
                let latestProcessingProgress = '';
                 switch(item.transfer.alert_status) {
                   case 0:
                     latestProcessingProgress = '未处理';
                     break;
                   case 1:
                     latestProcessingProgress = '处理中';
                     break;
                   case 2:
                     latestProcessingProgress = '已完成';
                     break;
                   case 3:
                     latestProcessingProgress = '已关闭';
                     break;
                   default:
                     latestProcessingProgress = '未知'; // 处理未知状态
                 }
                return {
                  waxUID: item.card_info.uid,
                  waxMaterialType: item.card_info.type === 1 ? '已激活' : '未激活',
                  waxMaterialModel: item.card_info.sn,
                  salesOrderNumber: item.order.id.replace(/"/g, ""),
                  outboundOrderNumber: item.order.inventory_order_id,
                  outboundTime: new Date(item.order.out_depot_at * 1000).toLocaleString(),
                  salesman: item.order.seller,
                  customerName: item.order.customer,
                  orderAddress: item.order.address,
                  attributionToSalesArea: mapCountryToChinese(item.order.country),
                  equipmentType: item.device_info.model,
                  equipmentMAC: item.device_info.mac,
                  equipmentSN: item.device_info.sn,
                  equipmentIP: item.device_info.ip,
                  iPArea: item.device_info.ip_location,
                  waxActivationState: item.transfer.activation_status === 1 ? '已激活' : '未激活',
                  fleeGoods: item.transfer.alert ? '是' : '否',
                  reportingTime: item.transfer.create_at,
                  latestProcessingProgress
                }
              });
      
              totalItems.value = response.data.total;
              return response.data; // 可以返回数据以便进一步处理
            }
          } catch (err) {
            console.error('Failed to fetch account details:', err);
            throw err; // 如果需要，可以重新抛出错误
          }
        }
      } catch (err) {
        console.error('Failed to fetch account details:', err);
        throw err; // 如果需要，可以重新抛出错误
      }
    currentPage5.value = 1; // Reset to first page
  };
  
  const handleCurrentChange1 = async (val: number) => {
    currentPage5.value = val;
    const page_Id = currentPage5.value;
      const page_Size = pageSize5.value;
      let cardUid = selectedType.value;
      // const cardType = selectedUID.value;
      let deviceModel = equipmentType3.value;
      let deviceMac = selectedsales.value;
      let country = selectedChannel.value

      // console.log(cardUid)
      // console.log(cardType)
    
      try {
        const response = await getWaxList(page_Id, page_Size, cardUid, deviceModel, deviceMac, country);
        console.log('User account details fetched successfully:', response);
        console.log(response.data.list);
        if (response.data.list !== null) {
        
          const responseData = response.data.list;
  
          
          console.log(responseData)
          tableData1.value = responseData.map((item:  {
            card_info: {
              uid: string;
              type: string;
              sn: string;
            };
            order: {
              id: string;
              seller: string;
              customer: string;
              address: string;
              country: string;
              inventory_order_id: string;
              out_depot_at: string;
              receive_at: string;
            };
            device_info: {
              model: string;
              mac: string;
              sn: string;
              ip: string;
              ip_location: string;
            };
            transfer: {
              activation_status: string;
              alert: string;
              create_at: string;
              alert_status: string;
            };
          }) => {
            // 设置runningState值
            let latestProcessingProgress = '';
             switch(item.transfer.alert_status) {
               case 0:
                 latestProcessingProgress = '未处理';
                 break;
               case 1:
                 latestProcessingProgress = '处理中';
                 break;
               case 2:
                 latestProcessingProgress = '已完成';
                 break;
               case 3:
                 latestProcessingProgress = '已关闭';
                 break;
               default:
                 latestProcessingProgress = '未知'; // 处理未知状态
             }
            return {
              waxUID: item.card_info.uid,
              waxMaterialType: item.card_info.type === 1 ? '已激活' : '未激活',
              waxMaterialModel: item.card_info.sn,
              salesOrderNumber: item.order.id.replace(/"/g, ""),
              outboundOrderNumber: item.order.inventory_order_id,
              outboundTime: new Date(item.order.out_depot_at * 1000).toLocaleString(),
              salesman: item.order.seller,
              customerName: item.order.customer,
              orderAddress: item.order.address,
              attributionToSalesArea: mapCountryToChinese(item.order.country),
              equipmentType: item.device_info.model,
              equipmentMAC: item.device_info.mac,
              equipmentSN: item.device_info.sn,
              equipmentIP: item.device_info.ip,
              iPArea: item.device_info.ip_location,
              waxActivationState: item.transfer.activation_status === 1 ? '已激活' : '未激活',
              fleeGoods: item.transfer.alert ? '是' : '否',
              reportingTime: item.transfer.create_at,
              latestProcessingProgress
            }
          });
  
          totalItems.value = response.data.total;
          return response.data; // 可以返回数据以便进一步处理
        } else {
          cardUid = ''
          // const cardType = selectedUID.value;
          deviceModel = ''
          deviceMac = ''
          country = ''
          try {
            const response = await getWaxList(page_Id, page_Size, cardUid, deviceModel, deviceMac, country);
            console.log('User account details fetched successfully:', response);
            console.log(response.data.list);
            if (response.data.list !== null) {
            
              const responseData = response.data.list;
      
              
              console.log(responseData)
              tableData1.value = responseData.map((item:  {
                card_info: {
                  uid: string;
                  type: string;
                  sn: string;
                };
                order: {
                  id: string;
                  seller: string;
                  customer: string;
                  address: string;
                  country: string;
                  inventory_order_id: string;
                  out_depot_at: string;
                  receive_at: string;
                };
                device_info: {
                  model: string;
                  mac: string;
                  sn: string;
                  ip: string;
                  ip_location: string;
                };
                transfer: {
                  activation_status: string;
                  alert: string;
                  create_at: string;
                  alert_status: string;
                };
              }) => {
                // 设置runningState值
                let latestProcessingProgress = '';
                 switch(item.transfer.alert_status) {
                   case 0:
                     latestProcessingProgress = '未处理';
                     break;
                   case 1:
                     latestProcessingProgress = '处理中';
                     break;
                   case 2:
                     latestProcessingProgress = '已完成';
                     break;
                   case 3:
                     latestProcessingProgress = '已关闭';
                     break;
                   default:
                     latestProcessingProgress = '未知'; // 处理未知状态
                 }
                return {
                  waxUID: item.card_info.uid,
                  waxMaterialType: item.card_info.type === 1 ? '已激活' : '未激活',
                  waxMaterialModel: item.card_info.sn,
                  salesOrderNumber: item.order.id.replace(/"/g, ""),
                  outboundOrderNumber: item.order.inventory_order_id,
                  outboundTime: new Date(item.order.out_depot_at * 1000).toLocaleString(),
                  salesman: item.order.seller,
                  customerName: item.order.customer,
                  orderAddress: item.order.address,
                  attributionToSalesArea: mapCountryToChinese(item.order.country),
                  equipmentType: item.device_info.model,
                  equipmentMAC: item.device_info.mac,
                  equipmentSN: item.device_info.sn,
                  equipmentIP: item.device_info.ip,
                  iPArea: item.device_info.ip_location,
                  waxActivationState: item.transfer.activation_status === 1 ? '已激活' : '未激活',
                  fleeGoods: item.transfer.alert ? '是' : '否',
                  reportingTime: item.transfer.create_at,
                  latestProcessingProgress
                }
              });
      
              totalItems.value = response.data.total;
              return response.data; // 可以返回数据以便进一步处理
            }
          } catch (err) {
            console.error('Failed to fetch account details:', err);
            throw err; // 如果需要，可以重新抛出错误
          }
        }
      } catch (err) {
        console.error('Failed to fetch account details:', err);
        throw err; // 如果需要，可以重新抛出错误
      }
  };

  const filters = ref<Record<string, string>>({
    status: 'all',
    malfunctionAlarm: 'all',
    alarmOfGoodsFleeing: 'all',
  })

  const filters1 = ref<Record<string, string>>({
    activationState: 'all',
    falseAlarm: 'all',
    goodsfleeing: 'all'
  })

  const dynamicColumns = ref([
    { prop: 'purchaseChannel', label: '购入渠道', width: '83' },
    { prop: 'status', label: '设备激活/解绑状态', width: '260', filterable: true, filterOptions: [
        { label: '全部', value: 'all' },
        { label: '已激活', value: '已激活' },
        { label: '已解绑', value: '已解绑' }
      ]},
    { prop: 'time', label: '激活/解绑时间', sortable: true, width: '221' },
    { prop: 'deviceIPAddress', label: '设备IP地址', width: '128' },
    { prop: 'iPArea', label: 'IP所在区域', width: '126' },
    { prop: 'operationState', label: '设备运行状态', width: '116' },
    { prop: 'malfunctionAlarm', label: '是否故障报警', width: '210', filterable: true, filterOptions: [
        { label: '全部', value: 'all' },
        { label: '是', value: '是' },
        { label: '否', value: '否' }
      ]},
    { prop: 'alarmOfGoodsFleeing', label: '是否设备窜货报警', width: '240', filterable: true, filterOptions: [
        { label: '全部', value: 'all' },
        { label: '是', value: '是' },
        { label: '否', value: '否' }
      ]},
    { prop: 'triggerAlarm', label: '最近一次触发报警', sortable: true, width: '164' }
  ])

  // const value3 = ref([])

  // const options = [
  //   {
  //     value: 'Option1',
  //     label: 'Option1',
  //   },
  //   {
  //     value: 'Option2',
  //     label: 'Option2',
  //   },
  //   {
  //     value: 'Option3',
  //     label: 'Option3',
  //   },
  //   {
  //     value: 'Option4',
  //     label: 'Option4',
  //   },
  //   {
  //     value: 'Option5',
  //     label: 'Option5',
  //   },
  // ]

  const defaultSelectedColumns = ref(dynamicColumns.value.map(col => col.prop));

  const selectedColumns = ref([...defaultSelectedColumns.value]);

  const selectAll = () => {
    selectedColumns.value = dynamicColumns.value.map(col => col.prop);
  };

  const toggleSelection = () => {
    const currentSelection = new Set(selectedColumns.value);
    selectedColumns.value = dynamicColumns.value
      .map(col => col.prop)
      .filter(prop => !currentSelection.has(prop));
  };

  const resetSelection = () => {
    selectedColumns.value = [...defaultSelectedColumns.value];
  };


  const dynamicColumns1 = ref([
    // { prop: 'activationState', label: '蜡材激活状态', width: '235', sortable: false, filterable: true, filterOptions:[
    //     { label: '全部', value: 'all' },
    //     { label: '已激活', value: '已激活' },
    //     { label: '未激活', value: '未激活' }
    //   ] },
    // { prop: 'activationTime', label: '蜡材激活时间', sortable: true, width: '235' },
    {
      label: '关联订单信息',
      columns: [
        { prop: 'salesOrderNumber', label: '销售订单号', width: '120', sortable: false },
        { prop: 'outboundOrderNumber', label: '出库订单号', width: '106', sortable: false },
        { prop: 'outboundTime', label: '出库时间', width: '186', sortable: false },
        { prop: 'salesman', label: '销售员', width: '134', sortable: false },
        { prop: 'customerName', label: '客户名称(经销商/终端客户)', width: '133', sortable: false },
        { prop: 'orderAddress', label: '订单地址', width: '134', sortable: false },
        { prop: 'attributionToSalesArea', label: '归属销售区域', width: '133', sortable: false }
      ]
    },
    {
      label: '关联设备信息',
      columns: [
        { prop: 'equipmentType', label: '设备型号', width: '120', sortable: false },
        { prop: 'equipmentMAC', label: '设备MAC', width: '106', sortable: false },
        { prop: 'equipmentSN', label: '设备SN', width: '186', sortable: false },
        { prop: 'equipmentIP', label: '设备IP', width: '134', sortable: false },
        { prop: 'iPArea', label: 'IP所在区域', width: '133', sortable: false }
      ]
    },
    {
      label: '关联蜡材窜货报警信息',
      columns: [
        { prop: 'waxActivationState', label: '蜡材激活状态', width: '120', sortable: false },
        { prop: 'fleeGoods', label: '是否窜货报警', width: '106', sortable: false },
        { prop: 'reportingTime', label: '上报时间', width: '186', sortable: false },
        { prop: 'latestProcessingProgress', label: '最新处理进度', width: '133', sortable: false }
      ]
    },
    // {
    //   label: '关联设备信息',
    //   columns: [
    //     { prop: 'goodsfleeing', label: '是否蜡材窜货报警', width: '240', sortable: false , filterable: true, filterOptions: [
    //           { label: '全部', value: 'all' },
    //           { label: '是', value: '是' },
    //           { label: '否', value: '否' }
    //        ]},
    //     { prop: 'falseAlarm', label: '是否蜡材窜货报警', width: '240', sortable: false , filterable: true, filterOptions: [
    //           { label: '全部', value: 'all' },
    //           { label: '是', value: '是' },
    //           { label: '否', value: '否' }
    //        ]},
    //     { prop: 'triggerAlarm', label: '最近一次触发报警', sortable: true, width: '164' }
    //   ]
    // }
  ])

  interface Option {
    label: string;
    value: string;
    level: number;
    children?: Option[];
  }

  const allOptions = computed(() => {
      const options: Option[] = [];
      dynamicColumns1.value.forEach((column, index) => {
        if (column.columns) {
          options.push({ label: column.label, value: `parent_${index}`, level: 0, children: column.columns.map((subColumn, subIndex) => ({ ...subColumn, value: `parent_${index}_child_${subIndex}`, level: 1 })) });
        } else {
          options.push({ label: column.label, value: column.prop, level: 0 });
        }
      });
      return options;
    });

    const selectedColumns1 = ref<string[]>([]);

    import { useRegisterApi } from '~/composables/user';
    const { getConsumptionNumber, getCountriesList, getConsumptionMonth, getWaxList, getEquipmentType } = useRegisterApi();

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

  const countryData = ref({
    supportWax: [],
    structureWax: [],
    stateDate: []
  })

  const countryMapping: { [key: string]: string } = {
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

  const mapCountryToChinese = (countryCode: string) => {
    return countryMapping[countryCode] || '—'; // 如果没有匹配的国家代码，显示 '—'
  };

    const goodsFleeing = ref('0')
    const goodsFleeingCompleted = ref('0')
    const falseAlarm = ref('0')
    const falseAlarmCompleted = ref('0')
    const dayWaxConsumption7 = ref('0')
    const dayWaxConsumption30 = ref('0')
    const supportWaxNum = ref('0');
    const structureWaxNum = ref('0');

    const fetchConsumptionNumber = async () => {
      try {
        const response = await getConsumptionNumber();
        console.log('User account details fetched successfully:', response);
        console.log(response.data)
        goodsFleeing.value = response.data.transfer_total
        goodsFleeingCompleted.value = response.data.transfer_completed_num
        falseAlarm.value = response.data.illegal_total
        falseAlarmCompleted.value = response.data.illegal_completed_num
        dayWaxConsumption7.value = response.data.consumption_7day
        dayWaxConsumption30.value = response.data.consumption_30day

        console.log(response.data.card_consumption)
        response.data.card_consumption.forEach(consumption => {
          if (consumption.class === 0) {
            supportWaxNum.value = consumption.num;
          } else if (consumption.class === 1) {
            structureWaxNum.value = consumption.num;
          }
        });

      } catch (err) {
        console.error('Failed to fetch account details:', err);
        throw err; // 如果需要，可以重新抛出错误
      }
    };

    

    const fetchCountriesList = async () => {
      try {
        const response = await getCountriesList();
        console.log(response.data.list)
        options.value = response.data.list.map((countryCode: string) => ({
          value: countryCode,
          label: countryMap[countryCode] || countryCode
        }));

        purchaseChannel.value = response.data.list.map((countryCode: string) => ({
          value: countryCode,
          label: countryMap[countryCode] || countryCode
        }));
      } catch (error) {
        console.error('Failed to fetch country list:', error);
      }
    };

    

    const fetchConsumptionMonth = async () => {
      const Country = selectedCountry.value
      try {
        const response = await getConsumptionMonth(Country);
        console.log(response.data.list)

        countryData.value.supportWax = [];
        countryData.value.structureWax = [];
        countryData.value.stateDate = [];
        

        response.data.list.map(item => {
          if (item.class === 0) {
            countryData.value.supportWax.push(item.num);
            countryData.value.stateDate.push(item.date)
          } else if (item.class === 1) {
            countryData.value.structureWax.push(item.num);
            countryData.value.stateDate.push(item.date)
          }
        });

        console.log('支撑蜡的数量数组:', countryData.value.supportWax);
        console.log('结构蜡的数量数组:', countryData.value.structureWax);
        console.log('日期:', countryData.value.stateDate);

        console.log(countryData.value)
      } catch (error) {
        console.error('Failed to fetch country list:', error);
      }
    };

    const totalItems = ref(0);

    const fetchEquipmentSituation1 = async () => {
      const page_Id = currentPage5.value;
      const page_Size = pageSize5.value;
      const cardUid = selectedType.value;
      // const cardType = selectedUID.value;
      const deviceModel = equipmentType3.value;
      const deviceMac = selectedsales.value;
      const country = selectedChannel.value

      // console.log(cardUid)
      // console.log(cardType)
    
      try {
        const response = await getWaxList(page_Id, page_Size, cardUid, deviceModel, deviceMac, country);
        console.log('User account details fetched successfully:', response);
        console.log(response.data.list);
        if (response.data.list === null) {
          tableData1.value = []
          totalItems.value = response.data.total;
          return
        }
        const responseData = response.data.list;

        
        console.log(responseData)
        tableData1.value = responseData.map((item:  {
          card_info: {
            uid: string;
            type: string;
            sn: string;
          };
          order: {
            id: string;
            seller: string;
            customer: string;
            address: string;
            country: string;
            inventory_order_id: string;
            out_depot_at: string;
            receive_at: string;
          };
          device_info: {
            model: string;
            mac: string;
            sn: string;
            ip: string;
            ip_location: string;
          };
          transfer: {
            activation_status: string;
            alert: string;
            create_at: string;
            alert_status: string;
          };
        }) => {
          // 设置runningState值
          let latestProcessingProgress = '';
           switch(item.transfer.alert_status) {
             case 0:
               latestProcessingProgress = '未处理';
               break;
             case 1:
               latestProcessingProgress = '处理中';
               break;
             case 2:
               latestProcessingProgress = '已完成';
               break;
             case 3:
               latestProcessingProgress = '已关闭';
               break;
             default:
               latestProcessingProgress = '未知'; // 处理未知状态
           }
          return {
            waxUID: item.card_info.uid,
            waxMaterialType: item.card_info.type === 1 ? '结构蜡' : '支撑蜡',
            waxMaterialModel: item.card_info.sn,
            salesOrderNumber: item.order.id.replace(/"/g, ""),
            outboundOrderNumber: item.order.inventory_order_id,
            outboundTime: new Date(item.order.out_depot_at * 1000).toLocaleString(),
            salesman: item.order.seller,
            customerName: item.order.customer,
            orderAddress: item.order.address,
            attributionToSalesArea: mapCountryToChinese(item.order.country),
            equipmentType: item.device_info.model,
            equipmentMAC: item.device_info.mac,
            equipmentSN: item.device_info.sn,
            equipmentIP: item.device_info.ip,
            iPArea: item.device_info.ip_location,
            waxActivationState: item.transfer.activation_status === 1 ? '已激活' : '未激活',
            fleeGoods: item.transfer.alert ? '是' : '否',
            reportingTime: item.transfer.create_at,
            latestProcessingProgress
          }
        });

        totalItems.value = response.data.total;
        return response.data; // 可以返回数据以便进一步处理
      } catch (err) {
        console.error('Failed to fetch account details:', err);
        throw err; // 如果需要，可以重新抛出错误
      }
    };

//     interface TableDataType1 {
//     waxUID: string;
//     waxMaterialType: string;
//     waxMaterialModel: string;
//     salesOrderNumber: string;
//     outboundOrderNumber: string;
//     outboundTime: string;
//     salesman: string;
//     customerName: string;
//     orderAddress: string;
//     // 继续其他属性定义
//     attributionToSalesArea: string;
//     equipmentType: string;
//     equipmentMAC: string;
//     equipmentSN: string;
//     equipmentIP: string;
//     iPArea: string;
//     waxActivationState: string;
//     fleeGoods: string;
//     reportingTime: string;
//     latestProcessingProgress: string;
// }

    const fetchEquipmentType1 = async () => {
      try {
        const response = await getEquipmentType();
        console.log('User account details fetched successfully:', response);
        console.log(response.data.list)
        const uniqueItems = Array.from(new Set(response.data.list)) as string[];
        equipmentTypeOption1.value = uniqueItems.map((item: string) => ({
          value: item,
          label: item
        }))
        // equipmentTypeOptions.value = response.data.list.map((item: any) => ({
        //   value: item,
        //   label: item
        // }));
      } catch (err) {
        console.error('Failed to fetch account details:', err);
        throw err; // 如果需要，可以重新抛出错误
      }
    };


    onMounted(() => {
      // 初始状态下所有表头全部选中
      const initialSelectedValues: string[] = [];
      allOptions.value.forEach(option => {
        initialSelectedValues.push(option.value);
        if (option.children) {
          option.children.forEach(subOption => initialSelectedValues.push(subOption.value));
        }
      });
      selectedColumns1.value = initialSelectedValues;
      fetchConsumptionNumber()
      fetchCountriesList()
      fetchConsumptionMonth()
      fetchEquipmentSituation1()
      fetchEquipmentType1()
    });

    const handleSelectChange = (value: any) => {
      allOptions.value.forEach((option) => {
        if (option.children) {
          const allSubValues = option.children.map((sub) => sub.value);
          const allSelected = allSubValues.every((val) => selectedColumns1.value.includes(val));
          if (allSelected && !selectedColumns1.value.includes(option.value)) {
            selectedColumns1.value.push(option.value);
          } else if (!allSelected && selectedColumns1.value.includes(option.value)) {
            selectedColumns1.value = selectedColumns1.value.filter((val) => val !== option.value);
          }
        }
      });
    };

    const getOptionColor = (option: Option, parentOption: Option | null = null) => {
      if (parentOption) {
        const allSubValues = parentOption.children!.map((sub) => sub.value);
        const allSelected = allSubValues.every((val) => selectedColumns1.value.includes(val));
        return allSelected ? 'blue' : selectedColumns1.value.includes(option.value) ? 'yellow' : '';
      } else {
        const isParentSelected = selectedColumns1.value.includes(option.value);
        if (option.children) {
          const allSubValues = option.children.map((sub) => sub.value);
          const allSelected = allSubValues.every((val) => selectedColumns1.value.includes(val));
          return allSelected ? 'blue' : isParentSelected ? 'yellow' : '';
        } else {
          return isParentSelected ? 'blue' : '';
        }
      }
    };

    const filteredColumns = computed(() => {
      const columns: any[] = [];
      dynamicColumns1.value.forEach((column, index) => {
        if (selectedColumns1.value.includes(column.prop || '')) {
          columns.push(column);
        } else if (column.columns) {
          const subColumns = column.columns.filter((sub, subIndex) => selectedColumns1.value.includes(`parent_${index}_child_${subIndex}`));
          if (subColumns.length > 0) {
            columns.push({ ...column, columns: subColumns });
          }
        }
      });
      return columns;
    });

    const selectAll1 = () => {
      const selectedValues: string[] = [];
      allOptions.value.forEach(option => {
        selectedValues.push(option.value);
        if (option.children) {
          option.children.forEach(subOption => selectedValues.push(subOption.value));
        }
      });
      selectedColumns1.value = selectedValues;
    }

    const toggleSelection1 = () => {
      const newSelectedValues: string[] = [];
      allOptions.value.forEach(option => {
        if (!selectedColumns1.value.includes(option.value)) {
          newSelectedValues.push(option.value);
        }
        if (option.children) {
          option.children.forEach(subOption => {
            if (!selectedColumns1.value.includes(subOption.value)) {
              newSelectedValues.push(subOption.value);
            }
          });
        }
      });
      selectedColumns1.value = newSelectedValues;
    }

    const resetSelection1 = () => {
      const selectedValues: string[] = [];
      allOptions.value.forEach(option => {
        selectedValues.push(option.value);
        if (option.children) {
          option.children.forEach(subOption => selectedValues.push(subOption.value));
        }
      });
      selectedColumns1.value = selectedValues;
    }


  // // 定义 Option 接口
  // interface Option {
  //   value: any;
  //   label: any;
  //   level: number;
  //   children?: Option[];
  // }
  
  // // 提取所有列
  // const allOptions = computed(() => {
  //   const extractOptions = (columns: any[], level = 0): Option[] => {
  //     return columns.reduce((acc, column) => {
  //       const option: Option = { value: column.prop || column.label, label: column.label, level };
  //       if (column.columns) {
  //         option.children = extractOptions(column.columns, level + 1);
  //       }
  //       acc.push(option);
  //       return acc;
  //     }, [] as Option[]);
  //   };
  //   return extractOptions(dynamicColumns1.value);
  // });
  
  // // 初始化选中的列，默认选中所有列和有子列的父列
  // const selectedColumns1 = ref([] as any[]);
  // watch(allOptions, (newColumns) => {
  //   selectedColumns1.value = newColumns.flatMap(column =>
  //     column.children ? [column.value, ...column.children.map(sub => sub.value)] : column.value
  //   );
  // }, { immediate: true });
  
  // // 更新父子项的选择状态
  // const updateParentChildSelection = (selected: any[]) => {
  //   allOptions.value.forEach(option => {
  //     if (option.children) {
  //       const allChildrenSelected = option.children.every(child => selected.includes(child.value));
  //       const anyChildSelected = option.children.some(child => selected.includes(child.value));
  
  //       if (allChildrenSelected && !selected.includes(option.value)) {
  //         selected.push(option.value);
  //       } else if (!allChildrenSelected && selected.includes(option.value)) {
  //         nextTick(() => {
  //           selectedColumns1.value = selectedColumns1.value.filter(item => item !== option.value);
  //         });
  //       } else if (anyChildSelected && !selected.includes(option.value)) {
  //         // 自定义样式或图标来表示父项的半选中状态
  //         // 例如，可以在父项的 label 前加上一个特定的符号来表示
  //         option.label = `${option.label} (部分选中)`;
  //       }
  //     }
  //   });
  // };
  
  // // 处理选择变化
  // const handleSelectChange = (selected: any[]) => {
  //   allOptions.value.forEach(option => {
  //     if (selected.includes(option.value) && option.children) {
  //       option.children.forEach(child => {
  //         if (!selected.includes(child.value)) {
  //           selected.push(child.value);
  //         }
  //       });
  //     } else if (!selected.includes(option.value) && option.children) {
  //       option.children.forEach(child => {
  //         const index = selected.indexOf(child.value);
  //         if (index !== -1) {
  //           selected.splice(index, 1);
  //         }
  //       });
  //     }
  //   });
  //   selectedColumns1.value = [...selected];
  // };

  // interface Option {
  //   value: any;
  //   label: any;
  //   level: number;
  //   children?: Option[];
  // }

  // // 提取所有列
  // const allOptions = computed(() => {
  //   const extractOptions = (columns: any[], level = 0): Option[] => {
  //     return columns.reduce((acc, column) => {
  //       const option: Option = { value: column.prop || column.label, label: column.label, level };
  //       if (column.columns) {
  //         option.children = extractOptions(column.columns, level + 1);
  //       }
  //       acc.push(option);
  //       return acc;
  //     }, [] as Option[]);
  //   };
  //   return extractOptions(dynamicColumns1.value);
  // });

  // // 初始化选中的列，默认选中所有列和有子列的父列
  // const selectedColumns1 = ref([] as any[]);
  // watch(allOptions, (newColumns) => {
  //   selectedColumns1.value = newColumns.flatMap(column =>
  //     column.children ? [column.value, ...column.children.map(sub => sub.value)] : column.value
  //   );
  // }, { immediate: true });

  // const handleColumnToggle = () => {
  //   const newSelectedColumns = new Set(selectedColumns1.value);
  //   allOptions.value.forEach((option) => {
  //     if (option.children) {
  //       const allChildrenSelected = option.children.every(subOption => newSelectedColumns.has(subOption.value));
  //       const someChildrenSelected = option.children.some(subOption => newSelectedColumns.has(subOption.value));
  //       if (newSelectedColumns.has(option.value) && !allChildrenSelected) {
  //         option.children.forEach(subOption => {
  //           newSelectedColumns.add(subOption.value);
  //         });
  //       } else if (!newSelectedColumns.has(option.value) && allChildrenSelected) {
  //         option.children.forEach(subOption => {
  //           newSelectedColumns.delete(subOption.value);
  //         });
  //       }
  //       if (allChildrenSelected) {
  //         newSelectedColumns.add(option.value);
  //       } else if (!someChildrenSelected) {
  //         newSelectedColumns.delete(option.value);
  //       }
  //     }
  //   });
  //   selectedColumns1.value = [...newSelectedColumns];
  //   console.log('Selected Columns:', selectedColumns1.value);
  // };

  const selectedModel = ref(''); 
  const selectedSN = ref(''); 
  const selectedMAC = ref(''); 
  const selectedTerritory = ref('');

  const selectedType = ref(''); 
  const selectedUID = ref(''); 
  const selectedsales = ref(''); 
  const selectedChannel = ref('');
  const equipmentType3 = ref('')

  const equipmentTypeOptions = ref([
    { value: 'WJ400', label: 'WJ400' },
    { value: 'WJ401', label: 'WJ401' },
    { value: 'WJ402', label: 'WJ402' },
  ]);

  const equipmentTypeOption1 = ref([]);

  const waxMaterialType = ref([
    { value: '90010459001', label: '90010459001' },
    { value: '90010459002', label: '90010459002' },
    { value: '90010459003', label: '90010459003' },
    { value: '90010459004', label: '90010459004' },
    { value: '90010459005', label: '90010459005' },
    { value: '90010459006', label: '90010459006' },
  ])

  const waxUID = ref([
    { value: '3e2s4f6g7h', label: '3e2s4f6g7h' },
    { value: '3e2s4f6g7h1', label: '3e2s4f6g7h1' },
    { value: '3e2s4f6g7h2', label: '3e2s4f6g7h2' },
    { value: '3e2s4f6g7h3', label: '3e2s4f6g7h3' },
    { value: '3e2s4f6g7h4', label: '3e2s4f6g7h4' },
    { value: '3e2s4f6g7h5', label: '3e2s4f6g7h5' },
  ])

  const salesTerritory = ref([
    { value: '土耳其', label: '土耳其' },
    { value: '俄罗斯', label: '俄罗斯' },
    { value: '法国', label: '法国' },
    { value: '美国', label: '美国' },
    { value: '德国', label: '德国' },
    { value: '中国', label: '中国' }
  ])

  const purchaseChannel = ref([
    { value: '土耳其供应商1', label: '土耳其供应商1' },
    { value: '法国供应商1', label: '法国供应商1' }
  ])

  const deviceMACOptions = ref([
    { value: 'X2-5P-QQ-EA-ER-B0', label: 'X2-5P-QQ-EA-ER-B0' },
    { value: 'X2-5P-QQ-EA-ER-B1', label: 'X2-5P-QQ-EA-ER-B1' },
    { value: 'X2-5P-QQ-EA-ER-B3', label: 'X2-5P-QQ-EA-ER-B3' },
    { value: 'X2-5P-QQ-EA-ER-B4', label: 'X2-5P-QQ-EA-ER-B4' },
    { value: 'X2-5P-QQ-EA-ER-B5', label: 'X2-5P-QQ-EA-ER-B5' },
    { value: 'X2-5P-QQ-EA-ER-B6', label: 'X2-5P-QQ-EA-ER-B6' },
    { value: 'X2-5P-QQ-EA-ER-B7', label: 'X2-5P-QQ-EA-ER-B7' },
  ]);

  const salesTerritoryOptions = ref([
    { value: '俄罗斯', label: '俄罗斯' },
    { value: '土耳其', label: '土耳其' },
    { value: '法国', label: '法国' },
    { value: '美国', label: '美国' },
    { value: '中国香港', label: '中国香港' },
    { value: '泰国', label: '泰国' },
  ]);

  const equipmentSNOptions = ref([
    { value: '34567S', label: '34567S' },
    { value: '14567S', label: '14567S' },
    { value: '24567S', label: '24567S' },
    { value: '44567S', label: '44567S' },
    { value: '94567S', label: '94567S' },
    { value: '04567S', label: '04567S' },
    { value: '74567S', label: '74567S' }
  ]);

  const resetFilters = () => {
    selectedModel.value = '';
    selectedMAC.value = '';
    selectedTerritory.value = '';
    selectedSN.value = '';
    filters.value.status = 'all'
    filters.value.malfunctionAlarm = 'all'
    filters.value.alarmOfGoodsFleeing = 'all'
  };

  const resetFilters1 = () => {
    selectedType.value = '';
    equipmentType3.value = '';
    selectedsales.value = '';
    selectedChannel.value = '';
    fetchEquipmentSituation1()
  }

  const urlConsumption = ref('/consumption.png')

  const options = ref('');

  const selectedCountry = ref('US');

  // const countryData = ref({
  //   supportWax: [150, 230, 224, 218, 135, 147, 260],
  //   structureWax: [160, 210, 256, 200, 160, 110, 280]
  // })

  const updateCountry = async (selectedValue: string) => {
    console.log(selectedValue)
    selectedCountry.value = selectedValue
    fetchConsumptionMonth()
  }

  const searchClick1 = () => {
    fetchEquipmentSituation1()
  }

  interface HeaderMap1 {
    [key: string]: string;
  }

  let initialHeaderMap1 = reactive<HeaderMap1>({
    waxUID: '蜡材UID',
    waxMaterialType: '蜡材类型',
    waxMaterialModel: '蜡材型号/编号',
    salesOrderNumber: '销售订单号',
    outboundOrderNumber: '出库订单号',
    outboundTime: '出库时间',
    salesman: '销售员',
    customerName: '客户名称(经销商/终端客户)',
    orderAddress: '订单地址',
    attributionToSalesArea: '归属销售区域',
    // 继续其他属性定义
    equipmentType: '设备型号',
    equipmentMAC: '设备MAC',
    equipmentSN: '设备SN',
    equipmentIP: '设备IP',
    IPArea: 'IP所在区域',
    waxActivationState: '蜡材激活状态',
    fleeGoods: '是否窜货报警',
    reportingTime: '上报时间',
    latestProcessingProgress: '最新处理进度'
  });

  const selectedHeaderMap1 = ref<HeaderMap1>({});
  // 可见的表头（用户可以动态修改这个数组）
  const visibleHeaders1 = ref<string[]>(Object.keys(initialHeaderMap1));

  watch(selectedColumns1, (newSelected) => {
    console.log(newSelected);
    const mapping = {
      'parent_0_child_0': 'salesOrderNumber',
      'parent_0_child_1': 'outboundOrderNumber',
      'parent_0_child_2': 'outboundTime',
      'parent_0_child_3': 'salesman',
      'parent_0_child_4': 'customerName',
      'parent_0_child_5': 'orderAddress',
      'parent_0_child_6': 'attributionToSalesArea',
      'parent_1_child_0': 'equipmentType',
      'parent_1_child_1': 'equipmentMAC',
      'parent_1_child_2': 'equipmentSN',
      'parent_1_child_3': 'equipmentIP',
      'parent_1_child_4': 'IPArea',
      'parent_2_child_0': 'waxActivationState',
      'parent_2_child_1': 'fleeGoods',
      'parent_2_child_2': 'reportingTime',
      'parent_2_child_3': 'latestProcessingProgress',
    };
  
    const transformedArray = newSelected.filter(item => item !== 'parent_6' && item !== 'parent_7' && item !== 'parent_8')
                                        .map(item => mapping[item as keyof typeof mapping] || item);
  
    console.log(transformedArray);
  
    const newHeaderMap: HeaderMap1 = {
      waxUID: '蜡材UID',
      waxMaterialType: '蜡材类型',
      waxMaterialModel: '蜡材型号/编号',
    };
  
    // 合并 transformedArray 和 newHeaderMap
    const mergedHeaderMap: HeaderMap1 = { ...newHeaderMap };
  
    transformedArray.forEach(key => {
      if (initialHeaderMap1[key]) {
        mergedHeaderMap[key] = initialHeaderMap1[key];
      }
    });
  
    console.log(mergedHeaderMap);
  
    // 将 mergedHeaderMap 赋值给 selectedHeaderMap1
    Object.assign(selectedHeaderMap1.value, mergedHeaderMap);
    visibleHeaders1.value = Object.keys(mergedHeaderMap);

    console.log(visibleHeaders1.value)
  }, { immediate: true });
  

  const exportToExcel1 = () => {
    // 根据 visibleHeaders 动态生成表头
    const dynamicHeaderMap1: HeaderMap1 = {};
    visibleHeaders1.value.forEach(key => {
      if (selectedHeaderMap1.value[key]) {
        dynamicHeaderMap1[key] = selectedHeaderMap1.value[key];
      }
    });
  
    const headers1 = Object.values(dynamicHeaderMap1);
    const keys1 = Object.keys(dynamicHeaderMap1);
  
    // 将数据转换成带有动态表头的数据
    const dataWithDynamicHeaders1 = tableData1.value.map(item => {
      const newItem: { [key: string]: any } = {};
      keys1.forEach(key => {
        newItem[dynamicHeaderMap1[key]] = (item as any)[key] !== '' ? (item as any)[key] : '-';
      });
      return newItem;
    });
  
    // 在数据前添加表头
    const excelData = [headers1, ...dataWithDynamicHeaders1.map(item => Object.values(item))];

    console.log(excelData)
  
    // 创建工作表
    const ws = utils.aoa_to_sheet(excelData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
  
    // 导出文件
    writeFile(wb, '蜡材列表数据.xlsx');
  };
</script>
  
<template>
  <div class="customerDetails">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>蜡材信息概览</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex justify-between consumption-box">
      <div class="consumption flex items-center justify-between">
        <div class="flex justify-center items-center">
          <el-image style="width: 83px; height: 83px" :src="urlConsumption" />
        </div>
        <div class="flex flex-col">
          <span class="title-box">结构蜡 | 支撑蜡(kg)</span>
          <span class="number-box">{{structureWaxNum}} | {{supportWaxNum}}</span>
        </div>
      </div>
      <div class="consumption flex items-center justify-between">
        <div class="flex justify-center items-center">
          <el-image style="width: 83px; height: 83px" :src="urlConsumption" />
        </div>
        <div class="flex flex-col items-center">
          <span class="title-box">已解决/报警数(个)</span>
          <span class="number-box-one">{{goodsFleeingCompleted}}/{{goodsFleeing}}</span>
        </div>
      </div>
      <div class="consumption flex items-center justify-between">
        <div class="flex justify-center items-center">
          <el-image style="width: 83px; height: 83px" :src="urlConsumption" />
        </div>
        <div class="flex flex-col items-center">
          <span class="title-box">已解决/报警数(个)</span>
          <span class="number-box-one">{{falseAlarmCompleted}}/{{falseAlarm}}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center" style="margin-bottom: 40px;">
      <div class="waxConsumption flex justify-center items-center">
        <div>
          <div class="flex flex-col" style="margin-bottom: 10px;">
            <span class="wacBox">近7天蜡材消耗量</span>
            <span class="waxco">{{dayWaxConsumption7}}g</span>
          </div>
          <div class="flex flex-col">
            <span class="wacBox">近30天蜡材消耗量</span>
            <span class="waxco">{{dayWaxConsumption30}}g</span>
          </div>
        </div>
      </div>
      <div class="monthlyStatistics" style="width: 70%;">
        <el-select
          class="select-boxn"
          v-model="selectedCountry"
          placeholder="Select"
          size="large"
          style="width: 240px"
          @change="updateCountry"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <ChartComponentNinth :selectedCountry="selectedCountry" :countryData="countryData" />
      </div>
    </div>
    <!-- <div class="customer-content">
      <h1 class="customer-title">土耳其XXX珠宝设计工作室</h1>
      <div class="customer-first">
        <span class="customer-address">邮箱地址：</span>
        <span class="customer-address-content">2912078565@qq.com</span>
      </div>
      <div class="customer-first">
        <span class="customer-address">地址：</span>
        <span class="customer-address-content">土耳其伊斯坦布尔XXX街道XX号</span>
      </div>
      <div class="customer-first">
        <span class="customer-address">所属销售区：</span>
        <span class="customer-address-content">土耳其伊斯坦布尔</span>
      </div>
      <div>
        <span class="customer-address">购入渠道：</span>
        <span class="customer-address-content">土耳其经销商A/B/C……</span>
      </div>
    </div> -->
    <!-- <div class="flex justify-between items-center card-code">
      <div class="card-first flex flex-col items-center justify-center">
        <span class="flex justify-center">历史总激活设备数</span>
        <span class="flex justify-center">8</span>
      </div>
      <div class="card-second">
        <div class="card-second-title">
          <span>触发报警数总计</span>
          <span>(31个)</span>
        </div>
        <div class="flex justify-center items-center">
          <div class="flex flex-col items-center cardContet">
            <span>设备故障</span>
            <span class="relative bottom-1.5">10</span>
          </div>
          <div class="line-box"></div>
          <div class="flex flex-col items-center cardContet">
            <span>设备窜货</span>
            <span class="relative bottom-1.5">2</span>
          </div>
          <div class="line-box"></div>
          <div class="flex flex-col items-center cardContet">
            <span>蜡材窜货</span>
            <span class="relative bottom-1.5">7</span>
          </div>
          <div class="line-box"></div>
          <div class="flex flex-col items-center cardContet">
            <span>蜡材用伪</span>
            <span class="relative bottom-1.5">12</span>
          </div>
        </div>
      </div>
      <div class="card-second card-three">
        <div class="card-second-title">
          <span>蜡材消耗情况</span>
          <span>(kg)</span>
        </div>
        <div class="flex justify-center items-center">
          <div class="flex flex-col items-center cardContet">
            <span>结构蜡</span>
            <span class="relative bottom-1.5 cardColor">69</span>
          </div>
          <div class="line-box line-first"></div>
          <div class="flex flex-col items-center cardContet">
            <span>支撑蜡</span>
            <span class="relative bottom-1.5 cardColor">100</span>
          </div>
        </div>
      </div>
    </div> -->
    <div id="first-box" class="table-box-first" style="display: none;">
      <div class="flex items-center">
        <div>
          <span class="select-box">表格字段信息选择</span>
        </div>
        <div>
          <el-select
            v-model="selectedColumns"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="请选择表头"
            style="width: 360px"
          >
            <el-option
              v-for="item in dynamicColumns"
              :key="item.prop"
              :label="item.label"
              :value="item.prop"
            />
          </el-select>
        </div>
        <div>
          <el-button class="button-first" type="primary" @click="selectAll">全选字段</el-button>
          <el-button class="button-second" type="primary" @click="toggleSelection">反选字段</el-button>
          <el-button class="button-three" @click="resetSelection">恢复默认</el-button>
        </div>
      </div>
      <div class="line-box-first"></div>
      <div class="flex items-center justify-between pt-1.5 pb-5">
        <div class="flex flex-col justify-center gap-5">
          <div class="flex items-center">
            <div>
              <span class="equipment-type">设备型号</span>
              <el-select v-model="selectedModel" placeholder="请选择" style="width: 240px">
                <el-option
                  v-for="item in equipmentTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <span class="equipment-type">设备MAC</span>
              <el-select v-model="selectedMAC" placeholder="请选择" style="width: 240px">
                <el-option
                  v-for="item in deviceMACOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="flex items-center">
            <div>
              <span class="equipment-type">销售区域</span>
              <el-select v-model="selectedTerritory" placeholder="请选择" style="width: 240px">
                <el-option
                  v-for="item in salesTerritoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <span class="equipment-type equipment-type-first">设备SN</span>
              <el-select v-model="selectedSN" placeholder="请选择" style="width: 240px">
                <el-option
                  v-for="item in equipmentSNOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <el-button class="button-one button-one-size" type="primary">搜索</el-button>
          <el-button class="button-one button-two-size"  @click="resetFilters">重置</el-button>
          <el-button class="button-one button-three-size">导出Excel</el-button>
        </div>
      </div>
    </div>
    <div id="second-box" class="table-box-first">
      <div class="flex items-center">
        <div>
          <span class="select-box">表格字段信息选择</span>
        </div>
        <div>
          <el-select
            v-model="selectedColumns1"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="请选择表头"
            style="width: 360px"
            @change="handleSelectChange"
          >
            <template v-for="option in allOptions" :key="option.value">
              <el-option
                :label="option.label"
                :value="option.value"
                :style="{ paddingLeft: option.level * 20 + 'px', backgroundColor: getOptionColor(option) }"
              />
              <template v-if="option.children">
                <el-option
                  v-for="subOption in option.children"
                  :key="subOption.value"
                  :label="subOption.label"
                  :value="subOption.value"
                  :style="{ paddingLeft: (subOption.level + 1) * 20 + 'px', backgroundColor: getOptionColor(subOption, option) }"
                />
              </template>
            </template>
          </el-select>
        </div>
        <div>
          <el-button class="button-first" type="primary" @click="selectAll1">全选字段</el-button>
          <el-button class="button-second" type="primary" @click="toggleSelection1">反选字段</el-button>
          <el-button class="button-three" @click="resetSelection1">恢复默认</el-button>
        </div>
      </div>
      <div class="line-box-first"></div>
      <div class="flex items-center justify-between pt-1.5 pb-5">
        <div class="flex flex-col justify-center gap-5">
          <div class="flex items-center">
            <div>
              <span class="equipment-type">蜡材UID</span>
              <el-input v-model="selectedType" placeholder="请选择" style="width: 240px">
                <!-- <el-option
                  v-for="item in waxMaterialType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                /> -->
              </el-input>
            </div>
            <div>
              <span class="equipment-type">设备型号</span>
              <el-select v-model="equipmentType3" placeholder="请选择" style="width: 240px">
                <el-option
                  v-for="item in equipmentTypeOption1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="flex items-center">
            <div>
              <span class="equipment-type">设备MAC</span>
              <el-input v-model="selectedsales" placeholder="请选择" style="width: 240px">
                <!-- <el-option
                  v-for="item in salesTerritory"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                /> -->
              </el-input>
            </div>
            <div>
              <span class="equipment-type">销售区域</span>
              <el-select v-model="selectedChannel" placeholder="请选择" style="width: 240px">
                <el-option
                  v-for="item in purchaseChannel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <el-button class="button-one button-one-size" type="primary" @click="searchClick1">搜索</el-button>
          <el-button class="button-one button-two-size"  @click="resetFilters1">重置</el-button>
          <el-button class="button-one button-three-size" @click="exportToExcel1">导出Excel</el-button>
        </div>
      </div>
    </div>
    <div class="table-box">
      <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="设备情况" name="first">
          <el-table :data="paginatedTableData" border style="width: 100%">
            <el-table-column type="index" label="序号" width="116" />
            <el-table-column prop="equipmentType" label="设备型号" width="115">
              <template #default="{ row, column, $index }">
                <span>{{ row.equipmentType !== '' ? row.equipmentType : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="equipmentSN" label="设备SN" width="166">
              <template #default="{ row, column, $index }">
                <span>{{ row.equipmentSN !== '' ? row.equipmentSN : '—' }}</span>
              </template>
            </el-table-column>>
            <el-table-column prop="deviceMAC" label="设备MAC" min-width="166">
              <template #default="{ row, column, $index }">
                <span>{{ row.deviceMAC !== '' ? row.deviceMAC : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="salesTerritory" label="销售区域" min-width="94">
              <template #default="{ row, column, $index }">
                <span>{{ row.salesTerritory !== '' ? row.salesTerritory : '—' }}</span>
              </template>
            </el-table-column>
            <!-- 动态生成后面的表头 -->
            <template v-for="column in dynamicColumns" :key="column.prop">
              <el-table-column
                v-if="selectedColumns.includes(column.prop)"
                :prop="column.prop"
                :label="column.label"
                :width="column.width"
                :sortable="column.sortable"
              >
                <template  #header>
                  <div v-if="column.filterable" style="display: flex; align-items: center;">
                    <el-select v-model="filters[column.prop]" :placeholder="`筛选${column.label}`" style="width: 90px; margin-right: 10px;">
                      <el-option v-for="option in column.filterOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
                    </el-select>
                    <span>{{ column.label }}</span>
                  </div>
                  <span v-else>{{ column.label }}</span>
                </template>
                <template #default="{ row, column, $index }">
                  <span :style="getColor(row[column.property], column.property)">
                    {{ row[column.property] !== '' ? row[column.property] : '—' }}
                  </span>
                </template>
              </el-table-column>
            </template>
            <el-table-column fixed="right" label="操作" width="121">
              <template #default="{ row, column, $index }">
                <!-- <span>
                  {{ row.malfunctionAlarm === '' && row.alarmOfGoodsFleeing === '' ? '—' : '' }}
                </span> -->
                <!-- <el-button
                  v-if="row.malfunctionAlarm !== '' && row.alarmOfGoodsFleeing !== ''"
                  link
                  type="primary"
                  size="small"
                  @click="handleClick"
                >
                  查看报警详情
                </el-button> -->
                <el-button
                  v-if="row.malfunctionAlarm !== '' && row.alarmOfGoodsFleeing !== ''"
                  link
                  type="primary"
                  size="small"
                  @click="handleClick"
                >
                  查看报警详情
                </el-button>
                <span v-else>—</span>
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
              :total="filteredTableData.length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="蜡材情况" name="second">
          <el-table :data="paginatedTableData1" border style="width: 100%">
            <el-table-column type="index" label="序号" width="116" />
            <el-table-column prop="waxUID" label="蜡材UID" width="115">
              <template #default="{ row, column, $index }">
                <span>{{ row.waxUID !== '' ? row.waxUID : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="waxMaterialType" label="蜡材类型" width="210">
              <template #default="{ row, column, $index }">
                <span>{{ row.waxMaterialType !== '' ? row.waxMaterialType : '—' }}</span>
              </template>
            </el-table-column>>
            <el-table-column prop="waxMaterialModel" label="蜡材型号/编号" min-width="166">
              <template #default="{ row, column, $index }">
                <span>{{ row.waxMaterialModel !== '' ? row.waxMaterialModel : '—' }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="purchaseChannel" label="蜡材购入渠道" min-width="133">
              <template #default="{ row, column, $index }">
                <span>{{ row.purchaseChannel !== '' ? row.purchaseChannel : '—' }}</span>
              </template>
            </el-table-column> -->
            <template v-for="(column, index) in filteredColumns" :key="index">
              <!-- 处理没有子列的列 -->
              <el-table-column
                v-if="!column.columns"
                :prop="column.prop"
                :label="column.label"
                :width="column.width"
                :sortable="column.sortable"
              >
                <template  #header>
                  <div v-if="column.filterable" style="display: flex; align-items: center;">
                    <el-select v-model="filters1[column.prop]" :placeholder="`筛选${column.label}`" style="width: 90px; margin-right: 10px;">
                      <el-option v-for="option in column.filterOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
                    </el-select>
                    <span>{{ column.label }}</span>
                  </div>
                  <span v-else>{{ column.label }}</span>
                </template>
                <template #default="{ row, column, $index }">
                  <span :style="getColor1(row[column.property], column.property)">
                    {{ row[column.property] !== '' ? row[column.property] : '—' }}
                  </span>
                </template>
              </el-table-column>
              <!-- 处理有子列的列 -->
              <el-table-column 
                v-else
                :label="column.label"
              >
                <template v-for="(subColumn, subIndex) in column.columns" :key="subIndex">
                  <el-table-column
                  :prop="subColumn.prop"
                  :width="subColumn.width"
                  :sortable="subColumn.sortable"
                  >
                    <template  #header>
                      <div v-if="subColumn.filterable" style="display: flex; align-items: center;">
                        <el-select v-model="filters1[subColumn.prop]" :placeholder="`筛选${subColumn.label}`" style="width: 90px; margin-right: 10px;">
                          <el-option v-for="option in subColumn.filterOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
                        </el-select>
                        <span>{{ subColumn.label }}</span>
                      </div>
                      <span v-else>{{ subColumn.label }}</span>
                    </template>
                    <template #default="{ row, column, $index }">
                      <span :style="getColor1(row[column.property], column.property)">
                        {{ row[column.property] !== '' ? row[column.property] : '—' }}
                      </span>
                    </template>
                  </el-table-column>
                </template>
              </el-table-column>
            </template>
            <el-table-column fixed="right" label="操作" width="121">
              <template #default="{ row, column, $index }">
                <el-button
                  v-if="row.goodsfleeing !== '' && row.falseAlarm !== ''"
                  link
                  type="primary"
                  size="small"
                  @click="handleClick"
                >
                  查看报警详情
                </el-button>
                <span v-else>—</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="paginate">
            <el-pagination
              v-model:current-page="currentPage5"
              v-model:page-size="pageSize5"
              :page-sizes="[5, 10, 20, 30]"
              :size="size1"
              :disabled="disabled1"
              :background="background1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalItems"
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  :deep(.el-tabs__header) {
    display: none;
  }

  .select-boxn {
    position: absolute;
    left: 250px;
    width: 125px !important;
    height: 29px !important;
    padding: 3px 2px 3px 2px;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    letter-spacing: normal;
    color: #7F7F7F;
    z-index: 99;
  }

  .monthlyStatistics {
    position: relative;
    border: 1px solid rgba(215, 215, 215, 1);
    border-radius: 9px;
    box-shadow: 3px 3px 4px rgba(219, 219, 219, 0.184313725490196);
    box-sizing: border-box;
    background: inherit;
    height: 233px;
  }

  .country-box {
    background-color: rgba(242, 242, 242, 1);
    padding: 20px 30px 10px 30px;
    border-radius: 10px;
    margin-bottom: 30px;
  }

  .wax-box {
    // width: 200px;
    height: 246px;
  }

  .waxMaterial {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    color: #333333;
    margin-bottom: 10px;
  }

  .statistics-box {
    margin-bottom: 5px;
    margin-left: 15px;
  }

  .statistics-icon {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-align: right;
    line-height: 22px;
    color: #FF5D5D;
  }

  .statistics-content {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    text-align: right;
    line-height: 22px;
    color: #555555;
  }

  .lineBox {
    border: 1px solid #F2F2F2;
  }




  .waxco {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 36px;
    color: #333333;
  }

  .wacBox {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #333333;
  }

  .waxConsumption {
    border: 1px solid rgba(215, 215, 215, 1);
    border-radius: 13px;
    width: 270px;
    height: 207px;
    box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.349019607843137);
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
  }

  .consumption-box {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .number-box {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
    color: #333333;
    padding-left: 3px;
  }

  .number-box-one {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
    color: #333333;
  }

  .title-box {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    color: #333333;
  }

  .consumption {
    border: 1px solid rgba(121, 121, 121, 1);
    width: 285px;
    height: 108px;
    padding-left: 5px;
    padding-right: 5px;
  }

  :deep(.el-breadcrumb) {
    border-left: 4px solid rgba(64, 158, 255, 1);
    padding-left: 15px;
  }

  .customerDetails {
    padding: 15px 30px 15px 30px;
    height: calc(100vh - 60px);
  }

  .customer-title {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    color: #5B5E68;
    margin-bottom: 10px;
  }

  .customer-address {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: #5B5E68;
  }

  .customer-address-content {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #5B5E68;
  }

  .customer-content {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .customer-first {
    margin-bottom: 5px;
  }

  .card-first {
    display: flex;
    justify-content: center;
    width: 164px;
    height: 127px;
    background: inherit;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 24px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
  }

  .card-first span:nth-child(1) {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #333333;
    width: 90px;
    text-align: center;
    position: relative;
    top: 10px;
  }

  .card-first span:nth-child(2) {
    font-family: 'PingFang TC ', 'PingFang TC', sans-serif;
    font-weight: 400;
    font-size: 48px;
    color: #7F7F7F;
  }

  .card-second {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 404px;
    height: 127px;
    background: inherit;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 24px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
  }

  .card-three {
    width: 278px;
  }

  .card-second-title {
    margin-bottom: 5px;
    margin-top: 10px;
  }

  .card-second-title span:nth-child(1) {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #333333;
  }

  .card-second-title span:nth-child(2) {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #333333;
  }

  .cardContet span:nth-child(1) {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #333333;
  }

  .cardContet span:nth-child(2) {
    font-family: 'PingFang TC ', 'PingFang TC', sans-serif;
    font-weight: 400;
    font-size: 48px;
    color: #D9001B;
  }

  .line-box {
    width: 1.5px;
    height: 48px;
    background-color: #3333;
    margin-left: 10px;
    margin-right: 10px;
  }

  .cardColor {
    color: #7F7F7F !important;
  }

  .line-first {
    margin-left: 20px !important;
    margin-right: 20px !important;
  }

  :deep(.el-table .cell) {
    text-align: center;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
    background-color: rgba(0, 0, 255, 1);
    color: #ffffff;
  }

  :deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
    background-color: #F2F2F2;
  }

  .table-box {
    border: 1px solid rgba(121, 121, 121, 1);
    border-radius: 9px;
    padding: 15px 15px 20px 15px;
  }

  .card-code {
    margin-bottom: 20px;
  }

  :deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
    border-radius: 8px 8px 0 0;
  }

  :deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
    border: none;
  }

  :deep(.el-tabs__header .el-tabs__item.is-active) {
    border: none;
  }

  .table-box-first {
    margin-bottom: 20px;
    border: 1px solid rgba(121, 121, 121, 1);
    border-radius: 9px;
    padding: 15px 15px 20px 15px
  }

  .select-box {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #232B40;
    line-height: 22px;
    font-size: 14px;
    margin-right: 10px;
  }

  .button-first {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #FFFFFF;
    width: 119px;
    background-color: rgba(22, 155, 213, 1);
    border-radius: 5px;
  }

  .button-second {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #FFFFFF;
    width: 119px;
    background-color: rgba(22, 155, 213, 1);
    border-radius: 5px;
  }

  .button-three {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: rgba(121, 121, 121, 1);
    width: 119px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
  }

  .el-select {
    margin-right: 30px;
  }

  .line-box-first {
    width: 100%;
    height: 2px;
    background-color: #F2F2F2;
    margin-top: 15px;
  }

  .equipment-type {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #232B40;
    line-height: 22px;
    font-size: 14px;
    margin-right: 20px;
  }

  .equipment-type-first {
    margin-left: 13px;
  }

  .button-one {
    margin-left: 0px;
  }

  .button-one-size {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 22px;
    background-color: rgba(24, 144, 255, 1);
    width: 93px;
    height: 36px;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .button-two-size {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #555555;
    line-height: 22px;
    background-color: rgba(255, 255, 255, 1);
    width: 93px;
    height: 36px;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .button-three-size {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #555555;
    line-height: 22px;
    background-color: rgba(255, 255, 255, 1);
    width: 93px;
    height: 36px;
    border-radius: 5px;
  }
</style>