import { Deck } from "../entities";
import { Link } from "@tanstack/react-router";

export default function DeckComponent({
	deck,
	// language,
}: {
	deck: Deck;
	// language: Language;
}) {
	return (
		<div>
			<Link to="/deck/$id" params={{ id: deck.uid }}>
				<div className="w-40 bg-purple-400  p-2 text-center text-sm text-white">
					{deck.name}
				</div>
			</Link>
		</div>
	);
}
