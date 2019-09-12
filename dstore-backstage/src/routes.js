import indexPage from './view/index.vue'
import goodsListPage from './view/goodsList.vue'
import goodsDetailPage from './view/goodsDetail.vue'
export default[
    {path:'/',component:indexPage},
    {path:'/goodsList',component:goodsListPage},
    {path:'/goodsDetail/:id',name:'goodsDetail',component:goodsDetailPage}
]