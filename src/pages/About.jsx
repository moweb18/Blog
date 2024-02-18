import { useEffect, useState } from "react";
import { SEO, TopPosts } from "../components";
import { URL_API } from "../utils";

const About = () => {
  const [aboutUs, setAboutUs] = useState("");
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const aboutUs = async () => {
      const request = await fetch(`${URL_API}/about_us`, { method: "POST" });
      const response = await request.json();
      setLoading(false);
      setAboutUs(response.aboutus);
      setContributors(response.contributor);
    };

    aboutUs();
  }, []);

  return (
    <section className="xl:flex">
      <SEO title="Tentang Modif Website - Blog Modif Website" />
      <div className="xl:w-[768px] xl:border-r xl:border-slate-800  xl:dark:border-neutral-700">
        <h1 className="text-3xl font-semibold uppercase text-slate-900 dark:text-white md:text-4xl xl:pt-20 xl:text-5xl">
          Tentang Kami
        </h1>

        <div
          className={`mt-7 border-t border-slate-800 pt-8 dark:border-neutral-700 xl:pr-6`}
        >
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
            <>
              <div className="flex flex-col gap-3">
                <div
                  className="text-slate-600 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: aboutUs }}
                />
              </div>

              <div className="mt-16">
                <h2 className="mb-6 text-xl font-semibold uppercase text-slate-900 dark:text-white md:text-2xl">
                  Contributors
                </h2>
                <ul className="flex flex-wrap gap-4">
                  {contributors.map((contributor, index) => {
                    const { nama_lengkap, admin_img } = contributor;

                    return (
                      <li key={index}>
                        <a href="/" title={nama_lengkap}>
                          <img
                            src={admin_img}
                            alt="contributor"
                            loading="lazy"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
      <TopPosts />
    </section>
  );
};
export default About;
