<template>


<div class="goodsList">
     <headbar />

  <div class="d-flex align-items-stretch" >
    
        <sideBar :isactive="2" />
        <div class="page-content" id="gl-vm">
      
              <!-- Sidebar Navigation-->
            <el-row class="toolBar">
                <el-col :span="4">
                    <router-link :to="{name:'goodsDetail',params:{id:status}}">
                    <el-button type="primary" icon="el-icon-plus">添加商品</el-button>
                    </router-link>
                </el-col>
                <el-col :span="8" class="searchInp" :class="{foucsWidth:isfocus}">
                            <el-input
                            placeholder="根据名称/品牌搜索"
                            v-model="searchKey"
                            suffix-icon="el-icon-search"
                            @blur="isfocus = !isfocus"
                            @focus="isfocus = !isfocus"
                            ref="input"
                           >
                        </el-input>
                    
                </el-col>
                <el-col :span="12">

                </el-col>
            </el-row>
              
      <!-- Sidebar Navigation end-->
            <table class="table table-hover table-bordered gl_table" style="text-align: center">
                <thead>
                    <tr>
                            <td>序列</td>
                            <td>商品名称</td>
                            <td>商品价格</td>
                            <td>商品封面</td>
                            <td>品牌</td>
                            <td>商品图片</td>
                            <td>操作</td>
                    </tr>
                </thead>
                <tbody id="gl_body">
                        <tr v-for="(item,index) in goodsList" :key="index">
                              <td>{{index+1}}</td>
                              <td>{{item.title}}</td>
                              <td>{{item.price}}</td>
                              <td> <img :src='item.cover'  width="50"/> </td>
                              <td>{{item.brand}}</td>
                              <td width="100">已上传{{item.goodsimg.length}}张</td>
                              <td class="enterBtn">
                                 <router-link :to="{name:'goodsDetail',params:{id:item.id}}"><button class="btn btn-primary btn-sm" type="button">编辑</button></router-link>
                                  <button class="btn btn-danger btn-sm"  @click="delGoods(item.id)" type="button">删除</button>
                              </td>
                          </tr>
                      
                        
                </tbody>
            </table>
            <div class="block">
                <el-pagination
                    background
                    small
                    :hide-on-single-page="value"
                    @current-change="handleCurPage"
                    @size-change="handleSizeChange"
                    layout="total,sizes,prev, pager, next,jumper"
                    :total="totalcount">
                </el-pagination>
                </div>
      </div>
      </div>
      
    </div>
   
</template>
<script>
      import sideBar from '../components/sidebar.vue'
      import headbar from '../components/headbar.vue'
  
import { setTimeout } from 'timers';
export default {
      name:'goodsList',
      data:function(){
          return{
              goodsList:[],
              searchGoodsList:[],
              imageUrl: '',
              status:'add',
              searchKey: '',
              isfocus:false,
              totalcount:0,
              page:1,
              pageSize:10,
              value:false
          }
      },
      components: {
        sideBar,
        headbar
        },
       mounted(){
         
            this.getGoodsList()
          
               
       },
       activated(){
           this.getGoodsList()
       },
       methods: {
           handleSizeChange(size){
            this.pageSize = size
            this.getGoodsList()
           },
           handleCurPage(cur){
                this.page = cur
                this.getGoodsList()
           },
        getGoodsList(){
            var _this = this
                 this.axios.get('/goodsList',{
                     params:{
                         page:_this.page,
                         pageSize:_this.pageSize
                     }
                 })
                 .then(function(res){
                       
                        _this.goodsList = res.data.goods
                        _this.totalcount = res.data.totalPage
                        console.log(_this.totalcount)
                        if( _this.totalcount <= 10){
                            _this.value =true
                        }
                       
                 },function(){
                    console.log('请求失败处理');
                });
              },
        delGoods(id){
             this.$confirm('此操作将会永久删除此数据', '提示', {
                  confirmButtonText: '确认删除',
                  cancelButtonText: '取消',
                  type: 'warning'
               
            }).then(()=>{
                var _this = this
                this.axios.get('/delGoods?id='+id)
                .then(function(res){
                    setTimeout(()=>{
                         _this.getGoodsList()
                        _this.$message({
                           type: 'success',
                            message: '删除成功',
                            center: true,
                            offset:300,
                            duration:1500
                          });
                    },1000)
                    
                   
                    
                 },function(){
                    console.log('请求失败处理');
                });
            }).catch(()=>{
                   return false
            })
            
        }
      },
      watch:{
         
          searchKey(val){
             
              const _this = this
             _this.searchGoodsList = []

              _this.goodsList.map(function(item){
                  if(
                        item.title.indexOf(val) != -1 || 
                        item.title.indexOf(val.toUpperCase()) != -1||
                        item.title.indexOf(val.toLowerCase()) != -1||
                        item.brand.indexOf(val) != -1 ||
                        item.brand.indexOf(val.toUpperCase()) != -1||
                        item.brand.indexOf(val.toLowerCase()) != -1
                    ){
                        _this.searchGoodsList.push(item)
                        _this.goodsList =  _this.searchGoodsList
                   
                    }
              })  
              if(val == ''){
                  _this.getGoodsList()
              }
          }
      }
  
        
}   
</script>
<style>
    .page-content{
        padding:1rem
    }
    .toolBar{
        padding:1rem 0;
    }
    .searchInp .el-input{
        width:50% ;
         transition:.3s;
    }
    .searchInp .el-input__suffix{
        font-size:20px;
    }
    .foucsWidth .el-input{
        width:100%;
        transition:.3s;
    }
    #gl_body tr td{
        font-size:14px;
    }
</style>