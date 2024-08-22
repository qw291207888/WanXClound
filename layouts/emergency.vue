<script lang="ts" setup>
  import {
    Bell,
    User,
    CaretBottom,
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'

  import { ref, onMounted, watch } from 'vue'

  import { useRegisterApi } from '~/composables/user';
  import { useRoute } from '#app';

  const route = useRoute();
  const { getAccountDetails } = useRegisterApi();
  const activeMenuItem = ref(route.path);

  watch(route, (newRoute) => {
    console.log(newRoute)
    activeMenuItem.value = newRoute.path;
  });

  const imgEndCustomer = ref('/equipment_information.png')

  const imgEndCustomerDetails = ref('/detail_information.png')

//   const imgDealerManagement = ref('/dealer_management.png')

//   const imgDealerDetails = ref('/Dealer_details.png')

  const imgAlarmStatistics = ref('alarm_statistics-click.png')

  const imgFaultAlarm = ref('/equipment_fault.png')

  const imgCargoFleeingAlarm = ref('/material_fleeing_two.png')

  const imgUseFalseAlarm = ref('/use_false_alarm.png')

  const imgCompanyLogo = ref('/company_logo.png')

  const imgSmallBll = ref('/small_bell.png')

  const circleUrl = ref('/head_portrait.png')

  const imgPullDown = ref('/pull_down.png')

  const imgSystemsManagement = ref('/alarm_center.png')
  const imgCargoFleeingAlarmOne = ref('/Use_false_alarm_one.png')

  const menuClick = (event: MouseEvent) => {
    // 获取当前点击的菜单项元素
    const target = event.target as HTMLElement
    // 查找包含菜单文本的 span 元素
    const menuItem = target.closest('.el-menu-item') as HTMLElement
    const menuText = menuItem?.querySelector('span')?.textContent?.trim() || ''
    console.log('Clicked menu:', menuText)

    if (menuText === '告警统计') {
      imgAlarmStatistics.value = '/alarm_statistics-click.png'
      imgFaultAlarm.value = '/equipment_fault.png'
      imgCargoFleeingAlarm.value = '/material_fleeing_two.png'
      imgCargoFleeingAlarmOne.value = '/Use_false_alarm_one.png'
    } else if (menuText === '设备故障告警') {
      imgAlarmStatistics.value = '/alarm_statisticsOne.png'
      imgFaultAlarm.value = '/equipment_fault-click.png'
      imgCargoFleeingAlarm.value = '/material_fleeing_two.png'
      imgCargoFleeingAlarmOne.value = '/Use_false_alarm_one.png'
    } else if (menuText === '设备及蜡材窜货告警') {
      imgAlarmStatistics.value = '/alarm_statisticsOne.png'
      imgFaultAlarm.value = '/equipment_fault.png'
      imgCargoFleeingAlarm.value = '/material_fleeing_two-click.png'
      imgCargoFleeingAlarmOne.value = '/Use_false_alarm_one.png'
    } else if (menuText === '蜡材用伪告警') {
      imgAlarmStatistics.value = '/alarm_statisticsOne.png'
      imgFaultAlarm.value = '/equipment_fault.png'
      imgCargoFleeingAlarm.value = '/material_fleeing_two.png'
      imgCargoFleeingAlarmOne.value = '/Use_false_alarm_one.png-click.png'
    }
  }

  import { useAuthToken } from '~/composables/useAuthToken';
  // const token = useAuthToken();
  const authState = useAuthToken().value;

  const authName = ref(null)
  const emailAddress = ref(null)
  const organization = ref(null)
  const phoneBox = ref(null)

  onMounted(async () => {
    try {
      const userId = authState.userId;
      if (userId !== null && !isNaN(Number(userId))) {
        const response = await getAccountDetails(Number(userId));

        authName.value = response.data.name
        emailAddress.value = response.data.email
        organization.value = response.data.company
        phoneBox.value = response.data.phone
      } else {
        throw new Error('Invalid userId: must be a non-null number');
      }
    } catch (err) {
      console.error('Failed to fetch account details:', err);
    }

    activeMenuItem.value = route.path;
    console.log(activeMenuItem.value)
    if (route.path === '/emergency/faultAlarm') {
      imgAlarmStatistics.value = '/alarm_statisticsOne.png'
      imgFaultAlarm.value = '/equipment_fault-click.png'
      imgCargoFleeingAlarm.value = '/material_fleeing_two.png'
      imgCargoFleeingAlarmOne.value = '/Use_false_alarm_one.png'
    } else if (route.path === '/emergency/cargoFleeingAlarm') {
      imgAlarmStatistics.value = '/alarm_statisticsOne.png'
      imgFaultAlarm.value = '/equipment_fault.png'
      imgCargoFleeingAlarm.value = '/material_fleeing_two-click.png'
      imgCargoFleeingAlarmOne.value = '/Use_false_alarm_one.png'
    } else if (route.path === '/emergency/useFalseAlarm') {
      imgAlarmStatistics.value = '/alarm_statisticsOne.png'
      imgFaultAlarm.value = '/equipment_fault.png'
      imgCargoFleeingAlarm.value = '/material_fleeing_two.png'
      imgCargoFleeingAlarmOne.value = '/Use_false_alarm_one.png-click.png'
    } else if (route.path === '/emergency') {
      imgAlarmStatistics.value = '/alarm_statistics-click.png'
      imgFaultAlarm.value = '/equipment_fault.png'
      imgCargoFleeingAlarm.value = '/material_fleeing_two.png'
      imgCargoFleeingAlarmOne.value = '/Use_false_alarm_one.png'
    } else {
      activeMenuItem.value = '/emergency'
    }
  });

  const isPopUpWindow = ref(false)

  const pulldownClick = async () => {
    if (isPopUpWindow.value === false) {
      isPopUpWindow.value = true
    } else if (isPopUpWindow.value === true) {
      isPopUpWindow.value = false
    }
  }

  const logOutClick = () => {
    // 清空本地缓存的 token 和 userId
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');

    // 清空状态
    authState.authToken = null;
    authState.userId = null;

    // 跳转到 login 页面
    navigateTo({ path: '/login', query: { redirect: route.fullPath } });
  }
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="left flex items-center" @click="navigateTo('/')">
          <!-- <div class="logo flex justify-center items-center">LOGO</div> -->
          <div class="flex items-center" style="margin-right: 0.75rem;">
            <el-image :src="imgCompanyLogo" class="companyLogo" />
          </div>
          <div class="line-box-o"></div>
          <div class="cloudPlatform">WaxCloud设备综合管理云平台</div>
        </div>
        <div class="middle">
          <span @click="navigateTo('/')">工作台</span>
          <span @click="navigateTo('/client')">客户管理</span>
          <span @click="navigateTo('/equipment')">设备及蜡材管理</span>
          <span @click="navigateTo('/emergency')">告警中心</span>
          <span @click="navigateTo('/system')">系统管理</span>
        </div>
        <div class="right flex justify-end">
          <div class="flex items-center" style="margin-right: 1.9375rem;">
            <el-image :src="imgSmallBll" class="smallBll" />
          </div>
          <div class="flex items-center" style="margin-right: 0.75rem;">
            <el-avatar :size="32" :src="circleUrl" />
          </div>
          <div class="flex items-center">
            <span class="fr">Flashforge</span>
            <el-image
              :src="imgPullDown"
              class="pullDown"
              @click="pulldownClick"
            />
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="230px">
            <el-menu
              :default-active="activeMenuItem"
              class="el-menu-vertical-demo"
              unique-opened
              router
              @click="menuClick"
            >
              <div class="client-title flex items-center">
                <el-image :src="imgSystemsManagement" class="systemsManagement" />
                <span>告警中心</span>
              </div>
              <el-menu-item  class="clcustomerHierarchy" index="/emergency">
                <el-image :src="imgAlarmStatistics" class="systemsManagement" />
                <span class="endCustomer">告警统计</span>
              </el-menu-item>
              <el-menu-item class="clcustomerHierarchy" index="/emergency/faultAlarm">
                <el-image :src="imgFaultAlarm" class="systemsManagement" />
                <span class="endCustomer">设备故障告警</span>
              </el-menu-item>
              <el-menu-item class="clcustomerHierarchy" index="/emergency/cargoFleeingAlarm">
                <el-image :src="imgCargoFleeingAlarm" class="systemsManagement" />
                <span class="endCustomer">设备及蜡材窜货告警</span>
              </el-menu-item>
              <el-menu-item class="clcustomerHierarchy" index="/emergency/useFalseAlarm">
                <el-image :src="imgCargoFleeingAlarmOne" class="systemsManagement" />
                <span class="endCustomer">蜡材用伪告警</span>
              </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main style="position: relative;">
          <div v-if="isPopUpWindow" class="popUpWindow">
            <div>
              <div class="authName-box">{{ authName }}</div>
              <div class="flex flex-col" style="margin-bottom: 1.5rem;">
                <span class="nameOfUser">用户名称</span>
                <span class="nameContent">{{ authName }}</span>
              </div>
              <div class="flex flex-col" style="margin-bottom: 1.5rem;">
                <span class="nameOfUser">邮箱地址</span>
                <span class="nameContent">{{ emailAddress }}</span>
              </div>
              <div class="flex flex-col" style="margin-bottom: 1.5rem;">
                <span class="nameOfUser">角色权限</span>
                <span class="nameContent">系统管理员</span>
              </div>
              <div class="flex flex-col" style="margin-bottom: 1.5rem;">
                <span class="nameOfUser">所属组织/部门</span>
                <span class="nameContent">{{ organization }}</span>
              </div>
              <div class="flex flex-col" style="margin-bottom: 1.5rem;">
                <span class="nameOfUser">手机号码</span>
                <span class="nameContent">{{ phoneBox }}</span>
              </div>
              <div class="logOut-box">
                <el-button 
                  class="logOut"
                  @click="logOutClick"
                >退出登录</el-button>
              </div>
            </div>
          </div>
          <nuxt-page />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  .systemsManagement {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
  }

  .pullDown {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }

  .smallBll {
    width: 1.125rem;
    height: 1.21875rem;
  }

  .companyLogo {
    width: 11.25rem;
    height: 1.625rem
  }

  .cloudPlatform {
    color: rgb(255, 243, 228);
    font-family: HarmonyOS Sans SC;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.75rem;
  }

  .line-box-o {
    width: 0.0625rem;
    height: 1.75rem;
    background-color: rgb(255, 255, 255, 0.5);
    margin-right: 0.75rem;
  }

  .common-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .el-header {
    // position: fixed;
    // top: 0;
    // left: 0;
    width: 100%;
    height: 5.5rem;
    z-index: 1000;
    padding: 0, 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(0, 160, 233);
  }

  .logo {
    width: 65px;
    height: 35px;
    font-size: 16px;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 3px;
  }

  .content {
    font-size: 20px;
    font-weight: 700;
    margin-left: 20px;
    width: 259.23px;
  }

  .wax {
    color: #fff;
  }

  .iemp {
    color: #fde047;
  }

  .middle {
    color: rgb(255, 255, 255);
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.3125rem;
    width: 40%;
    display: flex;
    justify-content: space-between;
  }

  .middle span {
    cursor: pointer;
  }

  .fr {
    color: rgb(255, 255, 255);
    font-family: HarmonyOS Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    margin-right: 12px;
  }

  .elCare {
    margin-left: 0;
  }

  .el-icon svg {
    padding-top: 2px;
  }

  .left {
    cursor: pointer;
  }

  .el-main {
    padding: 0;
    height: calc(100vh - 5.5rem);
    overflow-y: auto;
    background: rgb(241, 244, 247);
    // margin-top: 60px;
  }

  .el-aside {
    height: calc(100vh - 60px);
  }

  .el-menu {
    height: 100%;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 8px;
  }

  :deep(.el-sub-menu__title) {
    background-color: rgba(244, 244, 245, 1);
    padding-left: 30px !important;
  }

  .clcustomerHierarchy {
    background-color: rgba(255, 255, 255, 1);
    // padding-left: 24px !important;
    // padding-right: 24px !important;
    height: 52px !important;
    border-radius: 8px;
    color: rgb(51, 51, 51);
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .el-menu-item.is-active {
    color: rgb(0, 160, 233);
    background: rgb(241, 244, 247);
  }

  .client-title {
    height: 52px;
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.3125rem;
    border-bottom: 1px solid rgb(237, 237, 237);
    box-sizing: border-box;
    padding-left: 24px;
    padding-right: 24px;
  }

  .endCustomer {
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.3125rem;
  }

  .endCustomerDetails:hover {
    background-color: #ffffff;
  }

  .menuBox {
    margin-bottom: 1px;
  }

  .popUpWindow {
    position: absolute;
    top: 0;
    right: 1.25rem;
    width: 25rem;
    height: 33.9375rem;
    border-radius: 1.25rem;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
    background: rgb(255, 255, 255);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .authName-box {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.75rem;
    border-bottom: 1px solid rgb(237, 237, 237);
    padding-bottom: 1.25rem;
    width: 22rem;
    margin-bottom: 1.5rem;
  }

  .nameOfUser {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.3125rem;
  }

  .nameContent {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  .logOut {
    width: 7rem;
    height: 2.6875rem;
    border-radius: 0.5rem;
  }

  :deep(.logOut>span) {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.1875rem;
  }

  .logOut-box {
    border-top: 1px solid rgb(237, 237, 237);
    padding-top: 1.25rem;
    text-align: right;
  }
</style>