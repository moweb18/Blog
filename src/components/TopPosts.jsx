import FollowUs from "./FollowUs";
import { useEffect, useState } from "react";
import { URL_API } from "../utils";
import { useParams } from "react-router-dom";

const TopPost = ({ paddingTop = true }) => {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchDataArticle = async () => {
      const formdata = new FormData();
      if (params.id) {
        formdata.append("except_id", params.id);
      }

      const request = await fetch(`${URL_API}/top_posts`, {
        method: "POST",
        body: formdata,
      });
      const response = await request.json();
      const result = response;
      setTopPosts(result);
    };

    fetchDataArticle();
  }, [location]);

  useEffect(() => {
    if (topPosts.length > 0) {
      setLoading(false);
    }
  }, [topPosts, loading]);

  return (
    <section
      className={`mt-10 border-t border-slate-200 pt-5 dark:border-neutral-700  xl:mt-0 xl:border-none xl:pl-8 ${paddingTop ? "xl:pt-20" : "xl:pt-0"}`}
    >
      <div className="xl:sticky xl:top-28">
        <h2 className="mb-5 text-xl font-semibold uppercase text-slate-900 dark:text-white md:text-2xl">
          Postingan Teratas
        </h2>
        <article className="flex flex-col gap-6">
          {loading ? (
            <div className="flex animate-spin justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="rgba(43,149,246,1)"
              >
                <path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
              </svg>
            </div>
          ) : (
            topPosts.map((topPost, index) => {
              const { judul, thumbs_img, username, id_artikel } = topPost;

              return (
                <article
                  className="border-b border-slate-400 pb-6 dark:border-neutral-700"
                  key={index}
                >
                  <a
                    className="flex items-center gap-3 hover:underline"
                    title={judul}
                    href={`/post/${username}/${id_artikel}/${judul.toLowerCase().split(" ").join("-")}`}
                  >
                    <img
                      src={thumbs_img}
                      alt="img-top-post"
                      className="peer h-14 w-14 object-cover"
                    />
                    <span className="line-clamp-1 font-medium text-slate-800 hover:underline peer-hover:underline dark:text-slate-300">
                      {judul}
                    </span>
                  </a>
                </article>
              );
            })
          )}
        </article>

        <FollowUs />
      </div>
    </section>
  );
};

export default TopPost;
