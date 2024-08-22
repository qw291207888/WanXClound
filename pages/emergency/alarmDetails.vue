<script lang="ts" setup>
  definePageMeta({
    layout: 'alarm',
    middleware: 'auth'
  });

  const imgReturnButton = ref('/return_icon.png')
</script>

<template>
  <div class="details-box flex flex-col">
    <div class="flex items-center" style="margin-bottom: 40px;">
      <div class="alarmEvent">告警事件详情</div>
      <el-button class="returnButton">
        <el-image :src="imgReturnButton" style="width: 20px;height: 15px;margin-right: 5px;" />返回
     </el-button>
    </div>
    <div class="basicInformation flex items-center" style="margin-bottom: 40px;">
      <div style="margin-right: 50px;">
        <div style="margin-bottom: 20px;">
          <span class="alarmType">告警类型：</span>
          <span class="equipmentFailure">设备故障</span>
        </div>
        <div>
          <span class="alarmType">处理状态：</span>
          <span class="undisposed">未处理</span>
        </div>
      </div>
      <div style="margin-right: 50px;">
        <div style="margin-bottom: 20px;">
          <span class="alarmType">告警源：</span>
          <span class="printerModule">打印机模块</span>
        </div>
        <div>
          <span class="alarmType">报警时间：</span>
          <span class="printerModule">2020-12-24 14:10:50</span>
        </div>
      </div>
      <div style="padding-bottom: 48px;">
        <div>
          <span class="alarmType">告警原因：</span>
          <span class="printerModule">打印机模块损坏</span>
        </div>
      </div>
    </div>
    <div class="basicInformation basicInformation-fourth flex items-center justify-around" style="width: 100%;padding-left: 20px;margin-bottom: 40px;">
      <div class="authorityManagement">
        <el-button>设备及蜡材权限管理</el-button>
      </div>
      <div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">设备型号：</span>
          <span class="orderNumber-two">WJ400</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">设备MAC：</span>
          <span class="orderNumber-two">X2-5P-QQ-EA-ER-B0</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">设备SN：</span>
          <span class="orderNumber-two">SZWJ12345678</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">设备IP：</span>
          <span class="orderNumber-two">193.243.213.60</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">IP位置：</span>
          <span class="orderNumber-two">俄罗斯</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">IP状态：</span>
          <span class="orderNumber-two">IP正常</span>
        </div>
      </div>
      <div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">生产日期（入库时间）：</span>
          <span class="orderNumber-two">2021-12-2</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">设备激活状态：</span>
          <span class="orderNumber-two">已激活，2023-1-23 13:09</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">维保日期：</span>
          <span class="orderNumber-two">2023-1-23至2024-1-22</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">软件版本：</span>
          <span class="orderNumber-two">firmware，V1.1.1</span>
        </div>
        <div style="margin-bottom: 8px;">
          <span class="orderNumber">软件发布日期：</span>
          <span class="orderNumber-two">2021-3-9</span>
        </div>
      </div>
    </div>
    <div class="flex justify-between gap-10">
      <div class="basicInformation basicInformation-two flex items-center" style="width: 50%;padding-left: 20px;">
        <div>
          <div style="margin-bottom: 8px;">
            <span class="orderNumber">销售订单号：</span>
            <span class="orderNumber-two">1234567890</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span class="orderNumber">客户名称：</span>
            <span class="orderNumber-two">土耳其经销商A（经销商客户）</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span class="orderNumber">销售员：</span>
            <span class="orderNumber-two">Alice Wang</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span class="orderNumber">销售员联系方式：</span>
            <span class="orderNumber-two">86-12345678909</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span class="orderNumber">收货地址：</span>
            <span class="orderNumber-two">土耳其伊斯坦布尔XX街12号</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span class="orderNumber">出库订单号：</span>
            <span class="orderNumber-two">12345678</span>
          </div>
          <div style="margin-bottom: 8px;">
            <span class="orderNumber">出库时间：</span>
            <span>2022-12-3</span>
          </div>
          <div>
            <span class="orderNumber">物流签收时间：</span>
            <span>2023-2-6</span>
          </div>
        </div>
      </div>
      <div class="basicInformation basicInformation-three flex items-center justify-center" style="width: 50%;">
        <div class="flex">
          <div>
            <div>
              <div>
                <span class="orderNumber">蜡材型号：</span>
                <span class="orderNumber-two">091223344</span>
              </div>
              <div>
                <span class="orderNumber">蜡材UID：</span>
                <span class="orderNumber-two">3e4r5t6o</span>
              </div>
              <div>
                <span class="orderNumber">蜡材SN：</span>
                <span class="orderNumber-two">192083845u5</span>
              </div>
            </div>
            <div>
              <div>
                <span class="orderNumber">配件1编号：</span>
                <span class="orderNumber-two">1234565</span>
              </div>
              <div>
                <span class="orderNumber">配件2编号：</span>
                <span class="orderNumber-two">1234565</span>
              </div>
              <div>
                <span class="orderNumber">配件3编号：</span>
                <span class="orderNumber-two">1234565</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <span class="orderNumber">左喷头编号：</span>
                <span class="orderNumber-two">1234565</span>
              </div>
              <div>
                <span class="orderNumber">中间喷头编号：</span>
                <span class="orderNumber-two">1234565</span>
              </div>
              <div>
                <span class="orderNumber">右喷头编号：</span>
                <span class="orderNumber-two">1234565</span>
              </div>
            </div>
            <div>
              <div>
                <span class="orderNumber">配件4编号：</span>
                <span class="orderNumber-two">1234565</span>
              </div>
              <div>
                <span class="orderNumber">配件5编号：</span>
                <span class="orderNumber-two">1234565</span>
              </div>
              <div>
                <span class="orderNumber">配件6编号：</span>
                <span class="orderNumber-two">1234565</span>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .orderNumber-two {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #000000;
  }

  .orderNumber {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #333333;
  }

  .printerModule {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #000000;
  }

  .undisposed {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #0000FF;
  }

  .equipmentFailure {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #D9001B;
  }

  .alarmType {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #333333;
  }

  .alarmEvent {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: #0000BF;
    border-left: 4px solid #082C61;
    padding-left: 10px;
    margin-right: 5px;
  }

  .returnButton {
    width: 80px;
    height: 30px;
    background: inherit;
    background-color: rgba(236, 245, 255, 1);
    border: none;
    border-radius: 3px;
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #333333;
  }

  .details-box {
    padding: 20px 30px 20px 30px;
    height: 100%;
    overflow: auto;
  }

  .basicInformation::before {
    content: '告警处理进度';
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
    padding-left: 20px;
    border: 1px solid rgba(127, 127, 127, 1);
    border-radius: 10px;
    height: 139px;
  }

  .basicInformation-two {
    height: 275px;
    padding-left: 0px;
  }

  .basicInformation-two::before {
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

  .basicInformation-three {
    height: 275px;
    padding-left: 0px;
  }

  .basicInformation-three::before {
    content: '相关耗材及配件信息';
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

  .basicInformation-fourth {
    height: 275px;
    padding-left: 0px;
  }

  .basicInformation-fourth::before {
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

  .authorityManagement .el-button {
    width: 158px;
    height: 40px;
    background-color: rgba(22, 155, 213, 1);
  }

  :deep(.authorityManagement .el-button>span) {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #FFFFFF;
  }
</style>
