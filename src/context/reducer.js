const reducer=(state,action)=>{// custom action: {type:...,payload:...} 
    switch(action.type){
        case "HIDE_LOADING" :return  {
            ...state,loading:false
        };
        case "SHOW_LOADING" :return {
            ...state,loading:true
        };
        case "HIDE_AUTH_MODAL" :return  {
            ...state,AuthModal:false
        };
        case "SHOW_AUTH_MODAL" :return {
            ...state,AuthModal:true
        };
        case "ADD_SCRIPT":return {
            ...state,afterScript:action.payload
        }
        case "ADD_USTYLE":return {
            ...state,userStyle:action.payload
        }
        case "ADD_TOKEN" :return {
            ...state,token:action.payload
        }
        default: return state;
    }
}
export default reducer;