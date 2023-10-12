<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import badgeMin from '@/mixins/tabbar-badge.js'
  import {mapState} from 'vuex'
  export default {
    mixins:[badgeMin],
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('user', ['token'])
    }
  }
</script>

<style lang="scss">

</style>
