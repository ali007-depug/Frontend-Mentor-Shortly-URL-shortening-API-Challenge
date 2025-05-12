import { useState } from "react";
import Button from "./Button";

export default function Url() {
  const [link, setLink] = useState("");
  const [isVaildLink, setIsValidLink] = useState(true);
  const [IsShowExLinks, setIsShowExLinks] = useState(false);
  const linksList = [
    {
      id: 0,
      link: "https://www.frontendmentor.io",
      shorten: "https://rel.ink/k4lkyk",
      copied: false,
    },
    {
      id: 1,
      link: "https://www.twitter.com/frontendmentor",
      shorten: "https://rel.ink/gxoxp9",
      copied: false,
    },
    {
      id: 2,
      link: "https://www.linkedin.com/company/frontend-mentor",
      shorten: "https://rel.ink/gob3x9",
      copied: false,
    },
  ];

  const [links, setlinks] = useState(linksList);

  function handleBtnClicked() {
    if (link.trim() === "") {
      setIsValidLink(false);
      return;
    }
    setIsValidLink(true);
    setIsShowExLinks(true);  }

  function handleLinkChange(e) {
    const linkValue = e.target.value;
    setIsValidLink(linkValue.length !== 0);
    setLink(linkValue);
  }

  function handleCopyLink(id,shorten) {
    navigator.clipboard.writeText(shorten)
    let updated = links.map((link) => {
      if (link.id == id) {
        return { ...link, copied: true };
      } else return link;
    });

    setlinks(updated);
  }

  return (
    <>
      <div className="flex max-sm:flex-col gap-3  bg-p-darkViolet py-8 px-5 rounded relative top-[-52px] bg-[url(bg-shorten-mobile.svg)] sm:bg-[url(bg-shorten-desktop.svg)]">
      <label htmlFor="url" className="sr-only">Enter URL</label>
        <input
          type="text"
          name="url"
          id="url"
          placeholder="Shorten a link here..."
          className={`bg-white pl-2 py-2 rounded sm:grow-1 ${
            !isVaildLink && "placeholder:text-s-red"
          }`}
          value={link}
          onChange={(e) => handleLinkChange(e)}
        />

        {/* show error msg */}
        {!isVaildLink && (
          <p className="text-s-red italic text-sm absolute bottom-2">
            Please add a link
          </p>
        )}

        <Button
          title="shorten it!"
          customStyle={"!rounded"}
          hasLink={false}
          onClick={handleBtnClicked}
        />
      </div>

      {/* show the links  */}
      {IsShowExLinks &&
        links.map((link) => {
          return (
            <div
              key={link.link}
              className="flex max-sm:flex-col max-sm:items-start justify-between items-center rounded bg-white mb-5 p-2 relative top-[-25px]"
            >
              {/* links */}
              <h4 className="text-p-darkViolet">{link.link}</h4>
              {/* shorten + copy */}
              <div className="flex gap-3 max-sm:flex-col items-center max-sm:w-full max-sm:items-start  ">
                <h4 className="text-p-cyan font-bold">{link.shorten}</h4>
                <Button
                  title={link.copied ? "copied" : "copy"}
                  customStyle={`!rounded max-sm:w-full ${
                    link.copied ? "bg-p-darkViolet hover:!bg-p-darkViolet" : ""
                  }`}
                  onClick={() => handleCopyLink(link.id,link.shorten)}
                />
              </div>
            </div>
          );
        })}
    </>
  );
}
