import React from 'react';
import { CardLink } from '../components/CardLink';

export const MainPage: React.FC = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<CardLink path={'/hauss'} label={'Метод Гаусса'} />
				</div>
				<div className="col-12">
					<CardLink path={'/relaxation'} label={'Метод Релаксации'} />
				</div>
			</div>
		</div>
	);
};
