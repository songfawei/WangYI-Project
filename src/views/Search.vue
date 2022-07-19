<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <!-- 头部搜索区域 -->
      <div class="search-ipt">
        <i class="iconfont icon-icon-test"></i>
        <input type="text" placeholder="请输入商品名称" v-model.trim="keyword" @input="onInput" @keyup.enter="onEnter">   
        <i class="iconfont icon-shanchu " @click="close"></i>
      </div>
      <!-- 头部取消区域 -->
      <span class="cancel" @click="$router.push('/')">取消</span>
    </div>

    <!-- 搜索联想 -->
    <ul class="suggest" v-show="isShowSuggest">
      <li @click="select(item)" class="suggest-item" v-for="(item,index) in suggestList" :key="index">
      {{item}}
      </li>
    </ul>

    <!-- 历史记录 -->
    <div class="search-history" v-show="!isShowSuggest && !isShwoResult">
      <div class="history-title">
        <span>历史记录</span>
        <i @click="dilHistory" class="iconfont icon-shanchu1" ></i>
      </div>
      <ul class="history">
        <li @click="select(item)" class="history-item" v-for="(item,index) in history" :key="index">
        {{item}}
        </li>
      </ul>
    </div>
    
    <!-- 商品列表 -->
    <div class="result" v-show="isShwoResult">
      <product v-for="(item,index) in resultList" :key="index" :item="item"/>
    </div>
    <loading v-show="isLoding"/>
  </div>
</template>

<script>
import {API_SEARCH_COMPLETE,API_SEARCH} from '@/apiconfig.js'
import Product from '../components/Product.vue'
import Loading from '../components/Loading.vue'
export default {
  components: { Product ,Loading},
  data() {
    return {
      keyword:'',
      suggestList:[],
      resultList:[],
      isLoding:false,
      history:[]
    }
  },
  methods:{
     onInput(){
      if(this.timer){
        clearTimeout(this.timer)
      }
      this.timer= setTimeout(async () => {
        const suggestList= await this.$axios.post(API_SEARCH_COMPLETE,{
        keywordPrefix:this.keyword
      })
        this.suggestList=suggestList
      }, 300); 
    },
    onEnter(){
      
        this.getSearchResult(this.keyword)
    },
    async getSearchResult(productName){
      if(productName===''){
        return
      }
      this.isLoding=true
      this.suggestList=[]
      const {directlyList} =await this.$axios.get(API_SEARCH,{
        params:{
          keyword:productName
        }
      })
      setTimeout(() => {
        
      }, 300);
      this.resultList=directlyList||[]
      this.saveHistory(productName)
      this.isLoding=false
    },
    select(productName){
      setTimeout(() => {
        this.keyword=productName
      this.getSearchResult(this.keyword)
      }, 200);
    },
    close(){
      this.keyword=''
      this.suggestList=[]
      this.resultList=[]
    },
    loadHistory(){
      this.history= JSON.parse(localStorage.getItem('searchHistory'))||[]
    },
    saveHistory(productName){
      if(this.history.includes(productName)){
        this.history.splice(this.history.indexOf(productName),1)
      }
      this.history.unshift(productName)
      localStorage.setItem('searchHistory',JSON.stringify(this.history))
    },
    dilHistory(){
      localStorage.removeItem('searchHistory')
      this.history={}
    }
  },
  computed:{
    isShowSuggest(){
      return this.suggestList.length
    },
    isShwoResult(){
      return this.resultList.length
    }
  },
  mounted(){
    this.loadHistory()
  }
}
</script>

<style lang="scss" scoped>

.container{
  background-color: $colorA;
  padding: 0 0.2rem;
}
.header{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: $colorA;
  .search-ipt{
    flex: 1;
    align-items: center;
    background-color: $colorE;
    padding: 0 0.2rem;
    display: flex;
    .iconfont{
      
      font-size: $fontB;
      color: $colorC;
    }
    input{
      border: none;
      outline: none;
      background-color: $colorE;
      flex: 1;
      font-size: $fontB;
      margin:0 0.2rem
    }
  }
  .cancel{
    margin-left: 0.3rem;
  }
}
.search-history{
  margin-top: 0.8rem;

  .history-title{
    font-size: $fontB;
    color: $colorD;
    .iconfont{
      color: $colorC;
      margin-left: 0.3rem;
    }
  }
  .history{
    overflow: hidden;
    &-item{
      border: 1px solid $colorD;
      border-radius: 0.08rem;
      float: left;
      padding: 0 0.15rem;
      margin: 0.12rem;
      color:$colorC;
    }
  }
}
.suggest{
  padding: 0.3rem;
  margin-top: 0.3rem;
  background-color: $colorA;
  &-item{
    padding: 0.2rem 0;
    border-bottom: 1px solid $colorF;
  }
}
.result{
  display: flex;
  flex-wrap:wrap ;
  justify-content: space-between;
  background-color: $colorA;
  margin-top:0.8rem ;
  padding: 0 0.2rem;
}
</style>