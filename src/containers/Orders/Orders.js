import React from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import witherrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends React.Component {
	state = {
		orders: [],
		loading: true,
	};
	componentDidMount() {
		let fetchedOrders = [];

		axios
			.get("/orders.json")
			.then((response) => {
				for (let key in response.data) {
					fetchedOrders.push({
						...response.data[key],
						id: key,
					});
				}
				console.log(fetchedOrders);
				this.setState({ loading: true, orders: fetchedOrders });
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div>
				{this.state.orders.map((order) => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
						name={order.customer.name}
						address={order.customer.address}
						email={order.customer.email}
					/>
				))}
			</div>
		);
	}
}

export default witherrorHandler(Orders, axios);
