import { Link } from "@tanstack/react-router";
import { Navigation } from "../router";

export default function BottomNav({
	navigation,
}: {
	navigation: Navigation[];
}) {
	return (
		<div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-gray-800 dark:border-gray-600 dark:bg-gray-700">
			<nav className="mx-auto grid h-full max-w-lg grid-cols-2 font-medium">
				{navigation.map((item) => (
					<MyLink key={item.name} item={item} />
				))}
			</nav>
		</div>
	);
}

function MyLink({ item }: { item: Navigation }) {
	return (
		<Link
			to={item.href}
			className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-700"
			activeProps={{
				"aria-current": "page",
				className: "bg-gray-900 text-white",
			}}
		>
			<span
				className="mb-2 h-5 w-5 text-gray-300 group-hover:text-white"
				aria-hidden="true"
			>
				{item.icon ?? <></>}
			</span>
			<span className="text-sm text-gray-300 group-hover:text-white">
				{item.name}
			</span>
		</Link>
	);
}
