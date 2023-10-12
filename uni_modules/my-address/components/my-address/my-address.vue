<template>
  <view>
    <view class="address-choose-box" v-if="!address.userName">
      <button type="primary" size="mini" class="btnChooseAddress">请选择收货地址+</button>
    </view>
    
    <view class="address-info-box" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{address.userName}}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">宁夏回族自治区中卫市海原县宁夏回族自治区中卫市海原县宁夏回族自治区中卫市海原县</view>
      </view>
    </view>
    
    <image src="/static/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>
<script>
export default {
  data(){
    return {
      address:{},
    }
  }
}
</script>
<style lang="scss">
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}
.address-choose-box {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  .address-choose-box {
    
  }
}
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;
  .row1 {
    display: flex;
    justify-content: space-between;
    
    .row1-right {
      display: flex;
      justify-content: space-between;
      
    }
  }
  .row2 {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .row2-left{
      white-space: nowrap;
    }
    
  }
}
</style>
