import { OIDCProvider, oidcClient } from "../api";
import { openUrl } from "../tauri";

export default function LoginButton({ provider }: { provider: OIDCProvider }) {
	const signin = async () => {
		const req = await oidcClient(provider).createSigninRequest({});
		localStorage.setItem("code_verifier", req.state.code_verifier ?? "");
		await openUrl(req.url);
	};

	return (
		<button
			type="submit"
			className="mx-1 mb-1 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold capitalize leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			onClick={() => void signin()}
		>
			{provider.iconUrl && (
				<img className="pr-2" src={provider.iconUrl}></img>
			)}
			{provider.name ?? provider.id}
		</button>
	);
}
