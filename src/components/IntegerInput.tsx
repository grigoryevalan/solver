import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

type IntegerInputProps = {
	value: number;
	onChange: (value: number) => void;
};

export const IntegerInput: React.FC<IntegerInputProps> = ({
	value,
	onChange,
}) => {
	const increment = () => onChange(value + 1);
	const decrement = () => onChange(value - 1);
	return (
		<div className="d-flex">
			<button
				className="btn p-1 btn-danger"
				onClick={decrement}
				disabled={value <= 0}
			>
				<FaMinus className="d-block" size={12} />
			</button>
			<div className="px-1">{value}</div>
			<button className="btn p-1 btn-success" onClick={increment}>
				<FaPlus className="d-block" size={12} />
			</button>
		</div>
	);
};
