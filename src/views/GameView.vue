<template>
    <div class="game">
        <div class="title">App</div>
        <div class="app">
            <div class="list"><img class="listImg" onclick="location.href='./static/list.html'" src="../assets/list.png" alt=""><br>待办</div>
            <div class="two"><img class="twoImg" onclick="location.href='./static/2048.html'" src="../assets/2048.png" alt=""><br>2048</div>
                       
            <div class="calendar"><img class="calendarImg" onclick="location.href='./static/index.html'" src="../assets/calIco.png" alt=""><br>日历</div>
            <div class="set"><img class="calendarImg" @click="goset()" src="../assets/setIco.png" alt=""><br>设置</div>
            <div class="admin"><img class="adminImg" @click="goadmin()" src="../assets/adminIco.png" alt=""><br>管理员</div>
            <div class="set"><img class="calendarImg" @click="goabout()" src="../assets/aboutIco.png" alt=""><br>关于</div>
            <div class="set"><img class="calendarImg" @click="gonew()" src="../assets/updateIco.png" alt=""><br>公告</div>
            <div class="set1"><img class="setImg1" src="../assets/updateIco.png" alt=""><br></div>
        </div>
        <!-- <h5>Ps: 以下功能不稳定，仍在测试中。</h5><br> -->
        <!-- <button class="btn" onclick="location.href='./static/2048.html'">2048</button> -->
        <!-- <el-button class="btn" onclick="location.href='./static/list.html'">To do list</el-button> -->
    </div>
</template>

<script>
export default {
    methods: {
        show(index) {
            if(index == 'toDoList') {
                this.$router.push('/toDoListView')
            }
        },
        goset() {
            this.$router.push('/SetView')
        },
        goadmin() {
            this.$router.push('/AdminView')
        },
        goabout() {
            this.$router.push('/AboutView')
        },
        gonew() {
            this.$router.push('/newLogView')
        }
    }
}
</script>

<style scoped>
.game{
    text-align: center;
}
.btn{ 
    width: 200px;
    height: 40px;
    margin-top: 10px;
    background-color: white;
    border-radius: 100px;
    border: 1px solid;
}
.app {
    margin-left: calc(10%);
    width: 80%;
    height: 300px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 20px;
}
.list {
    padding-top: 20px;
    width: 25%;
    float: left;
}
.listImg {
    width: 40px;
    height: 40px;   
}
.title {
    font-size: 24px;
    margin-bottom: 35px;
    margin-top: 10px;
}
.two {
    padding-top: 20px;
    width: 25%;
    float: left;
}
.twoImg {
    width: 40px;
    height: 40px;  
    border-radius: 5px; 
}
.calendar {
    padding-top: 20px;
    width: 25%;
    float: left;
}
.calendarImg {
    width: 40px;
    height: 40px;  
    border-radius: 5px; 
}
.set {
    padding-top: 20px;
    width: 25%;
    float: left;
}
.admin{
    width: 25%;
    padding-top: 20px;   
    float: left;
}
.adminImg{
    width: 40px;
    height: 40px;  
    border-radius: 5px; 
}
.set1{
    padding-top: 20px;
    width: 25%;
    float: left;
}
.setImg1{
    width: 40px;
    height: 40px;  
    border-radius: 5px; 
    opacity: 0;
}
</style>