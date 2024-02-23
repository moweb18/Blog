import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URL_API, convertDate } from "../utils";
import { ShareSocialMedia, SEO, TopPosts } from "../components";
import BlankProfile from "/blank_profile.webp";

const Post = () => {
  const params = useParams();
  const { id: id_artikel, author: username } = params;

  const [contentArticle, setContentArticle] = useState({
    judul: "-",
    admin_img: BlankProfile,
    created_at: "",
    isi: "-",
  });
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contentArticle = async () => {
      if (id_artikel && username) {
        const formdata = new FormData();
        formdata.append("id_artikel", id_artikel);
        formdata.append("username", username);

        const request = await fetch(`${URL_API}/artikel_isi`, {
          method: "POST",
          body: formdata,
        });
        const response = await request.json();
        setLoading(false);

        if (response.message === "Data invalid") {
          setContentArticle({});
        } else {
          setContentArticle(response);
        }
      } else {
        setContentArticle({});
      }
    };

    contentArticle();
  }, [id_artikel, username]);

  useEffect(() => {
    if (!loading && Object.keys(contentArticle).length > 0) {
      const description = document.getElementById("description").textContent;
      setDescription(description);
    }
  }, [contentArticle, loading]);

  return (
    <section>
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-5 xl:pt-20">
        <div
          className={`${(Object.keys(contentArticle).length === 0 || loading) && "pointer-events-none opacity-50"}`}
        >
          <ShareSocialMedia />
        </div>
        <div className="flex-grow xl:w-[640px] xl:flex-shrink-0">
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
          ) : Object.keys(contentArticle).length > 0 ? (
            <>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white md:text-3xl">
                {contentArticle.judul}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-4">
                <Link
                  to={`/author/${username}`}
                  className="flex items-center gap-3 text-slate-900 hover:underline dark:text-white"
                >
                  <img
                    src={contentArticle.admin_img}
                    alt="author"
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="block max-w-24 truncate text-sm font-medium capitalize">
                    {username}
                  </span>
                </Link>
                <span className="text-slate-500 dark:text-slate-400">•</span>
                <time className="text-sm text-slate-500 dark:text-slate-400">
                  {contentArticle.created_at &&
                    convertDate(contentArticle.created_at, false)}
                </time>
              </div>
              <article className="mt-6 border-t border-slate-300 pt-6 dark:border-neutral-700">
                <div>
                  <img
                    src={contentArticle.original_img}
                    alt={contentArticle.deskripsi_img}
                    className="w-full object-cover"
                  />
                  <p className="mt-2 line-clamp-1 text-xs text-slate-400 ">
                    {contentArticle.deskripsi_img}
                  </p>
                </div>
                <div
                  className="mt-4 line-clamp-2  text-slate-800 dark:text-slate-300 sm:line-clamp-3"
                  id="description"
                  dangerouslySetInnerHTML={{
                    __html: contentArticle.isi,
                  }}
                />

                <p className="mt-28 text-slate-700 dark:text-slate-100">
                  Kategori:{" "}
                  <a
                    href={`/topic/${contentArticle.id_kategori}/${contentArticle.nama_kategori}`}
                    className="text-primary underline"
                  >
                    {contentArticle.nama_kategori}
                  </a>
                </p>
              </article>
            </>
          ) : (
            <p className="w-full text-center  text-slate-700 dark:text-slate-100">
              Postingan tidak ditemukan
            </p>
          )}
        </div>
        <TopPosts paddingTop={false} />
        <SEO
          title={`${contentArticle.judul} - ${contentArticle.nama_lengkap}`}
          author={contentArticle.nama_lengkap}
          description={`${contentArticle.nama_kategori} - ${description}`}
          img={contentArticle.original_img}
        />
      </div>
      {Object.keys(contentArticle).length > 0 && (
        <div
          id="disqus_thread"
          className="mt-28 max-h-[1200px] overflow-auto"
        ></div>
      )}
    </section>
  );
};
export default Post;
