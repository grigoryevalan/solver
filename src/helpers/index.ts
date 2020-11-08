export const getEmptyArray = (size: number) => {
	return new Array(size).fill(0);
};

export const getNumericMatrix = (
	matrix: string[][]
): number[][] | undefined => {
	let isCorrect = true;
	const result = matrix.map((row) =>
		row.map((value) => {
			if (isNaN(+value)) {
				isCorrect = false;
			}
			return +value;
		})
	);
	return isCorrect ? result : undefined;
};
