import { Header } from "./components";

// eslint-disable-next-line react/prop-types
const App = ({ children }) => {
  return (
    <>
      <Header />
      <div className="px-5">
        <main className="container mx-auto">{children}</main>
      </div>
    </>
  );
};

export default App;
