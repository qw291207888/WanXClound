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
</script>

<template>
  <div class="accountManagement flex flex-col">
    <div class="flex justify-between">
      <span class="accountManagementBox flex items-center">系统管理 / 告警规则</span>
      <span class="dateTime">2024年7月25日星期四 15:16</span>
    </div>
    <div class="formBox flex-1">
      <!-- <div class="formBox-title">账号管理</div>
      <div class="search-box flex justify-between items-center">
        <div class="flex flex-wrap gap-10 search-jsk">
          <div>
            <el-input v-model="inputloginAccount" placeholder="登录账号" class="loginAccount" />
          </div>
          <div>
            <el-input v-model="inputNameOfUser" placeholder="用户名称" class="nameOfUser" />
          </div>
          <div class="flex items-center">
            <span class="userStatus-box">用户状态：</span>
            <el-select v-model="value" placeholder="全部" class="userStatus">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="flex items-center elButtonBox gap-5">
          <div>
            <el-button>查询</el-button>
          </div>
          <div>
            <el-button>重置</el-button>
          </div>
        </div>
      </div> -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClickOne">
        <el-tab-pane label="故障告警" name="first">
          <div class="elButtonBox elButtonFirst">
            <el-button>添加</el-button>
            <el-button>删除</el-button>
          </div>
          <el-table :data="paginatedData" border max-height="290" style="width: 100%;">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="name" label="告警名称" width="165" align="center">
              <template #default="{ row }">
                {{ row.name || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="email" label="告警源" width="220" align="center">
              <template #default="{ row }">
                {{ row.email || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="告警原因" width="165" align="center">
              <template #default="{ row }">
                {{ row.phone || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="company" label="通知账号" width="220" align="center">
              <template #default="{ row }">
                {{ row.company || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="role_id" label="推送方式" width="165" align="center">
              <template #default="{ row }">
                {{ row.role_id || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="所属组织" width="165" align="center">
              <template #default="{ row }">
                {{ row.status || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="所属部门" width="165" align="center">
              <template #default="{ row }">
                {{ row.status || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="用户角色" width="165" align="center">
              <template #default="{ row }">
                {{ row.status || '—' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="147" align="center">
              <template #default>
                <el-button link type="primary" size="small" @click="handleClick">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 表格分页 -->
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-tab-pane>
        <el-tab-pane label="窜货告警" name="second">
          <div class="elButtonBox elButtonFirst">
            <el-button>添加</el-button>
            <el-button>删除</el-button>
          </div>
          <el-table :data="paginatedData" border max-height="290" style="width: 100%;">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="name" label="告警名称" width="165" align="center">
              <template #default="{ row }">
                {{ row.name || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="email" label="告警源" width="220" align="center">
              <template #default="{ row }">
                {{ row.email || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="告警原因" width="165" align="center">
              <template #default="{ row }">
                {{ row.phone || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="company" label="通知账号" width="220" align="center">
              <template #default="{ row }">
                {{ row.company || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="role_id" label="推送方式" width="165" align="center">
              <template #default="{ row }">
                {{ row.role_id || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="所属组织" width="165" align="center">
              <template #default="{ row }">
                {{ row.status || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="所属部门" width="165" align="center">
              <template #default="{ row }">
                {{ row.status || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="用户角色" width="165" align="center">
              <template #default="{ row }">
                {{ row.status || '—' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="147" align="center">
              <template #default>
                <el-button link type="primary" size="small" @click="handleClick">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 表格分页 -->
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-tab-pane>
        <el-tab-pane label="用伪告警" name="third">
          <div class="elButtonBox elButtonFirst">
            <el-button>添加</el-button>
            <el-button>删除</el-button>
          </div>
          <el-table :data="paginatedData" border max-height="290" style="width: 100%;">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="name" label="告警名称" width="165" align="center">
              <template #default="{ row }">
                {{ row.name || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="email" label="告警源" width="220" align="center">
              <template #default="{ row }">
                {{ row.email || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="告警原因" width="165" align="center">
              <template #default="{ row }">
                {{ row.phone || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="company" label="通知账号" width="220" align="center">
              <template #default="{ row }">
                {{ row.company || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="role_id" label="推送方式" width="165" align="center">
              <template #default="{ row }">
                {{ row.role_id || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="所属组织" width="165" align="center">
              <template #default="{ row }">
                {{ row.status || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="所属部门" width="165" align="center">
              <template #default="{ row }">
                {{ row.status || '—' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="用户角色" width="165" align="center">
              <template #default="{ row }">
                {{ row.status || '—' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="147" align="center">
              <template #default>
                <el-button link type="primary" size="small" @click="handleClick">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 表格分页 -->
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-tab-pane>
      </el-tabs>
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

  // @media (min-width: 768px) and (max-width: 985px) {
  //   .accountManagement {
  //     height: auto;
  //     overflow-y: auto;
  //     max-height: 100vh;
  //     box-sizing: border-box;
  //   }
  // }
</style>