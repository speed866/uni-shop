<template>
  <view>
    <view class="cart-container" v-if="cart.length !== 0">
      <my-address></my-address>
      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="cart-title-text">购物车</text>
      </view>
      
      <uni-swipe-action>
        <block v-for="(item, index) in cart" :key="item.goods_id">
          <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
            <my-goods :item="item" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true" @num-change="numberChangeHandler"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      
      <my-settle></my-settle>
    </view>
    <view class="cart-empty" v-else>
      <image src="../../static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip">空空如也</text>
    </view>
  </view>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import badgeMin from '@/mixins/tabbar-badge.js'
  export default {
    mixins:[badgeMin],
    data() {
      return {
        options:[
          {
            text: '删除',
            style: {
              backgroundColor: '#c00000'
            }
          }
        ]
      };
    },
    computed:{
      ...mapState('cart', ['cart'])
    },
    methods:{
      ...mapMutations('cart', ['updataGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      radioChangeHandler(e){
        this.updataGoodsState(e)
      },
      numberChangeHandler(e){
        this.updateGoodsCount(e)
      },
      swipeActionClickHandler(goods){
        this.removeGoodsById(goods.goods_id)
        uni.setTabBarBadge({
          index:2,
          text:`${this.total}`
        })
      }
    }
  }
</script>

<style lang="scss">
.cart-container {
  padding-bottom: 50px;
}
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    font-size: 14px;
    margin-left: 10px;
  }
}
.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .empty-img {
    width: 90px;
    height: 90px;
    
  }
  .tip {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
