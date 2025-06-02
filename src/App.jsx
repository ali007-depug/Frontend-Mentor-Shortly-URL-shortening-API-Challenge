// style
// import './App.css'
import Footer from "./components/.Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Main from "./components/Main";

function App() {
  const navLinks = [
    { id: 0, link: "features" },
    { id: 1, link: "pricing" },
    { id: 2, link: "resources" },
  ];

  return (
    <>
      <div className="flex flex-col font-pop">
        {/* header */}
        <Header
          logoSrc="logo.svg"
          logoAlt="shortly logo"
          mobileIcon={{ open: "icon-hamburger.svg", close: "icon-close.svg" }}
          navLinks={navLinks}
        />
        {/* hero */}
        <Hero />
        {/* Main */}
        <Main />
        {/* footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
