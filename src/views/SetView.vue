<template>
    <div class="tottt">
    <div class="back" @click="back()">×</div>
    <h1><img class="PunchImg" src="../assets/PunchInZiti.png" alt=""></h1>
    <h2 style="text-align: center;">设置</h2>
    <div class="total">
        
        <div class="sets"><span class="leftTxt">1. 考研 or 放假</span>
            
            <div style="float: right;margin-right: 15%;"><el-switch
                v-model="value1"
                :active-value="1"
                :inactive-value="0"
                @change="changePunchStatus"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch></div>
            <el-divider style="width: 90%;"></el-divider><span class="leftTxt">2. 单开 or 多开</span>
            <div style="float: right;margin-right: 15%;">
            <el-switch
                v-model="value2"
                :active-value="1"
                :inactive-value="0"
                @change="changeMulOpenStatus"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch></div>
            <el-divider style="width: 90%;"></el-divider><span class="leftTxt">3. Clock1 or Clock2</span>
            <div style="float: right;margin-right: 15%;">
            <el-switch
                v-model="value3"
                :active-value="1"
                :inactive-value="0"
                @change="changeClockStatus"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch></div>
            <el-divider style="width: 90%;"></el-divider><span class="leftTxt">4. 数据导入与导出</span>
            
            <div class="outPut">          
                <a class="aa" style="color: red;" @click="outPutLog">导出</a>                  
                <a class="aa" style="color: red;" @click="inPutLog">导入</a>
            </div>
            <el-divider style="width: 90%;"></el-divider><span class="leftTxt">5. 积分兑换</span>
            
            <div class="Inte" style="float: right; padding-right: 12%;">
                <select class="InteSel" v-model="IntVal" >
                    <option>2</option>
                    <option>5</option>
                    <option>10</option>
                    <option>30</option>
                    <option>50</option>
                </select>
                <a class="SelBtn" @click="IntSel1" >兑换</a>
            </div>
            <el-divider style="width: 90%;"></el-divider>
            <div class="resetCal">
                <div class="Btntot"><el-button class="resetAllBtn" @click="reset">恢复出厂设置</el-button></div>      
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import _Message from "element-plus/lib/el-message";
import { getCurrentInstance } from "vue";
export default {
    data () {
        return{
            value1: localStorage.getItem("PunchUnderState") == '1' ? 1 : 0,
            value2: localStorage.getItem("MulOpenState") == '1' ? 1 : 0,
            value3: localStorage.getItem("ClockStyleState") == '1' ? 1 : 0,
            outPutData: '',
            inPutData: '',
            IntVal: '2',
        }
    },
    mounted() {
        
    },
    methods: {
        IntSel1() {
            this.$confirm(`是否兑换积分？`, '提示', {
            type: 'Text',
            width: "100px",
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'resetAllData',           
            }).then(() => {
                this.IntSel();
            this.$message({
                type: 'success',
                message: '兑换成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消兑换'
            });
            });
        },
        IntSel() {
            var curInt = this.IntVal;
            var Int = parseFloat(localStorage.getItem("integral")); 
            if(Int < curInt) {
                _Message.error(`余额不足，积分余额：${Int}`);
            }else {
                Int -= curInt;
                localStorage.setItem("integral", Int);
                _Message.success(`兑换成功，积分余额：${Int}`);
            }
        },
        back() {
            this.$router.push('/GameView');
        },
        changePunchStatus: function (val) {
            localStorage.setItem("PunchUnderState", val)
        },
        changeMulOpenStatus: function (val) {
            localStorage.setItem("MulOpenState", val)
        },
        changeClockStatus: function (val) {
            localStorage.setItem("ClockStyleState", val)
        },
        outPutLog() {
            this.$confirm(`旧数据已经导出完成，是否复制？`, '提示', {
            type: 'Text',
            width: "100px",
            confirmButtonText: '复制',
            cancelButtonText: '取消',
            customClass: 'resetAllData',           
            }).then(() => {
                this.outPut();
            this.$message({
                type: 'success',
                message: '已复制到剪贴板'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消复制'
            });
            });
        },
        inPutLog() {
            this.$prompt('请输入旧数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'resetAllData',   
            // inputErrorMessage: '数据格式不正确'
            }).then(({ value }) => {
                // console.log(value);
                this.inPutData = value;
                // console.log(this.inPutData);
                this.inPut();
            this.$message({
                type: 'success',
                message: '旧数据导入成功' 
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消导入'
            });       
            });
        },
        reset() {
            this.$confirm('此操作将清空全部数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            width: "100px",
            customClass: 'resetAllData',
            
            }).then(() => {
            this.resetAllData();    
            this.$message({
                type: 'success',
                message: '已重置!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消重置'
            });
            });
        },
    },
    setup(){
        const datab = getCurrentInstance();
        function outPut() {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i); //获取本地存储的Key
                // console.log(key);
                datab.data.outPutData += key;
                datab.data.outPutData += '$';
                // console.log(localStorage.getItem(key));//所有value
                datab.data.outPutData += localStorage.getItem(key);
                datab.data.outPutData += '$';
                // console.log("---------------------------------");
            }
            let transfer = document.createElement('input');
            document.body.appendChild(transfer);
            transfer.value = s_u(datab.data.outPutData);  // 这里表示想要复制的内容
            transfer.focus();
            transfer.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
            }
            transfer.blur();
            document.body.removeChild(transfer);
        }
        function inPut() {
            var curData = u_s(datab.data.inPutData).split("$");
            console.log(curData);
            var length = curData.length - 2;
            for(var i=0;i<length;i+=2) {
                var key = curData[i];
                var value = curData[i+1];
                localStorage.setItem(key, value);
            }
        }
        function s_u(srcstr) {
            let res = "",tmp;
            for (const val of srcstr)
            {
                tmp = val.codePointAt(0).toString(16);
                while (tmp.length < 4)
                {
                tmp = '0' + tmp;
                }
                
                res += "\\u" + tmp;
            }
            return res;
        }
        function u_s(str) {
            str = str.replace(/(\\u)(\w{1,4})/gi,function(v){
            return (String.fromCharCode(parseInt((escape(v).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
            });
            str = str.replace(/(&#x)(\w{1,4});/gi,function(v){
                return String.fromCharCode(parseInt(escape(v).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
            });
            str = str.replace(/(&#)(\d{1,6});/gi,function(v){
                return String.fromCharCode(parseInt(escape(v).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2")));
            });
            return str;
        }
        function resetAllData() {
            localStorage.clear();
        } 
        return {
            outPut,
            inPut,
            s_u,
            u_s,
            resetAllData,
        }
    }
}
</script>


<style>
.tottt {
    width: 90%;
    margin-right: 0px;
    padding-right: 0px;
    padding-left: 5%;
}
h1 {
    text-align: center;
}
h2{
    text-align: center;
}
.total {
    width: 90%;
    padding-left: 10%;
    padding-top: 5%;
    float: left;
    margin-right: 0px;
    padding-right: 0px;
}
.leftTxt{
    
    margin-top: 15px;
    margin-bottom: 15px;
}
.Abtn {
    margin: 0 5%;
    width: 90px;
    height: 40px;
    
    background-color: white;
    border-radius: 100px;
    border: 1px solid;
}

.resetAllBtn {
    border: 1px solid;
    border-radius: 100px;
    margin-top: 10%;
}
.resetCal {
    margin-top: 1%;  
    padding-left: 21%;
}

.InteSel {
    width: 50px;
    height: 24px;
    font-size: 15px;
}
.SelBtn {
    color: red;
    padding-left: 15px;
    text-decoration: underline;
}
.aa{
    margin-left: 15px;
    text-decoration: underline;
}
.outPut{
    float: right;
    padding-right: 12%;
}
.back {
  font-size: 30px;
  font-weight: 800;
  position: absolute;
  top: 10px;
  right: 15px;
}
.resetAllData {
    width: 80%;
}
.resetAllBtn {
    width: 150px;
    margin-left: 4%;
}
.Btntot {
    width: 70%;
}
</style>