"use client";

import Link from "next/link";
import Image from "next/image";
import ProjectModalBox from "./ProjectModalBox";
import { useState, useEffect } from "react";
import { createClient } from "contentful";
import loadingGif from "../Assets/loadingSq.gif";

const contentfulImageLoader = ({ src, width }) => {
  return `${src}?w=${width}`;
};

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const client = createClient({
        space: process.env.NEXT_PUBLIC_REACT_APP_CONTENTFUL_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_REACT_APP_CONTENTFUL_ACCESS_KEY,
      });
      const res = await client.getEntries({ content_type: "portfolio" });
      setPortfolio(res.items);
    };
    fetchData().catch(console.error);
  }, []);

  const freezeScroll = () => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const onImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <section
        id="portfolio"
        className="text-white mx-10 md:mx-28 lg:mx-28 my-20 transition-all"
      >
        <div className="flex flex-col">
          <h2 className="font-clashSemibold text-2xl uppercase text-center">
            Our Portfolio
          </h2>
          <p className="mt-4 text-center text-secondary text-base">
            Our completed projects including logos and priting designs can be
            found under this section.
            <Link
              className="text-primary-100 hover:text-primary-900"
              href={`/portfolio?selectedCat=All Category`}
            >
              To all projects!
            </Link>
          </p>
        </div>
        {portfolio == null ? (
          <div className="mt-10 flex flex-wrap gap-5 items-center justify-center">
            {[1, 2, 3].map((index) => (
              <Image
                key={index}
                src={loadingGif}
                alt="loading gif"
                width={280}
                quality={10}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
        <div className="mt-10 flex justify-center items-start gap-10  flex-wrap">
          {portfolio != null ? (
            portfolio
              .slice(0, windowWidth <= 1110 ? 4 : 3)
              .map((portfolioData) => (
                <div
                  key={portfolioData.sys.id}
                  className="bg-card card shadow-lg"
                  onClick={() => {
                    freezeScroll();
                    setPortfolioData(portfolioData);
                  }}
                >
                  <div
                    className="bg-black skeleton"
                    style={{ display: loading ? "block" : "none" }}
                  >
                    <Image
                      onLoad={onImageLoad}
                      priority={true}
                      style={{ display: loading ? "none" : "block" }}
                      src={loadingGif}
                      quality={10}
                      alt="loading gif"
                      width="100%"
                    />
                  </div>

                  <div className="imgWrapper">
                    <Image
                      loader={contentfulImageLoader}
                      alt="Portfolio Sample"
                      src={portfolioData.fields.images[0].fields.file.url}
                      width={
                        portfolioData.fields.images[0].fields.file.details.image
                          .width
                      }
                      height={
                        portfolioData.fields.images[0].fields.file.details.image
                          .height
                      }
                      className="imgCard"
                      quality={60}
                    />
                  </div>
                  <p className="text-white text-base font-clashMedium p-6 text-center">
                    {portfolioData.fields.title}
                  </p>
                </div>
              ))
          ) : (
            <></>
          )}
        </div>
      </section>
      <ProjectModalBox
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />
    </>
  );
};

export default Portfolio;
