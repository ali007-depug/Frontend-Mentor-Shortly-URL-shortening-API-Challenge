import Button from "../components/Button";

export default function Hero() {
  return (
    <div className="hero flex gap-10 mt-6 pl-dyp max-sm:px-dyp max-sm:flex-col">
      {/* hero text */}
      <section className="hero__text lg:mt-10 sm:w-1/2 max-sm:mt-20 max-sm:text-center "
              aria-labelledby="hero-heading hero-description">

        <h1 id="hero-heading" className="hero__title text-p-darkViolet font-extrabold text-balance text-hero-fluid  max-md:max-w-2/3 mb-2 max-sm:mx-auto">More than just shorter links</h1>

        <p className="hero__desc text-n-lGray  lg:w-2/3"           id="hero-description">
        Build your brand’s recognition and get detailed insights 
        on how your links are performing.
        </p>

        {/* get started button */}
        <Button title='get started' customStyle="mt-10 " hasLink={true}    aria-label="Get started with our service"/>
      </section>

      {/* hero img */}
      <figure className="hero__img sm:w-1/2 w-prag-dyp max-sm:-order-1">
      <figcaption className="sr-only">
          Illustration showing a person working with data analytics
        </figcaption>
        <img src="illustration-working.svg" alt="Person working at a computer with analytical data visualization"  className="max-w-full"/>

      </figure>
    </div>
  );
}
