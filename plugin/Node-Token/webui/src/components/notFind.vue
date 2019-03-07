<template>
  <div>
    <h1>404</h1>
    <a href="javascript:void(0);" @click="toLogin">Login(router.replace)</a>
    <router-link to="/" tag="a">Login(router-link)</router-link> |
  </div>
</template>

<script>
export default {
  name: 'notFind',
  methods: {
    toLogin () {
      this.$router.replace({
        path: '/'
        /* query: {
          redirect: this.$router.currentRoute.fullPath
        } */
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
