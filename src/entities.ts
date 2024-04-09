import { z } from "zod";

export const Language = z.enum(["pl", "en", "en-us", "en-uk"]);
export type Language = z.infer<typeof Language>;

export const Share = z.enum(["Public", "Private"]);
export type Share = z.infer<typeof Share>;

export const Pronunciation = z.object({
	ipa: z.string(),
	audioUrl: z.string().url().optional(),
});
export type Pronunciation = z.infer<typeof Pronunciation>;

export const FlashCardItem = z
	.object({ title: z.string() })
	.or(z.object({ pronunciation: Pronunciation }))
	.or(z.object({ image: z.string() }))
	.or(z.object({ example: z.string() }));
export type FlashCardItem = z.infer<typeof FlashCardItem>;

export const LanguageItem = z.record(Language, FlashCardItem);
export type LanguageItem = z.infer<typeof LanguageItem>;

// export const Separator = z.literal("Separator");
// export type Separator = z.infer<typeof Separator>;

// z.object({ type: z.literal("Item") }).merge(FlashCardItem);

export const FlashCardSection = z.discriminatedUnion("type", [
	z.object({ type: z.literal("Separator") }),
	z.object({ type: z.literal("Item"), content: FlashCardItem }),
	// z.object({ type: z.literal("FrontBack"), content: z.object({
	// 	front:
	// }) }),
	z.object({ type: z.literal("Lang"), content: LanguageItem }),
]);
// export const FlashCardSection = z
// 	.literal("Separator")
// 	.or(FlashCardItem)
// 	.or(LanguageItem);
export type FlashCardSection = z.infer<typeof FlashCardSection>;

export const FlashCardContent = z.array(FlashCardSection);
export type FlashCardContent = z.infer<typeof FlashCardContent>;

export const CreateFlashCard = z.object({
	share: Share,
	content: FlashCardContent,
});
export type CreateFlashCard = z.infer<typeof CreateFlashCard>;

export const FlashCard = CreateFlashCard.extend({
	uid: z.string().uuid().readonly(),
	creator: z.number().readonly(),
});
export type FlashCard = z.infer<typeof FlashCard>;

export const FlashCardArray = z.array(FlashCard);
export type FlashCardArray = z.infer<typeof FlashCardArray>;

export const Deck = z.object({
	uid: z.string().uuid().readonly(),
	name: z.string(),
	creator: z.number(),
	// kind:
	share: Share,
});
export type Deck = z.infer<typeof Deck>;

export const DeckArray = z.array(Deck);
export type DeckArray = z.infer<typeof DeckArray>;

// export const UpdatePatch

export const UpdateDeckCards = z.object({
	add: z.array(z.string().uuid()).optional(),
	remove: z.array(z.string().uuid()).optional(),
});

export type UpdateDeckCards = z.infer<typeof UpdateDeckCards>;
