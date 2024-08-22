<script lang="ts" setup>
  definePageMeta({
    layout: 'login'
  });

  import { ref, watch, computed } from 'vue'
  import { useRouter, useRoute } from '#app';
  import { ElMessage } from 'element-plus'

  const router = useRouter();
  const route = useRoute();

  // if (process.client && route.query.refresh) {
  //   // 清除 query 参数避免无限刷新
  //   router.replace({ path: '/login' }).then(() => {
  //     window.location.reload();
  //   });
  // }

  if (process.client && route.query.refresh) {
    // 复制当前的查询参数对象
    const query = { ...route.query };
    // 删除 refresh 参数
    delete query.refresh;
  
    // 使用新的查询参数对象来替换当前路径
    router.replace({ path: '/login', query }).then(() => {
      window.location.reload();
    });
  }

  const email = ref('')
  const password = ref('')

  const checked1 = ref(false)

  const checked2 = ref(false)

  import { useRegisterApi } from '~/composables/user';
  const { getLoginToken } = useRegisterApi();

  import { useAuthToken } from '~/composables/useAuthToken';
  // const token = useAuthToken();
  const authState = useAuthToken();


  const loginClick = async () => {
    if (email.value === '' || password.value === '') {
      isAccount.value = true
      // isCheckBox.value = true
      return
    } else if (email.value !== '' && password.value !== '') {
      if (emailNumberRegex.test(email.value) && validatePassword(password.value) && checked2.value === false) {
        isCheck.value = true
        // isCheckBox.value = true
        isAccount.value = false
        return
      } else if (emailNumberRegex.test(email.value) && validatePassword(password.value) && checked2.value === true) {
        isCheck.value = false
        // isCheckBox.value = false
        isAccount.value = false

        const loginData = {
          email: email.value,
          password: password.value,
          auto_login: checked1.value,
          agree_policy: checked2.value
        };
    
        try {
          const response = await getLoginToken(loginData);
          console.log('User registered successfully:', response);

          if (response.code === 2107) {
            const emailValue = email.value;
            const passwordValue = password.value;

            navigateTo({
              path: '/improveAccountInformation',
              query: {email:emailValue, password:passwordValue}
            })
          } else if (response.code === 2103) {
            isAccount.value = true
          } else if (response.code === 0) {

            // localStorage.setItem('userToken', response.data.token);
            // localStorage.setItem('userId', response.data.user_id);

            authState.value.authToken = response.data.token
            authState.value.userId = response.data.user_id
            if (response.data.user_type === 0) {
              const redirectPath = Array.isArray(route.query.redirect) ? route.query.redirect[0] : route.query.redirect || '/';
              navigateTo(redirectPath)
            }
          }
        } catch (error) {
          console.error('Registration failed:', error);
        }
        // navigateTo('/');
      }
      return
    }
  }

  const forgetClick = () => {
    navigateTo('/forget');
  }

  const registerClick = () => {
    navigateTo('/register');
  }

  const urlLogo = ref('/logo.png')

  const isError = ref(false)

  // const emailNumberRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const emailNumberRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  watch(email, (newEmail) => {
    if (!newEmail) {
      isError.value = false
    } else {
      isError.value = !emailNumberRegex.test(newEmail)
    }
  })

  const isPasswordError = ref(false); 
  const validatePassword = (password: string) => {
    if (!password) {
      return false; // 密码为空时返回 false
    }
    
    const lengthRequirement = password.length >= 8 && password.length <= 12;
    const uppercaseRequirement = /[A-Z]/.test(password);
    const lowercaseRequirement = /[a-z]/.test(password);
    const numberRequirement = /[0-9]/.test(password);
    const specialCharRequirement = /[^A-Za-z0-9]/.test(password);

    const validConditions = [
      uppercaseRequirement,
      lowercaseRequirement,
      numberRequirement,
      specialCharRequirement
    ].filter(Boolean).length;

    return lengthRequirement && validConditions >= 3;
  };

  watch(password, (newPassword) => {
    if (!newPassword) {
      isPasswordError.value = false;
    } else {
      isPasswordError.value = !validatePassword(newPassword);
    }
  });

  // 控制密码可见性
  const isPasswordVisible = ref(false)

  // const urlSmallEyes = ref('/close_eyes.svg')
  const urlSmallEyes = computed(() => isPasswordVisible.value ? '/eye.svg' : '/close_eyes.svg');

  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };

  const isCheckBox = ref(false);
  const isCheck = ref(false)
  const isAccount = ref(false)

  const emailFocusClick = () => {
    isCheck.value = false
    isAccount.value = false
  }

  const passwordFocusClick = () => {
    isCheck.value = false
    isAccount.value = false
  }

  const cheched1ChangeClick = () => {
    isCheck.value = false
    isAccount.value = false
  }

  const cheched2ChangeClick = () => {
    isCheck.value = false
    isAccount.value = false
  }
</script>

<template>
  <div class="login-box">
    <div class="login">
      <div style="position: relative;">
        <div class="logo">
          <el-image :src="urlLogo" class="logoImage" />
        </div>
        <div class="shulu">
          <div class="input-container">
            <el-input
              class="emialInput"
              v-model="email"
              style="width: 30rem; height: 3rem;"
              placeholder="请输入登录邮箱"
              @focus="emailFocusClick"
            />
            <div v-if="isError" class="error-message">邮箱格式错误</div>
          </div>
          <div>
            <el-input
              class="passwordInput"
              v-model="password"
              style="width: 30rem; height: 3rem;"
              :class="{ 'error-margin': isPasswordError }"
              placeholder="请输入密码"
              :type="isPasswordVisible ? 'text' : 'password'"
              clearable
              @focus="passwordFocusClick"
            >
              <template #suffix>
                <el-image :src="urlSmallEyes" class="smallEyes" @click="togglePasswordVisibility" />
              </template>
            </el-input>
            <div v-if="isPasswordError" class="error-messageOne">密码需8-12个字符，并包含以下任意3项：1 个大写字母、1 个小写字母、1 个数字(0-9)、1 个特殊字符</div>
          </div>
        </div>
        <div class="checkedInout">
          <el-checkbox 
            v-model="checked1"
            @change="cheched1ChangeClick"
          >7天内自动登录</el-checkbox>
        </div>
        <div class="checkedInoutTwo">
          <el-checkbox
            v-model="checked2"
            @change="cheched2ChangeClick"
          >
            <span style="margin-right: 0.5rem;">我已阅读并同意</span>
            <span style="color: rgb(0, 160, 233);margin-right: 0.5rem;">隐私政策</span>
            <span style="margin-right: 0.5rem;">和</span>
            <span style="color: rgb(0, 160, 233);">用户协议</span>
          </el-checkbox>
        </div>
        <!-- <el-button
          class="buttonOne"
          @click="loginClick"
          style="width: 30rem; height: 3rem; margin-bottom: 3.75rem;"
          type="primary"
          :class="{ 'Check-boxOne': isCheckBox }"
        >登录</el-button> -->
        <el-button
          class="buttonOne"
          @click="loginClick"
          style="width: 30rem; height: 3rem; margin-bottom: 3.75rem;"
          type="primary"
        >登录</el-button>
        <div
          v-if="isCheck"
          class="Check-box"
        >请勾选我已阅读并同意 隐私政策 和 用户协议</div>
        <div
          v-if="isAccount"
          class="Check-box-One"
        >账号或密码错误，请重试</div>
        <div class="flex justify-between footer">
          <span class="cursor-pointer" @click="forgetClick">忘记密码</span>
          <span class="cursor-pointer" @click="registerClick">快速注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .Check-boxOne {
    margin-bottom: 1.25rem !important;
  }

  .Check-box {
    // text-align: center;
    color: rgb(235, 85, 87);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
    // margin-bottom: 1rem;
    position: absolute;
    top: 28.5rem;
    left: 3.75rem;
  }

  @media (max-width: 768px) {
    .Check-box {
      top: 29.5rem;
    }
  }

  .Check-box-One {
    color: rgb(235, 85, 87);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
    // margin-bottom: 1rem;
    position: absolute;
    top: 28.5rem;
    left: 50%;
    margin-left: -6.1875rem;
  }

  @media (max-width: 768px) {
    .Check-box-One {
      top: 29.5rem;
    }
  }

  .error-margin {
    margin-bottom: 0 !important;
  }

  .error-messageOne {
    width: 30rem;
    color: rgb(235, 85, 87);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
    margin-bottom: 2rem;
  }

  .smallEyes {
    cursor: pointer;
  }

  .input-container {
    position: relative;
  }

  .smallEyes {
    margin-left: 0px;
  }

  :deep(.smallEyes .el-image__inner) {
    width: 1.323125rem;
    height: 1.735625rem;
  }

  .error-message {
    position: absolute;
    color: rgb(235, 85, 87);
    top: 0.75rem;
    right: 1.25rem;
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%
  }

  :deep(.buttonOne .el-button>span) {
    color: rgb(255, 255, 255);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 130%;
  }

  :deep(.checkedInoutTwo .el-checkbox__label) {
    color: rgb(51, 51, 51);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
    padding-left: 0.5rem;
  }

  :deep(.checkedInout .el-checkbox__label) {
    color: rgb(51, 51, 51);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
    padding-left: 0.5rem;
  }

  :deep(.checkedInout .el-checkbox__inner) {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid rgb(170, 172, 181);
    border-radius: .25rem;
  }

  :deep(.checkedInout .el-checkbox__inner:after) {
    height: 1rem;
    left: 0.5rem;
    top: 0rem;
    width: 0.3125rem;
  }

  :deep(.checkedInoutTwo .el-checkbox__label) {
    color: rgb(51, 51, 51);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
  }

  :deep(.checkedInoutTwo .el-checkbox__inner) {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid rgb(170, 172, 181);
    border-radius: .25rem;
  }

  :deep(.checkedInoutTwo .el-checkbox__inner:after) {
    height: 1rem;
    left: 0.5rem;
    top: 0rem;
    width: 0.3125rem;
  }

  .logo {
    margin-bottom: 5rem;
  }

  .logoImage {
    width: 10.8125rem;
    height: 3rem;
  }

  .login-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // height: 100%;
    border-radius: 1.25rem;
    width: 37.5rem;
    height: 39.75rem;
    background: rgb(255, 255, 255)
  }

  // .logo {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   width: 300px;
  //   height: 45px;
  //   font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
  //   font-weight: 700;
  //   font-size: 36px;
  //   border: 1px solid #333333;
  //   margin-bottom: 40px;
  //   margin-top: 60px;
  // }

  .shulu {
    display: flex;
    flex-direction: column;
  }

  .emialInput {
    margin-bottom: 2rem;
  }

  :deep(.emialInput .el-input__inner) {
    width: 9.5625rem;
    height: 1.4375rem;
    color: rgb(170, 172, 181);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
  }

  :deep(.emialInput .el-input__wrapper) {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
  }

  :deep(.passwordInput .el-input__inner) {
    width: 9.5625rem;
    height: 1.4375rem;
    color: rgb(170, 172, 181);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
  }

  :deep(.passwordInput .el-input__wrapper) {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
  }

  .passwordInput {
    margin-bottom: 2rem;
  }

  .checkedInout {
    // width: 368px;
  }

  .checkedInoutTwo {
    // width: 368px;
    margin-bottom: 2rem;
  }

  .footer span {
    color: rgb(0, 160, 233);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
  }

  .footer {
    margin-bottom: 20px;
  }
</style>