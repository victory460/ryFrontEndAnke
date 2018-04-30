<template lang="html">

  <div class="">
    <mt-header fixed :title="msg">
    <!-- <router-link slot="left">
    </router-link> -->
    <mt-button icon="back" @click="handleClose()" slot="left">返回</mt-button>
    </mt-header>
    
    <div v-if="fixes.length == 0">
      <p>暂时没有数据</p>
    </div>
    <div v-else>
      <div v-for="fix in fixes" class="fix-list-item">
        <fix-item :fix="fix"></fix-item>
      </div>
    </div>
  </div>


</template>

<style>
html body {
  height: 100%;
  background: #f2f2f2;
}

.fix-list-parent {
  width: 100%;
}

.fix-list-item {
  background: #FFFFFF;
  margin: 2%;
  padding: 4%;
  width: 88%;
}
</style>

<script>
import FixItem from './FixItem'
export default {
  name: 'fix-records',
  created(){
    var id = this.$route.params['id'];
    console.log(id);

    var params = new URLSearchParams();
    params.append("feedbackRecordId", id);
    this.$store.dispatch("allFixesById", params);

  },
  data(){
    return {
      msg:'维修记录列表',
    }
  },
  computed:{
    fixes(){
      return this.$store.getters.allFixesById;
    }
  },
  watch: {
    fixes: function(val){
      console.log(val);
    }
  },
  methods: {
    handleClose() {
      window.history.go(-1);
    },
  },
  components:{
    'fix-item': FixItem
  }
}
</script>

<style lang="css">
</style>
