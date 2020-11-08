import React from 'react';

type EquationResultsProps = {
	results: number[];
};

export const EquationResults: React.FC<EquationResultsProps> = ({
	results,
}) => {
	return (
		<div>
			{results.map((value, index) => (
				<div key={`result-${index}`}>
					X<sub>{index + 1}</sub> = {value.toFixed(3)}
				</div>
			))}
		</div>
	);
};
