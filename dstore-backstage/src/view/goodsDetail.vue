<template>
<div class="goodsDetail">
    <headbar />
    <div class="d-flex align-items-stretch">
         <sideBar :isactive='2' />
      
      <div class="page-content" >
            <!-- Page Header-->
            <div class="page-header no-margin-bottom">
              <div class="container-fluid">
                <h2 class="h5 no-margin-bottom">商品管理 </h2>
                
              </div>
            </div>
            <!-- Breadcrumb-->
            <div class="container-fluid">
              <ul class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">主页</a></li>
                <li class="breadcrumb-item active">商品管理</li>
              </ul>
            </div>
            <div class="no-padding-top">
                <div class="container-fluid">
                      <div class="row">
                   
                    <!-- Form Elements -->
                    <div class="col-lg-12">
                      <div class="block">
                        <div class="title"><strong>商品信息设置</strong></div>
                        <div class="block-body">
                              <!-- 商品设置菜单 标签页切换 -->
                              <div>
                                      <!-- Nav tabs -->
                                  <ul class="nav nav-tabs g_nav_tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#gi_panel" aria-controls="home" role="tab" data-toggle="tab">基本信息</a></li>
                                   
                                    <li role="presentation"><a href="#gs_panel" aria-controls="messages" role="tab" data-toggle="tab">商品图片</a></li>
                                   
                                  </ul>
                              
                                 <el-form ref="form" :model="form" :rules="rules" label-width="100px"   @submit.native.prevent size="medium">   
                                  <!-- Tab panes -->
                                  <div class="tab-content" id="gi_content">
                                   
                                    <div role="tabpanel" class="tab-pane active" id="gi_panel" data-index='0'>
                                      <el-form-item label="商品名称" prop="name" >
                                        <el-input v-model="form.name" @change="handlechange" class="input_box" >11</el-input>
                                      </el-form-item>
                                      <el-form-item label="商品价格" prop="price">
                                        <el-input v-model="form.price" @change="handlechange" class="input_box"></el-input>
                                      </el-form-item>
                                      <el-form-item label="商品封面图" prop="goodsCover">
                                         <el-upload
                                           class="goods-cover-uploader"
                                           action=""
                                           :auto-upload='false'
                                           :on-change='changeFile'
                                           :show-file-list="false"
                                           >
                                            <i class="el-icon-plus goods-cover-uploader-icon"></i>
                                             <el-container class="previewImg">
                                              <img width="100%" :src="goodsCoverUrl" alt="">
                                            </el-container>
                                        </el-upload>  
                                      </el-form-item>
                                      <el-form-item label="商品分类" prop="gtype">
                                        <el-select @change="handlegTypechange" v-model="form.gtype" class="input_box" placeholder="选择商品分类">
                                          <el-option 
                                            v-for="(item,index) of gtypeOption" 
                                            :key="index"
                                            :label="item.label" 
                                            :value="item.value" >
                                          </el-option>
                                         </el-select>
                                      </el-form-item> 
                                      <el-form-item label="品牌" prop="brand">
                                        <el-select @change="handlebrandchange" v-model="form.brand" class="input_box" placeholder="选择品牌">
                                          <el-option 
                                            v-for="(item,index) of brandOption" 
                                            :key="index"
                                            :label="item.label" 
                                            :value="item.value" >
                                          </el-option>
                                         </el-select>
                                      </el-form-item>   
                                       <el-form-item label="商品类型" prop="category">
                                          <el-radio-group 
                                           fill='#F56C6C'
                                           v-model="form.category" @change="handlechange">
                                            <el-radio label="热销" ></el-radio> 
                                            <el-radio label="最新"></el-radio>
                                          </el-radio-group>
                                       </el-form-item>       
                                                   
                                    </div>

                                    <div role="tabpanel" class="tab-pane" id="gs_panel" data-index='1'>
                                                  <el-form-item label="" prop="isUploadImgs" class="UploadImgs">
                                                    <el-upload
                                                          class="uploadGoodsImg"
                                                          action=""
                                                          
                                                          :show-file-list='false'
                                                          :multiple='true'
                                                          :auto-upload='false'
                                                          :on-change="changeGoodsImg"
                                                          >
                                                          <el-input v-model="form.isUploadImgs" type="hidden"></el-input>
                                                          <el-button icon="el-icon-upload2" size="small" type="primary">点击上传</el-button>
                                                    </el-upload>
                                                     </el-form-item>
                                             
                                             
                                                    <table class="table  img_table"  v-if="addGoodsImg" :key="1">
                                                          <thead>
                                                                <tr>
                                                                <th>文件名</th>
                                                                <th>缩略图</th>
                                                                <th>操作</th>
                                                                
                                                                </tr>
                                                            </thead>
                                                            
                                                                <transition-group name="slide-fade" tag="tbody">
                                                                  <tr class="img_tr draggable-element" v-for="(goodsImg,index) in goodsImgs" :key="index">
                                                                      <td style="width:200px">
                                                                          <div class="gname">{{goodsImg.name}} </div>
                                                                        </td>
                                                                      <td class="preview_td">
                                                                        <img  :src="goodsImg.path" @click="zoomImg(index)" width="50" alt="">
                                                                      
                                                                      </td>
                                                                      
                                                                       <td><button  class="btn btn-danger btn-sm del_img_btn" @click='delUploader(index)'>删除</button></td>
                                                                     
                                                                     
                                                                  </tr>
                                                                   </transition-group>
                                                                   <!-- 图片放大 -->
                                                                <el-dialog
                                                                    :visible.sync="centerDialogVisible"
                                                                    width="50%"
                                                                    ref="dialog"
                                                                    center>
                                                                    <img :src="zoomImgSrc" alt="" style="max-width:100%">
                                                                </el-dialog>
                                                  </table>
                                            
                                               
                                              
                                    </div>
                                  
                                    <!-- <div class="line"></div>
                                        <div class="form-group row sub_btn_group" id="g_btn">
                                               <div class="col-sm-10 ml-auto">
                                                  <button type="button" class="btn backH btn-secondary">取消</button>
                                                  <button type="primary" @click="onSubmit('form')">添加商品</button>
                                                </div>
                                        </div> -->
                                         <el-row>
                                           <el-col :span="6" :offset="3" class="btn_group">
                                                
                                                <el-button >取消</el-button>
                                                <el-button type="danger" native-type="button" :disabled="isChange" @click="onSubmit('form')">{{btnText}}</el-button>
                                           </el-col>
                                          </el-row>
                                  
                                 </div><!--tabcontent -->
                              </el-form>
                              </div>

                    
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
              <div id="img_zoom_overlay">
                <span class="glyphicon glyphicon-remove close_zoom"></span>
                <div class="img_box"></div>
            </div>
            <footer class="footer">
              <div class="footer__block block no-margin-bottom">
                <div class="container-fluid text-center">
                  <!-- Please do not remove the backlink to us unless you support us at https://bootstrapious.com/donate. It is part of the license conditions. Thank you for understanding :)-->
                  <p class="no-margin-bottom">Designed by goodkid</p>
                </div>
              </div>
            </footer>
            </div>
        </div>
    </div>
</template>

<script>
 import sideBar from '../components/sidebar.vue'
 import headbar from '../components/headbar.vue'
 import axios from 'axios'
 import { setTimeout } from 'timers';

export default {
    name:'goodsDetail',
    data(){
     
      return {
        centerDialogVisible:false, //图片放大
        goodsCoverUrl:'',//封面预览图片地址
        zoomImgSrc:'',//放大图片地址
        addGoodsImg:false, //选择商品图片后显示table
        goodsImgs:[],//商品图片存放
        garr:[],//图片blob对象存放
        btnText:'添加商品',//提交按钮文字
        isChange:true,//判断页面是否有面洞
        viewType:'',//页面显示/添加或者修改
        countFile:[],//存储商品图片张数，限制上传张数
       form: {//接收表单存放字段 品名、价格、封面图片、品牌、种类
          name:'',
          price:'',
          goodsCover:'',
          oldCoverUrl:'',//存储旧商品图片数据
          oldGoodsImgs:'',//存储旧商品封面图片数据
          gtype:'',
          gid:'',
          brand:'',
          brandid:'',
          category:'',
          upLoadDate:'',
          isUploadImgs:'',
        },   
        rules:{//form表单验证规则
           name: { required: true, message: '请输入活动名称', trigger: 'blur' },
           price: { required: true, message: '请设置价格', trigger: 'blur' },
           brand: { required: true, message: '请选择品牌', trigger: 'change' },
           gtype: { required: true, message: '请选择商品分类', trigger: 'change' },

           category:{ required: true, message: '请选择商品类型', trigger: 'change' },
           isUploadImgs:{ required: true, message: '请选择商品图片', trigger: 'change' }
          },
       brandOption:[
          {'lable':'NIKE',value:'NIKE',id:0},
          {'lable':'BAPE',value:'BAPE',id:1},
          {'lable':'CONVERSE',value:'CONVERSE',id:2},
          {'lable':'ADIDAS',value:'ADIDAS',id:3}
       ],
       gtypeOption:[
          {'lable':'潮搭',value:'潮搭',id:0},
          {'lable':'球鞋',value:'球鞋',id:1}
       ],
      }
    },
    components:{
        sideBar,//侧边菜单组件
        headbar//头部导航栏组件
    },
  
    activated(){//激活组件时
        
        const _this = this
        //初始化 因为添加和修改页面用的是同一个页面，此段为初始化设置
          this.$refs["form"].resetFields()//对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
          _this.goodsImgs=[]//清空商品图片组
          _this.countFile=[]//清空商品图片张数组
          $('.nav-tabs a:first').tab('show')//初始化选项卡
        //初始化
        _this.viewType = this.$route.params.id//获取页面类型
        if(this.viewType != 'add'){
           //等于修改时获取旧数据展示，存储旧数据
            axios.get('/goodsDetail?id='+this.viewType)
            .then((res)=>{
              console.log(res)
                _this.form.name  = res.data[0].title
                _this.form.price  = res.data[0].price
                _this.goodsCoverUrl = res.data[0].cover
                _this.form.oldCoverUrl = res.data[0].cover
                _this.form.brand = res.data[0].brand
                _this.form.brandid = res.data[0].brand_id
                _this.form.gtype = res.data[0].gtype
                _this.form.gid = res.data[0].gid
                _this.form.category = res.data[0].category
                _this.form.oldGoodsImgs = res.data[0].goodsimg
                
                _this.btnText = '提交更改'
               _this.addGoodsImg = true
               this.form.isUploadImgs = 'uploaded'
               res.data[0].goodsimg.forEach(function(item,index){
                         _this.goodsImgs.push(
                        {
                          path:item.path,
                          name:item.name
                        }
                      )
                })
            
            })
        }else{
          //反之初始化所有数据
                _this.form.name  = ""
                _this.form.price  =""
               _this.goodsCoverUrl=""
                _this.form.brand = ""
                _this.form.brandid=""
                 _this.form.gtype = ""
                _this.form.gid=""
                _this.form.category = ""
                _this.btnText = '添加商品'
                _this.goodsImgs=[]
                _this.form.oldGoodsImgs=[]
        }
    },
     methods: {
      uploadTime(){//上传时间
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      //input是否改动方法，没有改动不能点击提交按钮
        handlechange(){
          this.isChange = false
        },
        handlebrandchange(val){
          this.isChange = false
          this.brandOption.map(item=>{
              if(item.value == val){
                this.form.brandid = item.id
              }
          })
          console.log(this.form.brandid)
        },
        handlegTypechange(val){
           this.isChange = false
            this.gtypeOption.map(item=>{
              if(item.value == val){
                this.form.gid = item.id
              }
          })
        },
      //  放大商品图片
      zoomImg(index){
        this.zoomImgSrc = this.goodsImgs[index].path
        this.centerDialogVisible = true
      },
      //删除商品图片
       delUploader(index){
        const _this  = this
        this.form.oldGoodsImgs.splice(index,1)//如果是修改页面，点击删除旧数据，从旧数据数组中删除
        this.goodsImgs.splice(index,1)//如果是添加页面，点击删除，从现数据数组中删除
        this.garr.splice(index,1)//formdata上传图片数组，点击删除后要删除对应的上传对象，不然只是在页面上删除了，但会全部一起提交到后台
        this.isChange = false
       }, 
       //  选择商品封面图片后预览，存入二进制图片文件
       changeFile(file){ //商品封面图片预览
        // console.log(file.raw)
        const _this = this
         _this.isChange = false
        const reader=new FileReader()
        _this.form.goodsCover = file.raw//blob二进制文件
   
        reader.readAsDataURL(file.raw) //blob二进制文件
        reader.onload = function(){ //预览
               _this.goodsCoverUrl = reader.result;
            }
           
       }, 
      //  选择商品图片后预览，存入二进制图片文件
       changeGoodsImg(file,fileList){
         this.countFile.push(fileList)
         this.form.isUploadImgs = 'uploaded'
        
          //上传张数不能大于8张
         if(this.countFile.length+this.form.oldGoodsImgs.length > 8){
             this.$message({
                           type: 'warning',
                            message: '商品图片不能超过8张',
                            center: true,
                            offset:300,
                            duration:1500
                          });
                return false;
         }
         
          this.isChange = false
          const _this = this
          const reader=new FileReader()
          reader.readAsDataURL(file.raw) //blob二进制文件
          this.garr.push(file.raw)//formdata上传图片数组 
          
          reader.onload = function(){//添加预览对象到数组
              _this.goodsImgs.push(
                {
                  path:reader.result,
                  name:file.name
                }
              )
            
          }
          this.addGoodsImg = true
          // console.log(_this.goodsImgs)
       },
   //提交表单，将二进制图片存入formdata传入后台
      onSubmit(formName) { 
        var formData = new FormData();
        var _this = this
        //将form表单数据转成json
        
      
        formData.append('data',JSON.stringify(this.form))
       
        // 传入name值，multer接受对应name值文件，blob对象
        formData.append('goodsCover',this.form.goodsCover)
        // 多个商品图片循环添加到formdata
        $(_this.garr).each(function(i){
           formData.append('goodsImgs',_this.garr[i]) 
        })
       
        //验证规则通过提交表单
        _this.$refs[formName].validate((valid) => {
            if (valid) {
                   
                      axios({
                      method:'post',
                      url:'/Upload?status='+this.viewType,
                      data:formData,

                    }).then(res=>{
                      if(res.status == '200'){
                         _this.$message({
                           type: 'success',
                            message: '设置商品成功',
                            center: true,
                            offset:300,
                            duration:1500
                          })
                         _this.garr=[]
                         
                      }
                        setTimeout(()=>{
                            _this.$router.push({ path: '/goodsList' })
                          },3000)
                    })
                   return false
            } else {
               setTimeout(()=>{
                 //如果验证未通过，选项卡切换到出现错误的容器
                 const errorTab = $('.is-error').eq(0).parents('.tab-pane').attr('data-index')
                 $('.nav-tabs li:eq('+errorTab+') a').tab('show')
               },100)
              console.log('error submit!!');
              return false;
            }
        });
     
      }
    }
}

</script>

<style>
  .goods-cover-uploader .el-upload {
    border: 1px dashed #444951;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    line-height: 1
  }

.UploadImgs .el-upload{
  line-height: 0
}
  .goods-cover-uploader .el-upload:hover {
    border-color: #db6574;
  }
  .goods-cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 125px;
    height: 125px;
    line-height: 125px !important;
    text-align: center;
  }
  .previewImg{
    position:absolute;
    top:0;
     padding:0;
     width: 125px;
     height: 125px;
   
  }
  .previewImg img{
     border-radius: 6px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .input_box{
    width:30% !important;
   
  }
  .input_box input{
    background-color:transparent;
    border:1px solid #444951
  }
    .el-form-item{
    margin-bottom:0 !important;
    border-bottom: 1px solid #383838;
    padding: 1rem 0;
  }
  .el-form-item label{
    margin-bottom:0
  }
  .btn_group{
    padding:1rem 0;
  }
  .uploadGoodsImg{
    width:400px;
    display: inline-block;
  }
  .uploadGoodsImg .el-upload-list{
        width: 100%;
    display: inline-block;
  }
  .gname{
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>