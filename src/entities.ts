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

export const FlashCard = z.object({
	uid: z.string(),
	creator: z.number(),
	share: Share,
	content: FlashCardContent,
});
export type FlashCard = z.infer<typeof FlashCard>;
