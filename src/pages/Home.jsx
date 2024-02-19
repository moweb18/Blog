import { useEffect } from "react";
import { LatestPosts, SEO, TopPosts } from "../components";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <section className="xl:flex">
      <SEO title="Blog Modif Website" />
      <LatestPosts />
      <TopPosts />
    </section>
  );
};
export default Home;
