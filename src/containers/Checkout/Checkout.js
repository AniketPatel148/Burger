import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Contact from "./ContactData/ContactData";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
	// state = {
	// 	ingredients: null,
	// 	totalPrice: 0,
	// };

	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price = 0;

	// 	for (let param of query.entries()) {
	// 		if (param[0] === "price") {
	// 			price = param[1];
	// 			this.setState({ totalPrice: price });
	// 		} else {
	// 			ingredients[param[0]] = +param[1];
	// 		}
	// 	}
	// 	// console.log(query.entries, ingredients, this.props.location.search);
	// 	this.setState({ ingredients: ingredients });
	// }

	checkOutHandler = () => {
		this.props.history.goBack();
	};

	continueHandler = () => {
		this.props.history.replace("./checkout/contact-data");
	};

	render() {
		let summary = <Redirect to="/" />;
		if (this.props.ings) {
			const purchased = this.props.purchased ? <Redirect to="/" /> : null;
			summary = (
				<div>
					{purchased}
					<CheckoutSummary
						ingredients={this.props.ings}
						checkOut={this.checkOutHandler}
						continue={this.continueHandler}
					/>
					<Route
						path={this.props.match.path + "/contact-data"}
						component={Contact}
					/>
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.BurgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(Checkout);
