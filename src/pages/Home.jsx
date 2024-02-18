import { LatestPosts, SEO, TopPosts } from "../components";

const Home = () => {
  return (
    <section className="xl:flex">
      <SEO title="Blog Modif Website" />
      <LatestPosts />
      <TopPosts />
    </section>
  );
};
export default Home;
