import { Route, Routes } from "react-router-dom";
import App from "./App";
import { About, Home, Topics } from "./pages";

const Router = () => {
  return (
    <App>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </App>
  );
};
export default Router;
