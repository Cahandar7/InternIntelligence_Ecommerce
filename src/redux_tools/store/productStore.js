import { createStore } from "redux";
import product_reducer from "../reducers/productReducer";

const store = createStore(product_reducer);

export default store;
