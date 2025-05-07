import { FaFacebook, FaTelegram, FaTiktok, FaLinkedin } from "react-icons/fa";

import Link from "next/link";

const Footer = () => {
  return (
    <>
      <hr className="mx-10 md:mx-28 lg:mx-28 mb-10" />
      <footer className="flex flex-col items-center justify-center gap-5 mb-10 mx-10 md:mx-28 lg:mx-28">
        <div className="flex flex-row gap-5 md:gap-10 flex-wrap justify-center items-center">
          <Link href="https://www.facebook.com/swelpaylar77">
            <i className="fab facebook text-3xl text-white hover:text-primary-100 transition ease-in-out cursor-pointer">
              <FaFacebook />
            </i>
          </Link>
          <Link href="https://t.me/Si_Thu_Lin_Htet">
            <i className="fab fa-telegram text-3xl text-white hover:text-primary-100 transition ease-in-out cursor-pointer">
              <FaTelegram />
            </i>
          </Link>

          <Link href="https://www.tiktok.com/@swelpaylar">
            <i className="fab fa-tiktok text-3xl text-white hover:text-primary-100 transition ease-in-out cursor-pointer">
              <FaTiktok />
            </i>
          </Link>
          <Link href="https://www.linkedin.com/company/swel-pay-lar-graphic-design-service/">
            <i className="fab fa-linkedin text-3xl text-white hover:text-primary-100 transition ease-in-out cursor-pointer">
              <FaLinkedin />
            </i>
          </Link>
        </div>
        <nav>
          <ul className="flex flex-row flex-wrap gap-4 md:gap-16 items-center justify-center">
            <li>
              <Link
                className="hover:text-primary-100 transition ease-in-out"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-100 transition ease-in-out"
                href="/#about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-100 transition ease-in-out"
                href="/#services"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-100 transition ease-in-out"
                href="/#contact"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-100 transition ease-in-out"
                href={`/portfolio?selectedCat=All Category`}
              >
                Portfolio
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
      <hr className="mx-10 md:mx-28 lg:mx-28" />
      <p className="my-5 text-center text-secondary">© 2023 Swel Pay Lar</p>
    </>
  );
};

export default Footer;
