import { createStore } from "redux";
import reducer from "../reducer/customer";
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const setupStore = (preloadedState) => {
  console.log(store, preloadedState);
  return { ...store, ...preloadedState };
};

export default store;
