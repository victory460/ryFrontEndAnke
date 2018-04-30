<template>
  <div>
    <task-detail :task="task" :isAdding="true" ></task-detail>
  </div>
</template>

<script>
  import TaskDetail from '../components/TaskDetail'
  export default {
    created () {
      if (!this.task.name) {
        var id = this.$route.params['id'];
        console.log(this.$route.params);
        // this.$store.dispatch('productById', parseInt(id))
      }
    },
    computed: {
      task () {
        return '';
        // var id = this.$route.params['id'];
        // console.log(this.$route.params);
        // return this.$store.getters.productById(parseInt(id))
      }
    },
    components: {
      'task-detail': TaskDetail
    }
  }
</script>
