<template>
  <div style="width:100%; height:60px; position: relative">

    <div class="" style="position: absolute; width: 90%; height: 100%; left: 10%;">
      <div class="" style="width: 100%; height: 20px; float: left;">
        <div class="textchildlarge" style="float: left; width:70%">
          {{msg.title}}
        </div>
        <div class="textchildlarge" style="float: right; width:20%;">
          {{msg.from}}
        </div>
      </div>
      <div class="textchildsmall" style="width: 100%; height: 20px; float: left;">
        {{msg.content}}
      </div>
      <div class="textchildsmall" style="width: 100%; height:18px; float: left;">
        {{msg.time}}
      </div>
    </div>

    <div v-if="choose" class="" style="position: absolute; width: 30%; height:100%; left: 0px; top: 0px; background: #fff; display: flex; align-items: center; justify-content: center;">
      <img v-if="index==chooseIndex" style="width: 20px; height: 20px;" src="../assets/icon_chosed.png"></img>
      <img v-if="index!=chooseIndex" style="width: 20px; height: 20px;" src="../assets/icon_not_chose.png"></img>
    </div>

    <div v-if="msg.unread" class="" style="position: absolute; width: 10%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img class="imgiconsmall" src="../assets/icon_point_red.png"></img>
    </div>

  </div>
</template>

<style media="screen">
.divparentlarge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
}

.imgiconlarge {
  height: 20px;
  width: 20px;
}

.textchildlarge {
  margin: 0;
  font-size: 15px;
  text-align: left;
  color: #4A4A4A;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}

.divparentsmall {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
}

.imgiconsmall {
  height: 10px;
  width: 10px;
  margin-right: 5px;
}

.textchildsmall {
  margin: 0;
  width: 100%;
  font-size: 10px;
  text-align: left;
  color: #4A4A4A;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}

a{
  text-decoration: none;
}
.router-link-active{
  text-decoration: none;
}
</style>

<script>
export default {
  name: 'msg-item',
  props: ['msg', 'choose', 'index', 'chooseIndex'],
  components: {},
  methods: {

  }
}
</script>
