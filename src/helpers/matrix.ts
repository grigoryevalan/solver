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

export const;
