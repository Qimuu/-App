<template>
    <div class="tot">
        <div class="Days" id="DaysNumber">{{ PunchNums }}</div>
        <a class="backBigBtn" @click="getInt">领取积分</a>
        <div class="integral">积分余额：{{ integral }}</div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import _Message from 'element-plus/lib/el-message';
export default{
    data() {
        return {
            PunchNums: '',
            integral: localStorage.getItem("integral") == null ? 0 : localStorage.getItem("integral"),
        }
    },
    methods: {
        getInt() {
            if(localStorage.getItem("integral") == null) {
                localStorage.setItem("integral", 0);
            }
            var submitInt = parseFloat(localStorage.getItem("integral"));
            var todayData = new Date();
            var today = dayjs(todayData).format('YYYY/MM/DD'); 
            var todayPrepare = new Date(today);
            var lastPunchDay = localStorage.getItem("LastGetIntDate"); // == null ? today : localStorage.getItem("LastGetIntDate");
            if(lastPunchDay !== null && lastPunchDay == today) {
                // console.log("请勿重复领取");
                _Message.error("请勿重复领取积分");
            }else {
                if(lastPunchDay == null) {
                    lastPunchDay = today;
                    localStorage.setItem("LastGetIntDate", today);
                }
                var temp = 0;
                lastPunchDay = new Date(lastPunchDay);
                if(todayPrepare - lastPunchDay !== 86400000) {
                    // console.log("昨天没打卡");
                    submitInt -= 0.5;
                    submitInt = Math.max(0, submitInt);
                    temp = (Math.random()*2).toFixed(2);
                    submitInt = parseFloat(submitInt) + parseFloat(temp);
                    localStorage.setItem("LastGetIntDate", today);
                }else {
                    // console.log("昨天打卡了");
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
    },
    mounted() {
        var sumDays = 0;
        var str = localStorage.getItem("Date");
        for(var i in str) 
        if(str[i] == '/') 
            sumDays ++;
        this.PunchNums = sumDays / 2;
    },
}
</script>

<style scoped>
.tot {
    height: 100vh;
    background: url("../store/DBD1.jpg") no-repeat;
    background-size: 102% 100%;
}
.Days {
    color: #F7C58F;
    position: absolute;
    top: 74%;
    left: 59%;
    font-size: 30px;
    font-weight: 800;
}
.backBigBtn {
    color: #dc8f37;
    position: absolute;
    top: 65%;
    left: 42.5%;
    font-size: 26px;
    font-weight: 800;
    text-decoration: underline;
}
.integral {
    color: #dc8f37;
    position: absolute;
    top: 33%;
    left: 28%;
    font-size: 18px;
    font-weight: 800;
}
</style>