import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
	// constructor(props) {
	//     super(props);
	//     this.state = {...}
	// }
	state = {
		purchasing: false,
	};

	componentDidMount() {
		console.log(this.props);
		this.props.onInitIngredients();
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath("/checkout");
			this.props.history.push("/auth");
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onPurchaseInit();
		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		// 	queryParams.push(
		// 		encodeURIComponent(i) +
		// 			"=" +
		// 			encodeURIComponent(this.state.ingredients[i])
		// 	);
		// }

		// queryParams.push("price=" + this.state.totalPrice);
		// const queryString = queryParams.join("&");

		this.props.history.push({
			pathname: "/checkout",
			// search: "?" + queryString,
		});
	};

	render() {
		const disabledInfo = {
			...this.props.ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.props.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			console.log(this.props);
			burger = (
				<div>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onAddIngredient}
						ingredientRemoved={this.props.onRemoveIngredient}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						price={this.props.price}
						isAuth={this.props.isAuthenticated}
					/>
				</div>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					price={this.props.price}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
		}

		// {salad: true, meat: false, ...}
		return (
			<div>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.BurgerBuilder.ingredients,
		price: state.BurgerBuilder.totalPrice,
		error: state.BurgerBuilder.error,
		isAuthenticated: state.auth.token != null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
		onRemoveIngredient: (ingName) =>
			dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onPurchaseInit: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthPath(path)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
