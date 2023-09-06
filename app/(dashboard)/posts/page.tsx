"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/daisyui/button";
import { PostDto, PostDtoArraySchema } from "@/models/Post";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

const Posts = () => {
  const queryClient = useQueryClient();

  const fetchTodoList = async () => {
    const res = await axios.get("/api/posts");
    // console.log(res.data);
    // return PostDtoSchema.parse(res.data);

    return PostDtoArraySchema.parse(res.data);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchTodoList,
  });

  const createPost = async () => {
    const res = await axios.post("/api/posts", {
      title: "My new post",
      content: "",
    });
  };

  const { mutate } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div className="mx-auto flex w-1/2 flex-col gap-2 bg-base-100">
      <div className=" flex items-center justify-between">
        <div>
          <h1 className="mb-4 text-4xl font-bold">Posts</h1>
          <p className="text-lg">Create a new post</p>
        </div>
        <Button variant={"primary"} onClick={() => mutate()}>
          Create
        </Button>
      </div>
      {data && data.length === 0 && <div>No posts found</div>}
      <div className="divide-y rounded-md border">
        {data &&
          data.map((post) => (
            <div
              key={post.id}
              className=" flex w-full items-center justify-between p-2"
            >
              <div>
                {" "}
                <Link href={`/editor/${post.id}`} className="no-underline">
                  <h4 className="bold mb-2 text-xl">{post.title}</h4>
                </Link>
                <p>{formatDate(post.createdAt)}</p>
              </div>
              {post.published ? <p>Published</p> : <p>Draft</p>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
