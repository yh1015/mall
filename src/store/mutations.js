export default {
  addCounter(state,payload){
    payload.count++
  },
  addToCart(state,payload){
    payload.count = 1
    payload.isCheck = true
    state.cartList.push(payload)
  }
}
