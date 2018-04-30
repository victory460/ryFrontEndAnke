<template>
<div>
  <!-- <div> -->
  <div v-if="tasks.length == 0">
    <p>暂时没有数据</p>
  </div>
  <div v-else>
    <!-- <div v-for="task in tasks" class="task-list-item">
      <task-item :task="task"></task-item>
    </div> -->
    <ul
      style="margin: 0px; padding: 0px;"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div v-for="task in tasks" class="task-list-item">
        <task-item :task="task"></task-item>
      </div>
    </ul>
    <p v-show="loading" style="display: flex; align-items: center; justify-content: center;">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p>
  </div>

</div>
</template>

<style>
html body {
  height: 100%;
  background: #f2f2f2;
}
</style>

<script type="text/javascript">
import TaskItem from './TaskItem.vue'
import vueLoading from 'vue-loading-template'
import { InfiniteScroll } from 'mint-ui';

export default {
  name: 'TaskListAllocated',
  props: ['productId', 'all'],
  components: {
    'task-item': TaskItem
  },
  data() {
    return {
      hasMore: true,
      loading: false,
      page: 1,
      pageSize: 4,
      tasks: [],
    };
  },
  created() {
    // 从其他页面返回到此界面，也会执行created()方法
    this.tasks = [];
    this.$options.methods.loadMore(this);
  },
  computed: {
    // type() {
    //   return this.$store.getters.selected
    // }
  },
  watch: {
    all: function(){
      console.log(">>."+this.all);
      this.hasMore = true;
      this.page = 1;
      this.tasks = [];
      this.$options.methods.loadMore(this);
    },
    // task_items: function(val) {
    //   if (val.length > 0) {
    //     emptydata = false;
    //   } else {
    //     emptydata = true;
    //   }
    // }
  },
  methods: {
    loadMore(val) {
      console.log("xxx");
      if(!val){
        val = this;
      }
      if(val.hasMore){
        console.log("yyy");
        val.loading = true;
        var params = new URLSearchParams();
        params.append("productId", val.productId);
        params.append("all", val.all);
        params.append("page",val.page);
        params.append("pageSize",val.pageSize);

        var vm = val;
        vm.$store.dispatch("allAllocatedTasks",params).then(response=>{
          console.log("&&&& vue="+response.data.length);
          vm.loading = false;
          vm.page = vm.page + 1;
          if(response.data){
            if(response.data.length != vm.pageSize){
              vm.hasMore = false;
            }
            // 存在有效数据
            var length=response.data.length;
            for(var index=0; index<length; index++){
              vm.tasks.push(response.data[index]);
            }
          }else {
            vm.loading = false;
            vm.hasMore = false;
          }
        }, error=>{

        });
      }
    },
  },
  mounted() {
    // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    // console.log("mounted");
  }
}
</script>
