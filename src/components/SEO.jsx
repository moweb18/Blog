import { useEffect } from "react";

const SEO = ({
  title = "Blog Modif Website",
  description = "Tempat bagi kamu yang suka menulis di dunia digital",
  author = "Modif Website",
  img = "https://blog.modifwebsite.id/logo.png",
}) => {
  useEffect(() => {
    const titleTag = document.querySelector("title");
    titleTag.textContent = title;

    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle.content = title;
    const ogImage = document.querySelector('meta[property="og:image"]');
    ogImage.content = img;
    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    ogDescription.content = description;
    const ogAuthor = document.querySelector('meta[property="article:author"]');
    ogAuthor.content = author;
  }, [title, img, description, author]);
};

export default SEO;
