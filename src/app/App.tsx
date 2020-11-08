import React from 'react';
import { Header } from '../components/Header';
import { HaussSolver } from '../features/hauss/HaussSolver';

function App() {
	return (
		<div className="App">
			<Header />
			<HaussSolver />
		</div>
	);
}

export default App;
