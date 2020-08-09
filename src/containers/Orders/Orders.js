import React from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import witherrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends React.Component {
	componentDidMount() {
		this.props.onFetchOrders(this.props.token);
	}

	render() {
		let order = <Spinner />;
		if (!this.props.loading) {
			order = this.props.orders.map((order) => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}
					name={order.orderData.name}
					address={order.orderData.address}
					email={order.orderData.email}
				/>
			));
		}
		return <div>{order}</div>;
	}
}

const mapStsteToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
	};
};

export default connect(
	mapStsteToProps,
	mapDispatchToProps
)(witherrorHandler(Orders, axios));
