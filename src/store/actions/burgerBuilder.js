import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredient: name,
	};
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredient: name,
	};
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	};
};

export const fetchIngredientsfailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
};

export const initIngredients = () => {
	return (dispatch) => {
		axios
			.get("https://burger-81ef7.firebaseio.com/ingredients.json")
			.then((response) => {
				dispatch(setIngredients(response.data));
				console.log(response.data);
			})
			.catch((error) => {
				dispatch(fetchIngredientsfailed());
				console.log(error);
			});
	};
};
