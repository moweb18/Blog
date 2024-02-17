import { useParams } from "react-router-dom";

const Author = () => {
  const params = useParams();
  const { name } = params;

  return (
    <>
      <p>The author is: {name}</p>
    </>
  );
};
export default Author;
