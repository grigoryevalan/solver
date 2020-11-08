import React from 'react';
import { MatrixItem } from './MatrixItem';

type MatrixFormProps = {
	matrix: string[][];
	onMatrixChange: (row: number, column: number, value: string) => void;
};

export const MatrixForm: React.FC<MatrixFormProps> = ({
	matrix,
	onMatrixChange,
}) => {
	return (
		<div>
			{matrix.map((row, rowIndex) => (
				<div className="form-row mb-2" key={`matrix-form-row-${rowIndex}`}>
					{row.map((value, columnIndex) => (
						<div
							key={`matrix-form-row-${rowIndex}-column-${columnIndex}`}
							className="col-auto"
						>
							<MatrixItem
								value={value}
								onChange={(value) =>
									onMatrixChange(rowIndex, columnIndex, value)
								}
								index1={rowIndex + 1}
								index2={columnIndex + 1}
							/>
						</div>
					))}
				</div>
			))}
		</div>
	);
};
