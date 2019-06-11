<template>
  <div>
    <test />
    nzq
    <router-view></router-view>
  </div>
</template>

<script>
import test from '@/components/test'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    test
  }
}
</script>
