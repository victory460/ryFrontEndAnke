<template>
<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
  <!-- <div> -->
  <div v-if="tasks.length == 0">
    <p>暂时没有数据</p>
  </div>
  <div v-else>
    <div v-for="task in tasks" class="task-list-item">
      <task-item :task="task"></task-item>
    </div>
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

.task-list-parent {
  width: 100%;
}

.task-list-item {
  background: #FFFFFF;
  margin: 2%;
  padding: 4%;
  width: 88%;
}
</style>


<style>
@component-namespace page {
  @component infinite {
    @descendent desc {
      text-align: center;
      color: #666;
      padding-bottom: 5px;
      border-bottom: solid 1px #eee;
    }

    @descendent listitem {
      height: 50px;
      line-height: 50px;
      border-bottom: solid 1px #eee;
      text-align: center;
      &:first-child {
        border-top: solid 1px #eee;
      }
    }

    @descendent wrapper {
      margin-top: -1px;
      overflow: scroll;
    }

    @descendent loading {
      text-align: center;
      height: 50px;
      line-height: 50px;

      div {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
}
</style>

<script type="text/javascript">
import TaskItem from './TaskItem.vue'

export default {
  name: 'TaskList',
  props: ['productId'],
  components: {
    'task-item': TaskItem
  },
  data() {
    return {
      loading: false,
      allLoaded: false,
      wrapperHeight: 0,
      type: 0,
    };
  },
  created() {
    // 从其他页面返回到此界面，也会执行created()方法
    var params = new URLSearchParams();
    params.append("productId", this.productId);
    this.type = 0;
    this.type = this.$store.getters.selected;
    console.log(">>>>>productId="+this.productId+">>>type==="+this.$store.getters.selected);

    switch (parseInt(this.$store.getters.selected)) {
      case 1:
        this.$store.dispatch('allOpenTasks', params);
        break;
      case 2:
        this.$store.dispatch('allAllocatedTasks', params);
        break;
      case 3:
        this.$store.dispatch('allProcessedTasks', params);
        break;
      case 4:
        this.$store.dispatch('allClosedTasks', params);
        break;
      default:
        break;
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.allTasks
    },
    // type() {
    //   return this.$store.getters.selected
    // }
  },
  watch: {
    type: function(val) {
      var params = new URLSearchParams();
      params.append("productId", this.productId);
      console.log(">>>>>productId="+this.productId+">>>>>type="+val);
      switch (parseInt(val)) {
        case 1:
          this.$store.dispatch('allOpenTasks', params);
          break;
        case 2:
          this.$store.dispatch('allAllocatedTasks', params);
          break;
        case 3:
          this.$store.dispatch('allProcessedTasks', params);
          break;
        case 4:
          this.$store.dispatch('allClosedTasks', params);
          break;
        default:
          break;
      }
    }
    // task_items: function(val) {
    //   if (val.length > 0) {
    //     emptydata = false;
    //   } else {
    //     emptydata = true;
    //   }
    // }
  },
  methods: {
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
