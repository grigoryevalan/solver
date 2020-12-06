import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { EquationResults } from '../../components/EquationResults';
import { MatrixForm } from '../../components/MatrixForm';
import { MatrixResizer } from '../../components/MatrixResizer';
import { resize, setAnswer, setItem, solve } from './relaxationSlice';

export const RelaxationSolver = () => {
	const {
		matrix,
		rows,
		columns,
		error,
		answers,
		steps,
		stateId,
		results,
	} = useSelector((state: RootState) => state.relaxation);
	const dispatch = useDispatch();

	const onResize = (sizes: { columns: number; rows: number }) => {
		dispatch(resize(sizes));
	};

	const onItemChange = (row: number, column: number, value: string) => {
		dispatch(setItem({ row, column, value }));
	};

	const onAnswerChange = (index: number, value: string) => {
		dispatch(setAnswer({ index, value }));
	};

	useEffect(() => {
		dispatch(solve());
	}, [dispatch, stateId]);

	return (
		<div className="container pb-4">
			<div className="row mb-4">
				<div className="col-auto">
					<MatrixResizer rows={rows} columns={columns} onChange={onResize} />
				</div>
			</div>
			<div className="row">
				<MatrixForm
					matrix={matrix}
					answers={answers}
					onMatrixChange={onItemChange}
					onAnswerChange={onAnswerChange}
				/>
			</div>
			{error !== '' && (
				<div className="row">
					<div className="alert alert-danger">
						<p>{error}</p>
					</div>
				</div>
			)}
			{steps.map(({ R, X, label }, index) => (
				<div className="row" key={`$step-${index}`}>
					<div className="col-12">{label}</div>
					<div className="col">
						<EquationResults letter="X" results={X} />
					</div>
					<div className="col">
						<EquationResults letter="R" results={R} />
					</div>
				</div>
			))}
		</div>
	);
};
