import axios from "axios";

const instance = axios.create({
	baseURL: "https://burger-81ef7.firebaseio.com/",
});

export default instance;
