<template>
    <div>
      <button @click="checkTokenGet">get</button>
      <button @click="checkTokenPost">post</button>
      <button @click="checkTokenDelete">delete</button>
      <button @click="checkTokenPut">put</button>
      <div @click="loginOut">
        退出
      </div>
    </div>
</template>

<script>
export default {
  name: 'checkToken',
  props: {},
  data () {
    return {};
  },
  mounted () {
  },
  methods: {
    loginOut () {
      this.$store.commit('setToken', '');
      this.$router.push('/');
    },
    checkTokenGet () {
      this.$api.user.checkTokenGet().then((res) => {
        this.$tip('name:' + res.data.user.name + '/id:' + res.data.user.id);
      }).catch((error) => {
        console.log(error);
      });
    },
    checkTokenPost () {
      this.$api.user.checkTokenPost().then((res) => {
        this.$tip('name:' + res.data.user.name + '/id:' + res.data.user.id);
      }).catch((error) => {
        console.log(error);
      });
    },
    checkTokenDelete () {
      this.$api.user.checkTokenDelete().then((res) => {
        this.$tip('name:' + res.data.user.name + '/id:' + res.data.user.id);
      }).catch((error) => {
        console.log(error);
      });
    },
    checkTokenPut () {
      this.$api.user.checkTokenPut().then((res) => {
        this.$tip('name:' + res.data.user.name + '/id:' + res.data.user.id);
      }).catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>

<style scoped>

</style>
