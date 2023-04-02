<template>
    <div class="tot">  &nbsp; 
    <div class="total">
        <div class="backBtn"><a @click="show('Punch')" class="backBtn">&lt;</a></div>
        <div class="main">
            <div class="Days" id="DaysNumber">{{ PunchNums }}</div>
        </div>
        <div class="bottomInfo">
            <el-button class="backBigBtn" @click="getInt">
                {{ getBtnInfo }}       
            </el-button>
            <div class="bottomTip">
                <div class="integral">积分余额：{{ integral }}</div>
                <div class="joke">如果有一切问题或建议请联系QQ：1339428099 </div>
            </div>
        </div>
    </div></div> 
</template>

<script>
import dayjs from 'dayjs';
import _Message from 'element-plus/lib/el-message';
export default {
    data() {
        return {
            PunchNums: '',
            integral: localStorage.getItem("integral") == null ? 0 : localStorage.getItem("integral"),
            getBtnInfo: '领取积分',
        }
    },
    methods: {
        show(index) {
            if(index == 'Punch') {
            this.$router.push('/PunchPage')
            }
        },
        getInt() {
            if(localStorage.getItem("integral") == null) {
                localStorage.setItem("integral", 0);
            }
            var submitInt = parseFloat(localStorage.getItem("integral"));
            var todayData = new Date();
            var today = dayjs(todayData).format('YYYY/MM/DD'); 
            var todayPrepare = new Date(today);
            var lastPunchDay = localStorage.getItem("LastGetIntDate"); 
            if(lastPunchDay !== null && lastPunchDay == today) {
                _Message.error("请勿重复领取积分");
            }else {
                if(lastPunchDay == null) {
                    lastPunchDay = today;
                    localStorage.setItem("LastGetIntDate", today);
                }
                var temp = 0;
                lastPunchDay = new Date(lastPunchDay);
                if(todayPrepare - lastPunchDay !== 86400000) {
                    submitInt -= 0.5;
                    submitInt = Math.max(0, submitInt);
                    temp = (Math.random()*2).toFixed(2);
                    submitInt = parseFloat(submitInt) + parseFloat(temp);
                    localStorage.setItem("LastGetIntDate", today);
                }else {
                    temp = (Math.random()*3).toFixed(2);
                    submitInt = parseFloat(submitInt) + parseFloat(temp);
                    localStorage.setItem("LastGetIntDate", today);
                }
                submitInt = submitInt.toFixed(2);
                localStorage.setItem("integral", submitInt);
                this.integral = submitInt;
                _Message.success(`成功获得积分：${temp}`);
            }      
        },
        lastYesPunch() {
        }
    },
    mounted() {
        var sumDays = 0;
        var str = localStorage.getItem("Date");
        for(var i in str) 
        if(str[i] == '/') 
            sumDays ++;
        this.PunchNums = sumDays / 2;
    },
    setup() {
        
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
    top: 422.5px;
    left: 170px;
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