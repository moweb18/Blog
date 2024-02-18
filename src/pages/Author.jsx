import { Link, useLocation, useParams } from "react-router-dom";
import {
  ShareSocialMedia,
  FollowUs,
  SEO,
  PaginateArticle,
} from "../components";
import { useEffect, useState } from "react";
import { URL_API, convertDate } from "../utils";

const Author = () => {
  const params = useParams();
  const location = useLocation();
  const page = location.search
    ? parseInt(location.search.split("?page=").join(""))
    : 1;
  const { name } = params;
  const [author, setAuthor] = useState({
    admin_img:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    nama_lengkap: "-",
    role_name: "-",
    username: "-",
  });
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPost, setTotalPost] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = 20;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const dataAuthor = async () => {
      const formdata = new FormData();
      formdata.append("identifier", "username");
      formdata.append("id", name);
      formdata.append("max_item", itemsPerPage);
      formdata.append("page", currentPage);

      const request = await fetch(`${URL_API}/author`, {
        method: "POST",
        body: formdata,
      });
      const response = await request.json();
      setLoading(false);

      if (response.status === 200) {
        const admin = response.admin;
        const articles = response.article.data;
        const total = response.article.total;
        setAuthor(admin);
        setArticles(articles);
        setTotalPost(total);
      } else if (response.status === 206) {
        const admin = response.admin;
        setAuthor(admin);
      } else if (response.status === 404) {
        setAuthor({
          message: "Not found",
        });
      }
    };
    dataAuthor();
  }, [name, currentPage]);

  return (
    <section className="flex flex-col gap-8 xl:flex-row xl:gap-5 xl:pt-20">
      {author.message === "Not found" ? (
        <p className="text-center text-slate-700 dark:text-slate-100">
          Penulis tidak ditemukan
        </p>
      ) : (
        <>
          <SEO
            title={`Penulis ${author.username} - Blog Modif Website`}
            img={author.admin_img}
            author={author.nama_lengkap}
          />
          <ShareSocialMedia />
          <div className="flex-grow">
            <div className="bg-author relative flex items-center justify-center rounded-md bg-cover px-4 py-8 text-center after:absolute after:inset-0 after:rounded-md after:bg-gradient-to-b after:from-[#0495EC] after:to-[#0D64C7] after:opacity-95">
              <div className="relative z-10 flex flex-col items-center justify-center">
                <img
                  src={author.admin_img}
                  className="h-24 w-24 rounded-full object-cover"
                  alt="author"
                />
                <p className="mt-2 text-center text-xl font-medium text-white">
                  {author.nama_lengkap}
                </p>
                <p className="text-sm text-slate-200">{author.role_name}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-10 border-t border-slate-300 pt-8 dark:border-neutral-700">
              {articles.length > 0 ? (
                <>
                  {articles.map((article) => {
                    const {
                      id_artikel,
                      id_kategori,
                      username,
                      thumbs_img,
                      judul,
                      isi,
                      created_at,
                      nama_kategori,
                    } = article;

                    return (
                      <article
                        className="flex flex-col gap-5 sm:w-full sm:flex-row xl:pr-6"
                        key={id_artikel}
                      >
                        <Link
                          to={`/post/${username}/${judul.toLowerCase().split(" ").join("-")}`}
                          className="block aspect-video flex-shrink-0 sm:h-24 sm:w-28"
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
                          >
                            <h5 className="line-clamp-2 text-lg font-medium text-slate-800 hover:underline dark:text-slate-300">
                              {judul}
                            </h5>
                          </Link>
                          <div
                            className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400 sm:line-clamp-3"
                            dangerouslySetInnerHTML={{
                              __html: isi,
                            }}
                          />
                          <div className="mt-5 flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-4">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
                              <time className="text-sm text-slate-500 dark:text-slate-400">
                                {convertDate(created_at)}
                              </time>
                              <span className="text-slate-500 dark:text-slate-400">
                                •
                              </span>
                              <Link
                                to={`/topic/${nama_kategori}`}
                                state={{ id_kategori }}
                                className="rounded-full bg-slate-100 px-2 py-1 text-sm text-slate-600 duration-100 ease-in hover:opacity-85"
                              >
                                {nama_kategori}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}

                  <PaginateArticle
                    itemsPerPage={itemsPerPage}
                    totalPages={totalPost}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              ) : loading ? (
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
                <p className="text-center text-slate-700 dark:text-slate-100">
                  Belum ada postingan
                </p>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 xl:sticky xl:top-28 xl:h-96">
            <FollowUs marginTop={false} />
          </div>
        </>
      )}
    </section>
  );
};
export default Author;
