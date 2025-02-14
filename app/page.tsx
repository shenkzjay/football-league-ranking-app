import Image from "next/image";
import Final from "@/public/imgs/final.jpeg";
import BlogLayout from "./blog-layout";

export default function HomePage() {
  return (
    <BlogLayout>
      <section className="">
        <div className="">
          <main className=" ">
            <div className="p-2 rounded-2xl bg-white  ">
              <Image
                src={Final}
                width={500}
                height={100}
                quality={80}
                priority
                alt="image of winners showcasing their medals"
                className="w-full md:h-[40vh] h-[40vh] object-cover object-[0,-100px] relative rounded-2xl"
              />
              <div className="flex justify-between p-4 items-center">
                <div>
                  <span className="flex px-2 py-1 bg-[#f7f8fa] rounded-xl text-sm">
                    <p>sports</p>
                  </span>
                </div>

                <div className="space-x-6">
                  <span>view</span>
                  <span>like</span>
                  <span>share</span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-xl font-semibold w-[80%] text-balance">
                  Intelligence Committee to begin circulating dragt Ukraine report Monday
                </h4>
                <p className="text-xs">
                  by{" "}
                  <i>
                    <b>Olajide seun</b>
                  </i>
                </p>
                <p className="text-xs">Mon 24th Nov, 2025</p>
              </div>
            </div>

            <div className="p-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias natus quia at
                a corporis suscipit tenetur ratione assumenda. Qui error voluptates, animi
                aspernatur nisi omnis totam ad veritatis officia.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias natus quia at
                a corporis suscipit tenetur ratione assumenda. Qui error voluptates, animi
                aspernatur nisi omnis totam ad veritatis officia.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias natus quia at
                a corporis suscipit tenetur ratione assumenda. Qui error voluptates, animi
                aspernatur nisi omnis totam ad veritatis officia.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias natus quia at
                a corporis suscipit tenetur ratione assumenda. Qui error voluptates, animi
                aspernatur nisi omnis totam ad veritatis officia.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias natus quia at
                a corporis suscipit tenetur ratione assumenda. Qui error voluptates, animi
                aspernatur nisi omnis totam ad veritatis officia.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias natus quia at
                a corporis suscipit tenetur ratione assumenda. Qui error voluptates, animi
                aspernatur nisi omnis totam ad veritatis officia.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias natus quia at
                a corporis suscipit tenetur ratione assumenda. Qui error voluptates, animi
                aspernatur nisi omnis totam ad veritatis officia.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias natus quia at
                a corporis suscipit tenetur ratione assumenda. Qui error voluptates, animi
                aspernatur nisi omnis totam ad veritatis officia.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias natus quia at
                a corporis suscipit tenetur ratione assumenda. Qui error voluptates, animi
                aspernatur nisi omnis totam ad veritatis officia.
              </p>
            </div>
          </main>
        </div>
      </section>
    </BlogLayout>
  );
}
