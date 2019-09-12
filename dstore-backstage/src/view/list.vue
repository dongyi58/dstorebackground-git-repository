<template>
    <div class="list" >
       
           <div class="singleBook" v-for="(book,index) in books"  :key="index">
                <router-link :to="'/bookinfo/' + index">
                    <h3>{{book.bookname}}</h3>
                    <article>
                        {{book.book_info | capitalize}}
                    </article>
              </router-link>
           </div>
         
    </div>
</template>

<script>
export default {
    name:'list',
    data(){
        return{
           books:[]
        }
    },
    mounted() {
       this.$http.get('https://www.apiopen.top/novelApi').then(function(data){
           console.log(data.body.data)
          this.books = data.body.data
       })
    },
    filters:{
       capitalize: function (value) {
            return value.slice(0,50) + '...'
        }
    }
}
</script>

<style>
    .singleBook{
        background-color:#eee;
        padding:1rem;
        margin-bottom:1rem;
    }
</style>