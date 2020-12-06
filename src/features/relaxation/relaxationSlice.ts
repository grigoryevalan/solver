import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setgroups } from 'process';
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
	multiplyMatrix,
	norm,
	normalizeDiagonal,
	transponate,
} from '../../helpers/matrix';

export interface RelaxationSolutionStep {
	R: number[];
	X: number[];
	label: string;
}

type RelaxationState = {
	matrix: string[][];
	answers: string[];
	columns: number;
	rows: number;
	error: string;
	steps: RelaxationSolutionStep[];
	stateId: number;
	results: number[];
};

const initialState: RelaxationState = {
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

const relaxationSlice = createSlice({
	name: 'relaxation',
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
			let matrix: number[][];
			let answers: number[];
			try {
				matrix = getNumericMatrix(state.matrix);
				answers = parseFloatArray(state.answers);
			} catch (error) {
				state.error = error.message;
				return;
			}
			state.error = '';

			let G: number[] = [];
			let X: number[] = [];
			let R: number[] = [];

			const transponed = transponate(matrix);
			answers = multiplyMatrix(
				transponed,
				answers.map((v) => [v])
			).map((r) => r[0]);
			matrix = multiplyMatrix(transponed, matrix);

			for (let i = 0; i < state.rows; ++i) {
				G.push(answers[i] / matrix[i][i]);
				matrix[i] = matrix[i].map((value) => -value / matrix[i][i]);
				X.push(0);
				R.push(0);
			}
			console.log(matrix);

			for (let k = 0; k < 15; ++k) {
				const DX = multiplyMatrix(
					matrix,
					X.map((v) => [v])
				).map((r) => r[0]);
				console.log(DX, G);
				for (let j = 0; j < state.rows; ++j) {
					R[j] = DX[j] + G[j]; // - X[j];
				}
				state.steps.push({
					label: `Итерация ${k}`,
					R: R.slice(),
					X: X.slice(),
				});
				let maxIndex = 0;
				let maxR = -Infinity;
				R.forEach((value, index) => {
					if (Math.abs(value) > maxR) {
						maxR = Math.abs(value);
						maxIndex = index;
					}
				});
				const diff = R[maxIndex] - X[maxIndex];
				if (Math.abs(diff) / norm(X) < 1e-4) {
					break;
				}
				X[maxIndex] = R[maxIndex];
				// if (R.find((v) => Math.abs(v) > 1e-4) === undefined) {
				// 	break;
				// }
			}
		},
	},
});

export const {
	setItems,
	setItem,
	resize,
	solve,
	setAnswer,
} = relaxationSlice.actions;

export default relaxationSlice.reducer;
