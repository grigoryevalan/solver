import React from 'react';
import { Header } from '../components/Header';
import { useRoutes } from './routes';

function App() {
	const routes = useRoutes();
	return (
		<div className="App">
			<Header />
			{routes}
		</div>
	);
}

export default App;
