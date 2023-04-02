<template>
    <div class="tot">  &nbsp; 
    <div class="total">
        <div class="backBtn"><a @click="show('Punch')" class="backBtn">&lt;</a></div>
        <div class="main">
            <div class="Days" id="DaysNumber"></div>
        </div>
        <div class="bottomInfo">
            <button class="backBigBtn">
                未完待续       
            </button>
            <div class="bottomTip">
                <div class="lastTime" id="lastTime"></div>
                <div class="joke">如果有一切问题或建议请联系QQ：1339428099 </div>
            </div>
        </div>
    </div></div> 
</template>

<script>
export default {
    methods: {
        show(index) {
            if(index == 'Punch') {
            this.$router.push('/PunchPage')
            }
            if(index == 'Clock') {
            this.$router.push('/ClockView')
            }
            if(index == 'Login') {
            this.$router.push('/LoginPage')
            }
            if(index == 'About') {
            this.$router.push('/AboutView')
            }
            if(index == 'Admin') {
            this.$router.push('/AdminView')
            }
            if(index == 'Set') {
            this.$router.push('/SetView')
            }
            if(index == 'OutPut') {
            this.$router.push('/OutPutView')
            }
        }
    }
}
</script>

<style scoped>
.tot {
    background-color: #910E14;
    height: 100vh;
}
.total {
    text-align: center;
    background-color: #910E14;
    width: 100%;
    margin-top: 0;
    padding: 0;
}
.main{
    margin: 0 auto;
    /* background-color: #BA0913; */
    width: 300px;
    height: 400px;
    margin-top: 30px;
    background: url("../store/BDImg2.jpg");
    background-size: cover;
    margin-top: 70px;
    border-radius: 15px;
}
.backBtn {
    color: white;
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 27px;
}
.bottomInfo {
    text-align: center;
}
.Days {
    position: absolute;
    top: 402px;
    left: 180px;
    font-weight: 800;
    color: gold;
}
.bottomInfo {
    text-align: center;
}
.backBigBtn {
    background-color: #FDE440;
    width: 270px;
    height: 35px;
    border-radius: 1000px;
    margin: 0 auto;
    margin-top: 30px;
    font-weight: 700;
    border-style: none;
}
.bottomTip {
    margin-top: 10px;
    font-size: 12px;
    color: white;
    font-weight: 700;
}
.backBtn{
    text-decoration: none;
}
  
</style>