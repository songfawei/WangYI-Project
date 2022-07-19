<template>
    <div>
        <div class="header" @click="goBack">返回</div>
    
        <div v-if="orderList.length===0" class="empty">
            <img src="../assets/img/cart-empty.webp" alt="">
            <div>去添加点什么吧</div>
        </div>
        <div v-else class="order-container">
            <div v-for="order in orderList" :key="order._id" class="order-list">
                <div>订单编号:{{order.orderNo}}</div>
                <ul>
                    <li v-for="product in order.list" :key="product._id" class="item">
                        <img :src="product.pic" alt="" class="pic">
                        <div class="detail">
                            <div class="name">{{product.name}}</div>
                            <div class="info">
                                <div class="price">￥{{product.price}}</div>
                                <div class="num">&times;{{product.num}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="total">总价:￥{{order.total}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {API_ORDER_GET} from '@/apiconfig.js'
export default {
    data() {
        return {
            orderList:[]
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        async getOrders(){
            const res=await this.$axios.get(API_ORDER_GET)
            console.log(res)
            this.orderList=res
        }
    },
    async created(){
       this.getOrders()
    }
}
</script>

<style lang="scss" scoped>
.header {
  height: 0.88rem;
  border-bottom: 1px solid $colorE;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $colorA;
  padding: 0 0.2rem;
  line-height: 0.88rem;
}
.empty {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 2.2rem;
    height: 2.2rem;
  }
}
.order-container {
  margin-top: 1rem;
  .order-list {
    background-color: $colorA;
    margin-top: 0.2rem;
    padding: 0.2rem;
    .item {
      display: flex;
      align-items: center;
      padding: 0.2rem 0;
      border-top: 1px solid $colorE;
      .name {
        font-size: $fontB;
        color: $colorC;
        font-weight: 700;
      }
      .pic {
        width: 1.56rem;
        height: 1.56rem;
        margin: 0 0.2rem;
        border-radius: 0.06rem;
      }
      .detail {
        flex: 1;
        .info {
          display: flex;
          align-items: center;
          .price {
            flex: 1;
          }
          .num {
            flex: 3;
          }
        }
      }
    }
  }
}
.total{
    text-align: right;
    border-top: 1px solid $colorE;
    color: $colorB;
}
</style>