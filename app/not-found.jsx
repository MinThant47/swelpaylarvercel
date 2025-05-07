import Link from "next/link";

const NotFound = () => {
  return (
    <div className="mx-10 md:mx-28 lg:mx-28 mt-48 mb-36 flex flex-col justify-center items-center gap-3">
      <h1 className="text-white text-4xl md:text-7xl overflow-hidden tracking-wide font-clashMedium">
        Whoops...
      </h1>
      <p className="text-white text-base md:text-lg font-clashLight text-center">
        We could not find the page you’re looking for.
      </p>
      <div className="flex items-center justify-center gap-2 md:gap-5 flex-wrap">
        <Link
          className="btn2 text-center"
          href="/portfolio?selectedCat=All Category"
        >
          To Portfolio
        </Link>
        <Link
          href="/"
          className="text-primary-100 text-lg font-clashMedium hover:text-primary-900 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
