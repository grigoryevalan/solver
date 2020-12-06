import React from 'react';

type EquationResultsProps = {
	results: number[];
	letter: string;
};

export const EquationResults: React.FC<EquationResultsProps> = ({
	results,
	letter,
}) => {
	return (
		<div>
			{results.map((value, index) => (
				<div key={`result-${index}`}>
					{letter}
					<sub>{index + 1}</sub> = {value.toFixed(3)}
				</div>
			))}
		</div>
	);
};
