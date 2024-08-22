<script lang="ts" setup>
  definePageMeta({
    layout: 'system',
    middleware: 'auth'
  })

  import { useRegisterApi } from '~/composables/user';
  const { getInternalUsers } = useRegisterApi();

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

  import { ref, computed, onMounted, reactive } from 'vue';

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

  const fetchInternalUsers = async () => {
  
    const page_Id = currentPage.value;
    const page_Size = pageSize.value;
    const email = inputloginAccount.value;
    const name = inputNameOfUser.value;
    // const status = userStatus.value;
  
    try {
      const response = await getInternalUsers(page_Id, page_Size, email, name);
      console.log('User account details fetched successfully:', response);
      console.log(response.data.list);
      if (response.data.list === null) {
        tableData.value = []
        return
      }
      tableData.value = response.data.list
      return response.data; // 可以返回数据以便进一步处理
    } catch (err) {
      console.error('Failed to fetch account details:', err);
      throw err; // 如果需要，可以重新抛出错误
    }
  };


  onMounted(() => {
    total.value = tableData.value.length;
    fetchInternalUsers()
  });

  const inputloginAccount = ref('')

  const inputNameOfUser = ref('')

  const userStatus = ref('')
  
  const options = [
    {
      value: '全部',
      label: '全部',
    },
    {
      value: '正常',
      label: '正常',
    },
    {
      value: '禁用',
      label: '禁用',
    },
    {
      value: '过期',
      label: '过期',
    }
  ]

  const form = reactive({
    alarmName: '',
    alarmSource: '',
    alarmCause: '',
    pushMode: '',
    belongingOrganization: '',
    userRole: '',
    remarks: ''
  })

  const rules = ref({
    condition: [
      { required: true, message: '请选择状态', trigger: 'change' }
    ]
  })
  
  const onSubmit = () => {
    console.log('submit!')
  }

  const remainingChars = computed(() => {
    return form.remarks.length
  })
  </script>
  
  <template>
  <div class="accountManagement flex flex-col">
    <div class="flex justify-between">
      <span class="accountManagementBox flex items-center">系统管理 / 账号管理</span>
      <span class="dateTime">2024年7月25日星期四 15:16</span>
    </div>
    <div class="formBox flex-1">
      <div class="formBox-title">
        <span style="margin-right: 20px;">添加告警规则</span>
        <el-button type="primary" class="returnButton">返回</el-button>
      </div>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="告警名称">
          <el-select v-model="form.alarmName" placeholder="请选择">
            <el-option label="A公司" value="A公司" />
            <el-option label="B公司" value="B公司" />
          </el-select>
        </el-form-item>
        <el-form-item label="告警源">
          <el-select v-model="form.alarmSource" placeholder="请选择">
            <el-option label="A公司" value="A公司" />
            <el-option label="B公司" value="B公司" />
          </el-select>
        </el-form-item>
        <el-form-item label="告警原因">
          <el-select v-model="form.alarmCause" placeholder="请选择">
            <el-option label="A公司" value="A公司" />
            <el-option label="B公司" value="B公司" />
          </el-select>
        </el-form-item>
        <el-form-item label="推送方式">
          <el-radio-group v-model="form.pushMode">
            <el-radio value="邮件">邮件</el-radio>
            <el-radio value="平台消息">平台消息</el-radio>
            <el-radio value="短信">短信</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属组织">
          <el-select v-model="form.belongingOrganization" placeholder="请选择">
            <el-option label="系统管理员" value="系统管理员" />
            <el-option label="操作员" value="操作员" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="form.userRole" placeholder="请选择">
            <el-option label="系统管理员" value="系统管理员" />
            <el-option label="操作员" value="操作员" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.remarks"
            type="textarea"
            placeholder="请输入内容"
            :maxlength="100"
            show-word-limit
           />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="sureCreate">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

  @media (min-width: 768px) and (max-width: 985px) {
    .accountManagement {
      height: auto;
      overflow-y: auto;
      max-height: 100vh;
      box-sizing: border-box;
    }
  }

  :deep(.sureCreate>span) {
    color: #fff !important;
  }

  :deep(.returnButton>span) {
    color: #fff !important;
  }

  :deep(.coutry-box .el-select__wrapper) {
    width: 242px;
    margin-right: 30px;
  }
</style>