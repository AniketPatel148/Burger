import React, { Component } from "react";
import { Route } from "react-router-dom";
import Contact from "./Contact/Contact";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
	state = {
		ingredients: null,
		totalPrice: 0,
	};

	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;

		for (let param of query.entries()) {
			if (param[0] === "price") {
				price = param[1];
				this.setState({ totalPrice: price });
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		// console.log(query.entries, ingredients, this.props.location.search);
		this.setState({ ingredients: ingredients });
	}

	checkOutHandler = () => {
		this.props.history.goBack();
	};

	continueHandler = () => {
		this.props.history.replace("./checkout/contact-data");
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkOut={this.checkOutHandler}
					continue={this.continueHandler}
				/>
				<Route
					path={this.props.match.path + "/contact-data"}
					render={(props) => (
						<Contact
							ingredients={this.state.ingredients}
							totalPrice={this.state.totalPrice}
							{...props}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
