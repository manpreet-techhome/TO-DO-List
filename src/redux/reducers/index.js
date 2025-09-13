import { combineReducers } from "redux";
import todoReducer from "./todoreducer";


const reducers = combineReducers({
  todo: todoReducer,
});
export default reducers;
