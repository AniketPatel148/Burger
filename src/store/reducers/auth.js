import * as actionTypes from "../actions/actionTypes";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectionPath: "/",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_AUTH_PATH:
			return {
				...state,
				authRedirectionPath: action.path,
			};
		case actionTypes.AUTH_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				token: action.tokenId,
				userId: action.userId,
				error: null,
				loading: false,
			};
		case actionTypes.AUTH_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			};

		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
			};
		default:
			return state;
	}
};

export default reducer;
