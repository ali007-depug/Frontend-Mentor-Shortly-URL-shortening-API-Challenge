import propTypes from "prop-types";

export default function Footer() {
  const footerSections = [
    {
      title: "Features",
      links: ["Link Shortening", "Branded Links", "Analytics"],
    },
    {
      title: "Resources",
      links: ["Blog", "Developers", "Support"],
    },
    {
      title: "Company",
      links: ["About", "Our Team", "Careers", "contact"],
    },
  ];

  return (
    <footer role="contentinfo" className="bg-n-vDarkBlue pt-5 pb-10">
      {/* footer content */}
      <div className="sm:px-dyp max-sm:flex-col max-md:gap-8 max-sm:items-center flex gap-5 flex-wrap justify-center">
        {/* logo */}
        <img
          src="logo.svg"
          alt="shortly logo"
          className="sm:self-start bg-white"
        />
        {/* links */}
        <nav
          aria-label="footer navgiation"
          className="flex max-sm:flex-col gap-5 sm:gap-20"
        >
          {/* links */}
          {footerSections.map((footer) => {
            return (
              <FooterSection key={footer.title} {...footer} />
              // wrapper
            );
          })}
        </nav>
        {/* icons */}
        <Icons
          className="flex gap-8  sm:self-start justify-center"
          iconStyle="size-5 transition-all duration-300 ease-in-out hover:size-6 focus:outline-none focus-visible:ring-2 focus:ring-n-vDarkBlue"
        />
      </div>
    </footer>
  );
}

function FooterSection({ title, links }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-white font-bold">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a
              href="javascript:void(0)"
              className="text-n-lGray cursor-pointer hover:text-p-cyan transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus:ring-p-cyan"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Icons({ className, iconStyle }) {
  const icons = [
    {
      iconName: "facebook",
      icon: "icon-facebook.svg",
    },
    {
      iconName: "twitter",
      icon: "icon-twitter.svg",
    },
    {
      iconName: "pinterest",
      icon: "icon-pinterest.svg",
    },
    {
      iconName: "instagram",
      icon: "icon-instagram.svg",
    },
  ];

  return (
    <div className={className}>
      {icons.map((icon, i) => (
        <a key={icon.iconName} aria-label={`visit our ${icon.iconName}`}>
          <img key={i} src={icon.icon} aria-hidden className={iconStyle} />
        </a>
      ))}
    </div>
  );
}

FooterSection.propTypes = {
title: propTypes.string.isRequired,
links: propTypes.string.isRequired
}

Icons.propTypes ={
  className : propTypes.string.isRequired,
  iconStyle : propTypes.string.isRequired
}
