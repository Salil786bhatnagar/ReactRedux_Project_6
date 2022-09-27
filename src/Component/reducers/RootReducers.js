import { act } from "react-dom/test-utils";

const initialState={
    cart:{}
}

function RootReducers(state = initialState, action){
  switch(action.type){
      case 'ADD_CART':
         state.cart[action.payload[0]]= action.payload[1];
        console.log("CART",state.cart)
        console.log("CART",action.payload[1])
          return{cart:state.cart}
            break;
            default:
                return state
  }
}

export default RootReducers;