<template>
<div>
  <!-- <div> -->
  <div v-if="tasks.length == 0">
    <p>暂时没有数据</p>
  </div>
  <div v-else>
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
    <!-- <div class="page-infinite-list task-list-parent" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
      <div v-for="task in tasks" class="task-list-item">
        <task-item :task="task" ></task-item>
      </div>
    </div>
    <p v-show="loading" class="page-infinite-loading" style="display: flex; align-items: center; justify-content: center;">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </p> -->
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
  name: 'TaskListClosed',
  props: ['productId', 'all'],
  components: {
    'task-item': TaskItem
  },
  data() {
    return {
      hasMore: true,
      loading: false,
      page: 1,
      pageSize: 20,
      tasks: [],
    };
  },
  created() {
    // 从其他页面返回到此界面，也会执行created()方法

    this.tasks = [];
    this.$options.methods.loadMore(this);

    // this.type = 0;
    // this.type = this.$store.getters.selected;
    // console.log(">>>>>productId="+this.productId+">>>type==="+this.$store.getters.selected);
    // switch (parseInt(this.$store.getters.selected)) {
    //   case 1:
    //     this.$store.dispatch('allOpenTasks', params);
    //     break;
    //   case 2:
    //     this.$store.dispatch('allAllocatedTasks', params);
    //     break;
    //   case 3:
    //     this.$store.dispatch('allProcessedTasks', params);
    //     break;
    //   case 4:
    //     this.$store.dispatch('allClosedTasks', params);
    //     break;
    //   default:
    //     break;
    // }
  },
  computed: {
    // type() {
    //   return this.$store.getters.selected
    // }
  },
  watch: {
    all: function(val){
      console.log(val);
      this.hasMore = true;
      this.page = 1;
      this.tasks = [];
      this.$options.methods.loadMore(this);
    },
    // type: function(val) {
    //   var params = new URLSearchParams();
    //   params.append("productId", this.productId);
    //   console.log(">>>>>productId="+this.productId+">>>>>type="+val);
    //   switch (parseInt(val)) {
    //     case 1:
    //       this.$store.dispatch('allOpenTasks', params);
    //       break;
    //     case 2:
    //       this.$store.dispatch('allAllocatedTasks', params);
    //       break;
    //     case 3:
    //       this.$store.dispatch('allProcessedTasks', params);
    //       break;
    //     case 4:
    //       this.$store.dispatch('allClosedTasks', params);
    //       break;
    //     default:
    //       break;
    //   }
    // }
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
      if(!val){
        val = this;
      }
      if(val.hasMore){
        val.loading = true;
        var params = new URLSearchParams();
        params.append("productId", val.productId);
        params.append("all", val.all);
        params.append("page",val.page);
        params.append("pageSize",val.pageSize);
        var vm = val;
        vm.$store.dispatch("allClosedTasks",params).then(response=>{
          console.log("&&&& vue="+response);
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
