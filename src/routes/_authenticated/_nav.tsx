import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useMediaQuery } from "react-responsive";
import NavBar from "../../components/NavBar";
import BottomNav from "../../components/BottomNav";
import { WalletIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Navigation } from "../../router";

const navigation: Navigation[] = [
	{
		name: "Home",
		href: "/",
		icon: <WalletIcon />,
	},
	{
		name: "Settings",
		href: "/settings",
		icon: <Cog6ToothIcon />,
	},
];

export const Route = createFileRoute("/_authenticated/_nav")({
	component: Nav,
});

function Nav() {
	const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });

	//text-3xl font-bold underline
	return (
		<>
			{isDesktop && <NavBar navigation={navigation} />}
			<main className="h-full">
				<Outlet />
			</main>
			{!isDesktop && <BottomNav navigation={navigation} />}
		</>
	);
}
