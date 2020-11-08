import { combineReducers } from '@reduxjs/toolkit';
import haussReducer from '../features/hauss/haussSlice';

const rootReducer = combineReducers({
	hauss: haussReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
