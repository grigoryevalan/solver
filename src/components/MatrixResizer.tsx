import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { IntegerInput } from './IntegerInput';

type MatrixResizerProps = {
	columns: number;
	rows: number;
	onChange: (data: { rows: number; columns: number }) => void;
};

export const MatrixResizer: React.FC<MatrixResizerProps> = ({
	columns,
	rows,
	onChange,
}) => {
	const handleChange = (field: 'rows' | 'columns') => {
		return (value: number) => {
			onChange({ columns, rows, [field]: value });
		};
	};
	return (
		<div>
			<div className="form-row align-items-center">
				<div className="col-12">Размер матрицы</div>
				<div className="col-auto">
					<IntegerInput value={rows} onChange={handleChange('rows')} />
				</div>
				<div className="col-auto">
					<FaTimes size={16} />
				</div>
				<div className="col-auto">
					<IntegerInput value={columns} onChange={handleChange('columns')} />
				</div>
			</div>
		</div>
	);
};
