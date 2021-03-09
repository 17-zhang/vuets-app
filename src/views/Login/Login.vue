<template>
  <div class="login">
    <LoginHeader>
      <el-form :rules="rules" :model="ruleForm" ref="ruleForm" slot="container" label-position="left" label-width="0px">
        <div class="title">
          <h3>账号密码登录</h3>
        </div>
        <!-- username -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>
         <!-- password -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button :loading="isLogin" @click.native.prevent="handleSubmit" type="primary" style="width: 100%">登录</el-button>
        </el-form-item>
        <!-- 7天自动登录和忘记密码 -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">7天内自动登录</el-checkbox>
          <el-button type="text" class="forget" @click="$router.push('/password')">忘记密码？</el-button>
        </el-form-item>
      </el-form>
    </LoginHeader>
  </div>
  
</template>

<script lang="ts">
import {Component,Vue, Provide} from "vue-property-decorator"
import LoginHeader from "./LoginHeader.vue"
@Component({
    components: {
      LoginHeader
      }
})
export default class Login extends Vue{

  @Provide() isLogin: boolean = false;  //默认不显示Loading

  @Provide() ruleForm:{
    username: String;
    pwd: String;
    autoLogin: boolean;
  } = {
    username: "",
    pwd: "",
    autoLogin: true  //是否自动登录
  }

  // 用装饰器定义规则
  @Provide() rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  handleSubmit():void{
    (this.$refs["ruleForm"] as any).validate((valid:boolean) =>{  // 必须指定类型
      if(valid) {  // 判断校验是否通过  
        // console.log("校验通过")
        this.isLogin = true;  // 显示loading
        // 校验成功，发起后端请求
        (this as any).$axios.post("/api/users/login", this.ruleForm).then((res: any) =>{
          this.isLogin = false;  // 请求成功后，隐藏
          console.log(res.data);
          // 存储token
          localStorage.setItem("tsToken", res.data.token);
        }).catch(() =>{
          this.isLogin = false;  // 请求成功后，隐藏
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
i {
  font-size: 14px;
  margin-left: 8px;
}
.forget {
  float: right;
}
</style>