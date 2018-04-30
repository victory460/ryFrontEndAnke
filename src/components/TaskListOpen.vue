<template>
<div>
  <!-- <div> -->
  <div v-if="tasks.length == 0" style="width: 100%;">
    <p>暂时没有数据</p>
  </div>
  <div v-else style="width: 100%;">
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
  name: 'TaskListOpen',
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

      type: 0,
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
    all: function(val){
      this.hasMore = true;
      this.page = 1;
      this.tasks = [];
      this.$options.methods.loadMore(this);
    },
  },
  methods: {
    loadMore(val) {
      if(!val){
        val = this;
      }
      console.log("xx");
      if(val.hasMore){
        console.log("yy");
        val.loading = true;
        var params = new URLSearchParams();
        params.append("productId", val.productId);
        params.append("all", val.all);
        params.append("page",val.page);
        params.append("pageSize",val.pageSize);
        var vm = val;
        vm.$store.dispatch("allOpenTasks",params).then(response=>{
          console.log("&&&& vue="+response.data);
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
    // loadMore() {
    //   console.log("loadMore");
    //   this.loading = true;
    //   setTimeout(() => {
    //     let last = this.task_items[this.task_items.length - 1];
    //     for (let i = 1; i <= 10; i++) {
    //       var one = {
    //         equip: "设备名" + last++,
    //         time: "2017-10-22"
    //       };
    //       this.task_items.push(one);
    //     }
    //     // this.list.concat(dataNew);
    //     this.loading = false;
    //   }, 2500);
    // }
  },
  mounted() {
    // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    // console.log("mounted");
  }
}
</script>
