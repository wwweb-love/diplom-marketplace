import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"
import { all, products, user, admin } from "./reducers"

const reducers = combineReducers({
    all,
    products,
    user,
    admin
})

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))