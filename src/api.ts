import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchProviders = async () => {
	console.log("Fetching providers...");
	return axios.get<string[]>(`${API_URL}/auth/oidc`).then((r) => r.data);
};
