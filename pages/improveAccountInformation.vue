<script lang="ts" setup>
  definePageMeta({
    layout: 'login'
  });

  import { ref, watch, computed } from 'vue'

  import { useRegisterApi } from '~/composables/user';
  const { getUserDetails } = useRegisterApi();

  const email = ref('')
  const password = ref('')

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

  const emailNumberRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
  //     }
  //   } catch (error) {
  //     console.error('Registration failed:', error);
  //   }
  // }

  const verificationCode = ref('')

  const countdown = ref(0);
  const countdownText = ref('验证手机号');
  let countdownTimer: ReturnType<typeof setTimeout> | null = null;


  // const verificationClick = async () => {
  //   if (!emailNumberRegex.test(email.value)) {
  //     return
  //   }

  //   try {
  //     if (countdownTimer) {
  //       return;
  //     }

  //     const result = await sendEmailVerifyCode(email.value);
  //     console.log('Verification code sent:', result);

  //     // 开始倒计时
  //     countdown.value = 60; // 设置倒计时为60秒
  //     countdownText.value = '重新获取(' + countdown.value + ')'; // 更新文本
  //     startCountdown();
  //   } catch (error) {
  //     console.error('Failed to send verification code:', error);
  //   }
  // }

  // 开始倒计时函数
  const startCountdown = () => {
    countdownTimer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
        countdownText.value = '重新获取(' + countdown.value + ')';
      } else {
        clearInterval(countdownTimer as ReturnType<typeof setTimeout>);
        countdownTimer = null;
        countdownText.value = '验证手机号'; // 重置文本
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

  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();

  const route = useRoute();

  const userEmail = route.query.email;
  const userPassword = route.query.password;

  console.log(userEmail)
  console.log(userPassword)

  const countdown1 = ref(3);

  const isRegisteredUser = ref(false)

  onMounted(() => {
    if (isRegisteredUser.value === true) {
      const interval = setInterval(() => {
        if (countdown1.value > 0) {
          countdown1.value--;
        } else {
          clearInterval(interval);
          router.push('/improveAccountInformation');
        }
      }, 1000);
    }
  });

  const jumpImmediately = () => {
    router.push('/improveAccountInformation');
  }

  import axios from 'axios';

  // 定义国家类型
  interface Country {
    value: string;
    label: string;
  }

  // 国家代码到中文名称的映射
  const countryNameMap: { [key: string]: string } = {
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

  const country = ref<string>('');
  const countries = ref<Country[]>([]);
  const city = ref('');

  // 请求国家数据的函数
 const fetchCountries = async () => {
   try {
     const response = await axios.get('https://restcountries.com/v3.1/all');
     const data = response.data;
 
     // 解析数据获取国家的名称和代码 (ISO 3166-1 alpha-2)
     countries.value = data.map((country: { cca2: any; name: { common: any; }; }) => ({
       value: country.cca2,
       label: countryNameMap[country.cca2] || country.name.common
     }));
   } catch (error) {
     console.error('Error fetching countries:', error);
   }
 };
 
 // 在组件挂载时请求国家数据
 onMounted(() => {
   fetchCountries();
 });

  const company = ref('')
  const dealer = ref('')
  const mobile = ref('')

  const isRequired = ref(true)

  const isRequiredBox = ref(false)

  watch(country, (newCountry, oldCountry) => {
    if (newCountry !== 'CN') {
      isRequired.value = false
      isRequiredBox.value = true

      if(mobileError.value === true) {
        mobileErrorMessage.value = '请输入有效的国际手机号，格式如：+1234567890'
      }
    } else {
      isRequired.value = true
      isRequiredBox.value = false

      if(mobileError.value === true) {
        mobileErrorMessage.value = '请输入有效的中国手机号，格式如：+1234567890'
      }
    }
  });

  const mobileError = ref(false);
  const mobileErrorMessage = ref('');

  const cnMobileRegex = /^\+86(13[0-9]|14[0-9]|15[0-9]|16[5-6]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
  const intMobileRegex = /^\+\d{1,3}\d{4,14}$/;

  const validateMobile = () => {
    if (!mobile.value) {
      mobileError.value = false;
      mobileErrorMessage.value = '';
      return;
    }
    
    if (country.value === 'CN') {
      // const cnMobileRegex = /^\+86(13[0-9]|14[0-9]|15[0-9]|16[5-6]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
      if (!cnMobileRegex.test(mobile.value)) {
        mobileError.value = true;
        mobileErrorMessage.value = '请输入有效的中国手机号，格式如：+8613912345678';
      } else {
        mobileError.value = false;
        mobileErrorMessage.value = '';
      }
    } else if (country.value === '') {
      // const cnMobileRegex = /^\+86(13[0-9]|14[0-9]|15[0-9]|16[5-6]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
      if (!cnMobileRegex.test(mobile.value)) {
        mobileError.value = true;
        mobileErrorMessage.value = '请输入有效的中国手机号，格式如：+8613912345678';
      } else {
        mobileError.value = false;
        mobileErrorMessage.value = '';
      }
    } else {
      // const intMobileRegex = /^\+\d{1,3}\d{4,14}$/;
      if (!intMobileRegex.test(mobile.value)) {
        mobileError.value = true;
        mobileErrorMessage.value = '请输入有效的国际手机号，格式如：+1234567890';
      } else {
        mobileError.value = false;
        mobileErrorMessage.value = '';
      }
    }
  }

  const accomplishClick = async () => {
    if (!country.value) {
      ElMessage.error('国家是必填的')
    } else {
      if (country.value === 'CN') {
        if (!city.value) {
          ElMessage.error('城市是必填的')
        } else if (city.value && !company.value) {
          ElMessage.error('公司/工作室名称是必填的')
        } else if (city.value && company.value && !mobile.value) {
          ElMessage.error('手机号是必填的')
        } else if (city.value && company.value && cnMobileRegex.test(mobile.value)) {
          const detailsData = {
            country: country.value,
            city: city.value,
            company: company.value,
            distributors: dealer.value,
            phone: mobile.value,
            phone_verify_code: '123456',
            email: userEmail as string,
            password: userPassword as string
          };

          try {
            const response = await getUserDetails(detailsData);
            console.log('User registered successfully:', response)

            if (response.code === 0) {
              navigateTo('/login')
            }
          } catch (error) {
            console.error('Registration failed:', error);
          }
        }
      } else {
        if (!city.value) {
          ElMessage.error('城市是必填的')
        } else if (city.value && !company.value) {
          ElMessage.error('公司/工作室名称是必填的')
        } else if (city.value && company.value && (intMobileRegex.test(mobile.value) || !mobile.value)) {
          const detailsData = {
            country: country.value,
            city: city.value,
            company: company.value,
            distributors: dealer.value,
            phone: mobile.value,
            phone_verify_code: '123456',
            email: userEmail as string,
            password: userPassword as string
          };

          try {
            const response = await getUserDetails(detailsData);
            console.log('User registered successfully:', response)

            if (response.code === 0) {
              navigateTo('/login')
            }
          } catch (error) {
            console.error('Registration failed:', error);
          }
        }
      }
    }
  }
</script>

<template>
  <div class="login-box">
    <div class="login">
      <div style="position: relative">
        <div class="logo">
          <el-image :src="urlLogo" class="logoImage" />
        </div>
        <div class="registered-account">完善账户信息</div>
        <div class="loginNowOne">
          <span style="color: rgb(170, 172, 181);">建议您完善账户信息以获得全面且个性化的使用体验</span>
        </div>
        <div class="shulu">
          <div class="flex justify-between" style="margin-bottom: 2rem;">
            <div class="flex items-center">
              <span class="required">*</span>
              <el-select v-model="country" class="emialInputTwo" placeholder="国家" style="width: 14.25rem; height: 3rem;">
                <el-option
                  v-for="item in countries"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="flex items-center">
              <span class="required">*</span>
              <el-input class="emialInput emialInput-i" v-model="city" style="width: 14.25rem; height: 3rem;" placeholder="城市" />
            </div>
          </div>
          <div class="input-container" style="margin-bottom: 2rem;">
            <div class="flex items-center">
              <span class="required">*</span>
              <el-input class="emialInput emialInput-i" v-model="company" style="width: 30rem; height: 3rem;" placeholder="请输入您的公司/工作室名称" />
            </div>
          </div>
          <div class="input-container" style="margin-left: 0.93rem;">
            <el-input class="emialInput" v-model="dealer" style="width: 30rem; height: 3rem;" placeholder="请输入您的经销商/销售员名称" />
          </div>
          <div :class="{ 'required-box': isRequiredBox }" class="flex items-center" style="margin-bottom: 5rem;">
            <span v-if="isRequired" class="required">*</span>
            <div class="input-container">
              <el-input
                class="emialInput emialInput-i"
                v-model="mobile"
                style="width: 30rem; height: 3rem;"
                placeholder="请输入您的手机号"
                @input="validateMobile"
              />
              <div 
                class="error-messageFirst"
                style="visibility: hidden;"
              >{{ countdownText }}</div>
            </div>
          </div>
          <div class="error-messageTwo" v-if="mobileError" style="color: red;">
            {{ mobileErrorMessage }}
          </div>
        </div>
        <el-button
          class="buttonOne"
          @click="accomplishClick"
          style="width: 30rem; height: 3rem; margin-left: 0.93rem;"
          type="primary"
        >完成</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .required-box {
    margin-left: 0.93rem;
  }

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

  :deep(.el-select__wrapper) {
    height: 3rem;
    padding: 0.75rem 1.25rem;
  }

  :deep(.el-select__placeholder) {
    color: rgb(170, 172, 181) !important;
    font-family: HarmonyOS Sans !important;
    font-size: 1.125rem !important;
    font-weight: 400 !important;
    line-height: 130% !important;
    text-align: left !important;
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
    margin-left: 0.93rem;
  }

  .registered-account {
    color: rgb(51, 51, 51);
    font-family: HarmonyOS Sans;
    font-size: 3rem;
    font-weight: 700;
    line-height: 130%;
    margin-left: 0.93rem;
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
    margin-bottom: 2rem;
    margin-left: 0.93rem;
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

  .shulu {
    display: flex;
    flex-direction: column;
  }

  .emialInput {
    margin-bottom: 2rem;
  }

  .emialInputOne {
    margin-bottom: 5rem;
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

  .required {
    color: red;
    margin-right: 0.25rem;
    font-size: 1.5rem;
    line-height: 3rem;
  }

  .emialInput-i {
    margin-bottom: 0px;
  }

  .error-messageTwo {
    position: absolute;
    top: 32rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
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

    .error-messageTwo {
      top: 31rem;
    }
  }
</style>