import React from 'react';

type MatrixItemProps = {
	value: string;
	onChange: (value: string) => void;
	index1: number;
	index2: number;
};

export const MatrixItem: React.FC<MatrixItemProps> = ({
	value,
	onChange,
	index1,
	index2,
}) => {
	const index = `${index1}${index2}`;
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};
	return (
		<div className="d-flex align-items-center">
			<label htmlFor={`x${index}`}>
				x<sub>{index}</sub>
			</label>
			<input
				type="text"
				className="form-control"
				name={`x${index}`}
				value={value}
				onChange={handleChange}
				style={{ width: 50, marginLeft: 2 }}
			/>
		</div>
	);
};
