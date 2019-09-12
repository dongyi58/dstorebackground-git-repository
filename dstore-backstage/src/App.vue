<template>
    <div id="app">
 
       <keep-alive>
          <router-view></router-view>
       </keep-alive>

     
    </div>
     
</template>
<script>

export default {
   data:function(){
       return{
          show: true
       }
   }
}
</script>



