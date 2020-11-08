import React from 'react';

type MatrixItemProps = {
	value: string;
	onChange: (value: string) => void;
	index1: number;
	index2?: number;
	readonly?: boolean;
	showX?: boolean;
};

export const MatrixItem: React.FC<MatrixItemProps> = ({
	value,
	onChange,
	index1,
	index2,
	readonly,
	showX,
}) => {
	const index = `${index1}${index2 !== undefined ? index2 : ''}`;
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};
	return (
		<div className="d-flex align-items-center">
			{showX && (
				<div>
					X<sub>{index}</sub>&middot;
				</div>
			)}
			{readonly !== true ? (
				<input
					type="text"
					className="form-control px-2"
					name={`x${index}`}
					value={value}
					onChange={handleChange}
					placeholder="0"
					style={{ width: 50, marginLeft: 2 }}
				/>
			) : (
				<div className="font-weight-bold">
					{value[0] === '-' ? `(${value})` : value}
				</div>
			)}
		</div>
	);
};
