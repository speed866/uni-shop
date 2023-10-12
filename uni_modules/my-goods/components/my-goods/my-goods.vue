<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <radio :checked="item.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">{{item.goods_name}}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{item.goods_price.toFixed(2)}}</view>
        <uni-number-box :min="1" :value="item.goods_count" v-if="showNum" @change="numberChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
    showRadio:{
      type:Boolean,
      default: false
    },
    showNum:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return {
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
    }
  },
  methods:{
    radioClickHandler(){
      this.$emit('radio-change', {
        goods_id: this.item.goods_id,
        goods_state: !this.item.goods_state
      })
    },
    numberChangeHandler(value){
      this.$emit('num-change', {
        goods_id: this.item.goods_id,
        goods_count: value
      })
    }
  }
}
</script>
<style lang="scss">
.goods-item {
  // width: 750rpx;
  // box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .goods-item-right {
      flex: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name {
        font-size: 13px;
      }
      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .goods-price{
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
