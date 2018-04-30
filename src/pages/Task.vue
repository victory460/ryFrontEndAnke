<template lang="html">

  <div class="">
    <mt-header fixed :title="msg">
      <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
      <div class="" slot="right">
        <img v-if="showAll" src="../assets/icon_all.png" style="vertical-align:middle" @click="filterMy" class="imgiconlarge" alt=""></img>
        <img v-if="!showAll" src="../assets/icon_me.png" style="vertical-align:middle" @click="filterAll" class="imgiconlarge" alt=""></img>
        <img src="../assets/icon_add.png" style="vertical-align:middle" @click="newTaskRecord" class="imgiconlarge" alt=""></img>
      </div>
    </mt-header>
    <mt-navbar  class="page-part" v-model="selected" :selected.sync="selected" style="height:40px; width: 100%;">
      <mt-tab-item id="1"  v-bind:class="{'is-selected':select1}">未处理</mt-tab-item>
      <mt-tab-item id="2"  v-bind:class="{'is-selected':select2}">已分配</mt-tab-item>
      <mt-tab-item id="3"  v-bind:class="{'is-selected':select3}">已处理</mt-tab-item>
      <mt-tab-item id="4"  v-bind:class="{'is-selected':select4}">已关闭</mt-tab-item>
    </mt-navbar>
    <task-list-open :productId="productId" :all="showAll" v-if="selected == 1" style="width: 100%;"></task-list-open>
    <task-list-allocated :productId="productId" :all="showAll" v-if="selected == 2"></task-list-allocated>
    <task-list-processed :productId="productId" :all="showAll" v-if="selected == 3"></task-list-processed>
    <task-list-closed :productId="productId" :all="showAll" v-if="selected == 4"></task-list-closed>

    <!-- <mt-tab-container :active.sync="selected">
      <mt-tab-container-item id="1">
        <task-list v-if="selected == 1"></task-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <task-list v-if="selected == 2"></task-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <task-list v-if="selected == 3"></task-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <task-list v-if="selected == 4"></task-list>
      </mt-tab-container-item>
    </mt-tab-container> -->
  </div>
</template>

<style media="screen">
.imgiconlarge {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}
html body{
  padding: 0px;
  margin: 0px;
}
</style>

<script>
import TaskListOpen from '@/components/TaskListOpen'
import TaskListAllocated from '@/components/TaskListAllocated'
import TaskListProcessed from '@/components/TaskListProcessed'
import TaskListClosed from '@/components/TaskListClosed'

var taskUnSolved = {};
var taskUnallocated = {};
var taskHandled = {};
var taskClosed = {};

export default {
  name: 'Task',
  components: {
    TaskListOpen, TaskListAllocated, TaskListProcessed, TaskListClosed
  },
  created() {
    console.log(">>>created");
    var id = this.$route.params.id;
    if(id!=null && id.length>3){
      this.productId = id;
    }
    this.selected = 0;
    this.selected =  this.$store.getters.selected;
  },
  data() {
    return {
      msg: '问题反馈列表',
      productId: '0',
      selected: 0,
      taskUnSolved: [],
      taskAllocated: [],
      taskHandled: [],
      taskClosed: [],
      showAll: true,
    }
  },
  computed: {
    select1(){
      return this.selected == 1;
    },
    select2(){
      return this.selected == 2;
    },
    select3(){
      return this.selected == 3;
    },
    select4(){
      return this.selected == 4;
    }
    // selected(){
    //   return this.$store.getters.selected
    // }
  },
  methods: {
    handleClose(){
      if(this.productId.length > 3){
        window.history.go(-1);
      }else {
        wx.closeWindow();
        window.close();
      }
      // this.$router.go(-1);
    },
    newTaskRecord(){
      this.$router.push({
        name: 'NewTask',
        params: {fromTask: true}
      })
    },
    filterAll(){
      this.showAll = true;

    },
    filterMy(){
      this.showAll = false;
    }
  },
  watch: {
    selected: function(val) {
      console.log(val);
      this.$store.commit("UPDATE_SELECTED", val);
      // this.$store.dispatch('updateSelected', parseInt(val));
    }
  }
}
</script>
