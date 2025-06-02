import { useEffect, useState } from "react";
import Button from "./Button";

export default function Url() {
  const [inputLink, setInputLink] = useState("");
  const [isVaildLink, setIsValidLink] = useState(true);
  const [isLoading, setIsLoading] = useState(null);
  const [networkError, showNetworkError] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks(JSON.parse(localStorage.getItem("links")) || []);
  }, []);

  async function handleBtnClicked() {
    // test input if it's vaild or not
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/;

    const linkVaildtion = urlPattern.test(inputLink);

    if (inputLink.trim() === "") {
      setIsValidLink(false);
      return;
    }

    // if there is no internet
    if (!navigator.onLine) {
      showNetworkError(true);
    } else {
      showNetworkError(false);
    }
    setIsLoading(true);
    try {
      if (!inputLink || !inputLink.startsWith("http")) {
        setIsValidLink(false);
        return;
      }
      // Attempt to make an HTTP request to our backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/shorten`, {
        // Specify this is a POST request (used for creating/modifying data)
        method: "POST",

        // Set request headers to tell the server we're sending JSON data
        headers: {
          "Content-Type": "application/json", // Important for JSON payloads
        },

        // Convert JavaScript object to a JSON string for the request body
        // The backend expects an object with a 'url' property containing the link to shorten
        body: JSON.stringify({
          url: inputLink, // 'link' comes from the component's state
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const newLink = {
          id: links.length + 1,
          link: inputLink,
          shorten: data.result_url,
          copied: false,
        };
        const updatedLinks = [...links, newLink];
        setLinks(updatedLinks);
        setInputLink("");
        setIsValidLink(linkVaildtion);
        localStorage.setItem("links", JSON.stringify(updatedLinks));
      }
    } catch (error) {
      console.error("The Error is " + error);
      showNetworkError(true)
      setIsValidLink(linkVaildtion);
    } finally {
      setIsLoading(false);
    }

    setIsValidLink(linkVaildtion);
  }

  function handleLinkChange(e) {
    const linkValue = e.target.value;
    setIsValidLink(linkValue.length !== 0);
    setInputLink(linkValue);
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
      {/* The main Section for the URL input + the result of shorten links */}
      <section className="">
        {/* input + label Wrapper  */}
        <div
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
            value={inputLink}
            onChange={(e) => handleLinkChange(e)}
          />

          {/* The button to short links */}
          <Button
            title="shorten it!"
            customStyle={"!rounded"}
            hasLink={false}
            onClick={handleBtnClicked}
          />

          {/* if user type un vaild link show them a messagge*/}
          {!isVaildLink && (
            <p className="text-s-red italic text-sm absolute bottom-2">
              Please add a link
            </p>
          )}
        </div>
        {/* ====== End of input + label wrapper ===== */}

        {/* if the user was off line show this error msg */}
        {networkError && (
          <p className="text-red-500 text-center mb-10">
            You are offline. Check your internet connection.
          </p>
        )}

        {/* if it's still fetching and user online show some spinner loading .. when it's done show the shorten links to him   */}
        {isLoading && navigator.onLine ? (
          <div className="flex justify-center items-center gap-3.5">
            <span className="block size-5 border-2 border-p-darkViolet border-b-transparent rounded-full animate-spin  "></span>
            <strong className="text-2xl my-5">Loading</strong>
          </div>
        ) : (
          links.map((link) => {
            return (
              <div
                key={link.id}
                className="flex max-sm:flex-col max-sm:items-start justify-between items-center rounded bg-white mb-5 p-2 relative top-[-25px]"
              >
                {/* link before shorten */}
                <p className="text-p-darkViolet text-lg">{link.link}</p>
                {/* link after shorten + copy button */}
                <div className="flex gap-3 max-sm:flex-col items-center max-sm:w-full max-sm:items-start  ">
                  <p className="text-p-cyan font-bold text-lg">{link.shorten}</p>
                  <Button
                    title={link.copied ? "copied" : "copy"}
                    customStyle={`!rounded max-sm:w-full ${
                      link.copied
                        ? "bg-p-darkViolet hover:!bg-p-darkViolet"
                        : ""
                    }`}
                    // copy shorten link when user click on copy
                    onClick={() => handleCopyLink(link.id, link.shorten)}
                  />
                </div>
              </div>
            );
          })
        )}

      </section>
    </>
  );
}
