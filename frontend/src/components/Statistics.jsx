export default function Statistics() {
  return (
    <section>
      <h2 className="text-n-vDarkBlue mb-3 capitalize text-center text-4xl font-extrabold">
        Advanced Statistics
      </h2>
      <p className="text-n-vDarkBlue leading-5 mx-auto text-center  text-balance max-sm:max-w-[40ch] sm:w-[40ch]   font-light">
        Track how your links are performing across the web with our advanced
        Statistics dashboard.
      </p>

      <StatisticsCards />
    </section>
  );
}

function StatisticsCards() {
  const cardsData = [
    {
      icon: "icon-brand-recognition.svg",
      title: "brand recognition",
      desc: "Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
    },
    {
      icon: "icon-detailed-records.svg",
      title: "detailed records",
      desc: "  Gain insights into who is clicking your links. Knowing when and wherepeople engage with your content helps inform better decisions.",
    },
    {
      icon: "icon-fully-customizable.svg",
      title: "full customizable",
      desc: "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
    },
  ];
  return (
    // card wrapper
    <div
      className="flex max-md:flex-col gap-10 mt-20 relative focus:outline-none 
    after:absolute after:top-1/2  after:w-full after:h-[8px] after:bg-p-cyan after:z-[1] max-md:after:rotate-90 max-sm:after:h-[20px]"
      role="list"
    >
      {cardsData.map((card) => {
        return (
          // card it self
          <div
            key={card.title}
            className="bg-white shadow-md rounded flex  flex-col max-md:items-center max-md:px-dyp sm:px-4 even:top-8 last:top-16 relative z-2"
          >
            {/* card img */}
            <div className="rounded-full bg-n-vDarkBlue size-18 flex items-center justify-center relative mt-[-35.5px] ">
              <img src={card.icon} alt={card.title + "icon"} />
            </div>
            {/* card title */}
            <h3 className="capitalize text-n-vDarkBlue font-bold text-xl mb-5">
              {card.title}
            </h3>
            {/* card desc */}
            <p className="text-n-lGray font-bold text-sm mb-8">{card.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
