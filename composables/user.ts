import { useNuxtApp } from 'nuxt/app';
import { type AxiosInstance } from 'axios';

interface RegisterUserData {
  first_name: string;
  last_name: string;
  email: string;
  email_verify_code: string;
  password: string;
  accept_policy: boolean;
  allow_send: boolean;
}

interface LoginUserData {
  email: string;
  password: string;
  auto_login: boolean;
  agree_policy: boolean;
}

interface detailsUserData {
  country: string;
  city: string;
  company: string;
  distributors: string;
  phone: string;
  phone_verify_code: string;
  email: string;
  password: string;
}

interface resetPasswordData {
  email: string;
  email_verify_code: string;
  new_password: string;
}

export const useRegisterApi = () => {
  const { $axios } = useNuxtApp();
  const axios = $axios as AxiosInstance;

  const sendEmailVerifyCode = async (email: string): Promise<any> => {
    try {
      const response = await axios.post('/register/email-verify-code', { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error sending email verification code:', error);
      throw error;
    }
  };

  const sendResetEmailVerifyCode = async (email: string): Promise<any> => {
    try {
      const response = await axios.post('/login/email-verify-code', { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error sending email verification code:', error);
      throw error;
    }
  };

  const registeredUser = async (userData: RegisterUserData): Promise<any> => {
    try {
      const response = await axios.post('/register/user', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error sending email verification code:', error);
      throw error;
    }
  };

  const getLoginToken = async (loginData: LoginUserData): Promise<any> => {
    try {
      const response = await axios.post('/login/token', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error sending email verification code:', error);
      throw error;
    }
  };

  const getUserDetails = async (detailsData: detailsUserData): Promise<any> => {
    try {
      const response = await axios.patch('/register/user-details', detailsData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error sending email verification code:', error);
      throw error;
    }
  };

  const getResetPassword = async (resetData: resetPasswordData): Promise<any> => {
    try {
      const response = await axios.post('/login/password', resetData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error sending email verification code:', error);
      throw error;
    }
  };

  const getAccountDetails = async (user_id: number): Promise<any> => {
    try {
      const response = await axios.get(`/system-management/account`, {
        params: { user_id },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getEndCustomerList = async (page_id: number, page_size:number, country:string): Promise<any> => {
    try {
      const response = await axios.get(`/customer-management/customer/list`, {
        params: { page_id, page_size, country },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getDealerList = async (page_id: number, page_size:number, user_id:string, country:string, proxy_country:string): Promise<any> => {
    try {
      const response = await axios.get(`/customer-management/distributor/list`, {
        params: { page_id, page_size, user_id, country, proxy_country },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getDealerNameList = async (countries:string): Promise<any> => {
    try {
      const response = await axios.get(`/customer-management/hierarchy/list/distributor`, {
        params: { countries },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getCountriesList = async (): Promise<any> => {
    try {
      const response = await axios.get(`/search/countries`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getUserList = async (type:number): Promise<any> => {
    try {
      const response = await axios.get(`/search/user`, {
        params: { type },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getCustomerHierarchy = async (page_id: number, page_size:number, distributor_ids:number[]): Promise<any> => {
    try {
      const response = await axios.get(`/customer-management/hierarchy/list/distributor/customer`, {
        params: { page_id, page_size, distributor_ids },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };
  
  const getCustomerDetails = async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`/customer-management/customer`, {
        params: { id },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getEquipmentSituation = async (page_id: number, page_size:number, customer_id:number, device_model:string, device_mac:string, device_sn:string, country:string): Promise<any> => {
    try {
      const response = await axios.get(`/customer-management/customer/list/device`, {
        params: { page_id, page_size, customer_id, device_model, device_mac, device_sn, country },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getEquipmentType = async (): Promise<any> => {
    try {
      const response = await axios.get(`/search/device-model`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getDealerDetails = async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`/customer-management/distributor`, {
        params: { id },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getMaterialCondition = async (page_id: number, page_size:number, customer_id:number, card_uid:string, country:string, device_model:string, device_mac:string): Promise<any> => {
    try {
      const response = await axios.get(`/customer-management/customer/list/card`, {
        params: { page_id, page_size, customer_id, card_uid, country, device_model, device_mac },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getDealerEquipment = async (page_id: number, page_size:number, distributor_id:number, device_model:string, device_mac:string, device_sn:string, country:string): Promise<any> => {
    try {
      const response = await axios.get(`/customer-management/distributor/list/device`, {
        params: { page_id, page_size, distributor_id, device_model, device_mac, device_sn, country },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getDealerWax  = async (page_id: number, page_size:number, distributor_id:number, card_uid:string, country:string, device_model:string, device_mac:string): Promise<any> => {
    try {
      const response = await axios.get(`/customer-management/distributor/list/card`, {
        params: { page_id, page_size, distributor_id, card_uid, country, device_model, device_mac },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getStateStatistics  = async (): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/device/stats/status`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getEquipmentPerformance = async (device_model: string): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/device/stats/performance`, {
        params: { device_model },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getEquipmentList = async (page_id: number, page_size: number, device_model: string, device_mac: string, device_sn: string, country: string): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/device/list`, {
        params: { page_id, page_size, device_model, device_mac, device_sn, country },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getConsumptionNumber = async (): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/card/stats/consumption-alert-num`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getConsumptionMonth = async (country: string): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/card/stats/consumption-country`, {
        params: { country },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  // const getWaxList = async (page_id: number, page_size: number, card_uid: string, card_type: string, device_model: string, device_mac: string, country: string): Promise<any> => {
  //   try {
  //     const response = await axios.get(`/device-card-management/card/list`, {
  //       params: { page_id, page_size, card_uid, card_type, device_model, device_mac, country },
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept-Language': 'zh-CN'
  //       }
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching account details:', error);
  //     throw error;
  //   }
  // };

  const getWaxList = async (page_id: number, page_size: number, card_uid: string, device_model: string, device_mac: string, country: string): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/card/list`, {
        params: { page_id, page_size, card_uid, device_model, device_mac, country },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getEquipmentDetail = async (device_sn: string): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/device`, {
        params: { device_sn },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getAlarmFrequency = async (device_sn: string): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/device/stats/alert-num`, {
        params: { device_sn },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getJobPrinting = async (device_sn: string): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/device/stats/completion`, {
        params: { device_sn },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getWaxConsumption = async (device_sn: string): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/device/stats/card-consumption`, {
        params: { device_sn },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getEquipmentHistory = async (device_sn: string): Promise<any> => {
    try {
      const response = await axios.get(`/device-card-management/device/stats/alert`, {
        params: { device_sn },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getInternalUsers = async (page_id: number, page_size: number, email: string, name: string): Promise<any> => {
    try {
      const response = await axios.get(`/system-management/account/list`, {
        params: { page_id, page_size, email, name },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getAlarmStatistics = async (): Promise<any> => {
    try {
      const response = await axios.get(`/alert-center/stats`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getLatestPendingProcessing = async (type: number): Promise<any> => {
    try {
      const response = await axios.get(`/alert-center/latest`, {
        params: { type },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getAlarmTrend = async (type: number, date: string): Promise<any> => {
    try {
      const response = await axios.get(`/alert-center/trend`, {
        params: { type, date },
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'zh-CN'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching account details:', error);
      throw error;
    }
  };

  const getAlarmRecord = async (
  page_id: number,
  page_size: number,
  type: number,
  card_uid: string,
  device_model: string,
  device_mac: string,
  alert_name: string,
  alert_time_range: { start_at: number | null, end_at: number | null }
): Promise<any> => {
  try {
    const response = await axios.get('/alert-center/list', {
      params: {
        page_id,
        page_size,
        type,
        card_uid,
        device_model,
        device_mac,
        alert_name,
        alert_time_range
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'zh-CN'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching alarm record:', error);
    throw error;
  }
};
  
   const getGoodsEscaping = async (): Promise<any> => {
     try {
       const response = await axios.get(`/alert-center/trend-transfer`, {
         headers: {
           'Content-Type': 'application/json',
           'Accept-Language': 'zh-CN'
         }
       });
       return response.data;
     } catch (error) {
       console.error('Error fetching account details:', error);
       throw error;
     }
   };

  // const getAlarmRecord = async (
  //   page_id: number,
  //   page_size: number,
  //   type: number,
  //   card_uid: string,
  //   device_model: string,
  //   device_mac: string,
  //   alert_name: string,
  //   alert_time_range: { start_at: number | null, end_at: number | null }
  // ): Promise<any> => {
  //   try {
  //     const response = await axios({
  //       url: '/alert-center/list',
  //       method: 'get',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept-Language': 'zh-CN'
  //       },
  //       data: {
  //         page_id,
  //         page_size,
  //         type,
  //         card_uid,
  //         device_model,
  //         device_mac,
  //         alert_name,
  //         alert_time_range
  //       }
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching alarm record:', error);
  //     throw error;
  //   }
  // };

  return {
    sendEmailVerifyCode,
    registeredUser,
    getLoginToken,
    getUserDetails,
    sendResetEmailVerifyCode,
    getResetPassword,
    getAccountDetails,
    getEndCustomerList,
    getDealerList,
    getDealerNameList,
    getCountriesList,
    getUserList,
    getCustomerHierarchy,
    getCustomerDetails,
    getEquipmentSituation,
    getEquipmentType,
    getDealerDetails,
    getMaterialCondition,
    getDealerEquipment,
    getDealerWax,
    getStateStatistics,
    getEquipmentPerformance,
    getEquipmentList,
    getConsumptionNumber,
    getConsumptionMonth,
    getWaxList,
    getEquipmentDetail,
    getAlarmFrequency,
    getJobPrinting,
    getWaxConsumption,
    getEquipmentHistory,
    getInternalUsers,
    getAlarmStatistics,
    getLatestPendingProcessing,
    getAlarmTrend,
    getAlarmRecord,
    getGoodsEscaping
  };
};
