<template>
  <view v-if="goodsInfo.goods_name">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in goodsInfo.pics" :key="index">
        <view class="swiper-item">
          <image :src="item.pics_big" mode="" @click="preview(index)"></image>
        </view>
      </swiper-item>
    </swiper>
    
    <view class="goods-info-box">
      <view class="price">￥{{goodsInfo.goods_price}}</view>
      <view class="goods-info-body">
        <view class="goods-name">{{goodsInfo.goods_name}}</view>
        <view class="favi">
          <uni-icons type="star" size="20" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
        
      </view>
      <view class="yf">
        快递：免运费
      </view>
    </view>
    
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    
    <view class="goods-carts">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsInfo: {},
        options: [{
        			icon: 'shop',
        			text: '店铺',
        			info: 2,
        		}, {
        			icon: 'cart',
        			text: '购物车',
        			info: 2
        		}],
        	    buttonGroup: [{
        	      text: '加入购物车',
        	      backgroundColor: '#ff0000',
        	      color: '#fff'
        	    },
        	    {
        	      text: '立即购买',
        	      backgroundColor: '#ffa200',
        	      color: '#fff'
        	    }
        	    ]
      };
    },
    onLoad(options){
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods:{
      async getGoodsDetail(goods_id){
        const {data: res} = await uni.$http.get('/api/public/v1/goods/detail', {goods_id})
        if(res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;" ').replace(/webp/g, 'jpg')
        this.goodsInfo = res.message
      },
      preview(index){
        uni.previewImage({
          current:index,
          urls:this.goodsInfo.pics.map(item => item.pics_big)
        })
      },
      onClick (e) {
        if(e.content.text === '购物车'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      buttonClick (e) {
        console.log(e)
        this.options[1].info++
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  .swiper-item {
    image {
      width: 100%;
      height: 750rpx;
    }
  }
}
.goods-info-box {
  padding: 10px;
  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods-info-body {
    display: flex;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  .yf {
    font-size: 12px;
    color: gray;
    margin: 10px 0;
  }
  
}
.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>
