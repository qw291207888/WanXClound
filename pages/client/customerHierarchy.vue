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
    id: number;
    name: string;
    country: string;
    email: string;
    device_num: string;
    card_num: string;
    equipmentGoodsFleeingAlarm: string;
    WaxmaterialFleeingAlarm: string;
    equipmentFaultAlarm: string;
    falseAlarm: string;
  }

  const tableData = ref([])
  const rawData = ref([]) 

  const totalItems = ref(0);

  import { ref, computed, watch, onMounted } from 'vue'
  import type { ComponentSize, ElTable } from 'element-plus'
  import { utils, writeFile } from 'xlsx'
  import { ElTree } from 'element-plus'

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

  watch(tableData, () => {
    // currentPage4.value = 1
  })

  const handleSizeChange = async (val: number) => {
    pageSize4.value = val
    
    console.log(`${val} items per page`)
    const pageId = currentPage4.value
    const pageSize = pageSize4.value
    const distributorIds: number[] = selectedKeys.value
    console.log(distributorIds)
    try {
      const response = await getCustomerHierarchy(pageId, pageSize, distributorIds);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)
      totalItems.value = response.data.total;

      if (response.data.list === null) {
        tableData.value = []
        return
      }

      const dataList = response.data.list.map((item: { 
        id: string;
        name: string;
        country: string;
        email: string;
        device_num: number;
        card_num: number;
        alert_num_stats: { list: any[]; };
      }) => {
        const alertInfo = processAlertNumStats(item.alert_num_stats);
  
        return {
          id: item.id,
          name: item.name || '—',
          country: item.country || '—',
          email: item.email || '—',
          device_num: item.device_num || '—',
          card_num: item.card_num || '—',
          equipmentGoodsFleeingAlarm: alertInfo.equipmentGoodsFleeingAlarm || '—',
          WaxmaterialFleeingAlarm: alertInfo.WaxmaterialFleeingAlarm || '—',
          equipmentFaultAlarm: alertInfo.equipmentFaultAlarm || '—',
          falseAlarm: alertInfo.falseAlarm || '—'
        };
      });

      tableData.value = dataList
      rawData.value = dataList
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }
    currentPage4.value = 1
  }

  const handleCurrentChange = async (val: number) => {
    currentPage4.value = val
    console.log(`current page: ${val}`)
    const pageId = currentPage4.value
    const pageSize = pageSize4.value
    const distributorIds: number[] = selectedKeys.value
    console.log(distributorIds)
    try {
      const response = await getCustomerHierarchy(pageId, pageSize, distributorIds);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)
      totalItems.value = response.data.total;

      if (response.data.list === null) {
        tableData.value = []
        return
      }

      const dataList = response.data.list.map((item: { 
        id: string;
        name: string;
        country: string;
        email: string;
        device_num: number;
        card_num: number;
        alert_num_stats: { list: any[]; };
      }) => {
        const alertInfo = processAlertNumStats(item.alert_num_stats);
  
        return {
          id: item.id,
          name: item.name || '—',
          country: item.country || '—',
          email: item.email || '—',
          device_num: item.device_num || '—',
          card_num: item.card_num || '—',
          equipmentGoodsFleeingAlarm: alertInfo.equipmentGoodsFleeingAlarm || '—',
          WaxmaterialFleeingAlarm: alertInfo.WaxmaterialFleeingAlarm || '—',
          equipmentFaultAlarm: alertInfo.equipmentFaultAlarm || '—',
          falseAlarm: alertInfo.falseAlarm || '—'
        };
      });

      tableData.value = dataList
      rawData.value = dataList

      console.log(currentPage4.value)
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }
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
  }

  const exportToExcel = () => {
    const headerMap = {
      name: '客户名称',
      country: '国家/城市',
      email: '邮箱地址',
      device_num: '购入设备总数',
      card_num: '购入蜡材总数',
      equipmentGoodsFleeingAlarm: '设备窜货报警总数',
      WaxmaterialFleeingAlarm: '蜡材窜货报警总数',
      equipmentFaultAlarm: '设备故障报警总数',
      falseAlarm: '蜡材用伪报警总数'
    };

    const dataWithChineseHeaders = multipleSelection.value.map((item) => {
      return {
        [headerMap.name]: item.name,
        [headerMap.country]: item.country,
        [headerMap.email]: item.email,
        [headerMap.device_num]: item.device_num,
        [headerMap.card_num]: item.card_num,
        [headerMap.equipmentGoodsFleeingAlarm]: item.equipmentGoodsFleeingAlarm,
        [headerMap.WaxmaterialFleeingAlarm]: item.WaxmaterialFleeingAlarm,
        [headerMap.equipmentFaultAlarm]: item.equipmentFaultAlarm,
        [headerMap.falseAlarm]: item.falseAlarm,
      };
    });

    const ws = utils.json_to_sheet(dataWithChineseHeaders)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Sheet1')
    writeFile(wb, '客户层级结构.xlsx')
  }

  const multipleTableRef = ref<InstanceType<typeof ElTable>>()
  const multipleSelection = ref<TableData[]>([])

  const handleSelectionChange = (selection: TableData[]) => {
    multipleSelection.value = selection
  }

  const defaultProps = {
    children: 'children',
    label: 'label',
    isLeaf: (data: any, node: any) => node.level === 1,
    disabled: (data: any, node: any) => node.level === 1,
  }

  const treeData = ref([
    {
      id: 1,
      label: '欧非区',
      children: [
        { id: 4, label: '土耳其', code: 'TR', children: [] },
        { id: 5, label: '德国', code: 'DE', children: [] },
        { id: 6, label: '法国', code: 'FR', children: [] },
        { id: 7, label: '意大利', code: 'IT', children: [] },
        { id: 8, label: '瑞典(北欧）', code: 'SE', children: [] },
        { id: 9, label: '西班牙', code: 'ES', children: [] },
        { id: 10, label: '荷兰', code: 'NL', children: [] },
        { id: 11, label: '埃及', code: 'EG', children: [] },
        { id: 12, label: '英国', code: 'GB', children: [] },
        { id: 13, label: '波兰', code: 'PL', children: [] },
        { id: 14, label: '摩洛哥', code: 'MA', children: [] },
        { id: 15, label: '瑞士', code: 'CH', children: [] },
        { id: 16, label: '俄罗斯', code: 'RU', children: [] },
        { id: 17, label: '比利时', code: 'BE', children: [] },
        { id: 18, label: '希腊', code: 'GR', children: [] },
        { id: 19, label: '塞尔维亚', code: 'RS', children: [] },
        { id: 20, label: '亚美尼亚/保加利亚', code: 'AM/BG', children: [] }
      ]
    },
    {
      id: 2,
      label: '亚太区',
      children: [
        { id: 21, label: '香港', code: 'HK', children: [] },
        { id: 22, label: '东南亚', children: [] }, // 东南亚可能是一个区域，因此可能没有缩写
        { id: 23, label: '日本', code: 'JP', children: [] },
        { id: 24, label: '韩国', code: 'KR', children: [] },
        { id: 25, label: '澳大利亚与新西兰', code: 'AU/NZ', children: [] },
        { id: 26, label: '印度', code: 'IN', children: [] },
        { id: 27, label: '泰国', code: 'TH', children: [] },
        { id: 28, label: '新加坡', code: 'SG', children: [] },
        { id: 29, label: '越南', code: 'VN', children: [] },
        { id: 30, label: '马来西亚', code: 'MY', children: [] },
        { id: 31, label: '菲律宾', code: 'PH', children: [] },
        { id: 32, label: '印度尼西亚', code: 'ID', children: [] }
      ]
    },
    {
      id: 3,
      label: '美洲区',
      children: [
        { id: 33, label: '美国', code: 'US', children: [] },
        { id: 34, label: '加拿大', code: 'CA', children: [] },
        { id: 35, label: '墨西哥', code: 'MX', children: [] },
        { id: 36, label: '哥伦比亚', code: 'CO', children: [] },
        { id: 37, label: '巴西', code: 'BR', children: [] },
        { id: 38, label: '智利', code: 'CL', children: [] },
        { id: 39, label: '阿根廷', code: 'AR', children: [] }
      ]
    }
  ]);

  import { useRegisterApi } from '~/composables/user';
  const { getDealerNameList, getCustomerHierarchy } = useRegisterApi();

  const fetchChildrenForCountry = async (country: { id: number; label: string; code: string; children: never[]; }) => {
    try {
      const response = await getDealerNameList(country.code);  // 使用国家的缩写
      return response.data.list.map((dealer: { id: any; name: any; }) => ({
        id: dealer.id,
        label: dealer.name,
        children: []  // 如果有子数据再处理
      }));
    } catch (error) {
      console.error(`Failed to fetch children for ${country.label}:`, error);
      return [];
    }
  };

  const updateTreeData = async () => {
    for (const region of treeData.value) {
      for (const country of region.children) {
        if (country.code) {
          country.children = await fetchChildrenForCountry(country);
        } 
  
        // 如果没有code字段，跳过或处理其他特殊情况
        else {
          console.warn(`No code for country ${country.label}, skipping...`);
        }
      }
    }

    setAllCheckedKeys(treeData.value);
  };

  const processAlertNumStats = (alertNumStats: { list: any[]; }) => {
    const result = {
      equipmentGoodsFleeingAlarm: '',
      WaxmaterialFleeingAlarm: '',
      equipmentFaultAlarm: '',
      falseAlarm: ''
    };
  
    if (alertNumStats && Array.isArray(alertNumStats.list)) {
      alertNumStats.list.forEach((alert: { type: any; num: string; }) => {
        switch (alert.type) {
          case 1:
            result.equipmentFaultAlarm = alert.num;
            break;
          case 2:
            result.WaxmaterialFleeingAlarm = alert.num;
            break;
          case 3:
            result.equipmentGoodsFleeingAlarm = alert.num;
            break;
          case 4:
            result.falseAlarm = alert.num;
            break;
        }
      });
    }
  
    return result;
  };


  type TreeNode = {
    id: number;
    label: string;
    code?: string;
    children: TreeNode[];
  };
  
  
  onMounted(async() => {
    setAllCheckedKeys(treeData.value);
    updateTreeData();
    
    // const pageId = currentPage4.value
    // const pageSize = pageSize4.value
    // const distributorIds: number[] = [1]
    // console.log(distributorIds)
    // try {
    //   const response = await getCustomerHierarchy(pageId, pageSize, distributorIds);
    //   console.log('User account details fetched successfully:', response);
    //   console.log(response.data.list)

    //   if (response.data.list === null) {
    //     tableData.value = []
    //     return
    //   }

    //   const dataList = response.data.list.map((item: { 
    //     id: string;
    //     name: string;
    //     country: string;
    //     email: string;
    //     device_num: number;
    //     card_num: number;
    //     alert_num_stats: { list: any[]; };
    //   }) => {
    //     const alertInfo = processAlertNumStats(item.alert_num_stats);
  
    //     return {
    //       id: item.id,
    //       name: item.name || '—',
    //       country: item.country || '—',
    //       email: item.email || '—',
    //       device_num: item.device_num || '—',
    //       card_num: item.card_num || '—',
    //       equipmentGoodsFleeingAlarm: alertInfo.equipmentGoodsFleeingAlarm || '—',
    //       WaxmaterialFleeingAlarm: alertInfo.WaxmaterialFleeingAlarm || '—',
    //       equipmentFaultAlarm: alertInfo.equipmentFaultAlarm || '—',
    //       falseAlarm: alertInfo.falseAlarm || '—'
    //     };
    //   });

    //   tableData.value = dataList
    //   rawData.value = dataList
    // } catch (err) {
    //   console.error('Failed to fetch account details:', err);
    // }
  });

  interface Tree {
    setCheckedKeys: (keys: any[]) => void;
    getCheckedKeys: () => any[]; // 根据实际返回类型进行修改
  }

  const allCheckedKeys: Ref<any[]> = ref([]);
  const tree = ref<Tree | null>(null);
  const selectedKeys = ref<any[]>([]); // 用于存储选中的节点

  // 获取并设置所有节点的 ID
  const setAllCheckedKeys = (data: TreeNode[]) => {
    const keys: number[] = [];
    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        keys.push(node.id);
        if (Array.isArray(node.children) && node.children.length > 0) {
          traverse(node.children);
        }
      });
    };
    traverse(data);
    allCheckedKeys.value = keys;
  };
  
  // 获取所有节点的ID
  const getAllNodeKeys = (nodes: any[]) => {
    let keys: any[] = []
    nodes.forEach(node => {
      keys.push(node.id)
      if (node.children && node.children.length > 0) {
        keys = keys.concat(getAllNodeKeys(node.children))
      }
    })
    return keys
  }
  
  const handleCheckChange = async () => {
    if (tree.value != null) {
      // selectedKeys.value = tree.value.getCheckedKeys()
      // console.log(selectedKeys.value)
      let keys = tree.value.getCheckedKeys();

      selectedKeys.value = keys.filter(key => {
        const numericKey = parseInt(key as string, 10); // 将key转换为数字
        return isNaN(numericKey) || numericKey < 1 || numericKey > 39; // 过滤条件
      });

      const pageId = currentPage4.value
    const pageSize = pageSize4.value
    const distributorIds: number[] = selectedKeys.value
    console.log(distributorIds)
    try {
      const response = await getCustomerHierarchy(pageId, pageSize, distributorIds);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list)
      totalItems.value = response.data.total;

      if (response.data.list === null) {
        tableData.value = []
        return
      }

      const dataList = response.data.list.map((item: { 
        id: string;
        name: string;
        country: string;
        email: string;
        device_num: number;
        card_num: number;
        alert_num_stats: { list: any[]; };
      }) => {
        const alertInfo = processAlertNumStats(item.alert_num_stats);
  
        return {
          id: item.id,
          name: item.name || '—',
          country: item.country || '—',
          email: item.email || '—',
          device_num: item.device_num || '—',
          card_num: item.card_num || '—',
          equipmentGoodsFleeingAlarm: alertInfo.equipmentGoodsFleeingAlarm || '—',
          WaxmaterialFleeingAlarm: alertInfo.WaxmaterialFleeingAlarm || '—',
          equipmentFaultAlarm: alertInfo.equipmentFaultAlarm || '—',
          falseAlarm: alertInfo.falseAlarm || '—'
        };
      });

      tableData.value = dataList
      rawData.value = dataList
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }
  
      console.log('过滤后的选中节点ID:', selectedKeys.value);
    }
  }

  const resetClick = () => {
    allCheckedKeys.value = getAllNodeKeys(treeData.value) 
  }
</script>

<template>
  <div class="client-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户层级结构</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tabel-box">
      <div class="flex items-center" style="margin-bottom: 1.75rem;">
        <el-button
          @click="resetClick"
          class="resetButton"
        >重置</el-button>
        <el-button 
          @click="exportToExcel"
          class="deriveButton"
        >导出Excel</el-button>
      </div>
      <div class="flex justify-between">
        <div>
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[1,2,3]"
            :default-checked-keys="allCheckedKeys"
            :props="defaultProps"
            ref="tree"
            @check-change="handleCheckChange"
          />
        </div>
        <div style="width: 80%;">
          <el-table
            ref="multipleTableRef"
            :data="paginatedData"
            border
            style="width: 100%;"
            @sort-change="handleSortChange"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="客户名称" width="105">
              <template #default="{ row, column, $index }">
                <span>{{ row.name !== '' ? row.name : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="country" label="国家/城市" width="153">
              <template #default="{ row, column, $index }">
                <span>{{ row.country !== '' ? row.country : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱地址" width="414">
              <template #default="{ row, column, $index }">
                <span>{{ row.email !== '' ? row.email : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="device_num" label="购入设备总数" width="205">
              <template #default="{ row, column, $index }">
                <span>{{ row.device_num !== '' ? row.device_num : '—' }}</span>
              </template>
            </el-table-column>>
            <el-table-column prop="card_num" label="购入蜡材总数" sortable width="205">
              <template #default="{ row, column, $index }">
                <span>{{ row.card_num !== '' ? row.card_num : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="equipmentGoodsFleeingAlarm" label="设备窜货报警总数" width="377">
              <template #default="{ row, column, $index }">
                <span>{{ row.equipmentGoodsFleeingAlarm !== '' ? row.equipmentGoodsFleeingAlarm : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WaxmaterialFleeingAlarm" label="蜡材窜货报警总数" sortable width="205">
              <template #default="{ row, column, $index }">
                <span>{{ row.WaxmaterialFleeingAlarm !== '' ? row.WaxmaterialFleeingAlarm : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="equipmentFaultAlarm" label="设备故障报警总数" width="377">
              <template #default="{ row, column, $index }">
                <span>{{ row.equipmentFaultAlarm !== '' ? row.equipmentFaultAlarm : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="falseAlarm" label="蜡材用伪报警总数" width="377">
              <template #default="{ row, column, $index }">
                <span>{{ row.falseAlarm !== '' ? row.falseAlarm : '—' }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="137">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClick(scope.row)" class="checkDealer">
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
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    border-left: 0.1875rem solid rgb(0, 160, 233);
    padding-left: 0.5rem;
    margin-bottom: 2.5rem;
  }

  .client-box {
    padding: 15px;
    // height: calc(100vh - 5.5rem);
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

  :deep(.el-checkbox__input.is-disabled .el-checkbox__inner) {
    display: none;
  }

  .button-box {
    border-bottom: 2px solid #333333;
    padding-bottom: 10px;
  }

  .tabel-box {
    background: rgb(255, 255, 255);
    border-radius: 1.25rem;
    padding: 2rem;
  }

  .resetButton {
    width: 5rem;
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
    margin-left: 1.25rem;
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
 
  :deep(.el-tree-node__label) {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }
</style>