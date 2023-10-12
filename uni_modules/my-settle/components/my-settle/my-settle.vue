<template>
  <view class="my-settle-container">
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isCheckedAll"/><text>全选</text>
    </label>
    
    <view class="amount-box">
      合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    
    <view class="btn-settle" @click="settlement">
      结算：({{checkedCount}})
    </view>
  </view>
</template>
<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
export default {
  data(){
    return {
        seconds:3,
        timer: null
    }
  },
  computed:{
    ...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
    ...mapState('user', ['token']),
    ...mapState('cart', ['cart']),
    isCheckedAll(){
      return this.total === this.checkedCount
    }
  },
  methods:{
    ...mapMutations('cart', ['updataAllGoodsState']),
    ...mapMutations('user', ['updateRedirectInfo']),
    changeAllState(){
      this.updataAllGoodsState(!this.isCheckedAll)
    },
    settlement(){
      if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品!!')
      // if(!this.address) return uni.$showMsg('请选择收货地址!!')
      if(!this.token) return this.delayNavigate()
      this.payOrder()
    },
    showTips(n){
      uni.showToast({
        icon: 'none',
        title:`请登录后在结算, ${this.seconds}秒后自动跳转到登录页`,
        mask:true,
        duration:1500
      })
    },
    delayNavigate(){
      this.seconds = 3
      this.showTips(this.seconds)
      this.timer = setInterval(() => {
        this.seconds--
        if(this.seconds <= 0) {
          clearInterval(this.timer)
          uni.switchTab({
            url:'/pages/my/my',
            success:()=>{
              this.updateRedirectInfo({
                openType:'switchTab',
                from:'/pages/cart/cart'
              })
            }
          })
          
          return 
        }
        this.showTips(this.seconds)
      }, 1000)
    },
    async payOrder(){
      const orderInfo = {
        order_price: 0.01,
        consignee_addr:'宁夏回族自治区',
        goods:this.cart.filter(item => item.goods_state).map(item => ({goods_id:item.goods_id, goods_number: item.goods_count, goods_price:item.goods_price}))
      }
      const {data: res} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
      if(res.meta.status !== 200) return uni.$showMsg('创建订单失败!!')
      const orderNumber = res.message.order_number
      const {data: res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {order_number: orderNumber})
      if(res.meta.status !== 200) return uni.$showMsg('预付订单生成失败!!')
      const payInfo = res2.message.pay
      // console.log(payInfo)
      
      const res3 = uni.requestPayment(payInfo)
      console.log(res)
      uni.$showMsg('支付成功')
      /* if(err) return uni.$showMsg('订单未支付!!!')
      const {data: res3} = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {order_number: orderNumber})
      if(res3.meta.status !== 200) return uni.$showMsg('订单未支付!!!')
      console.log(res3) */
    }
  }
}
</script>
<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  .radio {
    display: flex;
    align-items: center;
  }
  .amount-box {
    color: #c00000;
    font-weight: bold;
  }
  .btn-settle {
    background-color: #c00000;
    height: 50px;
    color: white;
    line-height: 50px;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>
