<script lang="ts" setup>
  import { ref } from 'vue'
  const selectedCountry = ref('简体中文')
  
  const options = [
    {
      value: '简体中文',
      label: '简体中文',
    },
    {
      value: '英文',
      label: '英文',
    }
  ]
</script>

<template>
  <div class="login-container">
    <div class="iconImage">
      <el-select
        v-model="selectedCountry"
        placeholder="请选择"
        size="large"
        style="width: 5.25rem;"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- <el-button class="joinButton">加入</el-button> -->
    </div>
    <nuxt-page />
  </div>
</template>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background: rgb(240, 249, 254);
    position: reactive;
  }

  .iconImage {
    position: absolute;
    right: 5%;
    top: 2%;
  }

  // :deep(.el-select) {
  //   margin-right: 2rem;
  // }

  :deep(.el-select--large .el-select__wrapper) {
    padding: 0;
    background: rgb(240, 249, 254);
    box-shadow: 0 0 0 0px var(--el-border-color) inset;
  }

  :deep(.el-select__placeholder) {
    width: 4rem;
    color: rgb(0, 0, 0);
    font-family: Poppins;
    font-size: 1rem;
    font-weight: 500;
    line-height: 130%;
    text-align: right;
  }

  :deep(.el-icon) {
    width: 0.875rem;
    height: 0.5rem;
  }

  :deep(.joinButton) {
    color: rgb(255, 255, 255);
    font-family: Poppins;
    font-size: 1rem;
    font-weight: 400;
    line-height: 130%;
    background: rgb(0, 160, 233);
    width: 5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
  }
</style>