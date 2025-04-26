import React, { useState } from "react";

const Aboutus = () => {
  const [videoSrc, setVideoSrc] = useState("");

  const handlePlayClick = () => {
    setVideoSrc("https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1");
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-22 lg:py-26 xl:py-25">
      <div
        className="absolute inset-0 -z-10 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/lightblueoffice.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      </div>

      <div className="relative z-10 flex flex-col justify-center h-full">
        <div className="px-4 flex justify-center mb-6 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white">
            About Us
          </h2>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white">
          <div className="space-y-6">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose font-medium break-words text-center md:text-left">
              We are a team of compliance experts dedicated to simplifying your
              business’s regulatory journey. With years of experience, we
              provide tailored solutions that align with your business goals.
            </p>
          </div>

          <div
            className="relative flex justify-center items-center bg-cover bg-center 
    w-[250px] h-[150px] sm:w-[300px] sm:h-[180px] md:w-[400px] md:h-[250px] lg:w-[500px] lg:h-[300px] 
    rounded-xl overflow-hidden cursor-pointer shadow-lg mx-auto"
            style={{
              backgroundImage: videoSrc
                ? "none"
                : 'url("/lightblueoffice.jpg")',
            }}
            onClick={handlePlayClick}
          >
            {!videoSrc && (
              <div className="absolute flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg text-black hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}

            {videoSrc && (
              <iframe
                width="100%"
                height="100%"
                src={videoSrc}
                title="About Us Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
