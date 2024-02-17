import { useEffect, useState } from "react";
import { URL_API } from "../utils";
import { Link } from "react-router-dom";
import { TopPosts } from "../components";

const Topics = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataCategory = async () => {
      const request = await fetch(`${URL_API}/our_topics`, { method: "POST" });
      const response = await request.json();
      setCategories(response);
      setLoading(false);
    };

    dataCategory();
  }, []);

  return (
    <section className="xl:flex">
      <div className="xl:w-[768px] xl:border-r xl:border-slate-800  xl:dark:border-neutral-700">
        <h1 className="text-3xl font-semibold uppercase text-slate-900 dark:text-white md:text-4xl xl:pr-6 xl:pt-20 xl:text-5xl">
          Daftar Topik
        </h1>

        <div
          className={`mt-7 flex flex-wrap gap-3 border-t border-slate-800 ${loading ? "pt-8" : ""} pt-8 dark:border-neutral-700`}
        >
          {categories.map((category) => {
            const { id_kategori, nama_kategori } = category;
            return (
              <Link
                to={{ pathname: `/topic/${nama_kategori}` }}
                state={{ id_kategori }}
                className="w-max rounded-md border border-primary px-4 py-2 font-medium text-primary duration-100 ease-in hover:bg-primary hover:text-white"
                key={id_kategori}
              >
                {nama_kategori}
              </Link>
            );
          })}
        </div>
        {loading && (
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
        )}
      </div>

      <TopPosts />
    </section>
  );
};
export default Topics;
