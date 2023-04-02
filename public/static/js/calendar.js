new Vue({
			el: '#app',
			data: function() {
				return {
					currentDay: 1,
					currentMonth: 1,
					currentYear: 1970,
					currentWeek: 0,
					days: [],
					content: {},
					sign_onlyDays: [],
					is_sign: false,
					currentPlan: {}
				}
			},
			created: function() {
				this.getSign();
			},
			methods: {
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
					this.sign_onlyDays = sign_onlyDays;
					this.initData(null);
				},
				initData: function(cur) {
					var date;
					if (cur) { 
						date = new Date(cur);
					} else {
						var now = new Date(); 
						var d = new Date(this.formatDate(now.getFullYear(), now.getMonth() + 1, 1));
						d.setDate(35); 
						date = new Date(this.formatDate(d.getFullYear(), d.getMonth(), 1));
					}
					this.currentDay = new Date().getDate(); 
					this.currentYear = date.getFullYear(); 
					this.currentMonth = date.getMonth() + 1;
					this.currentWeek = date.getDay();
					this.nextWeek = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
					var str = this.formatDate(this.currentYear, this.currentMonth, 1); 
					var nextStr = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString(); 
					this.days = []; 
					for (var i = this.currentWeek; i > 0; i--) {
						var d = new Date(str);
						d.setDate(d.getDate() - i);
						var dayobject = {
							day: d,
							isSign: this.isVerDate(d),
							isSigned: this.isSigned(d)
						}; 
						this.days.push(dayobject); 
					}
					this.num = 0; 
					for (var j = 0; j <= 36 - this.currentWeek; j++) {
						var d = new Date(str);
						d.setDate(d.getDate() + j);
						var dddd = d.getDate();
						var dayobject = {
							day: d,
							isSign: this.isVerDate(d),
							isSigned: this.isSigned(d)	
						};
						if (dddd == 1) {
							this.num++
						}
						if (this.num == 2) {
							break
						}
						this.days.push(dayobject);
					}
					for (var k = 1; k <= 6 - this.nextWeek; k++) {
						var d = new Date(nextStr);
						d.setDate(d.getDate() + k);
						var dayobject = {
							day: d,
							isSign: this.isVerDate(d),
							isSigned: this.isSigned(d)
						};
						this.days.push(dayobject);
					}
				},
				
				isVerDate: function(d) {
					
					return false;
				},
				
				isSigned: function(d) {
					var signdays = [];
					
					for (var i in this.sign_onlyDays) {
							signdays.push(this.sign_onlyDays[i]);
					}

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
				
				formatDate: function(year, month, day) {
					month < 10 && (month = '0' + month);
					day < 10 && (day = '0' + day);
					var data = year + '/' + month + '/' + day;

					return data;
				},
				
				dayCheck: function(day) {
					
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
							
							currentPlan.list = [{
								name: '继续加油！',
							}];
							currentPlan.title = '已完成打卡';
							
						} else {
							currentPlan.title = '未完成打卡'
						}

					
					this.currentPlan = currentPlan
				}
			}
		});
