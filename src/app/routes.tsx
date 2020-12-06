import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HaussPage } from '../pages/HaussPage';
import { RelaxationPage } from '../pages/RelaxationPage';
import { MainPage } from '../pages/MainPage';

export const useRoutes = (): JSX.Element => {
	return (
		<Switch>
			<Route path="/relaxation" exact>
				<RelaxationPage />
			</Route>
			<Route path="/hauss" exact>
				<HaussPage />
			</Route>
			<Route path="/" exact>
				<MainPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};
