import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getEmptyArray, getNumericMatrix } from '../../helpers';

type HaussState = {
	matrix: string[][];
	columns: number;
	rows: number;
	error: string;
};

const initialState: HaussState = {
	matrix: [
		['1', '2', '3'],
		['1', '2', '3'],
		['1', '2', '3'],
	],
	columns: 3,
	rows: 3,
	error: '',
};

const haussSlice = createSlice({
	name: 'hauss',
	initialState,
	reducers: {
		setItems: (state, { payload }: PayloadAction<string[][]>) => {
			state.matrix = payload;
		},
		setItem: (
			state,
			{ payload }: PayloadAction<{ column: number; row: number; value: string }>
		) => {
			state.matrix[payload.row][payload.column] = payload.value;
		},
		resize: (
			state,
			{ payload }: PayloadAction<{ columns: number; rows: number }>
		) => {
			const { columns, rows } = payload;
			console.log(payload, state.columns, state.rows);
			const columnsDiff = columns - state.columns;
			if (columnsDiff > 0) {
				state.matrix = state.matrix.map((row) =>
					row.concat(getEmptyArray(columnsDiff))
				);
			} else if (columnsDiff < 0) {
				state.matrix.forEach((row) => row.splice(columnsDiff));
			}
			state.columns = columns;

			const rowsDiff = rows - state.rows;
			if (rowsDiff > 0) {
				for (let i = 0; i < rowsDiff; ++i) {
					state.matrix.push(getEmptyArray(state.columns));
				}
			} else if (rowsDiff < 0) {
				state.matrix.splice(rowsDiff);
			}
			state.rows = rows;
		},
		solve: (state) => {
			const matrix = getNumericMatrix(state.matrix);
			if (!matrix) {
				state.error = 'Некорректные данные';
				return;
			}
			state.error = '';

			// for (let i = 0; i <)
		},
	},
});

export const { setItems, setItem, resize, solve } = haussSlice.actions;

export default haussSlice.reducer;
