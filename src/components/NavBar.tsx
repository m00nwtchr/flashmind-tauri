import { Link } from "@tanstack/react-router";
import { Navigation } from "../router";

export default function NavBar({ navigation }: { navigation: Navigation[] }) {
	return (
		<nav className="bg-gray-800">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex flex-shrink-0 items-center">
							{/* <img
								className="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
								alt="Your Company"
							/> */}
						</div>
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{navigation.map((item) => (
									<MyLink key={item.name} item={item} />
								))}
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						{/* <Profile></Profile> */}
					</div>
				</div>
			</div>
		</nav>
	);
}

function MyLink({ item }: { item: Navigation }) {
	return (
		<Link
			to={item.href}
			className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
			activeProps={{
				"aria-current": "page",
				className: "bg-gray-900 text-white",
			}}
		>
			{item.name}
		</Link>
	);
}
