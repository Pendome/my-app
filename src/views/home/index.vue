<template>
  <div class="home-loading">
    <el-form ref="formLogin" v-model="form" label-width="80px">
      <el-form-item label="用户">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" v-on:click="login">登录</el-button>
    <el-button type="primary" v-on:click="test">测试</el-button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
// import store from '@/store/index'
import api from '@/services/api/home'
import { Base64 } from 'js-base64'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  setup: () => {
    const count = ref(0)
    const formRef = reactive({
      email: '',
      password: ''
    })
    const login = () => {
      console.log(formRef)
      api.login({
        email: formRef.email,
        password: Base64.encode(formRef.password)
      })
    }
    const test = () => {
      interface Lengthwise {
        length: number
      }
      function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length)
        return arg
      }
      loggingIdentity('asd')
    }
    return { count, form: formRef, login, test }
  },
  created() {},
  methods: {}
})
</script>

<style lang="scss" scoped>
.home-loading {
  margin: 0 auto;
  width: 50%;
}
</style>
