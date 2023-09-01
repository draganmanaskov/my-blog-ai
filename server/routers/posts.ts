import { z } from 'zod';
import { procedure, router } from '../trpc';
import { db } from '@/lib/db'


export const appRouter = router({
  addPost: procedure.input(
      z.object({
        title: z.string(),
        content: z.string(),
        published: z.boolean(),
        authorId: z.string(),
      }))
      .mutation(async (options) => {
      return db.post.create({data: options.input});
    }
  ),
  getPosts: procedure.query(async () => {
      return db.post.findMany({
        include: {
          author: true,
        }
      });
    }),
   
});

// export type definition of API
export type AppRouter = typeof appRouter;
