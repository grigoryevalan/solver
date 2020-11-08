import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	convertArrayToString,
	convertMatrixToString,
	getEmptyArray,
	getNumericMatrix,
	parseFloatArray,
} from '../../helpers';
import {
	createDiagonalMatrix,
	createEchelone,
	normalizeDiagonal,
} from '../../helpers/matrix';

export interface SolutionStep {
	matrix: string[][];
	answers: string[];
	label: string;
}

type HaussState = {
	matrix: string[][];
	answers: string[];
	columns: number;
	rows: number;
	error: string;
	steps: SolutionStep[];
	stateId: number;
	results: number[];
};

const initialState: HaussState = {
	matrix: [
		['1', '2.1', ''],
		['2.1', '2', '4'],
		['', '4', '5'],
	],
	steps: [],
	answers: ['0', '4', '5'],
	columns: 3,
	rows: 3,
	error: '',
	stateId: 1,
	results: [],
};

const haussSlice = createSlice({
	name: 'hauss',
	initialState,
	reducers: {
		setItems: (state, { payload }: PayloadAction<string[][]>) => {
			state.matrix = payload;
			state.stateId++;
		},
		setItem: (
			state,
			{ payload }: PayloadAction<{ column: number; row: number; value: string }>
		) => {
			state.matrix[payload.row][payload.column] = payload.value;
			state.stateId++;
		},
		setAnswer: (
			state,
			{ payload }: PayloadAction<{ index: number; value: string }>
		) => {
			state.answers[payload.index] = payload.value;
			state.stateId++;
		},
		resize: (
			state,
			{ payload }: PayloadAction<{ columns: number; rows: number }>
		) => {
			const { columns, rows } = payload;
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
					state.answers.push('0');
				}
			} else if (rowsDiff < 0) {
				state.matrix.splice(rowsDiff);
				state.answers.splice(rowsDiff);
			}
			state.rows = rows;
			state.stateId++;
		},
		solve: (state) => {
			state.steps = [];
			state.results = [];
			let matrix = getNumericMatrix(state.matrix);
			let answers = parseFloatArray(state.answers);
			if (!matrix || !answers) {
				state.error = 'Некорректные данные';
				return;
			}
			state.error = '';
			const echelone = createEchelone(matrix, answers);
			state.steps = state.steps.concat(echelone.steps);
			matrix = echelone.matrix;
			answers = echelone.answers;

			const normalized = normalizeDiagonal(matrix, answers);
			state.steps.push({
				matrix: convertMatrixToString(matrix, 2),
				answers: convertArrayToString(answers, 2),
				label: 'Нормализируем диагональ',
			});
			matrix = normalized.matrix;
			answers = normalized.answers;

			const diag = createDiagonalMatrix(matrix, answers);
			state.steps = state.steps.concat(diag.steps);
			state.results = diag.answers;
		},
	},
});

export const {
	setItems,
	setItem,
	resize,
	solve,
	setAnswer,
} = haussSlice.actions;

export default haussSlice.reducer;
