"use client";

import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Button } from "../daisyui/button";
import BulletList from "@tiptap/extension-bullet-list";
import { useEffect } from "react";

const CustomBulletList = BulletList.extend({
  draggable: true,
  addKeyboardShortcuts() {
    return {
      "Mod-l": () => this.editor.commands.toggleBulletList(),
    };
  },
});

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Document, Paragraph, Text, CustomBulletList],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none bg-base-100 p-6",
      },
    },
    content: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
  `,
  });

  useEffect(() => {
    console.log(editor);
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-gray-200 p-6 text-black">
      <div className="bg w-1/2">
        <div className="tounded-r-md  rounded-t-md border-b-2 bg-white p-2">
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            italic
          </button>
        </div>
        {editor && (
          <BubbleMenu
            className="bubble-menu flex gap-4 rounded-md bg-white p-2 shadow-lg"
            tippyOptions={{ duration: 100 }}
            editor={editor}
          >
            <Button
              variant={editor.isActive("bold") ? "primary" : "ghost"}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              Bold
            </Button>
            <Button
              variant={editor.isActive("bulletList") ? "primary" : "ghost"}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              Bullet
            </Button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              Strike
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </button>
          </BubbleMenu>
        )}

        {editor && (
          <FloatingMenu
            className="floating-menu"
            tippyOptions={{ duration: 100, offset: [0, -210] }}
            editor={editor}
          >
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              Bullet List
            </button>
          </FloatingMenu>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
