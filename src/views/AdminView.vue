<template>
    <div class="tott">
    <div class="back" @click="back()">×</div>
    <h1><img class="PunchImg" src="../assets/PunchInZiti.png" alt=""></h1>
    <div class="topic"> 
        <div class="firstTopic"><h2>管理员</h2></div><br>
        <div class="diyDTime">Diy倒计时</div>
        <div class="DiyMod">标题
            <input id="MulTitle" class="MulTitle" type="text" placeholder="建议2-3个字"><br>日期
            <input id="MulDate" class="MulDate" type="date"><br>
            <button @click="subData" class="MulBtn">提交</button>
        </div>
        <el-divider style="width: 80%;margin-left: 10%;"></el-divider>
        <div class="re-sign">
            <div>补签</div><br>
            <div class="block">
                <span class="demonstration">补签日期&nbsp;&nbsp;</span>
                <el-date-picker
                
                class="dateSelBtn"
                v-model="startDate"
                type="date"
                placeholder="选择补签日期">
                </el-date-picker>
                <br>
                
                <span class="demonstration">管理密码&nbsp;&nbsp;</span>
                <input type="password" v-model="Pwd" class="el-input__inner dateSelBtn inPwd" placeholder="输入管理员密码"/>
            </div>
                <div class="adminBtn">
                    
                    <!-- <button class="Abtn" @click="reSign()">打卡</button> -->
                    <button class="MulBtn" @click="punchRangeLog">补签</button>
                </div>
                
            
            <div class="uid">uid: {{ uid }}</div>
        </div>
    </div></div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { getCurrentInstance } from "vue";

import dayjs from 'dayjs';
import _Message from "element-plus/lib/el-message";

    export default {
        data() {
            return {
                startDate: '',
                Pwd: '',
                outPutData: '',
            }
        },
        provide () {
            return {
                reload: this.reload
            }
        },
        methods: {
            back() {
                this.$router.push('/GameView');
            },
            logVal(val) {
                console.log(val);
            },
            punchRangeLog() {
                var startDate = dayjs(this.startDate).format('YYYY/MM/DD');
                this.$confirm(`是否对日期<i> ${startDate} </i>进行补签 ?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                width: "100px",
                customClass: 'resetAllData',
                dangerouslyUseHTMLString: true
                
                }).then(() => {
                    this.PunchRangeDate();
                // this.$message({
                //     type: 'success',
                //     message: '补签成功!'
                // });
                // }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消补签'
                // });
                });
            },
            subData() {
                this.$confirm(`是否提交自定义信息？`, '提示', {
                type: 'Text',
                width: "100px",
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'resetAllData',           
                }).then(() => {
                    this.subMulInfo();
                this.$message({
                    type: 'success',
                    message: '提交成功'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消提交'
                });
                });
            },
        },  
        setup() {
            const datab = getCurrentInstance();
            const data = reactive({
                uid: getRandomNum(),
                pwd: ['ttkwdu','akhbie','lojdbu',
'cuqcbv','dhlfim','ruuxsw','vyyatc','xneluw','ifpvdk','grnvfw','zznljv','vwbxyn','attjoe','xjleki','qfmauv','wqkoge','puebtx','pdsdes','swrmwd','rjhffb','vkcglv','hctbff','cfrfeg','izycyp','cokbtt','byzzub','jdlsma','nlnxzh','egqqaq','iyhjfi'],
            });
            function getRandomNum() {
                var randomNum = Math.floor(Math.random() * 28);
                return randomNum;
            }
            function PunchRangeDate() {
                var from = datab.data.startDate;
                var password = datab.data.Pwd;
                console.log(password);
                if(password === "201612" || password === data.pwd[data.uid]) {
                    var readyDate = dayjs(from).format('YYYY/MM/DD');
                    var result = '';
                    for(var i=0;i<readyDate.length;i++) {
                        if(readyDate.charAt(i)=='0' && (i==5||i==8)) i++;
                        result = `${result}${readyDate.charAt(i)}`;
                    }
                    // console.log(result);
                    var newData = '';
                    if(localStorage.getItem("Date")) {
                        newData = `${localStorage.getItem("Date")},${result}`;
                        localStorage.setItem("Date", newData);
                    }else {
                        newData = result;
                        localStorage.setItem("Date", newData);
                    }
                    var reReadyDays = localStorage.getItem("Date").split(",");
                    var SolveResult = Array.from(new Set(reReadyDays));
                    localStorage.setItem("Date", SolveResult);
                    _Message.success("补签成功!");
                }else {
                    _Message.error("密码错误!");
                }
            }
            function resetCal() {
                localStorage.removeItem("Date");
            }
            
            function subMulInfo() {
                var title = document.getElementById("MulTitle").value;
                var date = document.getElementById("MulDate").value;
                date = date.replace(/-/g,"/");
                localStorage.setItem("DiyMulTitle", title);
                localStorage.setItem("DiyMulDate", date);
                _Message.success("提交成功")
            }
            return {
                ...toRefs(data),
                resetCal,
                getRandomNum,
                PunchRangeDate,
                subMulInfo,
            }
        }
    };
</script>

<style>
.tott {
    width: 90%;
    text-align: center;
    justify-items: center;
    align-items: center;
    padding-left: 5%;
    margin-right: 0px;
    padding-right: 0px;
}
.topic {
    text-align: center;
    width: 90%;
    height: 100%;
    padding-left: 5%;
    margin-right: 0px;
    padding-right: 0px;
}

.btn:link,
.btn:visited {
 text-transform: uppercase;
 text-decoration: none;
 color: rgb(27, 27, 27);
 padding: 10px 30px;
 border: 1px solid;
 border-radius: 1000px;
 display: inline-block;
 transition: all .2s;
 position: relative;
}
.re-sign {
    margin-top: 5%;
    text-align: center;
}
.inputResign {
    height: 24px;
    text-align: center;
    
    color: rgb(27, 27, 27);
    padding: 9px 25px;
    border: 1px solid;
    border-radius: 500px;
}
input:nth-child(2) {
    margin: 10% 5%;
    width: 200px;
    height: 30px;
    
}
.Abtn {
    margin: 0 5%;
    width: 90px;
    height: 40px;
    
    background-color: white;
    border-radius: 100px;
    border: 1px solid;
}
.uid {
    font-size: 12px;
    position: absolute;
    right: 10px;
    bottom: 20px;
}
.firstTopic {
    margin-bottom: 15px;
}
.dateBtn {
    margin-bottom: 10px;
    margin-top: 10px;
}
.adminBtn {
    margin-bottom: 30px;
}
.el-date-editor .el-input__icon:nth-child(1){
  display: none;
}
.dateSelBtn {
    width: 150px;
    margin-bottom: 5px;
    padding-bottom: 5px;
}
.inPwd {
    width: 220px;
    padding: 0 30px;
    font-size: 14px;
}
.MulTitle {
    margin: 10px;
    width: 150px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid;
}
.MulDate {
    margin: 10px;
    width: 150px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid;
}
.MulBtn {
    border-radius: 100px;
    border: 1px solid;
    width: 100px;
    height: 35px;
    background-color: white;
    margin-top: 20px;
}
.diyDTime {
    margin-bottom: 10px;
}
.resetAllData {
    width: 80%;
}
.back {
  font-size: 30px;
  font-weight: 800;
  position: absolute;
  top: 10px;
  right: 15px;
}
</style>