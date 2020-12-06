import React from 'react';
import { NavLink } from 'react-router-dom';

type CardLinkProps = {
	path: string;
	label: string;
};

export const CardLink: React.FC<CardLinkProps> = ({ path, label }) => {
	return (
		<NavLink to={path}>
			<div className="card">
				<h5 className="card-title">{label}</h5>
			</div>
		</NavLink>
	);
};
