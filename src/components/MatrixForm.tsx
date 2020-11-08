import React from 'react';
import { FaEquals, FaPlus } from 'react-icons/fa';
import { MatrixItem } from './MatrixItem';

type MatrixFormProps = {
	matrix: string[][];
	onMatrixChange: (row: number, column: number, value: string) => void;
	onAnswerChange: (index: number, value: string) => void;
	readonly?: boolean;
	answers: string[];
};

export const MatrixForm: React.FC<MatrixFormProps> = ({
	matrix,
	onMatrixChange,
	onAnswerChange,
	readonly,
	answers,
}) => {
	return (
		<div>
			{matrix.map((row, rowIndex) => (
				<div
					className="form-row align-items-center mb-2"
					key={`matrix-form-row-${rowIndex}`}
				>
					{row.map((value, columnIndex) => (
						<div
							className="form-row align-items-center"
							key={`matrix-form-row-${rowIndex}-column-${columnIndex}`}
						>
							{columnIndex !== 0 && (
								<div className="ml-3">
									<FaPlus size={10} className="d-block" />
								</div>
							)}
							<div className="col-auto">
								<MatrixItem
									value={value}
									onChange={(value) =>
										onMatrixChange(rowIndex, columnIndex, value)
									}
									index1={columnIndex + 1}
									readonly={readonly}
									showX
								/>
							</div>
						</div>
					))}
					<div className="col-auto">
						<FaEquals size={10} className="d-block" />
					</div>
					<div className="col-auto">
						<MatrixItem
							value={answers[rowIndex]}
							onChange={(value) => onAnswerChange(rowIndex, value)}
							index1={rowIndex + 1}
							readonly={readonly}
						/>
					</div>
				</div>
			))}
		</div>
	);
};
