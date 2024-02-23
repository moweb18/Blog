import { Route, Routes } from "react-router-dom";
import App from "./App";
import { About, Author, Home, Topics, Topic, Post } from "./pages";
import { NotFound } from "./components";

const Router = () => {
  return (
    <App>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/topics" Component={Topics} />
        <Route path="/about" Component={About} />
        <Route path="/author/:name" Component={Author} />
        <Route path="/topic/:id/:topic" Component={Topic} />
        <Route path="/post/:author/:id/:slug" Component={Post} />
        <Route path="/*" Component={NotFound} />
      </Routes>
    </App>
  );
};
export default Router;
