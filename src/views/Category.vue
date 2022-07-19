<template>
  <div>
    
      <div class="cate">
        <ul class="cate-nav">
          <li class="cate-nav-item" v-for="(cate,index) in categoryList" :key="cate.id" :class="{active:actived===index}" 
          @click="select(index)">
          {{cate.name}}</li>
        </ul>
        <ul class="cate-list">
          <li class="cate-list-item" v-for="sub in categoryGroupList" :key="sub.id">
            <div class="title">{{sub.name}}</div>
            <ul class="sub-item">
              <li class="sub-item-detail" v-for="item in sub.categoryList" 
              :key="item.id" @click="getSubList(item.id)">
                <img :src="item.prettyBannerUrl" alt="" class="banner">
                <div class="name">{{item.name}}</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <nav-footer/>
      <loading v-show="isLoding"/>
  </div>
</template>

<script>
import NavFooter from '../components/NavFooter.vue'
import {API_CATE,API_CATE_SUB} from '@/apiconfig.js'
import Loading from '../components/Loading.vue'
export default {
  data() {
    return {
      categoryList:[],
      actived:0,
      categoryGroupList:[],
      isLoding:false
    }
  },
  components:{NavFooter,Loading},
  watch:{
    actived(){
     
      this.getSubCategory( this.categoryList[this.actived].id)
    }
  },

  methods:{
    async getCategory(){
      this.isLoding=true
       const {categoryList}=await this.$axios.get(API_CATE)
       this.categoryList=categoryList
       this.getSubCategory(categoryList[0].id)
       this.isLoding=false
    },
    select(index){
        this.actived=index
    },
    async getSubCategory(categoryId){
    const {category:{categoryGroupList}}=await this.$axios.post(API_CATE_SUB,{
        categoryId
    })  
    this.categoryGroupList=categoryGroupList
  },
  getSubList(subId){
    this.$router.push(`/cateDetail/${this.categoryList[this.actived].id}/${subId}`)
  }
  },
 

  created(){
    this.getCategory()
  }
}
</script>

<style lang="scss" scoped>
.cate{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.97rem;
  background-color: $colorA;
  display:flex;
  &-nav{
    width: 1.4rem;
    padding: 0.2rem 0;
    margin-right: 0.2rem;
    &-item{
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      margin-top: 0.4rem;
      color: $colorC;
    }
    .active{
      position: relative;
      &::before{
        content: '';
        position: absolute;
        top:0;
        left: 0;
        bottom: 0;
        width: 0.08rem;
        background-color: #ab2b2b;
      }
    }
  }
  &-list{
    flex: 1;
    overflow-y:scroll ;
    padding: 0.2rem;
    border-left: 1px solid $colorE;
    &-item{
      margin-bottom: 0.3rem;
      .title{
        color: $colorC;
        font-weight: 700;
        border-bottom: 1px solid $colorE;
      }
      .sub-item{
        display: flex;
        flex-wrap: wrap;
        &-detail{
          width: 1.4rem;
          margin: 0.4rem 0.4rem 0 0;
          text-align: center;
          .banner{
            width: 1.2rem;
            height: 1.2rem;
          }
          .name{
            font-size: $fontA;
          }
        }
      }
    }
  }
}

</style>