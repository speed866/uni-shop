<template>
  <view>
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view scroll-y="true" :style="{height: wh + 'px'}" class="left-scroll-view">
        <view class="left-scroll-view-item" :class="{active: index === activeIndex}" @click="changeIndex(index)" v-for="(item, index) in cateList" :key="item.cat_id">{{item.cat_name}}</view>
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item, index) in cateLevel2" :key="item.cat_id">
          <view class="cate-lv2-title" >{{item.cat_name}}</view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item2, index) in item.children" :key="index" @click="gotoGoodsList(item2)">
              <image :src="item2.cat_icon" mode=""></image>
              <text>{{item2.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        cateList: [],
        activeIndex: 0,
        cateLevel2: [],
        scrollTop: 0
      };
    },
    onLoad(){
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods: {
      async getCateList(){
        const {data: res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200){
          return uni.$showMsg()
        }
        this.cateLevel2 = res.message[0].children
        this.cateList = res.message
      },
      changeIndex(index){
        this.activeIndex = index
        this.cateLevel2 = this.cateList[index].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      gotoGoodsList(item){
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid = ' + item.cat_id
        })
      },
      gotoSearch(){
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    .left-scroll-view-item {
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active {
        background-color: #fff;
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 25%;
          left: 0;
        }
      }
    }
  }
  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }
  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;
    .cate-lv3-item {
      display: flex;
      width: 33.33%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      image {
        width: 60px;
        height: 60px;
      }
      text {
        font-size: 12px;
      }
    }
  }
}
</style>
