<script setup>
//   import {
//     Document,
//     Menu as IconMenu,
//     Location,
//     Setting,
//   } from '@element-plus/icons-vue'
  definePageMeta({
    middleware: 'auth'
  });

  import { ref, onMounted, watch } from 'vue'
  import * as echarts from 'echarts';

  const imgGzt = ref('/gzt.png')

  const imgGztb = ref('/gztb.png')

  const imgFzb = ref('/fzb.png')

  const imgXssj = ref('/xssj.png')

  const urlNormal = ref('/normal_equipment.png')

  const urlNormalIcon = ref('/normal_icon.png')

  const urlAbnormal = ref('/abnormal_equipment.png')

  const urlAbnormalIcon = ref('/abnormal_icon.png')

  import ChartComponent from '~/components/ChartComponent.vue';
  import ChartComponentTwo from '~/components/ChartComponentTwo.vue';
  import ChartComponentThree from '~/components/chartComponentThree.vue';
  import ChartComponentFour from '~/components/ChartComponentFour.vue';

  const tableData = [
    {
      type: 'WJ400',
      activationQuantity: '8000',
      averagePrinting: '95%',
      activityRatio: '60%',
      utilizationRatio: '85%'
    },
    {
      type: 'WJ410',
      activationQuantity: '8000',
      averagePrinting: '98%',
      activityRatio: '100%',
      utilizationRatio: '90%'
    },
    {
      type: 'WJ510',
      activationQuantity: '500',
      averagePrinting: '95%',
      activityRatio: '60%',
      utilizationRatio: '85%'
    },
    {
      type: 'WJ530',
      activationQuantity: '200',
      averagePrinting: '95%',
      activityRatio: '60%',
      utilizationRatio: '85%'
    },
    {
      type: 'WJ71',
      activationQuantity: '8000',
      averagePrinting: '95%',
      activityRatio: '60%',
      utilizationRatio: '85%'
    }
  ]

  const headerCellStyle = {
    backgroundColor: 'rgba(242, 242, 242, 0.5)'
  };
  
  const options = [
    { label: '土耳其', value: 'turkey', data: { supportWax: [150, 230, 224, 218, 135, 147, 260], structureWax: [160, 210, 256, 200, 160, 110, 280] } },
    { label: '美国', value: 'usa', data: { supportWax: [180, 250, 200, 190, 140, 160, 300], structureWax: [170, 220, 250, 210, 150, 120, 290] } },
    { label: '中国', value: 'china', data: { supportWax: [100, 220, 190, 200, 150, 130, 270], structureWax: [140, 200, 230, 190, 140, 100, 280] } }
  ];
  const selectedCountry = ref('土耳其');

  const countryData = ref({
    supportWax: [150, 230, 224, 218, 135, 147, 260],
    structureWax: [160, 210, 256, 200, 160, 110, 280]
  })

  const updateCountry = (selectedValue) => {
    const selectedLabel = options.find(option => option.value === selectedValue)?.label;
    const selectedData = options.find(option => option.value === selectedValue)?.data;
    selectedCountry.value = selectedLabel
    countryData.value = selectedData
  }
</script>

<template>
  <div>
    <el-container>
      <!-- <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
        >
          <div class="titleBig flex items-center pt-5 pl-5 pb-4">
            <el-icon class="iconBig">
              <el-image :src="imgGztb" />
            </el-icon>
            <span>工作台</span>
          </div>
          <el-menu-item index="2">
            <el-icon class="iconSmall">
              <el-image :src="imgGzt" />
            </el-icon>
            <span>工作台</span>
          </el-menu-item>
        </el-menu>
      </el-aside> -->
      <el-main>
        <div class="title flex items-center pl-6 pt-2.5 mb-2">
          <el-image class="imgF mr-1.5" :src="imgFzb" />
          <span>工作台</span>
        </div>
        <div class="flex justify-around flex-wrap mb-10">
          <el-card class="card-first mb-3" style="max-width: 480px">
            <div class="first-box">
              <div class="jhsb-title">
                <span>激活设备数-</span>
                <span>待激活数/售出总数</span>
              </div>
              <div class="jhsb-content">
                <span>20/130</span>
                <span>台</span>
              </div>
              <div class="jhsb-footer">
                <span>本周已激活50台</span>
              </div>
            </div>
            <div class="flex mt-3 mb-2">
              <el-image style="width: 35px;" :src="imgXssj" />
              <span class="jrjh flex items-center">今日激活23台</span>
            </div>
          </el-card>
          <el-card class="card-first mb-3" style="max-width: 480px">
            <div class="first-box">
              <div class="jhsb-title">
                <span>作业订单-</span>
                <span>月度平均打印完成率</span>
              </div>
              <div class="jhsb-content">
                <span>97</span>
                <span>%</span>
              </div>
              <div class="jhsb-footer invisible">
                <span>本周已激活50台</span>
              </div>
            </div>
            <div class="flex mt-3 mb-2">
              <el-image style="width: 35px;" :src="imgXssj" />
              <span class="jrjh flex items-center">环比上升1%</span>
            </div>
          </el-card>
          <el-card class="card-first mb-3" style="max-width: 480px">
            <div class="first-box">
              <div class="jhsb-title">
                <span>告警事件-</span>
                <span>本周待处理书/本周已处理数</span>
              </div>
              <div class="jhsb-content">
                <span>10/18</span>
                <span>个</span>
              </div>
              <div class="jhsb-footer">
                <span>本周高频报警设备型号WJ400</span>
              </div>
            </div>
            <div class="flex mt-3 mb-2">
              <el-image style="width: 35px;" :src="imgXssj" />
              <span class="jrjh flex items-center">今日新增5个告警</span>
            </div>
          </el-card>
          <el-card class="card-first mb-3" style="max-width: 480px">
            <div class="first-box">
              <div class="jhsb-title">
                <span>蜡材消耗量-</span>
                <span>本周已消耗/总计消耗</span>
              </div>
              <div class="jhsb-content">
                <span>1000/5000</span>
                <span>kg</span>
              </div>
              <div class="jhsb-footer invisible">
                <span>本周已激活50台</span>
              </div>
            </div>
            <div class="flex mt-3 mb-2">
              <el-image class="xssj" style="width: 35px;" :src="imgXssj" />
              <span class="jrjh flex items-center">环比下降17%</span>
            </div>
          </el-card>
        </div>
        <div class="flex justify-around flex-wrap mb-10 gap-2.5">
          <el-card style="max-width: 480px">
            <ChartComponent />
          </el-card>
          <el-card style="max-width: 480px">
            <ChartComponentTwo />
          </el-card>
        </div>
        <div class="flex justify-around items-center flex-wrap mb-10 gap-2.5">
          <el-card style="max-width: 480px">
            <template #header>
              <div class="card-header">
                <span>设备实时监控</span>
              </div>
            </template>
            <div class="flex justify-center items-center gap-8 mb-6 mt-4 ml-6 mr-6">
              <div class="flex gap-3">
                <el-image style="width: 66px; height: 66px" :src="urlNormal" />
                <div class="flex flex-col gap-2">
                  <span class="normal">
                    <el-image style="width: 10px; height: 10px" :src="urlNormalIcon" />
                    正常设备
                  </span>
                  <span class="normalNumber">50个</span>
                </div>
              </div>
              <div class="flex gap-3">
                <el-image style="width: 66px; height: 66px" :src="urlAbnormal" />
                <div class="flex flex-col gap-2">
                  <span class="normal">
                    <el-image style="width: 10px; height: 10px" :src="urlAbnormalIcon" />
                    异常设备
                  </span>
                  <span class="normalNumber">20个</span>
                </div>
              </div>
            </div>
          </el-card>
          <el-card style="max-width: 480px">
            <template #header>
              <div class="card-header">
                <span>设备状态统计</span>
              </div>
            </template>
            <ChartComponentThree />
          </el-card>
        </div>
        <div class="mx-5 flex justify-center items-center country-box gap-12">
          <div class="wax-box">
            <div class="waxMaterial">月度-蜡材整体消耗情况</div>
            <div class="statistics-box">
              <span class="statistics-icon">*</span>
              <span class="statistics-content">请选择统计区域</span>
            </div>
            <el-select
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
          </div>
          <div class="flex-1 lineBox">
            <ChartComponentFour :selectedCountry="selectedCountry" :countryData="countryData" />
          </div>
        </div>
        <div class="mx-5 monthly-box">
          <div class="monthly">月度-设备整体运行性能</div>
          <el-table :data="tableData" border style="width: 100%" :header-cell-style="headerCellStyle">
            <el-table-column prop="type" label="设备型号" />
            <el-table-column prop="activationQuantity" label="设备激活数量" />
            <el-table-column prop="averagePrinting" label="平均打印完成率" />
            <el-table-column prop="activityRatio" label="设备激活率" />
            <el-table-column prop="utilizationRatio" label="设备利用率" />
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  .el-aside {
    height: calc(100vh - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 1000;
  }

  .el-main {
    // margin-left: 200px;
    overflow-y: auto;
    padding: 0;
    height: calc(100vh - 5.5rem);
  }

  .el-menu {
    height: 100%;
  }

  .el-menu-item.is-active {
    background-color: #fff;
    color: #333333;;
  }

  .el-menu-item {
    font-size: 14px;
    padding-left: 35px !important;
  }

  .el-menu-item:hover {
    background-color: #fff;
  }

  .el-menu .el-icon {
    margin-right: 25px;
  }

  .iconBig {
    width: 35px;
    margin-right: 12px !important;
  }

  .iconSmall {
    width: 27px;
  }

  .titleBig {
    border-bottom: 2px solid #dcdfe6;
  }

  .imgF {
    width: 38px;
  }

  .jhsb-title {
    font-size: 14px;
  }

  .jhsb-title span:nth-child(1) {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
  }

  .jhsb-content {
    margin-bottom: 20px;
  }

  .jhsb-content span:nth-child(1) {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-size: 36px;
  }

  .jhsb-content span:nth-child(2) {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-size: 20px;
  }

  .first-box {
    border-bottom: 2px solid #dcdfe6;
    width: 261px; 
  }

  .card-first {
    background-color: #F2F2F2;
    border-radius: 13px;
    width: 300px;
  }

  .jhsb-footer {
    text-align: right;
    font-size: 14px;
    color: #015478;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
  }

  .jrjh {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-size: 14px;
  }

  :deep(.el-card__body) {
    padding-bottom: 0;
  }

  .xssj {
    transform: rotate(180deg);
  }

  .el-card {
    border-radius: 10px;
  }

  .normal {
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    color: #5B5E68;
    line-height: 22px;
    font-size: 14px;
  }

  .normalNumber {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #555555;
    padding-left: 16px;
  }

  .el-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
  }

  :deep(.el-card__header) {
    width: 391px;
    padding-left: 0;
    padding-bottom: 5px;
    padding-top: 25px;
    font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #555555;
  }

  .monthly {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #333333;
  }

  .monthly-box {
    background-color: rgba(242, 242, 242, 1);
    padding: 20px 30px 10px 30px;
    border-radius: 10px;
    margin-bottom: 30px;
  }

  .country-box {
    background-color: rgba(242, 242, 242, 1);
    padding: 20px 30px 10px 30px;
    border-radius: 10px;
    margin-bottom: 30px;
  }

  .lineBox {
    border: 1px solid #F2F2F2;
  }

  .waxMaterial {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    color: #333333;
    margin-bottom: 10px;
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

  .el-select {
    width: 148px !important;
    height: 32px !important;
    border-radius: 4px !important;
    margin-left: 15px;
  }

  .wax-box {
    // width: 200px;
    height: 246px;
  }

  .statistics-box {
    margin-bottom: 5px;
    margin-left: 15px;
  }
</style>