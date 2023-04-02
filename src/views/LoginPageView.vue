<template>
    <Transition>
        <div v-if="showClock">
            <section>
            <div class="container">
                <div class="time">
                <div class="time-colon">
                    <div class="time-text">
                    <span class="num hour_num" id="hr">08</span>
                    <span class="text">Hours</span>
                    </div>
                    <span class="colon">:</span>
                </div>
                <div class="time-colon">
                    <div class="time-text">
                    <span class="num min_num" id="mn">45</span>
                    <span class="text">Minutes</span>
                    </div>
                    <span class="colon">:</span>
                </div>
                <div class="time-colon">
                    <div class="time-text">
                    <span class="num sec_num" id="sc">06</span>
                    <span class="text">Seconds</span>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
    </Transition>
    <Transition>
        <div v-if="!showClock">
            <div class="clock">
                <div class="flip">
                    <div class="digital front" data-number="0"></div>
                    <div class="digital back" data-number="1"></div>
                </div>
                <div class="flip">
                    <div class="digital front" data-number="0"></div>
                    <div class="digital back" data-number="1"></div>
                </div>
                <em class="divider">:</em>
                <div class="flip">
                    <div class="digital front" data-number="0"></div>
                    <div class="digital back" data-number="1"></div>
                </div>
                <div class="flip">
                    <div class="digital front" data-number="0"></div>
                    <div class="digital back" data-number="1"></div>
                </div>
                <em class="divider">:</em>
                <div class="flip">
                    <div class="digital front" data-number="0"></div>
                    <div class="digital back" data-number="1"></div>
                </div>
                <div class="flip">
                    <div class="digital front" data-number="0"></div>
                    <div class="digital back" data-number="1"></div>
                </div>
            </div>
        </div>
    </Transition>
    <div class="btnn">
      <el-button class="btn" @click="show('Punch')">去打卡</el-button>
    </div>
    <!-- <img class="newImg" src="../assets/new.png" alt="" @click="goNewLog()"> -->
  </template>
  
  <script>
  export default {
    data() {
        return {
            showClock: localStorage.getItem("ClockStyleState") == '1' ? false : true,
        }
    },
    methods: {
      goNewLog() {
        this.$router.push('/newLogView');
      },
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
        },
        
      },
    mounted() {
      const hr = document.querySelector('#hr')
      const mn = document.querySelector('#mn')
      const sc = document.querySelector('#sc')
      setInterval(()=>{
        if(this.showClock == true) {
            let date = new Date(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
        hour = hour > 12 ? hour - 12 : hour; 
        hour = hour == 0 ? hour = 12 : hour; 
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        hr.innerHTML = hour;
        mn.innerHTML = min;
        sc.innerHTML = sec;
        }
        
      });

      var Flipper = /** @class */ (function() {
    function Flipper(node, currentTime, nextTime) {
        this.isFlipping = false;
        this.duration = 600;
        this.flipNode = node;
        this.frontNode = node.querySelector(".front");
        this.backNode = node.querySelector(".back");
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
    }
    Flipper.prototype.setFrontTime = function(time) {
        this.frontNode.dataset.number = time;
    };
    Flipper.prototype.setBackTime = function(time) {
        this.backNode.dataset.number = time;
    };
    Flipper.prototype.flipDown = function(currentTime, nextTime) {
        var _this =this;
        if(this.isFlipping) {
            return false;
        }
        this.isFlipping = true;
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
        this.flipNode.classList.add("running");
        setTimeout(function() {
            _this.flipNode.classList.remove("running");
            _this.isFlipping = false;
            _this.setFrontTime(nextTime);
        }, this.duration);
    };
    return Flipper;
}());

var getTimeFromDate = function(date) {
    return date
        .toTimeString()
        .slice(0, 8)
        .split(":")
        .join("");
};

var flips = document.querySelectorAll(".flip");
var now = new Date();
var nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
var nextTimeStr = getTimeFromDate(now);
var flippers = Array.from(flips).map(function(flip, i) {return new Flipper(flip, nowTimeStr[i], nextTimeStr[i]);});
setInterval(function() {
    
    var now =new Date();
    var nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
    var nextTimeStr = getTimeFromDate(now);
    for(var i=0; i < flippers.length; i++) {
        if(nowTimeStr[i] === nextTimeStr[i]) {
            continue;
        }
        flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
    }


},1000);
    },
    setup() {
      
      return {
  
      }
    }
  }
  
  </script>
  
  <style scoped>
  .btn {
    text-align: center;
    margin-top: 80px;
    margin-left: 32.5%;
    border: 1px solid;
    border-radius: 1000px;
    width: 35%;
  }
  
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Orbitron', sans-serif;
    transition: all 0.4s ease;
  }
  section{
    /* min-height: 100vh; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: #F0F8FF; */
    padding: 0 20px;
  }
  section.dark{
    background: #24292D;
  }
  section .container{
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 130px;
    max-width: 400px;
    width: 70%;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    position: relative;
  }
  section.dark .container{
    background: #323840;
  }
  section .container .icons i{
    position: absolute;
    right: 17px;
    top: 17px;
    height: 30px;
    width: 30px;
    background: #24292D;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    font-size: 14px;
    cursor: pointer;
  }
  section.dark .container .icons i{
    background: #fff;
    color: #323840;
  }
  .container .icons i.fa-sun{
    opacity: 0;
    pointer-events: none;
  }
  section.dark .container .icons i.fa-sun{
    opacity: 1;
    pointer-events: auto;
    font-size: 16px;
  }
  section .container .time{
    display: flex;
    align-items: center;
  }
  .container .time .time-colon{
    display: flex;
    align-items: center;
    position: relative;
  }
  .time .time-colon .am_pm{
    position: absolute;
    top: 0;
    right: -50px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1px;
  }
  section.dark .time .time-colon .am_pm{
    color: #fff;
  }
  .time .time-colon .time-text{
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: #F0F8FF;
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  section.dark .time .time-colon .time-text{
    background: #24292D;
  }
  .time .time-colon .time-text,
  .time .time-colon .colon{
    font-size: 35px;
    font-weight: 600;
  }
  section.dark .time .time-text .num,
  section.dark .time .colon{
    color: #fff;
  }
  .time .time-colon .colon{
    font-size: 40px;
    margin: 0 10px;
  }
  .time .time-colon .time-text .text{
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
  }
  section.dark  .time .time-colon .text{
    color: #fff;
  }
  .clock {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }
  
  /* 时钟的分隔 */
  .clock .divider {
    font-size: 66px;
    line-height: 70px;
    font-style: normal;
    color: rgb(51, 50, 50);
    width: 15px;
  }

  /* 时钟的卡片 */
  .clock .flip {
    position: relative;
    width: 40px;
    height: 65px;
    margin: 2px;
    font-size: 40px;
    font-weight: 500;
    line-height: 60px;
    text-align: center;
    background: rgb(46, 45, 45);
    border: 1px solid rgb(34, 33, 33);
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(54, 54, 54, 0.5);
  }

  /* 时钟上的数字 */
  .clock .flip .digital::before, .clock .flip .digital::after {
    position: absolute;
    content: attr(data-number);
    left: 0;
    right: 0;
    color: white;
    background: rgb(51, 50, 50);
    overflow: hidden;
    -webkit-perspective: 160px;
            perspective: 160px;
  }

  /* 翻页前的数字 */
  .clock .flip .digital::before {
    top: 0;
    bottom: 50%;
    border-bottom: 1px solid #666;
    border-radius: 10px 10px 0 0;
  }

  /* 翻页后的数字 */
  .clock .flip .digital::after {
    top: 50%;
    bottom: 0;
    line-height: 0;
    border-radius: 0 0 10px 10px;
  }

  .clock .flip .back::before,
  .clock .flip .front::after {
    z-index: 1;
  }
  .clock .flip .back::after {
    z-index: 2;
  }
  .clock .flip .front::before {
    z-index: 3;
  }

  .clock .flip .back::after {
    -webkit-transform-origin: center top;
            transform-origin: center top;
    -webkit-transform: rotateX(0.5turn);
            transform: rotateX(0.5turn);
  }

  .clock .flip.running .front::before {
    -webkit-transform-origin: center bottom;
            transform-origin: center bottom;
    -webkit-animation: frontFlipDown 0.6s ease-in-out;
            animation: frontFlipDown 0.6s ease-in-out;
    box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
  }

  .clock .flip.running .back::after {
    -webkit-animation: backFlipDown 0.6s ease-in-out;
            animation: backFlipDown 0.6s ease-in-out;
  }
  
  @-webkit-keyframes frontFlipDown {
    to {
      -webkit-transform: rotateX(0.5turn);
              transform: rotateX(0.5turn);
    }
  }
  
  @keyframes frontFlipDown {
    to {
      -webkit-transform: rotateX(0.5turn);
              transform: rotateX(0.5turn);
    }
  }

  @-webkit-keyframes backFlipDown {
    to {
      -webkit-transform: rotateX(0);
              transform: rotateX(0);
    }
  }
  
  @keyframes backFlipDown {
    to {
      -webkit-transform: rotateX(0);
              transform: rotateX(0);
    }
  }
  .newImg {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 33px;
    height: 30px;
  }
  button {
    text-align: center;
  }
  
  </style>