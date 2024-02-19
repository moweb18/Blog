import { Footer, Header } from "./components";

// eslint-disable-next-line react/prop-types
const App = ({ children }) => {
  return (
    <>
      <Header />
      <div className="px-5">
        <main className="container mx-auto mt-56 lg:mt-44 xl:mt-[91px]">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
