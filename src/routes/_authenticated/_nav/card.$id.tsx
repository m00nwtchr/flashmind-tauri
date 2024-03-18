import { createFileRoute, notFound } from "@tanstack/react-router";
import { cardQueryOptions, useCard } from "../../../api";
import FlashCardComponent from "../../../components/FlashCard";

export const Route = createFileRoute("/_authenticated/_nav/card/$id")({
	loader: async ({ context: { queryClient }, params: { id } }) => {
		const card = await queryClient.ensureQueryData(
			cardQueryOptions(id as string),
		);

		if (!card) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw notFound();
		}
	},
	component: CardView,
});

function CardView() {
	const { id } = Route.useParams();
	const { data: card } = useCard(id as string);

	if (card) {
		return (
			<div className="m-5 flex justify-center">
				<FlashCardComponent
					card={card}
					language={"pl"}
					otherLanguage={"en-us"}
					footer={true}
				/>
			</div>
		);
	}
}
