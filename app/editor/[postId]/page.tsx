import Editor from "@/components/editor";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { Post, User } from "@prisma/client";
import { db } from "@/lib/db";

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
}

interface EditorPageProps {
  params: { postId: string };
}

const EditorPage = async ({ params }: EditorPageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const post = await getPostForUser(params.postId, user.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex items-center justify-center">
      {/* <Tiptap /> */}
      <Editor post={post} />
    </div>
  );
};

export default EditorPage;
