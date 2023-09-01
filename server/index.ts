import { z } from 'zod';
import { procedure, router } from './trpc';
import { db } from '@/lib/db'


export const appRouter = router({
  getTodos: procedure.query(async () => {
      return [10,20,30];
    }),
  getUsers: procedure.query(async () => {
      return db.user.findMany();
    }),
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


  // id        String   @id @default(cuid())
  // title     String
  // content   Json?
  // published Boolean  @default(false)
  // createdAt DateTime @default(now()) @map(name: "created_at")
  // updatedAt DateTime @default(now()) @map(name: "updated_at")
  // authorId  String