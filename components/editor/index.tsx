"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, Content } from "@tiptap/react";
import { TiptapEditorProps } from "./props";
import { TiptapExtensions } from "./extensions";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import va from "@vercel/analytics";
import DEFAULT_EDITOR_CONTENT from "./default-content";
import { EditorBubbleMenu } from "./components/bubble-menu";
import { getPrevText } from "@/lib/editor";
import { Post } from "@prisma/client";
import { Button } from "../daisyui/button";
import Icons from "../icons";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
// import { ImageResizer } from "./components/image-resizer";
type Inputs = {
  title: string;
};

export default function Editor({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);

  const [content, setContent] = useLocalStorage(
    "content",
    DEFAULT_EDITOR_CONTENT,
  );
  // const [saveStatus, setSaveStatus] = useState("Saved");

  const [hydrated, setHydrated] = useState(false);

  // const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
  //   const json = editor.getJSON();
  //   setSaveStatus("Saving...");
  //   setContent(json);
  //   // Simulate a delay in saving.
  //   setTimeout(() => {
  //     setSaveStatus("Saved");
  //   }, 500);
  // }, 750);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    content: post.content?.toString || DEFAULT_EDITOR_CONTENT,
    onUpdate: (e) => {
      // setSaveStatus("Unsaved");
      const selection = e.editor.state.selection;
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      });
      if (lastTwo === "++" && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        complete(
          getPrevText(e.editor, {
            chars: 5000,
          }),
        );
        // complete(e.editor.storage.markdown.getMarkdown());
        va.track("Autocomplete Shortcut Used");
      } else {
        // debouncedUpdates(e);
      }
      // debouncedUpdates(e);
    },
    autofocus: "end",
  });

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: (err) => {
      toast.error(err.message);
      if (err.message === "You have reached your request limit for the day.") {
        va.track("Rate Limit Reached");
      }
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop();
        if (e.key === "Escape") {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent("++");
      }
    };
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm("AI writing paused. Continue?")) {
        complete(editor?.getText() || "");
      }
    };
    if (isLoading) {
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    };
  }, [stop, isLoading, editor, complete, completion.length]);

  //Hydrate the editor with the content from localStorage.
  useEffect(() => {
    console.log(post.content);
    if (editor && post && !hydrated) {
      // editor.commands.setContent(post.content);
      editor.commands.setContent(post.content as Content);
      setHydrated(true);
    }
  }, [editor, post, hydrated]);

  async function onSubmit() {
    console.log(editor?.getJSON());
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: editor?.getJSON(),
      }),
    });
  }

  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <div className=" items center flex w-full max-w-[1400px] justify-between  p-4  md:px-8 lg:px-12">
        <Link href="/posts">
          <Button variant={"ghost"}>
            <Icons.ChevronLeft size={20} />
            Back
          </Button>
        </Link>
        <Button variant={"primary"} onClick={onSubmit}>
          Save
        </Button>
      </div>
      <input
        className="w-full max-w-[900px] px-8 text-5xl font-bold focus:outline-none sm:px-12"
        value={title}
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      {/* <Tiptap /> */}
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className="relative min-h-[500px] w-full max-w-[900px] p-12 px-8 sm:mb-[calc(20vh)] sm:px-12 "
      >
        <div className="absolute right-5 top-5 mb-5 px-2 py-1 text-sm ">
          {/* {saveStatus} */}
        </div>

        {editor && <EditorBubbleMenu editor={editor} />}
        {/* {editor?.isActive("image") && <ImageResizer editor={editor} />} */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
