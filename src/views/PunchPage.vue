<template>
    <div class="Punch">
         
      <div class="PunchState">今日<br>{{ DakaState }}</div>  
        <el-button :plain="true" class="loginBtn" @click="tipCurDayState">打卡</el-button>
        <div class="rLastDate">上次打卡时间<br>{{rLastDate}}</div>
        <div class="makeDakaHtml"><el-button class="makeBtn" onclick="location.href='./static/index.html'">Calendar</el-button></div>
        
        <div class="curMonthDakaNum" style="margin-bottom: 10px;">本月打卡进度</div>
        <el-progress class="dakaProgress" color="red" :percentage=curMonthDays ></el-progress>
     
        <br>
        <hr>

        <Transition>
          <div v-if="!show1" class="TestTime">考研倒计时 :
            <span class="LastTestClock">
              {{ LastDayDiff}} 天
            </span><br><br>
            <span v-if="show2">{{ diyMulTitle }} :&nbsp; {{ diyMulDiff }} 天</span>
            <span v-if="!show2"></span>
          </div>
        </Transition>
        <Transition>
          <div v-if="show1" class="TestTime">放假倒计时 :
            <span class="LastTestClock">
              {{ LastSummerDayDiff}} 天
            </span><br><br>
            <span v-if="show2">{{ diyMulTitle }} :&nbsp; {{ diyMulDiff }} 天</span>
            <span v-if="!show2"></span>
          </div>
        </Transition>
      </div>
      
    
  </template>
  <script>
import { reactive, toRefs } from "@vue/reactivity";
import dayjs from 'dayjs';
  export default {
    data() {
      return {
        show1: localStorage.getItem("PunchUnderState") == '1' ? true : false,
        show2: localStorage.getItem("MulOpenState") == '1' ? true : false,
        diyMulTitle: localStorage.getItem("DiyMulTitle") ? localStorage.getItem("DiyMulTitle") : "自定义",
        daka_time: '',
      }
    },
    mounted() {
      if(localStorage.getItem("LastDate") != null) {
        this.rLastDate = localStorage.getItem("LastDate");
      }
    },
    methods: {
      DakaLog() {
        var nowTime = new Date();
        this.daka_time = dayjs(nowTime).format('YYYY/MM/DD');
        this.daka();
      },
      show() {
        var num = Math.floor(Math.random() * 3) + 1;
        var str = `/PunchSuccessView${num}`;
        this.$router.push(str);
      },
      tipCurDayState() {
        this.$confirm('是否确定打卡？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'tip',
        }).then(({ value }) => {
          this.curDayDakaState = value;
          this.DakaLog();        
          this.show();
        }).catch(() => {
                
        });
      }
    },  
    setup() {
      const DakaDate = reactive({
        rLastDate: "今日未打卡",
        DakaState: judgeState(),
        LastDayDiff: LastDaysDiff(),
        LastSummerDayDiff: LastSummerDayDiff(),
        diyMulDiff: diyMulDayDiff(),
        curDayDakaState: '',
        curMonthDays: getCurMonthDays(),
      });
      function getCurMonthDays() {
        var finishDakaDays = 0;
        var is_Leap = false;
        var Months = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth() + 1;
        var curMonthDays = Months[curMonth];
        if((curYear%4==0 && curYear%100!=0)||(curYear%400==0)) is_Leap = true;
        if(is_Leap) curMonthDays ++;
        if(localStorage.getItem("Date") == null) return 0;
        else {
          var data = localStorage.getItem("Date").split(',');       
          for(var i = 0; i < data.length; i ++ ) {
            var soloDate = data[i].split('/');
            var soloYear = soloDate[0];
            var soloMonth = soloDate[1];
            if(soloYear == curYear && soloMonth == curMonth) finishDakaDays ++;
          }
          // console.log(finishDakaDays, curMonthDays);
          return (finishDakaDays / curMonthDays * 100).toFixed(2);
        }
      }
      function judgeState() {
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth() + 1;
        var curDay = curDate.getDate();
        var curDayData = `${curYear}/${curMonth}/${curDay}`;
        var backDakaStr = '';
        if(curDayData == localStorage.getItem("LastDate")) {
          backDakaStr = "已打卡";
        }else {
          backDakaStr = "未打卡";
        }
        return backDakaStr;
      }
      function sumPunchDays () {
        var sumDays = 0;
        var str = localStorage.getItem("Date");
        for(var i in str) 
          if(str[i] == '/') 
            sumDays ++;
        return sumDays / 2;
      }
  
      function daka() {
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth() + 1;
        var cueDay = curDate.getDate();
        var curDayData = `${curYear}/${curMonth}/${cueDay}`;
        var newData = '';
        if(localStorage.getItem("Date")) {
            newData = `${localStorage.getItem("Date")},${curDayData}`;
            localStorage.setItem("Date", newData);
        }else {
            newData = curDayData;
            localStorage.setItem("Date", newData);
        }
        
        if(curDayData == localStorage.getItem("LastDate")) {
          DakaDate.DakaState = "今日已打卡";
        }else {
          localStorage.setItem("LastDate", curDayData);
          DakaDate.DakaState = "今日已打卡";
          DakaDate.rLastDate = curDayData;
        }
        var reReadyDays = localStorage.getItem("Date").split(",");
        var SolveResult = Array.from(new Set(reReadyDays));
        localStorage.setItem("Date", SolveResult);
        DakaDate.PunchDaysNums = sumPunchDays();
      }
      function LastDaysDiff() {
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth() + 1 > 9 ? curDate.getMonth() + 1 : `0${curDate.getMonth() + 1}`;
        var curDay = curDate.getDate() > 9 ? curDate.getDate() : `0${curDate.getDate()}`;
        var curDayData = `${curYear}/${curMonth}/${curDay}`; 
        return (new Date('2023/12/24') - new Date(curDayData))/1000/60/60/24;
      }
      function LastSummerDayDiff() {
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth() + 1 > 9 ? curDate.getMonth() + 1 : `0${curDate.getMonth() + 1}`;
        var curDay = curDate.getDate() > 9 ? curDate.getDate() : `0${curDate.getDate()}`;
        var curDayData = `${curYear}/${curMonth}/${curDay}`; 
        return (new Date('2023/07/01') - new Date(curDayData))/1000/60/60/24;
      }
      function diyMulDayDiff() {
        var curDate = new Date();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth() + 1 > 9 ? curDate.getMonth() + 1 : `0${curDate.getMonth() + 1}`;
        var curDay = curDate.getDate() > 9 ? curDate.getDate() : `0${curDate.getDate()}`;
        var curDayData = `${curYear}/${curMonth}/${curDay}`; 
        var diyDate = localStorage.getItem("DiyMulDate");
        return (new Date(diyDate) - new Date(curDayData))/1000/60/60/24;
      }
      function getNowDakaState() {
        var str = "寄寄";
        return str;
      }
      return {
        ...toRefs(DakaDate),
        daka,
        judgeState,
        sumPunchDays,
        LastDaysDiff,
        diyMulDayDiff,
        getNowDakaState,
        getCurMonthDays,
      };
    },
  };
  </script>
  
<style>
.Punch {
    margin-top: 10px;
}
.rLastDate {
  position: absolute;
  top: 39%;
  right: 13%;
  text-align: center;
  width: 120px;
  height: 80px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  color: red;
  display: table-cell;
  vertical-align: middle;
  padding-top: 40px;
}
.makeDakaHtml {
  position: absolute;
  top: 44%;
  left: 11.2%;
}
.makeBtn {
  border: 1px solid;
  border-radius: 500px;
  width: 130px;
}
.PunchState {
  position: absolute;
  width: 120px;
  height: 80px;
  left: 13%;
  top: 18%;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  color: red;
  display: table-cell;
  vertical-align: middle;
  padding-top: 40px;
}
.loginBtn {
  border: 1px solid;
  border-radius: 1000px;
  position: absolute;
  top: 23.5%;
  right: 13.5%;
}
.tip {
  width: 80%;
}
.TestTime {
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
}
.LastTestClock {
  margin-top: 10px;
}
.gifImg {
  width: 100px;
  height: 100px;
}
.MulTime {
  padding-left: 10px;
  text-align: center;
}
.dakaProgress {
  margin: 0 auto;
  width: 70%;
}
.curMonthDakaNum {
  margin-top: 100%;
  text-align: center;
}
.loginBtn {
  width: 120px;
}
</style>
  