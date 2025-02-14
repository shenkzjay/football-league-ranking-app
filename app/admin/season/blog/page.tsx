"use client";

import MDEditor from "@uiw/react-md-editor";
import { useRef, useState } from "react";

import { CreateBlog } from "../../formaction/blog/createblog";

export default function BlogPost() {
  const [value, setValue] = useState<string>();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current && value) {
      const formData = new FormData(formRef.current);

      formData.append("content", value);

      await CreateBlog(formData);
    }
  };

  return (
    <div className="mt-12 mx-6 ">
      <fieldset className="bg-white p-6 border w-2/3 rounded-2xl">
        <legend>Create blog post</legend>
        <form
          method="post"
          className="w-full flex flex-col gap-4 mt-6"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div>
            <label htmlFor="imageupload" className="sr-only">
              Image upload
            </label>
            <input
              type="file"
              id="imageupload"
              name="imageupload"
              placeholder="Blog title"
              className="border rounded-xl py-2 px-4 w-full"
            />
          </div>

          <div>
            <label htmlFor="title" className="sr-only">
              Blog title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Blog title"
              className="border rounded-xl py-2 px-4 w-full"
            />
          </div>

          <div>
            <label htmlFor="slug" className="sr-only">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              placeholder="Slug"
              className="border rounded-xl py-2 px-4 w-full"
            />
          </div>

          <div>
            <MDEditor value={value} onChange={setValue} height={300} preview="edit" />
            {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
          </div>
          <button type="submit" className="py-2 px-4 border rounded-xl">
            Create post
          </button>
        </form>
      </fieldset>
    </div>
  );
}
