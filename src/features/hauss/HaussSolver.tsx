import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { MatrixForm } from '../../components/MatrixForm';
import { MatrixResizer } from '../../components/MatrixResizer';
import { resize, setItem, solve } from './haussSlice';

export const HaussSolver = () => {
	const { matrix, rows, columns, error } = useSelector(
		(state: RootState) => state.hauss
	);
	const dispatch = useDispatch();

	const onResize = (sizes: { columns: number; rows: number }) => {
		dispatch(resize(sizes));
		dispatch(solve());
	};

	const onItemChange = (row: number, column: number, value: string) => {
		dispatch(setItem({ row, column, value }));
		dispatch(solve());
	};

	return (
		<div className="container">
			<div className="row mb-4">
				<div className="col-auto">
					<MatrixResizer rows={rows} columns={columns} onChange={onResize} />
				</div>
			</div>
			<div className="row">
				<MatrixForm matrix={matrix} onMatrixChange={onItemChange} />
			</div>
			<div className="row">
				<div className="alert alert-danger">
					<p>{error}</p>
				</div>
			</div>
		</div>
	);
};
