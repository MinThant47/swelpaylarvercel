import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import loadingGif from "../Assets/loadingSq.gif";
import Link from "next/link";

const contentfulImageLoader = ({ src, width }) => {
  return `${src}?w=${width}`;
};

const ProjectModalBox = (props) => {
  const [imgNo, setImgNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const [showComponent, setShowComponent] = useState(false);

  const showComponentFunction = () => {
    setShowComponent(true);
    const timer = setTimeout(() => {
      setShowComponent(false);
    }, 700);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (!ref.current?.contains(e.target)) {
        closeModal();
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const closeModal = () => {
    props.setPortfolioData(null);
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    setImgNo(0);
  };

  const incrementNo = () => {
    if (imgNo < props.portfolioData.fields.images.length - 1) {
      setLoading(true);
      setImgNo(imgNo + 1);
      showComponentFunction();
    }
  };

  const decrementNo = () => {
    if (imgNo > 0) {
      setLoading(true);
      setImgNo(imgNo - 1);
      showComponentFunction();
    }
  };

  const onImageLoad = () => {
    setLoading(false);
  };

  return props.portfolioData != null ? (
    <div
      key={props.portfolioData.id}
      className="z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full"
    >
      <div
        ref={ref}
        className=" modal-container bg-black overflow-y-auto p-8 md:p-16"
      >
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-end min-w-full">
            <svg
              onClick={() => {
                closeModal();
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7 text-white mb-5 text-right cursor-pointer z-50"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            {showComponent ? (
              <div className="bg-black skeleton flex flex-col- items-center">
                <Image
                  src={loadingGif}
                  quality={10}
                  alt="loading gif"
                  width="100%"
                />
              </div>
            ) : (
              <div
                className="bg-black skeleton"
                style={{ display: loading ? "block" : "none" }}
              >
                <Image
                  src={loadingGif}
                  quality={10}
                  alt="loading gif"
                  width="100%"
                />
              </div>
            )}

            {!showComponent && (
              <Image
                loader={contentfulImageLoader}
                onLoad={onImageLoad}
                priority={true}
                style={{ display: loading ? "none" : "block" }}
                src={props.portfolioData.fields.images[imgNo].fields.file.url}
                width={
                  props.portfolioData.fields.images[imgNo].fields.file.details
                    .image.width
                }
                height={
                  props.portfolioData.fields.images[imgNo].fields.file.details
                    .image.height
                }
                alt="Image Modal"
                quality={60}
              />
            )}

            <div className="text-white flex justify-center items-center gap-2 text-lg bg-black py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`${
                  imgNo == 0
                    ? "cursor-auto text-secondary opacity-50"
                    : "cursor-pointer"
                }  w-5 h-5`}
                onClick={() => {
                  decrementNo();
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>

              <span>
                {imgNo + 1} of {props.portfolioData.fields.images.length}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`${
                  imgNo == props.portfolioData.fields.images.length - 1
                    ? "cursor-auto text-secondary opacity-50"
                    : "cursor-pointer"
                }  w-5 h-5`}
                onClick={() => {
                  incrementNo();
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-5 flex-wrap ">
              {props.portfolioData.fields.category.map((cat) => (
                <Link key={cat} href={`/portfolio?selectedCat=${cat}`}>
                  <button
                    className="btn-rounded"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    {cat}
                  </button>
                </Link>
              ))}
            </div>
            <div className="project flex flex-col gap-5 mt-5">
              <h1 className="text-white font-clashMedium text-2xl">
                {props.portfolioData.fields.title}
              </h1>
              <hr />
              <div className="text-secondary">
                {documentToReactComponents(
                  props.portfolioData.fields.description
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ProjectModalBox;
