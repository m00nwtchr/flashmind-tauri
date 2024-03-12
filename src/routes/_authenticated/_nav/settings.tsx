import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_nav/settings")({
	component: Settings,
});

function Settings() {
	return <>Sett</>;
}
