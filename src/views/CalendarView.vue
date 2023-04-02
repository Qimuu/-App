<template>
    <div class="tot">
    <div class="cal_top">
		<div id="app" class="vueBox" v-cloak>
			<div class="plan-finish-header">
				<div class="plan-finish-bg"></div>
			</div>
			<div class="plan-finish-calendar mtop1">
				<div class="calendar">
					<!-- 年份 月份 -->
					<ul class="month bottom-line">
						<!--点击会触发pickpre函数，重新刷新当前日期 -->
						<li class="arrow" @click="pickPre(currentYear,currentMonth)">
							<i class="mintuifont mintui-arrowright arrowleft"></i>
						</li>
						<li class="year-month">
							<span v-text="currentYear+'年'+currentMonth+'月'"></span>
						</li>
						<li class="arrow" @click="pickNext(currentYear,currentMonth)">
							<i class="mintuifont mintui-arrowright"></i>
						</li>
					</ul>
					<!-- 星期 -->
					<ul class="weekdays">
						<li>日</li>
						<li>一</li>
						<li>二</li>
						<li>三</li>
						<li>四</li>
						<li>五</li>
						<li>六</li>
					</ul>
					<!-- 日期 -->
					<ul class="days bottom-line">
						<li v-for="day in days" :key="day.id" @click="dayCheck(day)">
							<!--本月已签到日期-->
							<span :day="day.day" :class="['day-li',day.isChecked?'day-checked':'']">
								<span :class="['day-span',day.isSign?'day-sign':'',day.day.getMonth()+1 !== currentMonth?'other':'',day.isSigned?'day-signed':'']"
								v-text="day.day.getDate()"></span>
							</span>
						</li>
					</ul>
				</div>
				<div class="plan-calendar-info" v-show="currentPlan.date">
					<div class="calendar-info-date"> 
						<span v-text="currentPlan.date"></span>
					</div>
					<div class="calendar-info-title">
						<span v-text="currentPlan.title"></span>
					</div>
					<ul class="calendar-info-list">
						<li v-for="item in currentPlan.list" :key="item.id">
							<span v-text="item.name"></span>
						</li>
					</ul>
					<div class="calendar-info-text" v-if="currentPlan.nums">
						<p v-text="currentPlan.name"></p>
						<p class="calendar-info-nums" v-text="'完成题目：'+ currentPlan.nums+'道'"></p>
					</div>
				</div>
			</div>
		</div>
    </div>
</div>
</template>

<script>
export default{
    data: function() {
        return {
            // 日历
            currentDay: 1, // 当前天
            currentMonth: 1, // 当前月
            currentYear: 1970,
            currentWeek: 0, // 一号所在的星期
            days: [], // 当月所有天数
            content: {},
            // sign_days: [], // 签到日期
            sign_onlyDays: [],
            is_sign: false,
            currentPlan: {}
        }
    },
    created: function() {
        this.getSign();
    },
    methods: {	
        ripple() {
            var btn = document.querySelector(".btn");
            var ripple = document.querySelector(".ripple");
            btn.onclick=function(event) {
                this.children[0].classList.add("animated");
                var size;
                //计算点击的波纹的最大值，并设置为宽高
                size = Math.max(this.offsetWidth,this.offsetHeight);
                ripple.style.width = size + "px";
                ripple.style.height = size + "px";
                //设置鼠标点击的位置为中心点，在这个中心点向四周散开的效果
                ripple.style.top = -(this.offsetHeight-event.offsetY) + "px";
                ripple.style.left = -(this.offsetWidth/2-event.offsetX) + "px";
                setTimeout(function(){
                    btn.children[0].classList.remove("animated");
                },800)
            }
        },	
        
        getSign: function() {        
            var tmpStr = '';
            var sign_onlyDays = [];
            var curDate = window.localStorage.getItem("Date");
            var onlyOneDate = 0;
					
            for(var i in curDate) {
                if(curDate[i] !== ',') {
                    tmpStr += curDate[i];
                }else {
                    sign_onlyDays.push(tmpStr);
                    tmpStr = '';
                    onlyOneDate = 1;
                }
            }
            sign_onlyDays.push(tmpStr);
            if((curDate !== null) && onlyOneDate == 0) {
                sign_onlyDays.push(tmpStr);
            }
					// console.log(sign_onlyDays);
					// this.sign_days = sign_days;
            this.sign_onlyDays = sign_onlyDays;
            this.initData(null);
        },
        initData: function(cur) {
            var date;
            if (cur) { // 切换上一月、下一月
                date = new Date(cur);
            } else {
                var now = new Date(); // 此处取本机时间，应改为服务器时间
                var d = new Date(this.formatDate(now.getFullYear(), now.getMonth() + 1, 1));
                d.setDate(35); // 设置天数为35天（32~59都可以，既设置到下一个月的某一天）
                date = new Date(this.formatDate(d.getFullYear(), d.getMonth(), 1));
            }
            this.currentDay = new Date().getDate(); // 今日日期 几号
            this.currentYear = date.getFullYear(); // 当前年份
            this.currentMonth = date.getMonth() + 1; // 当前月份
            this.currentWeek = date.getDay(); // 当前月1号是星期几？ 0表示星期天
            // 当前月最后一天是星期几？ 0表示星期天
            this.nextWeek = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
            var str = this.formatDate(this.currentYear, this.currentMonth, 1); // 2020/01/01
            var nextStr = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString(); // 2020/01/01
            // console.log(nextStr)
            this.days = []; // 初始化日期
            // 设置上一个月 需显示 的最后几天  铺满一周
            for (var i = this.currentWeek; i > 0; i--) {
                var dd = new Date(str);
                dd.setDate(dd.getDate() - i);
                var dayobject = {
                    day: dd,
                    isSign: this.isVerDate(dd),
                    isSigned: this.isSigned(dd)
                }; // 用一个对象包装Date对象  以便为以后预定功能添加属性
                this.days.push(dayobject); // 将日期放入data 中的days数组 供页面渲染使用
            }
            // 显示当前月的天数  第二个循环为 j<= 36- this.currentWeek，
            // 因为1号是星期六的时候当前月需显示6行，如2020年8月
            this.num = 0; //第几个月 每遇到1号加1
            for (var j = 0; j <= 36 - this.currentWeek; j++) {
                var ddd = new Date(str);
                d.setDate(ddd.getDate() + j);
                var dddd = ddd.getDate();
                var dayobject1 = {
                    day: ddd,
                    isSign: this.isVerDate(ddd),
                    isSigned: this.isSigned(ddd)	
                };
                if (dddd == 1) {
                    this.num++
                }
                if (this.num == 2) {
                    break
                }
                this.days.push(dayobject1);
            }
            // console.log('当前月1号是星期' + this.currentWeek)
            // console.log('当前月最后一天是星期' + this.nextWeek)
            // 设置下一个月 需显示 的最前几天铺满一周
            for (var k = 1; k <= 6 - this.nextWeek; k++) {
                var d1 = new Date(nextStr);
                d1.setDate(d1.getDate() + k);
                var dayobject2 = {
                    day: d1,
                    isSign: this.isVerDate(d1),
                    isSigned: this.isSigned(d1)
                }; // 用一个对象包装Date对象  以便为以后预定功能添加属性
                this.days.push(dayobject2); // 将日期放入data 中的days数组 供页面渲染使用
            }
        },
        isVerDate: function() {
            // var signdays = [];
            // for (var i in this.sign_days) {
            // 	signdays.push(this.sign_days[i].day);
            // }
            // return signdays.includes(d.toLocaleDateString());
            return false;
        },
        isSigned: function(d) {
            var signdays = [];
            // for (var i in this.sign_days) {
            // 	if (this.sign_days[i].is_sign) {
            // 		signdays.push(this.sign_days[i].day);
            // 	}
            // }

            for (var i in this.sign_onlyDays) {
                    signdays.push(this.sign_onlyDays[i]);
            }

					// console.log(signdays);

					// for (var i in this.sign_onlyDays) {						
					// 	signdays.push(this.sign_onlyDays[i].day);
					// }
					// console.log(signdays.includes(d.toLocaleDateString()));
            return signdays.includes(d.toLocaleDateString());
        },
        pickPre: function(year, month) {
            var d = new Date(this.formatDate(year, month, 1));
            d.setDate(0);
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        },
        pickNext: function(year, month) {
            var d = new Date(this.formatDate(year, month, 1));
            d.setDate(35);
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        },
				// 返回 类似 2020/01/01 格式的字符串
        formatDate: function(year, month, day) {
            month < 10 && (month = '0' + month);
            day < 10 && (day = '0' + day);
            var data = year + '/' + month + '/' + day;

            return data;
        },
        dayCheck: function(day) {
            // console.log('day',day.day)
            var currentPlan = {
                title: '',
                date: '',
                list: []
            };
            currentPlan.date = day.day.toLocaleDateString().split('/')[1] + '月' + day.day.toLocaleDateString().split('/')[2] +
                '日';
            for (var i in this.days) {
                this.$set(this.days[i], 'isChecked', 0)
            }
            this.$set(day, 'isChecked', 1);
            if (day.isSigned) {
                // console.log(day.day);
                currentPlan.list = [{
                    name: '打卡状态，暂未开放',
                }];
                currentPlan.title = '已完成打卡';
                // currentPlan.name = '学习考点：财务成本管理《第一章 财务管理基本管理》财务成本管理';
                // currentPlan.nums = 100;
            } else {
                currentPlan.title = '未完成打卡'
            }	
            this.currentPlan = currentPlan
        }
	}
}
</script>

<style scoped>
.btn{
    display: inline-block;
    width: 100px;
    height: 35px;
    border-radius: 24px;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: 0 10px 10px rgba(0,0,0,.3);
}
body,
html {
	background-color: #F6F6F6;
}
.tot{
    position: relative;
	width: 100%;
	height: 4.8rem;
}
.plan-finish-header {
	position: relative;
	width: 100%;
	height: 4.8rem;
}

.plan-finish-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 4.8rem;
	background: linear-gradient(135deg, rgba(5, 201, 221, 1) 0%, rgba(23, 196, 160, 1) 100%);
}

.plan-finish-bg::before {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1.2rem;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
}

.plan-finish-bg::after {
	content: '';
	position: absolute;
	bottom: -.5rem;
	left: 0.2rem;
	width: 7.1rem;
	height: .9rem;
	background: rgba(170, 233, 221, 1);
	border-radius: 1px;
	opacity: 0.5;
	filter: blur(24px);
}

.plan-finish-header {
	position: relative;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0.3rem;
	color: #fff;
}

.plan-finish-info {
	flex: 1;
	padding-top: 0.2rem;
}

.plan-finish-tit {
	width: 100%;
	text-align: center;
	font-size: 0.44rem;
}

.plan-finish-info ul {
	padding-top: 0.3rem;
	display: flex;
	font-size: 0.24rem;
}

.plan-finish-info ul li {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.plan-nums {
	padding-top: 0.1rem;
	font-size: 0.48rem;
}

.plan-finish-ico {
	width: 2.5rem;
	height: 2.3rem;
}

.plan-finish-calendar {
	position: absolute;
	top: 3rem;
	left: 50%;
	transform: translateX(-50%);
	font-size: 0.24rem;
	padding: 0 0.3rem;
}
.plan-finish-btns{
	width: 100%;
	padding: .8rem 0.3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.plan-finish-btns li{
	width:3rem;
	height:0.84rem;
	background:rgba(21,188,195,0.11);
	border-radius:0.42rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.32rem;
	color: #15BCC3;
}
.plan-finish-btns li:last-child{
	background: #15BCC3;
	color: #fff;
}

/* 日历 */
.calendar {
	width: 300px;
    height: 400px;
	/* width: 6.9rem;
	min-height: 5rem; */
	background: #fff;
	box-shadow: 0px 3px 24px 0px rgba(0, 0, 0, 0.1);
	border-radius: 0.2rem;
	overflow: hidden;
	font-size: 0.24rem;
	padding: 0 0.3rem;
}

.calendar .month {
	background: #ffffff;
	padding: 0.3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	white-space: nowrap;
}

.calendar .month li {
	text-transform: uppercase;
	letter-spacing: 0;
}

.calendar .month .arrow {
	color: #333;
	width: 2rem;
	font-size: 0.24rem;
	display: flex;
	justify-content: center;
	align-items: center; 
}

.calendar .mintui-arrowright {
	font-size: 0.36rem; 
	width: 0.16rem;
	height: 0.16rem;
	border-top: 2px solid #666;
	border-right: 2px solid #666;
	transform: rotate(45deg);
}

.calendar .arrowleft {
	transform: rotate(-135deg);
}

.calendar .month .year-month {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.36rem;
	color: #2D2D2D;
}




.calendar .weekdays {
	/*头部星期*/
	padding: 0.1rem 0;
	background-color:  rgba(21,188,195,0.1);border-radius: 0.4rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	margin-bottom: 0.1rem;
}

.calendar .weekdays li {
	display: inline-block;
	text-align: center;
}

.calendar .days {
	/*日期*/
	background: #FFFFFF;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: flex-start;
	padding-bottom: 0.2rem;
}

.calendar .days li {
	list-style-type: none;
	width: 14.2%;
	padding: 1%;
	box-sizing: border-box;
	text-align: center;
	color: #000;
	display: flex;
	justify-content: center;
	align-items: center;
}

.calendar .days li .day-li {
	position: relative;
	width: 0.68rem;
	height: 0.68rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.28rem;
	border-radius: 50%;
}
.calendar .days li .day-checked{
	border:1px solid #15BCC3;
}
.calendar .days li .day-li .day-span{
	position: relative;
	width: 0.6rem;
	height: 0.6rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.28rem;
	border:1px solid #fff;
	border-radius: 50%;
}

.calendar .other {
	color: #ccc;
}
.calendar .day-sign {
	/*签到的日期*/
	background-color: #f5f5f5;
	color: #15BCC3;
}
.calendar .day-signed  {
	background-color: #15BCC3;
	color: #fff;
}


.mtop1 {
	top: .4rem;
}

.plan-calendar-info {
	width: 100%;
	padding: 0.32rem 0;
}

.calendar-info-date {
	position: relative;
	width: 1.5rem;
	height: 0.42rem;
	display: flex;
	padding-left: 0.2rem;
	align-items: center;
	font-size: 0.26rem;
	color: #fff;
	background-color: #5BC0DE;
	border-radius: 0.2rem;
}

.calendar-info-date span {
	position: relative;
}

.absolute-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.calendar-info-title {
	color: #2D2D2D;
	font-size: 0.32rem;
	padding: 0.3rem 0;
	font-weight: bold;
}

.calendar-info-list {
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 0.2rem;
}

.calendar-info-list li {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200px;
	height: 0.5rem;
	background: #fff;
	border-radius: 0.25rem;
	color: #333333;
	font-size: 0.24rem;
	margin-bottom: 0.2rem;
	margin-right: 0.2rem;
}

.calendar-info-list li:nth-child(4n) {
	margin-right: 0
}
.calendar-info-text{
	width:6.9rem;
	padding: 0.24rem;
	background:#FFFFFF;
	border-radius: 0.2rem;
	font-size: 0.26rem;
	color: #2D2D2D;
}
.calendar-info-nums{
	color: #999999;
	padding-top: 0.15rem;
}



.mask-box {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-moz-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-moz-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.6);
}

.swiper-box {
	position: relative;
	width: 100%;
}

.close-img-box {
	position: absolute;
	top: -.8rem;
	left: .8rem;
	width: .5rem;
	height: .5rem;
	padding: .1rem;
}

.close-img-box img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.swiper-container {
	width: 100%;
}

.swiper-slide {
	width: 7rem;
}

.poster-img {
	width: 100%;
	height: auto;
	-webkit-transform: scale(0.85);
	-moz-transform:scale(0.85);
	-ms-transform: scale(0.85);
	-o-transform:scale(0.85);
	transform: scale(0.85);
	-webkit-transition: all 0.5s;
	-o-transition: all 0.5s;
	-moz-transition: all 0.5s;
	transition: all 0.5s;
	border-radius: 0.2rem;
	pointer-events: unset;
}

.swiper-slide-active .poster-img {
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-ms-transform: scale(1);
	-o-transform: scale(1);
	transform: scale(1);
}
.poster-tips{
	position: absolute;
	font-size:0.24rem;
	color: #999;
	z-index: 9999;
	bottom: 0.3rem;
	right: 0.6rem;
}

</style>