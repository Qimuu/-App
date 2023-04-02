<template>
  <h1><img class="PunchImg" src="../assets/PunchInZiti.png" alt=""></h1>
  <div class="back" @click="back()">×</div>
  <div class="About">
    <h2 class="title">Introduction</h2>
    <div class="txt">
    <el-collapse class="txt" >
    <el-collapse-item title="关于打卡" name="1">
      <div>打卡功能在主界面，可实现每日打卡并存储在缓存中；可记录上次打卡时间以及当月打卡进度。</div>
      <div>主界面还可以生成打卡日历；自定义倒计时模块，可通过管理员界面进行设置。</div>
    </el-collapse-item>
    <el-collapse-item title="关于管理" name="2">
      <div>Diy倒计时功能：输入标题及日期并提交可更改主页倒计时信息（注：使用前请打开设置页面多开功能）。</div>
      <div>范围打卡：拥有正确的管理员密码即可实现大范围快速打卡。</div>
    </el-collapse-item>
    <el-collapse-item title="关于设置" name="3">
      <div>切换第一条倒计时为暑假倒计时还是考研倒计时，默认均为2023年日期。</div>
      <div>控制倒计时模块是否多开显示。</div>
      <div>控制两种进入软件时的时钟样式，默认为第一种。</div>
    </el-collapse-item>
    <el-collapse-item title="关于数据与后续" name="4">
      <div>在设置页面有导入导出全部数据功能，用于版本更新；导出的数据会复制到剪贴板，方便下次导入使用。</div>
      <div>一切问题或建议，请联系QQ : 1339428099。</div>
    </el-collapse-item>
  </el-collapse></div>

  <div class="bottomTxt"></div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        // activeNames: ['1']
      };
    },
    methods: {
      back() {
          this.$router.push('/GameView');
      },
    }
  }
</script>

<style scoped>
.back {
  float: right;
  font-size: 30px;
  font-weight: 800;
  position: absolute;
  top: 10px;
  right: 15px;
}
.About {
  margin: 10px 10px;
  text-align: center;
  background-color: white;
  height: 100%;
  border-radius: 20px;
}
.title {
  margin-top: 10px;
  padding-top: 20px;
  text-align: center;
}
.txt {
  padding: 5px 5px;
}
.bottomTxt {
  height: 100px;
}
</style>