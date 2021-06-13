<template>
  <div class="login-container">
    <!--
      el-form 表单组件
    每个表单组件都必须使用 el-form-item 包裹
    -->

    <!--
      配置 form 表单验证：
      1.必须给 el-form 组件绑定 model 为表单数据对象
      2.给需要验证的表单项 el-form-item 绑定 prop 属性
      注意：prop 属性需要指定表单对象中的数据名称
      3.通过 el-form 组件的 rules 属性配置验证规则
      -->
    <el-form ref="form"
    class="login-form"
    :model="user"
    :rules="formRules"
    >
      <el-form-item prop="mobile">
        <el-input
         v-model="user.mobile"
         placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
         v-model="user.code"
         placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="onLoginLoading"
          @click="onLogin"
        >立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      checked: false, // 是否同意协议的选中状态
      onLoginLoading: false, // 登录的 loading 状态
      formRules: { // 表单验证规则配置
      // 验证的数据名称：规则列表[]
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3,5,7,8,9]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据 （根据接口要求绑定数据）
      const user = this.user
      // 表单验证
      // 验证通过,提交登录

      // 开启 loading
      this.onLoginLoading = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data 用来设置 POST 请求体
        data: user
      }).then(res => {
        // 登录成功
        // console.log(res);
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭 loading
        this.onLoginLoading = false
      }).catch(err => {
        // 登录失败
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        // 关闭 loading
        this.onLoginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.png") no-repeat;
  background-size: cover;
  .login-form {
  background: #fff;
  padding: 50px;
  min-width: 300px;
    .login-btn{
      width: 100%;
    }
  }
}
</style>
