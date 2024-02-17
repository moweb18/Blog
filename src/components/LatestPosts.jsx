import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_API, convertDate } from "../utils";

const LatestPosts = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastScroll, setLastScroll] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const dataArticle = async () => {
      const formData = new FormData();
      formData.append("max_item", 20);
      formData.append("page", page);

      const request = await fetch(`${URL_API}/artikel`, {
        method: "POST",
        body: formData,
      });
      const response = await request.json();
      const result = response.data;

      setArticles(() => [...articles, ...result]);
      setLoading(false);
      setTotalPage(response.total);
    };

    dataArticle();
  }, [page]);

  useEffect(() => {
    const loadArticles = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;

      if (scrollTop > lastScroll) {
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        if (
          distanceFromBottom < 150 &&
          !loading &&
          articles.length < totalPage
        ) {
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      }

      setLastScroll(scrollTop);
    };

    if (window.innerWidth >= 1280) {
      window.addEventListener("scroll", loadArticles);
      return () => window.removeEventListener("scroll", loadArticles);
    }
  }, [loading, lastScroll]);

  return (
    <section className="xl:w-[768px] xl:border-r xl:border-slate-800  xl:dark:border-neutral-700">
      <h1 className="text-3xl font-semibold uppercase text-slate-900 dark:text-white md:text-4xl xl:pt-20 xl:text-5xl">
        Postingan Terbaru
      </h1>

      <article
        className={`mt-7 flex flex-col gap-7 border-t border-slate-800 ${loading ? "pt-8" : ""} dark:border-neutral-700 [&>*:first-child]:border-none`}
      >
        {articles.map((article) => {
          const {
            id_artikel,
            id_kategori,
            username,
            admin_img,
            thumbs_img,
            judul,
            isi,
            created_at,
            nama_kategori,
          } = article;

          return (
            <article
              key={id_artikel}
              className="flex flex-col gap-5 border-t border-slate-800 pt-8 dark:border-neutral-700 sm:w-full sm:flex-row xl:pr-6"
            >
              <Link
                to={`/post/${username}/${judul.toLowerCase().split(" ").join("-")}`}
                className="block aspect-video flex-shrink-0 sm:h-24 sm:w-28"
                state={{ id_artikel }}
              >
                <img
                  src={thumbs_img}
                  alt="img-post"
                  title={judul}
                  className="h-full w-full object-cover hover:opacity-85"
                  loading="lazy"
                />
              </Link>
              <div className="w-full">
                <Link
                  to={`/post/${username}/${judul.toLowerCase().split(" ").join("-")}`}
                  title={judul}
                  state={{ id_artikel }}
                >
                  <h5 className="line-clamp-2 text-lg font-medium text-slate-800 hover:underline dark:text-slate-300">
                    {judul}
                  </h5>
                </Link>
                <div
                  className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400 sm:line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: isi }}
                />
                <div className="mt-5 flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-4">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
                    <Link
                      to={`/author/${username}`}
                      className="flex items-center gap-3 text-primary hover:underline"
                    >
                      <img
                        src={admin_img}
                        alt="author"
                        className="h-10 w-10 rounded-full object-cover"
                        loading="lazy"
                      />
                      <span className="block max-w-24 truncate text-sm font-medium capitalize">
                        {username}
                      </span>
                    </Link>
                    <span className="text-slate-500 dark:text-slate-400">
                      |
                    </span>
                    <time className="text-sm text-slate-500 dark:text-slate-400">
                      {convertDate(created_at)}
                    </time>
                  </div>

                  <Link
                    to={`/topic/${nama_kategori}`}
                    state={{ id_kategori }}
                    className="rounded-full bg-slate-100 px-2 py-1 text-sm text-slate-600 duration-100 ease-in hover:opacity-85"
                  >
                    {nama_kategori}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}

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
        ) : window.innerWidth >= 1280 ? (
          ""
        ) : (
          articles.length < totalPage && (
            <button
              type="button"
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
                setLoading(true);
              }}
              className="mx-auto mt-8 flex w-max justify-center rounded-lg border border-primary px-6 py-2 text-sm text-primary duration-100 ease-in hover:bg-primary hover:text-white"
            >
              Load More
            </button>
          )
        )}
      </article>
    </section>
  );
};
export default LatestPosts;
