import {
	Link,
	Outlet,
	createFileRoute,
	notFound,
} from "@tanstack/react-router";
import { deckQueryOptions, useDeck } from "../../../../api";

export const Route = createFileRoute("/_authenticated/_nav/deck/$id")({
	loader: async ({ context: { queryClient }, params: { id } }) => {
		const deck = await queryClient.ensureQueryData(deckQueryOptions(id));

		if (!deck) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw notFound();
		}
	},
	component: DeckView,
});

function DeckView() {
	const { id } = Route.useParams();
	const { data: deck } = useDeck(id);

	if (deck) {
		return (
			<>
				<div className="flex h-10 bg-gray-900 p-2 text-gray-300">
					<Link to="/deck/$id/" params={{ id }}>
						{deck.name}
					</Link>
					<div className="mx-1">{"|"}</div>
					<Link to="/deck/$id/play" params={{ id }}>
						Zagraj
					</Link>
					<div className="mx-1">{"|"}</div>
					<Link to="/deck/$id/edit" params={{ id }}>
						Edytuj
					</Link>
				</div>
				<Outlet />
			</>
		);
	}
}
