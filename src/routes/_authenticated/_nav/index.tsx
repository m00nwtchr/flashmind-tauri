import { createFileRoute } from "@tanstack/react-router";
import FC from "../../../components/FlashCard";
import { FlashCard } from "../../../entities";

export const Route = createFileRoute("/_authenticated/_nav/")({
	component: Index,
});

function Index() {
	const card = FlashCard.parse({
		uid: "c83695a1-684e-475a-8c64-68700c906eca",
		creator: 0,
		share: "Public",
		content: [
			{
				type: "Lang",
				content: {
					en: { title: "information" },
					pl: { title: "informacja" },
				},
			},
			{
				type: "Lang",
				content: {
					"en-uk": {
						pronunciation: {
							ipa: "ˌɪn.fəˈmeɪ.ʃən",
						},
					},
					"en-us": {
						pronunciation: {
							ipa: "ˌɪn.fɚˈmeɪ.ʃən",
							audioUrl:
								"https://upload.wikimedia.org/wikipedia/commons/3/38/En-us-information.ogg",
						},
					},
					pl: {
						pronunciation: {
							ipa: "in.fɔrˈmat͡s.ja",
							audioUrl:
								"https://upload.wikimedia.org/wikipedia/commons/8/89/Pl-informacja.ogg",
						},
					},
				},
			},
			{ type: "Separator" },
			// {
			// 	type: "Item",
			// 	content: {
			// 		image: "https://www.educol.pl/26207-large_default/angielski-fiszki-plus-zwroty-konwersacyjne-dla-poczatkujacych.jpg",
			// 	},
			// },
			{
				type: "Lang",
				content: {
					en: {
						image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Red_Kitten_01.jpg",
					},
					pl: {
						image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1675px-Cat_August_2010-4.jpg",
					},
				},
			},
			// https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fa%2Fa5%2FRed_Kitten_01.jpg&f=1&nofb=1&ipt=f4e76ba77042e995727d42ef27c26f3e6fe916737fee2a3816e5bccf1954ed0d&ipo=images
		],
	});

	return (
		<>
			Hello!
			{JSON.stringify(card)}
			<div className="flex w-full justify-center">
				<FC card={card} language={"pl"} otherLanguage={"en"}></FC>
				<FC card={card} language={"pl"} otherLanguage={"en"}></FC>
				<FC card={card} language={"pl"} otherLanguage={"en"}></FC>
				<FC card={card} language={"pl"} otherLanguage={"en"}></FC>
				<FC card={card} language={"pl"} otherLanguage={"en"}></FC>
				<FC card={card} language={"pl"} otherLanguage={"en"}></FC>
			</div>
		</>
	);
}
