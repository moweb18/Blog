import { LatestPosts, TopPosts } from "../components";

const Home = () => {
  return (
    <section className="xl:flex">
      <LatestPosts />
      <TopPosts />
    </section>
  );
};
export default Home;
