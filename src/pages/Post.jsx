import { useParams } from "react-router-dom";

const Post = () => {
  const params = useParams();
  const { slug, description } = params;

  return (
    <>
      <p className="mt-[200px]">Title: {slug}</p>
    </>
  );
};
export default Post;
