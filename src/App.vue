<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    
  </div>
</template>

<style  lang="scss">
  body{
    height: auto;
    background-color:$colorE;
  }
</style>
