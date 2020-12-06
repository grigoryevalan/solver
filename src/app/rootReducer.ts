import { combineReducers } from '@reduxjs/toolkit';
import haussReducer from '../features/hauss/haussSlice';
import relaxationReducer from '../features/relaxation/relaxationSlice';

const rootReducer = combineReducers({
	hauss: haussReducer,
	relaxation: relaxationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
