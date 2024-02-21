import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL_API, convertDate } from "../utils";
import { ShareSocialMedia, SEO, TopPosts } from "../components";

const Post = () => {
  const location = useLocation();
  const { id_artikel, username } = location.state;
  const [contentArticle, setContentArticle] = useState({
    judul: "-",
    admin_img:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    created_at: "",
    isi: "-",
  });
  const [description, setDescription] = useState("");

  useEffect(() => {
    const contentArticle = async () => {
      if (id_artikel) {
        const formdata = new FormData();
        formdata.append("id_artikel", id_artikel);
        formdata.append("username", username);

        const request = await fetch(`${URL_API}/artikel_isi`, {
          method: "POST",
          body: formdata,
        });
        const response = await request.json();
        setContentArticle(response);
      }
    };

    contentArticle();
  }, [id_artikel, username]);

  useEffect(() => {
    if (contentArticle) {
      const description = document.getElementById("description").textContent;
      setDescription(description);
    }
  }, [contentArticle]);

  return (
    <section className="flex flex-col gap-8 xl:flex-row xl:gap-5 xl:pt-20">
      <SEO
        title={`${contentArticle.judul} - ${contentArticle.nama_lengkap}`}
        author={contentArticle.nama_lengkap}
        description={`${contentArticle.nama_kategori} - ${description}`}
        img={contentArticle.original_img}
      />
      <ShareSocialMedia />
      <div className="flex-grow">
        {contentArticle && (
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
            </article>
          </>
        )}
      </div>
      <TopPosts paddingTop={false} />
    </section>
  );
};
export default Post;
