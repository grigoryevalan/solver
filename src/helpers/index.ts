export const getEmptyArray = (size: number) => {
	return new Array(size).fill(0);
};

export const parseFloatArray = (data: string[]): number[] => {
	const result = data.map((value) => (value === '' ? 0 : parseFloat(value)));
	if (result.find((value) => isNaN(value)) !== undefined) {
		throw new Error('Некорректные данные');
	}
	return result;
};

export const getNumericMatrix = (matrix: string[][]): number[][] => {
	const result = matrix.map((row) => parseFloatArray(row));
	if (result.find((value) => value === null) !== undefined) {
		throw new Error('Некорректные данные матрицы');
	}
	return result as number[][];
};

export const convertArrayToString = (
	data: number[],
	precision = 0
): string[] => {
	return data.map((v) => v.toFixed(precision));
};

export const convertMatrixToString = (
	matrix: number[][],
	precision = 0
): string[][] => {
	return matrix.map((row) => convertArrayToString(row, precision));
};
