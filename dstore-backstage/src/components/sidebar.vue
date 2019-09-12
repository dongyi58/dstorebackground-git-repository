<template>
   <nav id="sidebar">
       
        <div class="sidebar-header d-flex align-items-center">
          <div class="avatar"><img src="../assets/image/avatar-goku.jpg" style="max-width:100%;height:100%" alt="..." class=" rounded-circle"></div>
          <div class="title">
            <h1 class="h5">GoodKid</h1>
            <p>Web Player</p>
          </div>
        </div>
         <span class="heading">Main</span>
          <ul class="list-unstyled sidebar_list">
            <li :class="[isactive== 1 ? 'active' : '']"><router-link to="/"> <i class="iconfont icon-home"></i>主页 </router-link></li>
            <li :class="[isactive== 2 ? 'active' : '']"> <router-link to="/goodsList"><i class="iconfont icon-shangpinguanli"></i>商品管理</router-link></li>
          </ul>
      </nav>
  
</template>

<script>
export default {
  name: 'sideBar',
  props:{
    isactive:Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

