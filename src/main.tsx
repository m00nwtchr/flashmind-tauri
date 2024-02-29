import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "@fontsource-variable/inter";
import "./i18n";
import App from "./App";
import { queryClient } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import Loader from "./components/Loader";

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<Loader></Loader>}>
					<App />
				</Suspense>
			</QueryClientProvider>
		</React.StrictMode>,
	);
}
