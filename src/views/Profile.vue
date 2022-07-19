<template>
  <div class="container">
    <header-comp/>

    <div v-if="userinfo">
       <!-- 个人信息 -->
       <div class="userinfo">
        <div class="avatar">
          <img src="../assets/img/avatar-default.png" alt="">
        </div>
        <div class="username">{{userinfo.username}}</div>
       </div>
       <div class="menu">
        <div class="menu-item" @click="getMyOrders">我的订单</div>
        <div class="menu-item" @click="logout">退出登录</div>
       </div>
    </div>

    <div v-else>
      <div class="yanxuan">
        <img src="../assets/img/yanxuan.png" alt="">
      </div>
      <router-view/>
    </div>
    <nav-footer/>
  </div>
</template>

<script>
import HeaderComp from '../components/Header.vue'
import NavFooter from '../components/NavFooter.vue'
import {API_USER_LOGOUT} from '@/apiconfig.js'
export default {
  components:{HeaderComp,NavFooter},
  computed:{
    userinfo(){
      return this.$store.state.userinfo
    }
  },
  methods:{
    logout(){
      this.$showToast({
        btnShow:true,
        msg:'确认退出吗？',
        callback:async ()=>{
          const res= await this.$axios.get(API_USER_LOGOUT)
          if(res.code===1){
            this.$store.commit('setUserinfo',null)
            this.$showToast({
              msg:'退出成功'
            })
            this.$router.go(0)
          }else{
            this.$showToast({
              mag:'退出失败'
            })
          }
        }
      })
    },
    getMyOrders(){
      this.$router.push('/myOrder')
    }
  }

}
</script>

<style lang="scss" scoped>
.container{
  
  .yanxuan{
    text-align: center;
    padding: 1.66rem 0;
    img{
      width: 2.88rem;
    }
  }
}
.userinfo{
  height: 2.2rem;
  margin-top: 0.88rem;
  background-image: url('../assets/img/profile-bg.png');
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  .avatar{
    flex:1;
    img{
      width: 1.6rem;
      height:1.6rem ;
      border-radius: 50%;
    }

  }
  .username{
    flex: 2;
    font-size: $fontC;
    color:$colorA;
  }
}
.menu{
  &-item{
    height: 1rem;
    line-height: 1rem;
    background-color: $colorA;
    text-align: center;
    margin-top: 0.2rem;
  }
}
</style>