var Express = require('express');  //express框架
var multer = require('multer'); //上传中间件
var path = require('path');
var bodyParser = require('body-parser'); //解析
var https  = require('https')
var mysql  = require('mysql')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var fs = require('fs'); //文件系统模块 读写
var cors = require('cors')

//链接mysql
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'goodkid',
    database : 'dy'
  });
connection.connect();
 
 //配置ca证书 https
const options = {
    key: fs.readFileSync('./dist/ssl/3_dongyiself.xyz.key'),
    cert: fs.readFileSync('./dist/ssl/2_dongyiself.xyz.crt')
  };

var Storage = multer.diskStorage({  //multer 创建保存文件位置
    destination: function (req, file, callback) { 
        callback(null, "./dist/image"); 
    }, 
    filename: function (req, file, callback) { 
        // callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname); 
        callback(null,Date.now() + "_" +file.originalname); 
        } 
    }); 
 // multer 上传规则 必须传入name属性值，上传单个文件，single，多个文件同name值，Array，多文件不同name值，fields
var upload = multer({ storage: Storage }).fields([{name:'goodsCover',maxCount:1},{name:'goodsImgs',maxCount:8}])//创建multer对象，接受文件数组,所有文件名都为fieldname。

//post和get请求了:


var app = Express(); 


app.use(bodyParser.json()); 
app.use(Express.static('./dist')); // 设置静态文件路径

//解决跨域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    }else {
        next();
    }
});

app.get("/", function (req, res) { 
    
    response.sendFile("/index.html");
}); 

// app.get("/goodsList", function (req, res) { 
//     res.sendFile(__dirname + "/goodsList.html"); 
// }); 
// var gid=0,gtype
// app.get("/goodsDetail", function (req, res) { 
//     // 获取请求的ID，goodsInfo接口查出详情
//     // console.log(req.query)
//     gid = req.query.id 
//     gtype = req.query.type
//     // res.sendFile(__dirname + "/goodsDetail.html"); 
// }); 

var typearr =[]
app.post("/Upload",function (req, res) {  //处理上传图片存储和formdata
    
    upload(req, res, function (err) { 
        
            if (err) { 
                console.log(err)
                return res.end('somthing wrong'); 
            } 
                     console.log(req.body)
                    // console.log(req.files)

                    //转换form表单提交的数据
                      var data = JSON.parse(req.body.data)
                      console.log(req.query)
                    //定义商品信息变量
                      var IMG_PATH = 'https://www.dongyiself.xyz/image/',//图片途径
                          GOODS_TITLE = data.name, // 标题
                          GOODS_PRICE = data.price, // 价格
                          GOODS_BRAND = data.brand,//品牌
                          GOODS_BRANDID = data.brandid,//品牌ID
                          GOODS_CATEGORY = data.category, // 商品种类
                          ADD_GOODS = true ,//是否为新增
                          TEMP_ARR=[],//存放临时商品图片
                          GOODS_IMGS_ARR;//存放最终商品图片数组

                         //以此判断用户是否更改封面图片，返回undefined取旧数据
                          if(typeof(req.files.goodsCover) == "undefined"){
                            GOODS_COVER = data.oldCoverUrl
                          }else{
                            GOODS_COVER = IMG_PATH+req.files.goodsCover[0].filename
                          }
                           //以此判断用户是否更改商品图片
                           
                          if(typeof(req.files.goodsImgs) == "undefined"){
                            GOODS_IMGS = data.oldGoodsImgs
                            ADD_GOODS = false
                          }else{
                            GOODS_IMGS = req.files.goodsImgs
                          }
                         
                        for(var i=0;i< GOODS_IMGS.length;i++){
                             if(!ADD_GOODS){ //没有更改商品图片时，传入旧数据
                                temp = {
                                    path:GOODS_IMGS[i].path,
                                    name:GOODS_IMGS[i].name
                                }
                                TEMP_ARR.push(temp)
                                GOODS_IMGS_ARR =  TEMP_ARR
                               
                             }else{//更改商品图片时，传入新数据
                                temp = {
                                    path:IMG_PATH+ GOODS_IMGS[i].filename,
                                    name:GOODS_IMGS[i].originalname
                                }
                                //传入时判断是添加还是编辑
                                if(req.query.status == 'add'){//添加新商品图片时，直接传入数组
                                    TEMP_ARR.push(temp)
                                    GOODS_IMGS_ARR =  TEMP_ARR
                                }else{// 如果是编辑商品图片，添加到已有数组
                                    data.oldGoodsImgs.push(temp)
                                    GOODS_IMGS_ARR =  data.oldGoodsImgs
                                }
                             }
                           }
                           
                        GOODS_IMGS_ARR = JSON.stringify(GOODS_IMGS_ARR)

                        //判断是否为新增或是更新
                        if(req.query.status == 'add'){
                            //新增sql语句
                             var  addSql = 'INSERT INTO goods(title,brand_id,price,cover,brand,goodsimg,category) VALUES(?,?,?,?,?,?)';
                             var  addSqlParams = [GOODS_TITLE,GOODS_BRANDID,GOODS_PRICE,GOODS_COVER,GOODS_BRAND,GOODS_IMGS_ARR,GOODS_CATEGORY];
                            //增
                            connection.query(addSql,addSqlParams,function (err, result) {
                                    if(err){
                                    console.log('[INSERT ERROR] - ',err.message);
                                    return;
                                    }        
                                    res.send('upload success')
                                    
                            });
                        }else{
                            //更新sql语句 
                            upDateSql  = "UPDATE goods SET title='"+GOODS_TITLE+"',brand_id='"+GOODS_BRANDID+"',price='"+GOODS_PRICE+"',cover='"+GOODS_COVER+"',brand='"+GOODS_BRAND+"',goodsimg='"+GOODS_IMGS_ARR+"',category='"+GOODS_CATEGORY+"' WHERE ID="+req.query.status
                            connection.query(upDateSql,function (err, result) {
                                    if(err){
                                    console.log('[INSERT ERROR] - ',err.message);
                                    return;
                                    }        
                                    res.send('upload success')
                                
                                });
                        }
                     
                          
                  
                
                     });
                  
            
        
}); 


app.get('/goods', function (req, res) { // 请求商品列表
   
   var page = req.query.page
   var pageSize = req.query.pageSize
    
    sql  = "SELECT * FROM goods ORDER BY ID DESC  LIMIT "+(page-1)*pageSize+","+pageSize

    countsql = 'SELECT COUNT(0) AS num FROM goods'
    var count  = 0
    connection.query(countsql,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
        result = JSON.stringify(result)
        count  = JSON.parse(result)
     
     
      
    })
    connection.query(sql,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        

        for(var i = 0;i < result.length;i++){
            // 返回数据时解析数组字符串
            result[i].goodsimg = JSON.parse(result[i].goodsimg)
        }
        data = {
            "goods":result,
            'totalPage':count[0].num
        }
            
            
        
        res.send(data)
     
    });
})
//所有品牌分类
app.get('/category', function (req, res) {

     sql  = "SELECT brand,brand_id FROM goods GROUP BY brand,brand_id"
       connection.query(sql,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }     

           res.send(result)
         
        });

})
app.get('/goodsDetail', function (req, res) { // 根据ID获取单个商品详情
    
   
        sql  = 'SELECT * FROM goods WHERE ID='+req.query.id 

        connection.query(sql,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }     
            //解析轮播图片数组
            result[0].goodsimg = JSON.parse(result[0].goodsimg)
            res.send(result)
         
        });
    
   
})
app.get('/delGoods', function (req, res) { // 删除商品

        sql  = 'DELETE FROM goods WHERE ID='+req.query.id

        connection.query(sql,function (err, result) {
            if(err){
             console.log('[DELETE ERROR] - ',err.message);
             return;
            }     
            
            res.send('delsuccess')
         
        });
    
   
})

app.listen(4000,function () { 
    console.log("Listening to port 4000"); 
}); 
https.createServer(options, app).listen(443);