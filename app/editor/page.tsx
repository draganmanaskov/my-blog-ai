import Editor from "@/components/editor";
import Tiptap from "@/components/tiptap/tiptap";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex items-center justify-center">
      {/* <Tiptap /> */}
      <Editor />
    </div>
  );
};

export default page;
