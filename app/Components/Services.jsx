import Image from "next/image";
import Tablet from "../Assets/Pen Tablet.png";
import Phone from "../Assets/Phone.png";
import Printer from "../Assets/Printer.png";

const Services = () => {
  return (
    <section
      id="services"
      className="text-white mx-10 md:mx-28 lg:mx-28 my-12 transition-all"
    >
      <div className="flex flex-col">
        <h2 className="font-clashSemibold text-2xl uppercase text-center">
          Our Services
        </h2>
        <p className="mt-4 text-center text-secondary text-base md:text-lg">
          In addition to our graphic design skills, we have extensive knowledge
          of Adobe Photoshop and Illustrator to create high-quality designs
          quickly and efficiently.
        </p>
      </div>
      <div className="mt-1 md:mt-6 flex justify-center items-center md:items-end gap-10 md:gap-20 flex-col md:flex-row">
        <div className="flex flex-col gap-1 md:gap-5 items-center">
          <Image alt="service1" src={Tablet} width={250} />
          <p className="font-clashSemibold text-center text-xl text-primary-100">
            Logo Design
          </p>
        </div>
        <div className="flex flex-col gap-1 md:gap-5 items-center justify-center">
          <Image alt="service2" src={Phone} width={250} />
          <p className="font-clashSemibold text-center text-xl text-green">
            Social Ads Design
          </p>
        </div>
        <div className="flex flex-col gap-1 md:gap-5 items-center">
          <Image alt="service3" src={Printer} width={250} />
          <p className="font-clashSemibold text-center text-xl text-purple">
            Printing Design
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
