import {mapGetters} from 'vuex'

export default {

  onShow(){
    this.setBadge()
  },
  watch:{
    total(){
      this.setBadge()
    }
  },
  computed:{
    ...mapGetters('cart', ['total'])
  },
  methods:{
    setBadge(){
      uni.setTabBarBadge({
        index:2,
        text:`${this.total}`
      })
    }
  }
}