export default {
  namespaced: true,
  state(){
    return {
      token: uni.getStorageSync('token'),
      userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
      redirectInfo:null,
      address:JSON.parse(uni.getStorageSync('address') || '{}')
    }
    
  },
  mutations:{
    updataUserInfo(state, userInfo){
      state.userInfo = userInfo
      this.commit('user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state){
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    updataToken(state, token){
      state.token = token
      this.commit('user/saveTokenToStorage')
    },
    saveTokenToStorage(state){
      uni.setStorageSync('token', state.token)
    },
    updateRedirectInfo(state, info){
      state.redirectInfo = info
      console.log(state.redirectInfo)
    },
    updateAddress(state, address){
      state.address = address
      this.commit('user/saveAddressToStorage')
    },
    saveAddressToStorage(state){
      uni.setStorageSync('address', JSON.stringify(state.address))
    }
  },
  actions:{},
  getters:{}
}