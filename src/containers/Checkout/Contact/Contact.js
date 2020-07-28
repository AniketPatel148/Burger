import React from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

import Classes from "./Contact.css";

class Contact extends React.Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
		loading: false,
	};

	orderhandler = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			customer: {
				name: "Max Schwarzmüller",
				address: {
					street: "Teststreet 1",
					zipCode: "41351",
					country: "Germany",
				},
				email: "test@test.com",
			},
			deliveryMethod: "fastest",
		};
		axios
			.post("/orders.json", order)
			.then((response) => {
				this.setState({ loading: false });
				console.log("Success");
				this.props.history.push("/");
			})
			.catch((error) => {
				this.setState({ loading: false });
				console.log(error);
			});
	};

	render() {
		let form = (
			<form>
				<input
					className={Classes.Input}
					type="text"
					name="name"
					placeholder="Your name"
				/>
				<input
					className={Classes.Input}
					type="email"
					name="email"
					placeholder="Your email address"
				/>
				<input
					className={Classes.Input}
					type="text"
					name="street"
					placeholder="Street"
				/>
				<input
					className={Classes.Input}
					type="text"
					name="postalode"
					placeholder="Postalcode"
				/>
				<Button btnType="Success" clicked={this.orderhandler}>
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={Classes.ContactData}>
				<h4>Enter your data here!</h4>
				{form}
			</div>
		);
	}
}

export default Contact;
