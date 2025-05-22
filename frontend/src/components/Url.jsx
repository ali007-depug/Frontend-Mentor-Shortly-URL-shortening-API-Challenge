import { useEffect, useState } from "react";
import Button from "./Button";

export default function Url() {
  const [link, setLink] = useState("");
  // const [links,setLinks] = useState([]);
  const [isVaildLink, setIsValidLink] = useState(true);
  const [IsShowExLinks, setIsShowExLinks] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [networkError, showNetworkError] = useState(false);
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

  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks(JSON.parse(localStorage.getItem("links")) || []);
  }, []);

  async function handleBtnClicked() {
    // test input if it's vaild or not
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/;

    const linkVaildtion = urlPattern.test(link);

    if (link.trim() === "") {
      setIsValidLink(false);
      return;
    }

    // if there is no internet
    if (!navigator.onLine) {
      showNetworkError(true);
    } else {
      showNetworkError(false);
    }
    // if(isVaildLink){
    setIsLoading(true);
    try {
      console.log(linkVaildtion);
      // Attempt to make an HTTP request to our backend API
      const response = await fetch("http://localhost:3001/shorten", {
        // Specify this is a POST request (used for creating/modifying data)
        method: "POST",

        // Set request headers to tell the server we're sending JSON data
        headers: {
          "Content-Type": "application/json", // Important for JSON payloads
        },

        // Convert JavaScript object to a JSON string for the request body
        // The backend expects an object with a 'url' property containing the link to shorten
        body: JSON.stringify({
          url: link, // 'link' comes from the component's state
        }),
      });
      const data = await response.json();
      console.log(response.status);
      console.log(data);
      if (response.ok) {
        const newLink = {
          id: links.length + 1,
          link: link,
          shorten: data.result_url,
          copied: false,
        };
        const updatedLinks = [...links , newLink];
        setLinks(updatedLinks);
        setLink("");
        setIsValidLink(linkVaildtion);
        setIsShowExLinks(true);
        console.log(links.length);
        localStorage.setItem("links", JSON.stringify(updatedLinks));
      }
    } catch (error) {
      console.error("The Error is " + error);
      setIsValidLink(linkVaildtion);
    } finally {
      setIsLoading(false);
    }

    setIsValidLink(linkVaildtion);
  }

  function handleLinkChange(e) {
    const linkValue = e.target.value;
    setIsValidLink(linkValue.length !== 0);
    setLink(linkValue);
  }

  function handleCopyLink(id, shorten) {
    navigator.clipboard.writeText(shorten);
    let updated = links.map((link) => {
      if (link.id == id) {
        return { ...link, copied: true };
      } else return link;
    });

    setLinks(updated);
  }

  return (
    <>
      <section
        className="flex max-sm:flex-col gap-3  bg-p-darkViolet py-8 px-5 rounded relative top-[-52px] bg-[url(bg-shorten-mobile.svg)] sm:bg-[url(bg-shorten-desktop.svg)]"
        aria-label="URL Shortener"
      >
        <label htmlFor="url" className="sr-only">
          Enter URL
        </label>
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
      </section>

      {/* show the links  */}
      {isLoading && navigator.onLine ? (
        <div className="flex justify-center gap-3.5">
          <span className="block size-5 border-2 border-p-darkViolet border-b-transparent rounded-full animate-spin  mb-5"></span>
          <h1>Loading</h1>
        </div>
      ) : (
        links.map((link) => {
          return (
            <div
              key={link.id}
              className="flex max-sm:flex-col max-sm:items-start justify-between items-center rounded bg-white mb-5 p-2 relative top-[-25px]"
            >
              {/* links */}
              <h4 className="text-p-darkViolet">{link.link}</h4>
              {/* shortenhttps://chat.deepseek.com/a/chat/s/20414384-b288-40f9-a95a-f531426d523f + copy */}
              <div className="flex gap-3 max-sm:flex-col items-center max-sm:w-full max-sm:items-start  ">
                <h4 className="text-p-cyan font-bold">{link.shorten}</h4>
                <Button
                  title={link.copied ? "copied" : "copy"}
                  customStyle={`!rounded max-sm:w-full ${
                    link.copied ? "bg-p-darkViolet hover:!bg-p-darkViolet" : ""
                  }`}
                  onClick={() => handleCopyLink(link.id, link.shorten)}
                />
              </div>
            </div>
          );
        })
      )}

      {networkError && (
        <p className="text-red-500 text-center mb-4">
          You are offline. Check your internet connection.
        </p>
      )}
    </>
  );
}
