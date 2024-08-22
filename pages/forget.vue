<script lang="ts" setup>
  definePageMeta({
    layout: 'login'
  });

  import { ref, watch, computed } from 'vue'

  const email = ref('')
  const password = ref('')
  const againPassword = ref('')

  const checked1 = ref(false)

  const checked2 = ref(false)


  const loginClick = () => {
    if (email.value === '' || password.value === '') {
      isAccount.value = true
      isCheckBox.value = true
      return
    } else if (email.value !== '' && password.value !== '') {
      if (emailNumberRegex.test(email.value) && validatePassword(password.value) && checked2.value === false) {
        isCheck.value = true
        isCheckBox.value = true
        isAccount.value = false
        return
      } else if (emailNumberRegex.test(email.value) && validatePassword(password.value) && checked2.value === true) {
        isCheck.value = false
        isCheckBox.value = false
        isAccount.value = false
        navigateTo('/');
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

  const emailNumberRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

  watch(email, (newEmail) => {
    if (!newEmail) {
      isError.value = false
    } else {
      isError.value = !emailNumberRegex.test(newEmail)
    }
  })

  const isPasswordError = ref(false);
  const isAgainPasswordError = ref(false);
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

  watch(againPassword, (newAgainPassword) => {
    if (!newAgainPassword) {
      isAgainPasswordError.value = false;
    } else {
      isAgainPasswordError.value = !validatePassword(newAgainPassword);
    }
  });

  // 控制密码可见性
  const isPasswordVisible = ref(false)

  // const urlSmallEyes = ref('/close_eyes.svg')
  const urlSmallEyes = computed(() => isPasswordVisible.value ? '/eye.svg' : '/close_eyes.svg');

  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };

  // 控制密码可见性
  const isAgainPasswordVisible = ref(false)

  // const urlSmallEyes = ref('/close_eyes.svg')
  const urlSmallEyesAgain = computed(() => isAgainPasswordVisible.value ? '/eye.svg' : '/close_eyes.svg');

  const toggleAgainPasswordVisibility = () => {
    isAgainPasswordVisible.value = !isAgainPasswordVisible.value;
  };

  const isCheckBox = ref(false);
  const isCheck = ref(false)
  const isAccount = ref(false)

  const loginNowClick = () => {
    navigateTo('/login');
  }

  const firstName = ref('')
  const lastName = ref('')

  import { ElMessage } from 'element-plus'

  const isLoading = ref(false)

  // const registeredClick = async () => {
  //   if (!isFormValid.value) {
  //     return;
  //   }

  //   isLoading.value = true

  //   const userData = {
  //     first_name: firstName.value,
  //     last_name: lastName.value,
  //     email: email.value,
  //     email_verify_code: verificationCode.value,
  //     password: password.value,
  //     accept_policy: checked2.value,
  //     allow_send: checked1.value,
  //   };

  //   try {
  //     const response = await registeredUser(userData);
  //     console.log('User registered successfully:', response);

  //     isLoading.value = false

  //     if (response.code === 2301) {
  //       ElMessage.error('验证码无效')
  //     } else if (response.code === 1101) {
  //       ElMessage.error('电子邮件已注册')
  //     } else if (response.code === 0) {
  //       isRegisteredUser.value = true
  //       if (isRegisteredUser.value === true) {
  //         const interval = setInterval(() => {
  //           if (countdown1.value > 0) {
  //             countdown1.value--;
  //           } else {
  //             clearInterval(interval);
  //             const emailValue = email.value;
  //             const passwordValue = password.value
  //             navigateTo({
  //               path: '/improveAccountInformation',
  //               query: {email:emailValue, password:passwordValue}
  //             })
  //           }
  //         }, 1000);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Registration failed:', error);
  //   }
  // }

  const verificationCode = ref('')

  import { useRegisterApi } from '~/composables/user';
  const { sendResetEmailVerifyCode, getResetPassword } = useRegisterApi();

  const countdown = ref(0);
  const countdownText = ref('发送验证码');
  let countdownTimer: ReturnType<typeof setTimeout> | null = null;


  const verificationClick = async () => {
    if (!emailNumberRegex.test(email.value)) {
      return
    }

    try {
      if (countdownTimer) {
        return;
      }

      const result = await sendResetEmailVerifyCode(email.value);
      console.log('Verification code sent:', result);

      // 开始倒计时
      countdown.value = 60; // 设置倒计时为60秒
      countdownText.value = '重新获取(' + countdown.value + ')'; // 更新文本
      startCountdown();
    } catch (error) {
      console.error('Failed to send verification code:', error);
    }
  }

  // 开始倒计时函数
  const startCountdown = () => {
    countdownTimer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
        countdownText.value = '重新获取(' + countdown.value + ')';
      } else {
        clearInterval(countdownTimer as ReturnType<typeof setTimeout>);
        countdownTimer = null;
        countdownText.value = '发送验证码'; // 重置文本
      }
    }, 1000);
  };

  // 计算所有输入框是否已填写
  const isFormValid = computed(() => {
    return (
      emailNumberRegex.test(email.value) &&
      validatePassword(password.value) &&
      firstName.value !== '' &&
      lastName.value !== '' &&
      verificationCode.value !== '' && 
      checked2.value === true && 
      checked1.value === true
    )
  })

  const urlRegisterSucceeded = ref('/accomplish.svg')

  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const countdown1 = ref(3);

  const isRegisteredUser = ref(false)

  onMounted(() => {
    if (isRegisteredUser.value === true) {
      const interval = setInterval(() => {
        if (countdown1.value > 0) {
          countdown1.value--;
        } else {
          clearInterval(interval);
          const emailValue = email.value;
          const passwordValue = password.value
          navigateTo({
            path: '/improveAccountInformation',
            query: {email:emailValue, password:passwordValue}
          })
        }
      }, 1000);
    }
  });

  const jumpImmediately = () => {
    navigateTo('/login')
  }

  const forgetPasswordClick = async () => {
    if (!email.value) {
      ElMessage.error('请输入注册邮箱！')
    } else if (email.value && !verificationCode.value) {
      ElMessage.error('请输入邮箱验证码！')
    } else if (email.value && verificationCode.value && !password.value) {
      ElMessage.error('请输入密码！')
    } else if (email.value && verificationCode.value && password.value && !againPassword.value) {
      ElMessage.error('请再次输入密码！')
    } else if (email.value && verificationCode.value && (password.value !== againPassword.value)) {
      ElMessage.error('两次密码输入不一致，请重试！')
    } else if (email.value && verificationCode.value && (password.value === againPassword.value)) {
      const resetData = {
        email: email.value,
        email_verify_code: verificationCode.value,
        new_password: password.value
      };
  
      try {
        const response = await getResetPassword(resetData);
        console.log('User registered successfully:', response);
        if (response.code === 0) {
          isRegisteredUser.value = true
          if (isRegisteredUser.value === true) {
            const interval = setInterval(() => {
              if (countdown1.value > 0) {
                countdown1.value--;
              } else {
                clearInterval(interval);
                navigateTo('/login')
              }
            }, 1000);
          } 
        } else if (response.code === 2301) {
          ElMessage.error('验证码无效')
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  }
</script>

<template>
  <div class="login-box">
    <div class="login">
      <div>
        <div class="logo">
          <el-image :src="urlLogo" class="logoImage" />
        </div>
        <div class="registered-account">忘记密码</div>
        <div
          class="newLogin"
          @click="navigateTo('/login')"
        >已想起密码，现在去登录</div>
        <div class="shulu">
          <div class="input-container">
            <el-input class="emialInput" v-model="email" style="width: 30rem; height: 3rem;" placeholder="请输入注册邮箱" />
            <div v-if="isError" class="error-message">邮箱格式错误</div>
          </div>
          <div class="input-container">
            <el-input class="emialInput" v-model="verificationCode" style="width: 30rem; height: 3rem;" placeholder="请输入6位邮箱验证码" />
            <div 
              class="error-messageFirst"
              @click="verificationClick"
            >{{ countdownText }}</div>
          </div>
          <div style="position: relative;">
            <el-input
              class="passwordInput"
              v-model="password"
              style="width: 30rem; height: 3rem;"
              :class="{ 'error-margin': isPasswordError }"
              placeholder="请输入8-12位密码"
              :type="isPasswordVisible ? 'text' : 'password'"
              clearable
            >
              <template #suffix>
                <el-image :src="urlSmallEyes" class="smallEyes" @click="togglePasswordVisibility" />
              </template>
            </el-input>
            <div v-if="isPasswordError" class="error-messageOne">密码需8-12个字符，并包含以下任意3项：1 个大写字母、1 个小写字母、1 个数字(0-9)、1 个特殊字符</div>
          </div>
          <div>
            <el-input
              class="passwordInput"
              v-model="againPassword"
              style="width: 30rem; height: 3rem;"
              :class="{ 'error-margin': isAgainPasswordError }"
              placeholder="请再次输入8-12位密码"
              :type="isAgainPasswordVisible ? 'text' : 'password'"
              clearable
            >
              <template #suffix>
                <el-image :src="urlSmallEyesAgain" class="smallEyes" @click="toggleAgainPasswordVisibility" />
              </template>
            </el-input>
            <div v-if="isAgainPasswordError" class="error-messageOne">密码需8-12个字符，并包含以下任意3项：1 个大写字母、1 个小写字母、1 个数字(0-9)、1 个特殊字符</div>
          </div>
        </div>
        <div class="attentionBox">请注意admin@flashforge.com是否收到来自FlashForge的邮件，有时候邮件可能会被归类为垃圾邮件，请查收确认。</div>
        <el-button
          class="buttonOne"
          style="width: 30rem; height: 3rem;"
          type="primary"
          @click="forgetPasswordClick"
        >确定</el-button>
      </div>
    </div>
  </div>
  <div v-if="isRegisteredUser" class="registered-user">
    <div class="registered-box">
      <el-image :src="urlRegisterSucceeded" class="urlRegisterSucceeded" />
      <div class="verificationSucceeded">密码重置成功！</div>
      <div style="margin-bottom: 1.5rem;">
        <span class="countdown-time">{{ countdown1 }}s</span>
        <span class="countdown-content">后将自动跳转至用户登录界面</span>
      </div>
      <div>
        <el-button
          class="buttonOne"
          style="width: 30rem; height: 3rem;"
          type="primary"
          @click="jumpImmediately"
        >立即登录</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .urlRegisterSucceeded {
    width: 7.5rem;
    height: 7.5rem;
    margin-bottom: 1.5rem;
  }

  .verificationSucceeded {
    color: rgb(0, 0, 0);
    font-family: Poppins;
    font-size: 2rem;
    font-weight: 500;
    line-height: 130%;
    margin-bottom: 0.75rem;
  }

  .countdown-time {
    font-family: Poppins;
    font-size: 2rem;
    font-weight: 400;
    line-height: 150%;
    color: rgb(0, 205, 109);
  }

  .error-messageFirst {
    cursor: pointer;
    position: absolute;
    color: rgb(0, 160, 233);
    top: 0.75rem;
    right: 1.25rem;
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%
  }

  .updateBox {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 150%;
    margin-left: 2rem;
  }

  :deep(.checkedInout .el-checkbox__label) {
    width: 27.9375rem;
  }

  .loginNowOne {
    font-family: HarmonyOS Sans;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
    margin-bottom: 2rem;
  }

  .registered-account {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 3rem;
    font-weight: 700;
    line-height: 130%;
  }

  .Check-boxOne {
    margin-bottom: 1.25rem !important;
  }

  .Check-box {
    text-align: center;
    color: rgb(235, 85, 87);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
    margin-bottom: 1rem;
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
    margin-bottom: 1rem;
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
    margin-bottom: 2rem;
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
    height: 46.875rem;
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
    margin-bottom: 2rem;
  }

  .checkedInoutTwo {
    // width: 368px;
    margin-bottom: 1rem;
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

  .registered-user {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .registered-box {
    width: 37.5rem;
    height: 26.25rem;
    background: rgb(255, 255, 255);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }

  .countdown-content {
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 150%;
    color: rgb(72, 72, 72);
  }

  @media (min-width: 1285px) and (max-width: 1536px) {
    .login {
      height: 42.5rem;
    }

    .logo {
      margin-bottom: 1rem;
    }

    .checkedInout {
      margin-bottom: 1rem;
    }
  }

  .attentionBox {
    width: 30rem;
    color: rgb(170, 172, 181);
    font-family: HarmonyOS Sans;
    font-size: 1rem;
    font-weight: 400;
    line-height: 150%;
    margin-bottom: 2.5rem;
  }

  .newLogin {
    color: rgb(0, 160, 233);
    font-family: Poppins;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 130%;
    margin-bottom: 2rem;
    cursor: pointer;
  }
</style>