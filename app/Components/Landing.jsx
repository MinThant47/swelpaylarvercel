import LandingImage from "../Assets/SPL Landing Image.png";
import Image from "next/image";

const Landing = () => {
  return (
    <section
      id="about"
      className="mt-36 flex mx-10 md:mx-28 lg:mx-28 my-12 items-center gap-12 md:gap-9 lg:gap-12 flex-col md:flex-row transition-all"
    >
      <div className="text-white">
        <p className="text-2xl md:text-3xl font-clashLight">Who are we?</p>
        <h2 className="text-4xl lg:text-5xl uppercase font-clashSemibold text-primary-100 overflow-hidden">
          Swel Pay Lar
        </h2>
        <div className="mb-5"></div>
        <p className="text-base md:text-lg text-secondary">
          We are graphic designers, and know how to create the perfect logo,
          social ads & printing designs.
        </p>
      </div>
      <Image src={LandingImage} alt="Landing Image" width={930} />
    </section>
  );
};

export default Landing;
