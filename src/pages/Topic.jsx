import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { URL_API, convertDate } from "../utils";

const Topic = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const params = useParams();
  const location = useLocation();
  const { topic } = params;
  const { id_kategori } = location.state;

  useEffect(() => {
    const dataArticle = async () => {
      const formData = new FormData();
      formData.append("max_item", 6);
      formData.append("page", page);
      formData.append("kategori", id_kategori);

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

  return (
    <section>
      <h1 className="text-center text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl xl:pt-20 xl:text-5xl">
        {topic}
      </h1>

      <article className="mt-8 flex flex-wrap gap-16">
        {articles.map((article) => {
          const {
            id_artikel,
            username,
            admin_img,
            thumbs_img,
            judul,
            isi,
            created_at,
          } = article;

          return (
            <article className="md:w-80" key={id_artikel}>
              <Link className="block aspect-video md:aspect-auto md:h-44">
                <img
                  src={thumbs_img}
                  alt="img-post"
                  title={judul}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="mt-5">
                <Link>
                  <h5
                    className="line-clamp-2 text-lg font-medium text-slate-800 hover:underline dark:text-slate-300"
                    title={judul}
                  >
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
                </div>
              </div>
            </article>
          );
        })}
      </article>
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
    </section>
  );
};
export default Topic;
