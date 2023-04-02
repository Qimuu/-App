<template>
    <div class="hello">
      <h1><img class="PunchImg" src="../assets/PunchInZiti.png" alt=""></h1>
      <div class="btnRow">
        <span @click="show('Punch')"><img class="tabimg" src="../assets/sign.png"/></span>
        <span @click="show('Game')"><img class="tabimg" src="../assets/game.png"/></span>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    name: 'HelloWorld',
    props: {
      
    },
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
        if(index == 'Game') {
          this.$router.push('/GameView')
        }
      }
    }
  }
  </script>

<style scoped>
h1 {
    text-align: center;
}
.btnRow {
  text-align: center;
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  bottom: 0;
  width: 100%;
}
span {
  margin-bottom: 10px;
  margin-left: 28%;
}
.tabimg {
  width: 30px;
  height: 30px;
}
.PunchImg {
  width: 70%;
}
</style>
  