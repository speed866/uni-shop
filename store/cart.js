export default {
  namespaced: true,
  state(){
    return {
      cart: JSON.parse(uni.getStorageSync('cart') || '[]')
    }
  },
  mutations:{
    addToCart(state, goods){
      const findResult = state.cart.find(item => { return item.goods_id === goods.goods_id })
      if(!findResult){
        state.cart.push(goods)
      }else{
        findResult.goods_count+=1
      }
      this.commit('cart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    updataGoodsState(state, goods){
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_state = goods.goods_state
        this.commit('cart/saveToStorage')
      }
    },
    updateGoodsCount(state, goods){
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if(findResult){
        findResult.goods_count = goods.goods_count
        this.commit('cart/saveToStorage')
      }
    },
    removeGoodsById(state, goods_id){
      state.cart = state.cart.filter(item => item.goods_id !== goods_id)
      this.commit('cart/saveToStorage')
    },
    updataAllGoodsState(state, newState){
      state.cart.forEach(item => item.goods_state = newState)
      this.commit('cart/saveToStorage')
    }
  },
  actions:{},
  getters:{
    total(state){
      /* let c = 0
      state.cart.forEach(item => c += item.goods_count)
      return c */
      return state.cart.reduce((sum, item) => sum + item.goods_count, 0)
    },
    checkedCount(state){
      return state.cart.filter(item => item.goods_state).reduce((sum, item) => sum + item.goods_count, 0)
    },
    checkedGoodsAmount(state){
      return state.cart.filter(item => item.goods_state).reduce((sum, item) => sum + item.goods_count * item.goods_price, 0).toFixed(2)
    }
  }
}