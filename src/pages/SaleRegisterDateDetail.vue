<template lang="html">
  <div class="">
    <mt-header fixed :title="msg">
      <mt-button icon="back" @click="handleClose" slot="left">返回</mt-button>
      <img src="../assets/icon_save.png" slot="right" style="vertical-align:middle" @click="saveRecord" class="imgiconlarge" alt=""></img>
    </mt-header>

    <mt-field label="名称" v-model="name" :readonly="true" :disableClear="true" :disabled="true"></mt-field>
    <mt-field label="类型" v-model="type" :readonly="true" :disableClear="true" :disabled="true"></mt-field>
    <mt-field label="序列号" v-model="serialId" :readonly="true" :disableClear="true" :disabled="true"></mt-field>
    <mt-field label="设备号" v-model="deviceId" :readonly="true" :disableClear="true" :disabled="true"></mt-field>
    <div class="" @click="openPicker()">
      <mt-field label="注册码日期" v-model="deadlineDateValue" :readonly="true" :disableClear="true" :disabled="true"></mt-field>
    </div>
    <mt-field label="客户" v-model="client" :readonly="true" :disableClear="true" :disabled="true"></mt-field>
    <mt-datetime-picker ref="picker" type="date" :value="deadlineDate" :startDate="startDate" :endDate="endDate"   year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" v-on:confirm="selectDate"></mt-datetime-picker>

    <mt-popup  v-model="showLoader" class="xxx" :model="true" position="right" style="width:100%; height:100%;background: rgba(0,0,0,0.5); "  popup-transition="popup-fade">
      <vue-loading style="margin-top:50%;" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </mt-popup>

  </div>

</template>

<script>
import { MessageBox } from 'mint-ui'
import vueLoading from 'vue-loading-template'

export default {
  name: 'sale-register-date-detail',
  created(){

  },
  data(){
    return{
        showLoader: false,
        name: this.$route.params['name'],
        type: this.$route.params['type'],
        serialId: this.$route.params['serialId'],
        deviceId: this.$route.params['deviceId'],
        client: this.$route.params['client'],

        msg: '注册码设置',
        deadlineDateValue: this.$route.params['deadlineDate'],
        deadlineDate: new Date(),
        startDate: new Date(),
        endDate: new Date('2100-01-01'),
        date: ""
    }
  },
  methods: {
    handleClose(){
      this.$router.go(-1);
    },
    openPicker() {
      this.$refs.picker.open();
    },
    selectDate(val) {
      // var date = new Date(Date.parse(val));
      this.deadlineDateValue = val.getFullYear() + "年" + (val.getMonth() + 1) + "月" + val.getDate() + "日";
      this.date = val.getFullYear() + "/" + (val.getMonth() + 1) + "/" + val.getDate();

    },
    saveRecord(){
      var vm = this;

      console.log(">>>>>"+this.deadlineDate);
      console.log(this.date);
      if(this.date){
        MessageBox.confirm('确定执行保存操作?').then(action => {
          var params = new URLSearchParams();
          params.append("serialId",vm.serialId);
          params.append("deadline",vm.date);
          vm.showLoader = true;
          vm.$store.dispatch("updateRegisterCodeDeadline", params).then(response=>{
            vm.showLoader = false;
            var msg = response.data.returnMessage[0];
            if(msg){
              alert(msg);
            }
            window.history.go(-1);
          }, error=>{
            vm.showLoader = false;
          });
        });
      }else {
        alert("请设定注册码截止日期");
      }
    }
  }

}
</script>

<style lang="css">
.imgiconlarge {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}
</style>
