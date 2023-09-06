import { z } from "zod";

export const PostDtoSchema = z.object({
    id: z.string(),
    title: z.string(),
    published: z.boolean(),
    createdAt: z.string(),
})

export const PostDtoArraySchema = z.array(PostDtoSchema)

export type PostDto = z.infer<typeof PostDtoSchema>

