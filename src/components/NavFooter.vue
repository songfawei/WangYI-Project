<template>
  <div class="nav">
    <router-link class="nav-item" to="/"><i class="iconfont icon-shouye"></i><div>首页</div></router-link>
    <router-link class="nav-item" to="/Category"><i class="iconfont icon-sort"></i><div>分类</div></router-link>
    <router-link class="nav-item" to="/Cart"><i class="iconfont icon-gouwuchekong"></i><div>购物车</div></router-link>
    <router-link class="nav-item" to="/Profile/login"><i class="iconfont icon-gerenyonghutouxiang"></i><div>个人</div></router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
 .nav{
    position: fixed;
    left: 0;    
    bottom: 0;  //让导航栏置于底部
    
    width:100% ;
    height: 0.97rem;
    display: flex;
    justify-content: center;
    align-items: center;        //让里面的内容水平，垂直居中
    background-color: $colorA;
    border: 1px solid #d9d9d9;
    line-height: 1.4;       //设置图标与文字之间的行高
    &-item{
        flex: 1;
        text-align:center;
        outline: none;
        div{
            color: $colorF;
        }
        .iconfont{
            font-size: $fontD;
            color: $colorF;
        }
    }
    .router-link-exact-active{  //此类为vue中vueRouter-link中自带的类，表示被选中时
        div{
            color: $colorB;
        }

        .iconfont{
            color: $colorB;
        }


    }
 }
</style>