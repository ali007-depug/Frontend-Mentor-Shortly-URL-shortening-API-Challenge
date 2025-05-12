import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../components/Button";
export default function Header({logoSrc,logoAlt,mobileIcon,navLinks}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // maping through links
  const links = navLinks.map((link) => {
    return (
      <li key={link.id}>
        <a href={`#${link.link}`}>{link.link}</a>
      </li>
    );
  });

  return (
    <>
      {/* header  */}
      <header className="flex items-center justify-between py-4 px-dyp">
        <div className="w-[100px]">
          <img
            className="max-w-full"
            src={logoSrc}
            alt={logoAlt}
          />
        </div>

        {/* nav */}
        <nav aria-label="mainNav" className=" sm:flex sm:grow">

          {/* show hamburger menu on the mobile screen */}
          <button
            onClick={toggleMenu}
            className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-n-vDarkBlue cursor-pointer size-10"
            aria-expanded={isMenuOpen}
            aria-controls="mobileMenu"
            aria-label={isMenuOpen ? "close menu" : "open menu"}
          >
            <img
              src={isMenuOpen ? mobileIcon.close : mobileIcon.open}
              alt="Menu toggle"
              aria-hidden="true"
            />
          </button>

          {/* mobile nav */}
          <MobileNav links={links} isMenuOpen={isMenuOpen} />
          {/* desktop nav */}
          <DesktopNav links={links} />
        </nav>
      </header>
    </>
  );
}


function MobileNav({ links, isMenuOpen }) {
  return (
    <>
      <ul
        id="mobileMenu"
        className={
          isMenuOpen
            ? "flex flex-col justify-center items-center absolute rounded-lg bg-p-darkViolet right-[15px] mt-4 w-mobileNav py-4 text-center [&_a]:w-30 [&_a]:py-2 [&_a]:inline-block [&_a]:text-white [&_a]: [&_a]:my-2 [&_a]:rounded-[5px] [&_a]:capitalize [&_a]:font-extrabold [&_a]:focus:outline-none [&_a]:focus:ring-2 [&_a]:focus:ring-offset-2 [&_a]:focus:ring-white"
            : "hidden"
        }
      >
        {links}

        <div className="sign_up my-5 w-full">
          <li>
            <a href="">login</a>
          </li>
          <li className="bg-p-cyan w-[90%] mx-auto rounded-full">
            <a href="" className="">
              Sign up
            </a>
          </li>
        </div>
      </ul>
    </>
  );
}

const linkShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  links: PropTypes.string.isRequired,
});

MobileNav.propTypes = {
  links: PropTypes.arrayOf(linkShape).isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};


function DesktopNav({ links }) {
  return (
    <>
      {/* desktop nav */}
      <ul className="hidden sm:flex [&_a]:text-dy-desktopNavFont items-center space-x-2 grow ml-10 [&_li]:w-fit  [&_a]:px-4 [&_a]:py-2 [&_a]:text-lg [&_a]:inline-block  [&_a]:capitalize [&_a]:font-extrabold : [&_a]:text-n-gViolet [&_a]:duration-300 [&_a]:transition-colors [&_a]:hover:text-p-darkViolet [&_a] [&_a]:focus:outline-none [&_a]:focus:ring-2 [&_a]:focus:ring-offset-2 [&_a]:focus:ring-white">

        {links}

        <li className="sing my-5 flex items-center justify-center flex-wrap ml-auto [&_a]:px-6 [&_a]:py-2 group">
          <ul className="flex max-md:flex-col items-center">

          <li>
            <a href="">login</a>
          </li>

          <li className="">
            <Button title={"sign up"} customStyle="font-bold" hasLink={true} />
          </li>
            </ul>
        </li>
      </ul>
    </>
  );
}



DesktopNav.propTypes = {
  links: PropTypes.arrayOf(linkShape).isRequired,
};


Header.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  logoAlt: PropTypes.string.isRequired,

  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  
  mobileIcon: PropTypes.shape({
    open: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired,
  }).isRequired,
};


