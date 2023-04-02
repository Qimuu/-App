<template>
  <div class="back" @click="back()">×</div>
    <div class="block">
  <el-timeline>
    <el-timeline-item timestamp="2023-02-11" placement="top">
      <el-card>
        <h4>版本：3.0.0</h4>
        <p>软件布局重新调整<br>修复若干细节问题<br>修复部分意外bug</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2023-02-13" placement="top">
      <el-card>
        <h4>版本：3.0.2</h4>
        <p>修复若干位置偏移问题<br>更换程序图标<br>修复部分bug</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2023-03-14" placement="top">
      <el-card>
        <h4>版本：3.0.3</h4>
        <p>新增积分兑换确认对话框<br>软件名称正式化<br>采用HbuilderX打包</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
        back() {
            this.$router.push('/GameView');
        }
    }
  }
</script>

<style scoped>
.block {
  width: 300px;
  margin-top: 60px;
}
.back {
  float: right;
  font-size: 30px;
  font-weight: 800;
  position: absolute;
  top: 10px;
  right: 15px;
}
</style>