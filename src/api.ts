import axios from "axios";

const API_URL = "http://localhost:3000";

export async function fetchProviders(): Promise<string[]> {
	return axios.get<string[]>(`${API_URL}/auth/oidc`).then(r => r.data);
}
