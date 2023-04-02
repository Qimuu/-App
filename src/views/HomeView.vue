<template>
  <div class="layout">
    <el-tabs type="border-card">
      <el-tab-pane label="登录">
        <el-form
          label-position="right"
          label-width="60px"
          style="max-width: 460px"
          class="loginForm"
        >
          <el-form-item label="邮箱：">
            <el-input v-model="Email" />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="password" />
          </el-form-item>

          <el-row>
            <el-checkbox
              class="checkBox"
              v-model="isAgree"
              label="同意用户使用准则"
              name="type"
            />
          </el-row>
          <el-button
            v-if="isAgree"
            type="primary"
            class="loginBtn"
            @click="login"
          >
            登录
          </el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="注册">
        <el-form
          label-position="right"
          label-width="100px"
          style="max-width: 460px"
          class="loginForm"
        >
          <el-form-item label="邮箱：">
            <el-input v-model="rEmail" />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input type="password" v-model="rPassword" />
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input
              type="password"
              v-model="confirmPassword"
              @blur="confirmFunc"
            />
          </el-form-item>

          <el-row>
            <el-checkbox
              class="checkBox"
              v-model="rAgree"
              label="同意用户使用准则"
              name="type"
            />
          </el-row>
          <el-button
            v-if="rAgree"
            type="primary"
            class="loginBtn"
            @click="register"
          >
            注册
          </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div>
      
      <el-button
        type="primary"
        class="loginBtn"
        @click="daka"
      >打卡
      </el-button>
      <el-button
        type="primary"
        class="loginBtn"
        @click="daka_del"
      >删除
      </el-button>
      <span class="rLastDate">{{rLastDate}}</span>
    </div>
    
  
</template>
<script>
import { reactive, toRefs } from "@vue/reactivity";
import { ElMessage } from "element-plus";
export default {
  mounted() {
    if(localStorage.getItem("LastDate") != null) {
      this.rLastDate = localStorage.getItem("LastDate");
    }
  },
  setup() {
    const form = reactive({
      Email: "",
      password: "",
      isAgree: 0,
    });
    const registerForm = reactive({
      rEmail: "",
      rPassword: "",
      confirmPassword: "",
      identifyCode: "",
      rAgree: 0,
    });
    const DakaDate = reactive({
      rLastDate: "今日未打卡",
    });

    // 方法
    // 登录
    function login() {
      console.log(form);
    }
    // 注册
    function register() {
      console.log("注册", registerForm);
      if(registerForm.rPassword !== registerForm.confirmPassword) console.log("注册失败");
      else console.log("注册成功");
    }
    // 获取验证码
    // 确认密码
    // function confirmFunc() {
    //   if (registerForm.confirmPassword !== registerForm.rPassword)
    //     alert("密码与确认密码不一致");
    // }
    function daka() {
      // console.log("打卡", DakaDate);
      // console.log(DakaDate.qdate);
      // sessionStorage.setItem("Date", DakaDate.qdate);
      var curDate = new Date();
      var curYear = curDate.getFullYear();
      var curMonth = (curDate.getMonth() + 1) > 9 ? curDate.getMonth() + 1 : `0${curDate.getMonth() + 1}`;
      var curDay = curDate.getDate() > 9 ? curDate.getDate() : `0${curDate.getDate()}`;
      var curDayData = `${curYear}-${curMonth}-${curDay}`;
      
      if(curDayData == localStorage.getItem("LastDate")) {
        console.log("今日已打卡");
      }else {
        localStorage.setItem("LastDate", curDayData);
        console.log("打卡成功");
        DakaDate.rLastDate = curDayData;
      }
    }
    function daka_del() {
      localStorage.removeItem("LastDate");
      console.log("已删除");
      DakaDate.rLastDate = "今日未打卡";
    }
    const confirmFunc = () => {
      if (registerForm.confirmPassword !== registerForm.rPassword)
        ElMessage.error("密码与确认密码不一致.");
    };
    return {
      ...toRefs(form),
      ...toRefs(registerForm),
      ...toRefs(DakaDate),
      login,
      register,
      confirmFunc,
      daka,
      daka_del,
    };
  },
};
</script>

<style scoped>
.layout {
  position: absolute;
  left: calc(50% - 200px);
  top: 20%;
  width: 400px;
}
.loginBtn {
  width: 100px;
}
.loginForm {
  text-align: center;
}
.checkBox {
  margin-left: 7px;
}
.inpWidth {
  width: 165px;
}
.dateChoice {
  width: 200px;
  margin-right: 30px;
}
.rLastDate {
  width: 300px;
  margin: 20px;
}
</style>
