<template>
  <div>
    <form-comp formType="login" @onClick="onLogin"/>
    
  </div>
</template>

<script>
import FormComp from '../components/Form'
import {API_USER_LOGIN} from '@/apiconfig.js'

export default {
  components:{FormComp},
  methods:{
    async onLogin({username,password}){
      const {code,msg,user} =await this.$axios.post(API_USER_LOGIN,{
          username,password
      })
      if(code===0){
        alert(msg)
        this.$showToast({msg})
      }else if(code===1){
        //alert('登录成功')
        this.$showToast({msg:'登录成功'})
        //console.log(user);
        this.$store.commit('setUserinfo',user)
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style>

</style>