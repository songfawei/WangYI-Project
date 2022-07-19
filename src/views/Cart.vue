<template>
  <div class="container">
    <div class="header">购物车</div>
    <div v-if=" cartDetaile.length===0" class="empty">
      <img src="../assets/img/cart-empty.webp" alt="">
      <div>去添加点什么吧</div>
    </div>

      <div v-else>
        <div v-for="(item,index) in cartDetaile" :key="index" class="item">
          <input type="checkbox" v-model="item.checked" @change="toggleCheckOne(item)">
          <img :src="item.pic" alt="" class="pic">
          <div class="detail">
            <div class="name">{{item.name}}</div>
            <div class="info">
              <div class="price">￥{{item.price}}</div>
              <div class="selnum">
                <span class="label less" @click="less(item)">-</span>
                <input type="text" class="label num" v-model.number="item.num" @change="updataCart(item)">
                <span class="label more" @click="more(item)">+</span>

              </div>
            </div>
          </div>
          <i class="iconfont icon-shanchu1" @click="delCart(item,index)"></i>
        </div>
      </div>

      <div class="footer">
        <div class="checkall">
          <input type="checkbox" class="check-all" v-model="checkAllFlag" @change="toggleCheckAll">
          <span class="checked">已选({{checkNum}})</span>
        </div>
        <div class="total">合计￥{{total}}</div>
        <div class="confirm" @click="confirm" :class="{'btn-disable':checkNum===0}">下单</div>
      </div>

    <nav-footer/>
    <loding v-show="isLoding"/>
  </div>
</template>

<script>
import {API_CART_DETAIL,API_ORDER_CREATE,API_CART_DEL,API_CART_CHECK,API_USER_VERIFY,API_CART_UPDATE} from '@/apiconfig.js'
import NavFooter from '@/components/NavFooter'
import Loding from '../components/Loading.vue'
export default {
  data() {
    return {
      cartDetaile:[],
      //checkNum:0,
      //total:0,
      isLoding:false,
      checkAllFlagTemp:false
    }
  },
  components:{NavFooter,Loding},
  computed:{
    checkNum(){
      return this.cartDetaile.reduce((sum,product)=>{
        if(product.checked){
          sum+=product.num
        }
        return sum
      },0)
    },
    checkAllFlag:{
      get(){
         const selectNum= this.cartDetaile.reduce((sum,product)=>{
        if(product.checked){
          sum++;
        }
        return sum
      },0)
      return selectNum===this.cartDetaile.length
      },
      set(val){
        console.log(val);
        this.checkAllFlagTemp=val
      }
     
    },
    total(){
      const t= this.cartDetaile.reduce((sum,product)=>{
        if(product.checked){
          sum+=product.price*product.num
        }
        return sum
      },0)
      return t.toFixed(1)//保留小数点一位
    }

  },
  methods:{
    async getCartDetail(){
      this.isLoding=true
      const res= await this.$axios.get(API_CART_DETAIL)
      console.log(res)
      this.cartDetaile=res
      this.isLoding=false
   },
   toggleCheckOne(item){
      this.updataCart(item)
   },
   async updataCart(item){
    await this.$axios.post(API_CART_UPDATE,item)
   },
   toggleCheckAll(){
    this.cartDetaile.forEach(product=>{
      product.checked=this.checkAllFlagTemp
    })
      this.$axios.post(API_CART_CHECK,{
        checkAllFlag:this.checkAllFlagTemp
      
    })
   },
   less(item){
    if(item.num>1){
      item.num--
    }else{
      this.$showToast({
        msg:'数量不能小于1'
      })
      return
    }
    this.updataCart(item)
   },
   more(item){
    item.num++
    this.updataCart(item)
   },
   delCart(item,index){
    this.$showToast({
      btnShow:true,
      msg:'确认删除吗?',
      callback: async()=>{
        const {deletedCount}= await this.$axios.post(API_CART_DEL,item)
        if(deletedCount>0){
          this.cartDetaile.splice(index,1)//删除一个下表为index的数据
          this.$showToast({
            msg:'删除成功'
          })
        }
      }
    })
   },
   async confirm(){
    if(this.checkNum>0){
      const list= this.cartDetaile.filter(item=>item.checked)//过滤掉checked为flase的值，并组成一个新的数组
      const {orderNo} =await this.$axios.post(API_ORDER_CREATE,{
        list,
        total:this.total
      })
      console.log(orderNo);
      this.$router.push(`/order/${orderNo}`)
    }
   }
  },
  async created(){
    const user= await this.$axios.get(API_USER_VERIFY)
    if(!user){
      this.$showToast({
        btnShow:true,
        msg:'请登录',
        callback:()=>{
          this.$router.push('/profile/login')
        }
      })
    }else{
      this.getCartDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.body{
  background-color: $colorD;
}
.container{
  position: absolute;
  top: 0;
  bottom: 1.94rem;
  left: 0;
  right: 0;
  background-color: $colorE;
  overflow-y:scroll ;
}
.header{
  height: 0.88rem;
  line-height: 0.88rem;
  font-size: $fontD;
  background-color: $colorA;
  color: $colorC;
  padding: 0 0.2rem;
}
.empty{
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  img{
    width: 2.2rem;
    height: 2.2rem;
  }
}
.item{
  display: flex;
  align-items: center;
  background-color: $colorA;
  margin-top: 0.2rem;
  padding: 0.2rem;
  .name{
    font-size: $fontB;
    color: $colorC;
    font-weight: 700;
  }
  .pic{
    width: 1.56rem;
    height: 1.56rem;
    margin: 0 0.2rem;
    border-radius: 0.06rem;
  }
  .detail{
    flex: 1;
    .info{
      display:flex;
      position: relative;
      .price{
        flex: 1;
        color: $colorB;
        font-size: $fontC;
      }
      .selnum{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.5rem;
        height: 0.46rem;
        line-height: 0.46rem;
        border: 1px solid $colorD;
        position: absolute;
        right: 0.4rem;
        bottom: 0;
        .label{
          width: 0.5rem;
          text-align: center;
        }
        .less{
          border-right: 1px solid $colorD;
        }
        .more{
          border-left: 1px solid $colorD;
        }
        .num{
          border: none;
          outline: none;
        }
      }
    }
  }
  .icon-shanchu1{
    padding: 0 0.2rem;
  }
}
.footer{
  position: fixed;
  left: 0;
  bottom: 0.97rem;
  width: 100%;
  height: 1.2rem;
  background-color: $colorA;
  display: flex;
  align-items: center;
  .check-all{
    margin: 0.2rem;
  }
  .checked{
    margin: 0 0.2rem;
  }
  .total{
    flex: 1;
    text-align: center;
    margin-right: 0.2rem;
    color: $colorB;
  }
  .confirm{
    background-color: $colorB;
    height: 100%;
    width: 2.4rem;
    color: $colorA;
    text-align: center;
    line-height: 1.2rem;
  }
}
.btn-disable{
  background-color: #fff;
}
</style>