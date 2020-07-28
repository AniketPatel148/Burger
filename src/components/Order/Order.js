import React from "react";

import Classes from "./Order.css";

const Order = (props) => {
	const Ingredients = [];
	for (let iName in props.ingredients) {
		Ingredients.push({ name: iName, amount: props.ingredients[iName] });
	}

	const iOutput = Ingredients.map((i) => {
		return (
			<span
				key={i.name}
				style={{
					textTransform: "capitalize",
					display: "inline-block",
					margin: "0 8px",
					border: "1px solid #ccc",
					padding: "5px",
				}}
			>
				{i.name} {i.amount}
			</span>
		);
	});

	return (
		<div className={Classes.Order}>
			<p>Ingredients: {iOutput}</p>
			<p>
				Price: <strong>USD {props.price}</strong>
			</p>
		</div>
	);
};

export default Order;
