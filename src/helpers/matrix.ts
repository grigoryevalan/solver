import { convertArrayToString, convertMatrixToString } from '.';
import { SolutionStep } from '../features/hauss/haussSlice';

export const addRow = (
	matrix: number[][],
	row: number[],
	index: number
): number[][] => {
	return matrix.map((r, i) => {
		if (i !== index) {
			return r;
		}
		return r.map((item, j) => item + row[j]);
	});
};

export const sumRows = (row1: number[], row2: number[]) => {
	if (row1.length !== row2.length) {
		throw new Error('Строки разной длины');
	}
	return row1.map((item, index) => item + row2[index]);
};

export const increaseRow = (row: number[], value: number): number[] => {
	return row.map((item) => item + value);
};

export const multiplyRow = (row: number[], value: number): number[] => {
	return row.map((item) => item * value);
};

export const multiplyMatrixRow = (
	matrix: number[][],
	index: number,
	value: number
): number[][] => {
	return matrix.map((row, i) => {
		if (i !== index) {
			return row;
		}
		return multiplyRow(row, value);
	});
};

export const getZeroingCoefficient = (v1: number, v2: number): number => {
	return -v1 / v2;
};

export const resetPivot = (row1: number[], row2: number[], index: number) => {
	const coef = getZeroingCoefficient(row1[index], row2[index]);
	return sumRows(row1, multiplyRow(row2, coef));
};

export const getSizes = (matrix: number[][]) => {
	return {
		rows: matrix.length,
		columns: matrix[0].length,
	};
};

export const createEchelone = (
	matrix: number[][],
	answers: number[]
): { matrix: number[][]; answers: number[]; steps: SolutionStep[] } => {
	answers = answers.slice();
	matrix = matrix.slice();
	const steps = [];

	const { rows, columns } = getSizes(matrix);
	const dim = Math.min(rows, columns);

	for (let column = 0; column < dim - 1; ++column) {
		for (let row = column + 1; row < rows; ++row) {
			if (matrix[row][column] === 0) {
				continue;
			}
			const coef = getZeroingCoefficient(
				matrix[row][column],
				matrix[column][column]
			);
			matrix[row] = sumRows(matrix[row], multiplyRow(matrix[column], coef));
			answers[row] += coef * answers[column];

			steps.push({
				matrix: convertMatrixToString(matrix, 2),
				answers: convertArrayToString(answers, 2),
				label: `Прибавим к строке ${
					row + 1
				} строку ${row}, умноженную на ${coef.toFixed(2)}`,
			});
		}
	}
	return { matrix, answers, steps };
};

export const normalizeDiagonal = (matrix: number[][], answers: number[]) => {
	const { rows, columns } = getSizes(matrix);
	const dim = Math.min(rows, columns);
	for (let i = 0; i < dim; ++i) {
		if (matrix[i][i] === 0) {
			continue;
		}
		const coef = 1 / matrix[i][i];
		matrix[i] = multiplyRow(matrix[i], coef);
		answers[i] *= coef;
	}
	return { matrix, answers };
};

export const createDiagonalMatrix = (
	matrix: number[][],
	answers: number[]
): { matrix: number[][]; answers: number[]; steps: SolutionStep[] } => {
	answers = answers.slice();
	matrix = matrix.slice();
	const steps = [];

	const { rows, columns } = getSizes(matrix);
	const dim = Math.min(rows, columns);

	for (let column = dim - 1; column > 0; --column) {
		for (let row = column - 1; row >= 0; --row) {
			if (matrix[column][column] === 0) {
				continue;
			}
			const coef = getZeroingCoefficient(
				matrix[row][column],
				matrix[column][column]
			);
			matrix[row] = sumRows(matrix[row], multiplyRow(matrix[column], coef));
			answers[row] += coef * answers[column];

			steps.push({
				matrix: convertMatrixToString(matrix, 2),
				answers: convertArrayToString(answers, 2),
				label: `Прибавим к строке ${row + 1} строку ${
					column + 1
				}, умноженную на ${coef.toFixed(2)}`,
			});
		}
	}
	return { matrix, answers, steps };
};
