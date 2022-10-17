import { configureStore } from "@reduxjs/toolkit";
import type { RootState } from "./reducers";
import { rootReducer } from "./reducers";

const saveToLocalStorage = (state: RootState) => {
  try {
    localStorage.setItem("coincapApp", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const stateStr = localStorage.getItem("coincapApp");
      return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
      return undefined;
    }
  }
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
