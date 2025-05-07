"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ProjectModalBox from "../Components/ProjectModalBox";
import { createClient } from "contentful";
import loadingGif from "../Assets/loadingSq.gif";
import NoMatches from "../Assets/No Matches.svg";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const contentfulImageLoader = ({ src, width }) => {
  return `${src}?w=${width}`;
};

export default function SPLPortfolio() {
  const router = useRouter();
  const [portfolioData, setPortfolioData] = useState(null);
  const [portfolio, setPortfolio] = useState(null);

  // Get category from cms
  const [category, setCategory] = useState([]);
  const selectRef = useRef(null);

  // Filter category based on user choice
  const [selectedCat, setSelectedCat] = useState("All Category");
  const [selectedPortfolio, setSelectedPortfolio] = useState([]);

  // Filter by search
  const searchInputRef = useRef(null);

  const searchParams = useSearchParams();
  const search = searchParams.get("selectedCat");

  // Modal Box ကနေ Category Change
  useEffect(() => {
    if (portfolio != null) {
      if (search == "All Category") {
        setSelectedCat("All Category");
        setSelectedPortfolio(portfolio);
        selectRef.current.value = "All Category";
      } else {
        setSelectedCat(search);
        selectRef.current.value = search;
      }
    }
  }, [search, portfolio]);

  // Category Change
  useEffect(() => {
    if (portfolio != null) {
      selectedCat != "All Category"
        ? setSelectedPortfolio(
            portfolio.filter((entry) =>
              entry.fields.category.includes(selectedCat)
            )
          )
        : setSelectedPortfolio(portfolio);
    }
  }, [selectedCat, selectRef]);

  // Fetch Data
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

  // Category စုတာ
  useEffect(() => {
    if (portfolio != null) {
      const getCategoryArray = (objectsArray) => {
        const uniqueCategoriesSet = new Set();
        objectsArray.forEach((obj) => {
          obj.fields.category.forEach((category) => {
            uniqueCategoriesSet.add(category);
          });
        });
        const uniqueCategoriesArray = Array.from(uniqueCategoriesSet);
        return uniqueCategoriesArray;
      };

      const resultArray = getCategoryArray(portfolio);
      setCategory(resultArray);
    }
  }, [portfolio]);

  const freezeScroll = () => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const handleSearch = () => {
    const searchTerm = searchInputRef.current.value.toLowerCase();
    if (selectedCat != "All Category") {
      const filteredData = portfolio.filter(
        (entry) =>
          entry.fields.category.includes(selectedCat) &&
          (documentToPlainTextString(entry.fields.description)
            .toLowerCase()
            .includes(searchTerm) ||
            entry.fields.title.toLowerCase().includes(searchTerm))
      );
      setSelectedPortfolio(filteredData);
    } else {
      const filteredData = portfolio.filter(
        (entry) =>
          documentToPlainTextString(entry.fields.description)
            .toLowerCase()
            .includes(searchTerm) ||
          entry.fields.title.toLowerCase().includes(searchTerm)
      );
      setSelectedPortfolio(filteredData);
    }
  };

  return (
    <section className="mt-32 flex flex-col items-center mb-10">
      <h2 className="font-clashSemibold text-2xl text-white text-center">
        SPL's PORFOLIO
      </h2>
      <p className="mt-4 text-center text-secondary text-sm md:text-lg mb-3 mx-7">
        This section contains our finished products, such as logos, social ads,
        and printing designs.
      </p>
      <div className="flex items-center justify-center gap-2 md:gap-5 md:p-3 lg:p-5 min-w-full mb-6">
        <input
          className="ml-7 text-sm focus:outline-none w-3/5 rounded-full px-5 py-3 font-clashLight text-white bg-card"
          type="search"
          ref={searchInputRef}
          name="search"
          id="search"
          onChange={handleSearch}
          placeholder="Search keyword for designs you need..."
        />
        <select
          ref={selectRef}
          className="mr-7  w-2/5 md:w-1/5 text-sm  focus:outline-none rounded-full px-5 py-3 font-clashLight text-white bg-card"
          name="category"
          id="category"
          onChange={() => {
            searchInputRef.current.value = "";
            setSelectedCat(selectRef.current.value);
            router.push(`/portfolio?selectedCat=${selectRef.current.value}`);
          }}
        >
          <option value="All Category">All Category</option>
          {category.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {portfolio == null ? (
        <div className="flex flex-wrap gap-5 items-center justify-center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <Image key={index} src={loadingGif} alt="loading gif" width={280} />
          ))}
        </div>
      ) : (
        <></>
      )}

      <div className="mx-10 md:mx-28 lg:mx-28 flex justify-center items-start gap-10  flex-wrap">
        {portfolio != null ? (
          selectedPortfolio.map((portfolioData) => (
            <div
              key={portfolioData.sys.id}
              className="bg-card card shadow-lg"
              onClick={() => {
                freezeScroll();
                setPortfolioData(portfolioData);
              }}
            >
              <div className="imgWrapper">
                <Image
                  loader={contentfulImageLoader}
                  priority={true}
                  alt="Project Image"
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

        {portfolio != null && selectedPortfolio.length == 0 && (
          <div className="flex items-start md:justify-center md:items-center gap-10 md:gap-20 lg:gap-40 mt-8 md:mt-14 mb-10 md:mb-20 flex-col md:flex-row">
            <div>
              <Image src={NoMatches} width={180} alt="Not Found Data" />
            </div>
            <div className="flex flex-col items-start justify-start ">
              <p className="text-white text-3xl md:text-4xl overflow-hidden tracking-wide mb-5">
                No Matches!
              </p>
              <p className="text-white font-clashLight text-sm md:text-base">
                We couldn’t find any search results.
              </p>
              <p className="text-white font-clashLight text-sm md:text-base">
                Give it another go with different keywords.
              </p>
            </div>
          </div>
        )}
      </div>

      <ProjectModalBox
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />
    </section>
  );
}
