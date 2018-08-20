<template>
  <div class="login-wrap">
    <el-form :model="formItem" :rules="rules2" ref="ruleForm" class="login-main">
      <h3 class="login-title">登录系统</h3>
      <el-form-item prop="account">
        <el-input type="text" class="el-input-mine" placeholder="username" v-model="formItem.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" class="el-input-mine" placeholder="password" v-model="formItem.password"></el-input>
      </el-form-item>
      <el-select v-model="userRole" placeholder="请选择" class="role-class" @change="getRoleChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="width:100%;" @click="loginIn('ruleForm')">登录</el-button>
    </el-form>
    <!-- modal -->
    <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input
        type="text"
        class="el-input-register"
        placeholder="username"
        v-model="registerInfo.username"
        auto-complete="off">
      </el-input>
      <el-input
        type="text"
        class="el-input-register"
        placeholder="password"
        v-model="registerInfo.password"
        auto-complete="off">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="registerBtn">创建用户</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
import { passCheck } from '@/utils/validate'
import { userLogin, userRegister } from '@/api/userInfo'
export default {
  data () {
    const validAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    const validPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else if (passCheck(value)) {
        return callback(new Error('密码不能少于8位,且必须有数字字母组合'))
      } else {
        callback()
      }
    }
    return {
      formItem: {
        username: '',
        password: ''
      },
      rules2: {
        username: [
          {
            validator: validAccount,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: validPass,
            trigger: 'blur'
          }
        ]
      },
      cliboard: '',
      options: [
        {
          label: '管理员',
          value: 'admin'
        },
        {
          label: '普通用户',
          value: 'user'
        }
      ],
      userRole: 'admin',
      dialogVisible: false,
      registerInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    loginIn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userLogin(this.formItem).then((res) => {
            if (res.data.status === 10000) {
              this.dialogVisible = true
              this.$message.error(res.data.data.message)
            }
            if (res.data.status === 200) {
              Cookie.set('user', this.formItem.username)
              Cookie.set('role', this.userRole)
              this.$router.push({
                name: 'shop-list'
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    registerBtn () {
      if (!this.registerInfo.username || !this.registerInfo.password) {
        return
      }
      userRegister(this.registerInfo).then((res) => {
        if (res.data.status === 200) {
          this.$message.info('注册成功，请登录!')
          this.dialogVisible = false
        } else {
          this.$message.error('注册失败，请重试!')
        }
      })
    },
    getRoleChange (val) {
      this.userRole = val
    }
  }
}
</script>
<style lang="scss">
  @import './login.scss';
  .role-class{
    width: 100%;
    margin-bottom: 30px;
    .el-input__inner{
      background-color: #2d3a4b;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, .6);
    }
  }
</style>
