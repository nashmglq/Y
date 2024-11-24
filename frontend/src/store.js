import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { emailVerificationReducer, getProfileReducer, loginReducer, registerReducer, resendEmailVerificationReducer, updateProfileReducer } from "./reducers/authReducer";
import { emailVerifyAction } from "./actions/authActions";
import { deleteYReducer, detailYReducer, getUserYReducer, getYReducer, likeReducer, postYreducer, updateYReducer } from "./reducers/crudReducer";

// put all reducers here
const reducer = combineReducers({
    loginUser : loginReducer,
    registerUser :registerReducer,
    emailVerify : emailVerificationReducer,
    resendEmailVerification : resendEmailVerificationReducer,
    getProfile : getProfileReducer,
    updateProfile: updateProfileReducer,
    getY: getYReducer,
    detailY: detailYReducer,
    postY: postYreducer,
    deleteY : deleteYReducer,
    updateY: updateYReducer,
    likeY: likeReducer,
    getUserY: getUserYReducer

})

const intialState = {}; // initial state which can be used in our reducers


// User likes the post -> USER_REQUEST action triggers middleware 
// -> Thunk checks everything (e.g., user login) before sending the like request to the backend 
// -> If all good, backend updates and boom! Like count is updated on the frontend.

const middleware = [thunk]; 

const store = configureStore({ // put all here to export everthing
    reducer,
    intialState,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
})

export default store;