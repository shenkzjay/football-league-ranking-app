"use server";

export const CreateBlog = (formData: FormData) => {
  const image = formData.get("imageupload") as File | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  console.log(image, title, slug, content);

  //handle image upload
  //clear form after submit
  //submit to database
  //handle notification on submit success5

  return {
    message: "hiee",
  };
};
