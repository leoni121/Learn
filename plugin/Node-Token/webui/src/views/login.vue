<template>
  <form>
    <input type="text" v-model="username" placeholder="账号">
    <input type="password" v-model="password" placeholder="密码">
    <div @click="login">提交</div>
    <router-link to="/checkToken">checkToken</router-link>
  </form>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      username: 'nzq',
      password: '123456'
    };
  },
  components: {
  },
  computed: {
  },
  methods: {
    login () {
      this.$api.user.login({ username: this.username, password: this.password }).then((res) => {
        this.$store.commit('setToken', res.data.token);
        this.$router.push('/checkToken');
      });
    }
  },
  mounted () {
  }
};
</script>
