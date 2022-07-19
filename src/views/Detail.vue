<template>
  <div>
    <header-comp/>
    <div class="detail" v-if="detail">
        <!-- 轮播图 -->
        <swiper height="7.5rem" :list="picUrls"  class="swiper"/>
        <!-- 商品信息 -->
        <div class="info">
            <div class="name">{{detail.name}}</div>
            <div class="desc">{{detail.simpleDesc}}</div>
            <div class="price">
                <span class="activity">￥{{detail.activityPrice||detail.retailPrice}}</span>
            </div>
        </div>
        <!-- 商品参数 -->
        <div class="attrlist" >
            <div class="title" v-if="detail.attrList&&detail.attrList.length">商品参数</div>
            <div class="item" v-for="(item,index) in detail.attrList" :key="index">
                <span class="attr-name">{{item.attrName}}</span>
                <span class="attr-value">{{item.attrValue}}</span>
            </div>
        </div>
        <!-- 商品详情 -->
        <div class="scx" v-html="detail.itemDetail&&detail.itemDetail.detailHtml"></div>
    </div>
    <!-- 购物车按钮 -->
    <div class="footer">
        <button class="btn-cart" @click="addCart">加入购物车</button>
    </div>
    <div class="btD">

    </div>
    <loading v-show="isLoading"/>
  </div>
  
</template>
    
<script>
import {API_PRODUCT_DETAIL,API_CART_ADD,API_USER_VERIFY} from '@/apiconfig.js'
import HeaderComp from '../components/Header'
import Swiper from '../components/Swiper.vue'
import Loading from '../components/Loading.vue'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            picUrls:[],//图片轮播信息
            detail:{},  //商品信息
            isLoading:false
       }
    },
    components:{HeaderComp,Swiper,Loading},
    created(){
        this.getDetail()
    },
    updated(){
        const c=document.getElementsByTagName('img')
        for(var i=6;i<c.length;i++)
             c[i].style.width="100%"
        
    },
    methods:{
        ...mapMutations(['setCartNum']),//用map映射，然后用es6的方法解构出setCarNum
        async getDetail(){
            this.isLoading=true
            const res=await this.$axios.get(API_PRODUCT_DETAIL,{
                params:{
                    id:this.$route.params.id
                    
                }
            })
            
            this.detail=res;
            for( const item in  res.itemDetail){
                if(item.startsWith('picUrl')){ //startsWith是指以什么开头的
                    this.picUrls.push(res.itemDetail[item])
                }
            }
           this.isLoading=false
        },

          async addCart () {
      // 验证用户是否登录
      const user = await this.$axios.get(API_USER_VERIFY)
      if (!user) {
        this.$showToast({
          btnShow: true,
          msg: '请登录',
          callback: () => {
            this.$router.push('/profile/login')
          }
        })
      } else {
         await this.$axios.post(API_CART_ADD, {
          id: this.detail.id,
          name: this.detail.name,
          price: this.detail.activityPrice || this.detail.retailPrice,
          pic: this.detail.itemDetail.picUrl1
        })
        
        this.setCartNum(1)
        this.$showToast({
          msg: '加入成功'
        })
      }
    }
  }


}
    
</script>

<style lang="scss" scoped>
    .swiper{
        margin-top: 0.88rem;
    }

    .info{
        background-color: $colorA;
        padding: 0.1rem;
        line-height: 0.5rem;
        .name{
            font-size: $fontD;
            color: $colorC;
            font-weight: 700;
        }
        .desc{
            color:$colorD;
        }
        .price{
            color: $colorB;
            font-size: $fontC;
        }
    }
    .attrlist{
        background-color: $colorA;
        margin: 0.2rem 0;
        .title{
            text-align: center;
            font-size: 0.4rem;
            padding: 0.2rem;
        }
        .item{
            display: flex;
            border-top: 1px dotted #ccc;
            padding: 0.1rem;
            .attr-name{
                flex: 1;
                color:$colorD;
            }
            .attr-value{
                flex: 3;
                margin-left: 1.12rem;
            }
        }
    }
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 1.04rem;
        width: 100%;
        z-index: 99;
        border-top: 1px solid $colorD;
        .btn-cart{
            width:100% ;
            height: 100%;
            border: none;
            outline: none;
            background-color: $colorB;
            color: $colorA;
        }
    }
    .btD{
        height: 1.04rem;
        width: 100%;
    }
</style>