<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="btn-login" @getuserinfo="getUserInfo" open-type="getUserInfo">一键登录</button>
    <text class="tips-text">登录后尽享权益</text>
  </view>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
export default {
  data(){
    return {
      res: {
        user_id: 12,
        user_email_code: null,
        is_active: null,
        user_sex: '男',
        token:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      }
    }
  },
  computed:{
    ...mapState('user', ['redirectInfo'])
  },
  methods:{
    ...mapMutations('user', ['updataUserInfo', 'updataToken', 'updateRedirectInfo']),
    getUserInfo(e){
      if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了授权')
      this.updataUserInfo(e.detail.userInfo)
      this.getToken(e.detail)
    },
    async getToken(info){
      const [err, res] = await uni.login().catch(err=>err)
      if(res.errMsg !== 'login:ok') return uni.$showMsg('登录失败!!')
      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature
      }
      
      const {data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
      if(loginResult.meta.status !== 400) return uni.$showMsg('登录失败!!')
      this.updataToken(this.res.token)
      uni.$showMsg('登录成功')
      this.navigateBack()
    },
    navigateBack(){
      if(this.redirectInfo&&this.redirectInfo.openType === 'switchTab'){
        uni.switchTab({
          url:this.redirectInfo.from,
          complete: () => {
            this.updateRedirectInfo(null)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.login-container {
  height: 750rpx;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::after {
    content:'';
    display: block;
    width: 100%;
    height: 40px;
    background-color: #f5f5f5;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    transform: translateY(50%);
  }
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }
  .tips-text{
    font-size: 12px;
    color: gray;
  }
}
</style>
