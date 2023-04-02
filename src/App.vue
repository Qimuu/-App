<template>
  <div 

  id="testImg"
  class="bg-img"
  
  >
    <HelloWorld v-show="this.$route.meta.show"/>
    <router-view></router-view>
  </div>
  
</template>
<script>
import HelloWorld from './components/HelloWorld.vue';
export default {
  data() {
    return {
      

    }
  },
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    
    return {
      
    }
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.bg-img{
  width:100%;
  height:100%;
}
.bg-img:before{
    background: url("./assets/testImg.jpg") no-repeat;
    background-size: cover;
    width:100%;
    height:100%;
    content: "";  /* 这个不要漏了 */
    
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1; /*-1 可以当背景*/
    
    opacity: 0.4;
    background-size:100% 100%;
}




</style>
