<script lang="ts" setup>
  definePageMeta({
    layout: 'system',
    middleware: 'auth'
  })

  const handleClick = () => {
    console.log('click')
  }
  
  const tableData = ref([
    {
      name: '张三',
      email: 'test-1@flashforge.com',
      phone: '13684950784',
      company: 'XX公司/产品',
      role_id: '系统管理员',
      status: '正常'
    },
    {
      name: '李四',
      email: 'test-2@flashforge.com',
      phone: '',
      company: 'XX公司/产品',
      role_id: '系统管理员',
      status: '禁用'
    },
    {
      name: '王五',
      email: 'test-3@flashforge.com',
      phone: '',
      company: 'XX公司/产品',
      role_id: '后期开发-市场/售后',
      status: '过期'
    },
    {
      name: '张三',
      email: 'test-1@flashforge.com',
      phone: '13684950784',
      company: 'XX公司/产品',
      role_id: '系统管理员',
      status: '正常'
    },
    {
      name: '李四',
      email: 'test-2@flashforge.com',
      phone: '',
      company: 'XX公司/产品',
      role_id: '系统管理员',
      status: '禁用'
    },
    {
      name: '王五',
      email: 'test-3@flashforge.com',
      phone: '',
      company: 'XX公司/产品',
      role_id: '后期开发-市场/售后',
      status: '过期'
    },
    {
      name: '王五',
      email: 'test-3@flashforge.com',
      phone: '',
      company: 'XX公司/产品',
      role_id: '后期开发-市场/售后',
      status: '过期'
    }
  ])

  import { ref, computed, onMounted } from 'vue';

  import type { ComponentSize } from 'element-plus'

  const currentPage = ref(1)

  const pageSize = ref(10)
  const total = ref(0);
  
  const size = ref<ComponentSize>('default')
  const background = ref(false)
  const disabled = ref(false)

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return tableData.value.slice(start, end);
  });
  
  const handleSizeChange = (size: number) => {
    pageSize.value = size;
    currentPage.value = 1; // 重置到第一页
  };
  
  const handleCurrentChange = (page: number) => {
    currentPage.value = page;
  };

  onMounted(() => {
    total.value = tableData.value.length;
  });

  const inputloginAccount = ref('')

  const inputNameOfUser = ref('')

  const value = ref('')
  
  const options = [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
    {
      value: 'Option4',
      label: 'Option4',
    },
    {
      value: 'Option5',
      label: 'Option5',
    },
  ]

  import type { TabsPaneContext } from 'element-plus'
  
  const activeName = ref('first')
  
  const handleClickOne = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }

  const circleUrl = ref('/breakdown.png')
  const circleUrlOne = ref('/flee_goods.png')
  const circleUrlTwo = ref('/use_falsehood.png')
  const circleUrlThree = ref('/system.png')

  const currentPage4 = ref(1)
  const pageSize4 = ref(5)
  const size1 = ref<ComponentSize>('default')
  const background1 = ref(false)
  const disabled1 = ref(false)


  const news = ref([
    {
      circleUrl: '/breakdown.png', title: '告警消息', time: '10分钟前', 
      info1: '型号WJ400，MAC地址X2-5P-QQ-EA-ER-BO', info2: '设备发生', 
      info3: '打印机故障', info4: '，请及时处理！', buttonText: '查看'
    },
    {
      circleUrl: '/flee_goods.png', title: '告警消息', time: '30分钟前', 
      info1: '蜡材UID 3w5e6s9a11', info2: '设备发生', 
      info3: '蜡材窜货', info4: '，请及时处理！', buttonText: '查看'
    },
    {
      circleUrl: '/flee_goods.png', title: '告警消息', time: '1小时前', 
      info1: '型号WJ510，MAC地址X2-5P-QQ-EA-ER-BO', info2: '设备发生', 
      info3: '打印机故障', info4: '，请及时处理！', buttonText: '查看'
    },
    {
      circleUrl: '/use_falsehood.png', title: '告警消息', time: '4小时前', 
      info1: '蜡材UID: 4e5s9f2o0q', info2: '设备发生', 
      info3: '蜡材用伪', info4: '，请及时处理！', buttonText: '查看'
    },
    {
      circleUrl: '/system.png', title: '系统消息', time: '4小时前', 
      info1: '', info2: '', info3: '', 
      info4: 'Waxcoud设备综合管理云平台将于北京时间 00:10 am 进行数据库升级，升级时间预计为4小时，期间数据库服务信用，待升级结束后恢复使用。请各位及时调整工作安排，防止升级期间影响工作推进! 谢谢配合!', buttonText: ''
    },
    {
      circleUrl: '/system.png', title: '系统消息', time: '4小时前', 
      info1: '', info2: '', info3: '', 
      info4: 'Waxcoud设备综合管理云平台将于北京时间 00:10 am 进行数据库升级，升级时间预计为4小时，期间数据库服务信用，待升级结束后恢复使用。请各位及时调整工作安排，防止升级期间影响工作推进! 谢谢配合!', buttonText: ''
    }
  ]);

  const paginatedData1 = computed(() => {
    const start = (currentPage4.value - 1) * pageSize4.value;
    const end = start + pageSize4.value;
    return news.value.slice(start, end);
  });

  const handleSizeChange1 = (val: number) => {
    pageSize4.value = val
    currentPage4.value = 1
    console.log(`${val} items per page`)
  }
  const handleCurrentChange1 = (val: number) => {
    currentPage4.value = val
    console.log(`current page: ${val}`)
  }

  const currentPage5 = ref(1)
  const pageSize5 = ref(5)
  const size2 = ref<ComponentSize>('default')
  const background2 = ref(false)
  const disabled2 = ref(false)


  const news2 = ref([
    {
      circleUrl: '/breakdown.png', title: '告警消息', time: '10分钟前', 
      info1: '型号WJ400，MAC地址X2-5P-QQ-EA-ER-BO', info2: '设备发生', 
      info3: '打印机故障', info4: '，请及时处理！', buttonText: '查看'
    },
    {
      circleUrl: '/flee_goods.png', title: '告警消息', time: '30分钟前', 
      info1: '蜡材UID 3w5e6s9a11', info2: '设备发生', 
      info3: '蜡材窜货', info4: '，请及时处理！', buttonText: '查看'
    },
    {
      circleUrl: '/flee_goods.png', title: '告警消息', time: '1小时前', 
      info1: '型号WJ510，MAC地址X2-5P-QQ-EA-ER-BO', info2: '设备发生', 
      info3: '打印机故障', info4: '，请及时处理！', buttonText: '查看'
    },
    {
      circleUrl: '/use_falsehood.png', title: '告警消息', time: '4小时前', 
      info1: '蜡材UID: 4e5s9f2o0q', info2: '设备发生', 
      info3: '蜡材用伪', info4: '，请及时处理！', buttonText: '查看'
    }
  ]);

  const paginatedData2 = computed(() => {
    const start = (currentPage5.value - 1) * pageSize5.value;
    const end = start + pageSize5.value;
    return news2.value.slice(start, end);
  });

  const handleSizeChange2 = (val: number) => {
    pageSize5.value = val
    currentPage5.value = 1
    console.log(`${val} items per page`)
  }
  const handleCurrentChange2 = (val: number) => {
    currentPage5.value = val
    console.log(`current page: ${val}`)
  }

  const currentPage6 = ref(1)
  const pageSize6 = ref(5)
  const size3 = ref<ComponentSize>('default')
  const background3 = ref(false)
  const disabled3 = ref(false)


  const news3 = ref([
    {
      circleUrl: '/system.png', title: '系统消息', time: '4小时前', 
      info1: '', info2: '', info3: '', 
      info4: 'Waxcoud设备综合管理云平台将于北京时间 00:10 am 进行数据库升级，升级时间预计为4小时，期间数据库服务信用，待升级结束后恢复使用。请各位及时调整工作安排，防止升级期间影响工作推进! 谢谢配合!', buttonText: ''
    },
    {
      circleUrl: '/system.png', title: '系统消息', time: '4小时前', 
      info1: '', info2: '', info3: '', 
      info4: 'Waxcoud设备综合管理云平台将于北京时间 00:10 am 进行数据库升级，升级时间预计为4小时，期间数据库服务信用，待升级结束后恢复使用。请各位及时调整工作安排，防止升级期间影响工作推进! 谢谢配合!', buttonText: ''
    },
    {
      circleUrl: '/system.png', title: '系统消息', time: '4小时前', 
      info1: '', info2: '', info3: '', 
      info4: 'Waxcoud设备综合管理云平台将于北京时间 00:10 am 进行数据库升级，升级时间预计为4小时，期间数据库服务信用，待升级结束后恢复使用。请各位及时调整工作安排，防止升级期间影响工作推进! 谢谢配合!', buttonText: ''
    },
    {
      circleUrl: '/system.png', title: '系统消息', time: '4小时前', 
      info1: '', info2: '', info3: '', 
      info4: 'Waxcoud设备综合管理云平台将于北京时间 00:10 am 进行数据库升级，升级时间预计为4小时，期间数据库服务信用，待升级结束后恢复使用。请各位及时调整工作安排，防止升级期间影响工作推进! 谢谢配合!', buttonText: ''
    },
    {
      circleUrl: '/system.png', title: '系统消息', time: '4小时前', 
      info1: '', info2: '', info3: '', 
      info4: 'Waxcoud设备综合管理云平台将于北京时间 00:10 am 进行数据库升级，升级时间预计为4小时，期间数据库服务信用，待升级结束后恢复使用。请各位及时调整工作安排，防止升级期间影响工作推进! 谢谢配合!', buttonText: ''
    },
    {
      circleUrl: '/system.png', title: '系统消息', time: '4小时前', 
      info1: '', info2: '', info3: '', 
      info4: 'Waxcoud设备综合管理云平台将于北京时间 00:10 am 进行数据库升级，升级时间预计为4小时，期间数据库服务信用，待升级结束后恢复使用。请各位及时调整工作安排，防止升级期间影响工作推进! 谢谢配合!', buttonText: ''
    },
    {
      circleUrl: '/system.png', title: '系统消息', time: '4小时前', 
      info1: '', info2: '', info3: '', 
      info4: 'Waxcoud设备综合管理云平台将于北京时间 00:10 am 进行数据库升级，升级时间预计为4小时，期间数据库服务信用，待升级结束后恢复使用。请各位及时调整工作安排，防止升级期间影响工作推进! 谢谢配合!', buttonText: ''
    },
  ]);

  const paginatedData3 = computed(() => {
    const start = (currentPage6.value - 1) * pageSize6.value;
    const end = start + pageSize6.value;
    return news3.value.slice(start, end);
  });

  const handleSizeChange3 = (val: number) => {
    pageSize6.value = val
    currentPage6.value = 1
    console.log(`${val} items per page`)
  }
  const handleCurrentChange3 = (val: number) => {
    currentPage6.value = val
    console.log(`current page: ${val}`)
  }
</script>

<template>
  <div class="accountManagement flex flex-col">
    <div class="flex justify-between">
      <span class="accountManagementBox flex items-center">系统管理 / 消息中心</span>
      <span class="dateTime">2024年7月25日星期四 15:16</span>
    </div>
    <div class="formBox flex-1">
      <div class="message-settings">
        <el-button>消息设置</el-button>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClickOne">
        <el-tab-pane label="全部消息" name="first">
          <ul>
            <li
              v-for="(item, index) in paginatedData1"
              :key="index"
              class="flex justify-between items-center news-box"
            >
              <div class="flex items-center gap-5">
                <div class="flex items-center justify-center">
                  <el-avatar :size="48" :src="item.circleUrl" />
                </div>
                <div>
                  <div style="margin-bottom: 0.5rem;">
                    <span class="breakdown-title">{{ item.title }}</span>
                    <span class="breakdown-time">{{ item.time }}</span>
                  </div>
                  <div>
                    <span class="breakdown-first">{{ item.info1 }}</span>
                    <span class="breakdown-second">{{ item.info2 }}</span>
                    <span class="breakdown-three">{{ item.info3 }}</span>
                    <span class="breakdown-second">{{ item.info4 }}</span>
                  </div>
                </div>
              </div>
              <div>
                <el-button class="button-Box">{{ item.buttonText }}</el-button>
              </div>
            </li>
          </ul>
          <el-pagination
            v-model:current-page="currentPage4"
            v-model:page-size="pageSize4"
            :page-sizes="[5, 10, 20, 30]"
            :size="size1"
            :disabled="disabled1"
            :background="background1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="news.length"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
          />
        </el-tab-pane>
        <el-tab-pane label="告警消息" name="second">
          <ul>
            <li
              v-for="(item, index) in paginatedData2"
              :key="index"
              class="flex justify-between items-center news-box"
            >
              <div class="flex items-center gap-5">
                <div class="flex items-center justify-center">
                  <el-avatar :size="48" :src="item.circleUrl" />
                </div>
                <div>
                  <div style="margin-bottom: 0.5rem;">
                    <span class="breakdown-title">{{ item.title }}</span>
                    <span class="breakdown-time">{{ item.time }}</span>
                  </div>
                  <div>
                    <span class="breakdown-first">{{ item.info1 }}</span>
                    <span class="breakdown-second">{{ item.info2 }}</span>
                    <span class="breakdown-three">{{ item.info3 }}</span>
                    <span class="breakdown-second">{{ item.info4 }}</span>
                  </div>
                </div>
              </div>
              <div>
                <el-button class="button-Box">{{ item.buttonText }}</el-button>
              </div>
            </li>
          </ul>
          <el-pagination
            v-model:current-page="currentPage5"
            v-model:page-size="pageSize5"
            :page-sizes="[5, 10, 20, 30]"
            :size="size2"
            :disabled="disabled2"
            :background="background2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="news2.length"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
          />
        </el-tab-pane>
        <el-tab-pane label="系统消息" name="third">
          <ul>
            <li
              v-for="(item, index) in paginatedData3"
              :key="index"
              class="flex justify-between items-center news-box"
            >
              <div class="flex items-center gap-5">
                <div class="flex items-center justify-center">
                  <el-avatar :size="48" :src="item.circleUrl" />
                </div>
                <div>
                  <div style="margin-bottom: 0.5rem;">
                    <span class="breakdown-title">{{ item.title }}</span>
                    <span class="breakdown-time">{{ item.time }}</span>
                  </div>
                  <div>
                    <span class="breakdown-first">{{ item.info1 }}</span>
                    <span class="breakdown-second">{{ item.info2 }}</span>
                    <span class="breakdown-three">{{ item.info3 }}</span>
                    <span class="breakdown-second">{{ item.info4 }}</span>
                  </div>
                </div>
              </div>
              <div>
                <el-button class="button-Box">{{ item.buttonText }}</el-button>
              </div>
            </li>
          </ul>
          <el-pagination
            v-model:current-page="currentPage6"
            v-model:page-size="pageSize6"
            :page-sizes="[5, 10, 20, 30]"
            :size="size3"
            :disabled="disabled3"
            :background="background3"
            layout="total, sizes, prev, pager, next, jumper"
            :total="news3.length"
            @size-change="handleSizeChange3"
            @current-change="handleCurrentChange3"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .message-settings {
    position: absolute;
    right: 3.75rem;
    top: 27px;
    z-index: 99;
  }

  :deep(.message-settings .el-button>span) {
    color: rgb(255, 255, 255);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  :deep(.message-settings .el-button) {
    width: 7rem;
    height: 2.6875rem;
    background: rgb(0, 160, 233);
    border-radius: 0.5rem;
  }

  ul {
    max-height: 367.5px;
    overflow: auto;
  }

  :deep(.el-tabs__header) {
    margin-bottom: 0.5rem;
  }

  .news-box {
    border-bottom: 1px solid rgb(237, 237, 237);
    padding-bottom: 1.5rem;
    margin-top: 1.5rem;
  }

  .button-Box {
    color: rgb(0, 160, 233);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    border: none;
  }

  .breakdown-first {
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    color: rgb(0, 160, 233);
  }

  .breakdown-second {
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    color: rgb(51, 51, 51);
  }

  .breakdown-three {
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    color: rgb(235, 85, 87);
  }

  .breakdown-time {
    color: rgb(170, 172, 181);
    font-family: HarmonyOS Sans;
    font-size: 0.875rem;
    font-weight: 400;
    line-height:1rem;
  }

  .breakdown-title {
    color: rgb(129, 129, 129);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    margin-right: 2rem;
  }

  .elButtonFirst {
    margin-bottom: 2rem;
  }

  :deep(.elButtonBox .el-button>span) {
    color: rgb(255, 255, 255) !important;
    font-family: HarmonyOS Sans !important;
    font-size: 1rem !important;
    font-weight: 400 !important;
    line-height: 1.1875rem !important;
  }

  :deep(.elButtonBox .el-button) {
    width: 5rem;
    height: 2.6875rem;
    background: rgb(0, 160, 233);
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
  }

  .userStatus-box {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.3125rem;
    width: 7.5rem;
  }

  :deep(.userStatus .el-select__wrapper) {
    width: 17.5rem;
    height: 2.6875rem;
    padding: 0.75rem;
    background: rgb(245, 245, 245);
    border-radius: 0.5rem;
  }

  :depp(.userStatus .el-select__placeholder.is-transparent) {
    height: 1.1875rem;
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  .nameOfUser {
    width: 17.5rem;
    height: 2.6875rem;
  }

  .loginAccount {
    width: 17.5rem;
    height: 2.6875rem;
  }

  :deep(.el-input__wrapper) {
    padding: 0.75rem;
    background: rgb(245, 245, 245);
    border-radius: 0.5rem;
  }

  :deep(.el-input__inner) {
    height: 1.1875rem;
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  .search-box {
    margin-bottom: 1.75rem;
  }

  .formBox-title {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.4375rem;
    border-bottom: 1px solid rgb(226, 226, 226);
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
  }

  .el-pagination {
    margin-top: 0.5rem;
  }

  :deep(.el-checkbox__inner:after) {
    height: 0.9375rem;
    left: 0.5rem;
    width: 0.375rem;
  }

  :deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner:before) {
    top: 45%;
  }

  :deep(.el-table__header-wrapper .el-table-column--selection>.cell) {
    height: 1.5rem;
  }

  :deep(.el-table__body-wrapper .el-table-column--selection>.cell) {
    height: 1.5rem;
  }

  :deep(.el-checkbox__inner) {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
  }

  :deep(.el-button>span) {
    color: rgb(0, 160, 233);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  :deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
    color: rgb(84, 84, 84);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }


  :deep(.el-table th ) {
    background-color: rgb(252, 252, 252);
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.3125rem;
  }

  :deep(.el-table th.el-table__cell.is-leaf) {
    background-color: rgb(252, 252, 252);
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.3125rem;
  }

  :deep(.el-table__header) {
    height: 3.75rem;
  }

  .formBox {
    position: relative;
    margin-top: 2.53125rem;
    background: rgb(255, 255, 255);
    border-radius: 1.25rem;
    padding: 2rem;
  }

  .dateTime {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  .accountManagement {
    padding: 1.25rem 2.5rem 2.5rem 2.5rem;
    background: rgb(241, 244, 247);
    height: calc(100vh - 5.5rem);
  }

  .accountManagementBox {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
    border-left: 0.1875rem solid rgb(0, 160, 233);
    padding-left: 0.5rem;
  }

  @media (min-width: 1536px) and (max-width: 1580px) {
    .loginAccount {
      width: 16.25rem;
    }

    .nameOfUser {
      width: 16.25rem;
    }

    :deep(.userStatus .el-select__wrapper) {
      width: 16.25rem;
    }
  }

  @media (min-width: 1285px) and (max-width: 1536px) {
    .loginAccount {
      width: 12.5rem;
    }

    .nameOfUser {
      width: 12.5rem;
    }

    .userStatus-box {
      width: 8rem;
    }

    :deep(.userStatus .el-select__wrapper) {
      width: 12.5rem;
    }
  }

  @media (max-width: 1536px) {
    .search-jsk {
      gap: 0.75rem;
    }
  }

  // @media (min-width: 768px) and (max-width: 985px) {
  //   .accountManagement {
  //     height: auto;
  //     overflow-y: auto;
  //     max-height: 100vh;
  //     box-sizing: border-box;
  //   }
  // }
</style>