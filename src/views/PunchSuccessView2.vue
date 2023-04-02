<template>
    <div class="tot">
        <div class="main">
            <div class="Days" id="DaysNumber">{{ PunchNums }}</div>
            <a class="backBigBtn" @click="getInt">领取积分</a>
            <div class="integral">积分余额：{{ integral }}</div>
        </div>
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
    background-color: #808080;
    text-align: center;
}
.main {
    text-align: center;
    height: 100vh;
    background: url("../store/DBD2.jpg") no-repeat;
    background-size: 100% 80%;
}
.Days {
    color: #FEECC4;
    position: absolute;
    top: 39.6%;
    left: 56.2%;
    font-size: 24px;
    font-weight: 800;
}
.backBigBtn {
    /* width: 100%; */
    color: #DDDDDF;
    position: absolute;
    top: 72%;
    text-align: center;
    left: calc((100% - 104px) / 2);
    
    font-size: 26px;
    font-weight: 800;
    text-decoration: underline;
}
.integral {
    width: 100%;
    color: #DDDDDF;
    position: absolute;
    top: 76.5%;
    /* left: calc((100% - 141px) / 2); */
    text-align: center;
    justify-items: center;
    align-items: center;
    font-size: 18px;
    font-weight: 800;
}
</style>