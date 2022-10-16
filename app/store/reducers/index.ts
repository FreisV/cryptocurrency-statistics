import { combineReducers } from "redux";
import { briefcaseReducer } from "./briefcaseReducer";


export const rootReducer = combineReducers({
  briefcase: briefcaseReducer,
})

export type RootState = ReturnType<typeof rootReducer>