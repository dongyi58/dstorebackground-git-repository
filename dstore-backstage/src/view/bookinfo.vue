<template>
    <div class="bookinfo" >
       
           <div class="singleBook" v-if="id==index" v-for="(book,index) in books"  :key="index">
                
                    <h3>{{book.bookname}}</h3>
                    <article>
                        {{book.book_info}}
                    </article>
             
           </div>
         
    </div>
</template>

<script>
export default {
    name:'list',
    data(){
        return{
           books:[],
           id:this.$route.params.id
        }
    },
    mounted() {
       this.$http.get('https://www.apiopen.top/novelApi').then(function(data){
           console.log(data.body.data)
          this.books = data.body.data
       })
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