import React from "react";
import Slider from "react-slick";
import img_article from "../../assets/image/newSliderDoctor.png";

const articles = [
  {
    id: 1,
    date: "Monday 05, September 2021",
    author: "By Author",
    title: "This Article's Title goes Here, but not too long.",
    views: 68,
    likes: 86,
    image: img_article,
  },
  {
    id: 2,
    date: "Monday 05, September 2021",
    author: "By Author",
    title: "This Article's Title goes Here, but not too long.",
    views: 68,
    likes: 86,
    image: img_article,
  },
  {
    id: 3,
    date: "Monday 05, September 2021",
    author: "By Author",
    title: "This Article's Title goes Here, but not too long.",
    views: 68,
    likes: 86,
    image: img_article,
  },
  {
    id: 4,
    date: "Monday 05, September 2021",
    author: "By Author",
    title: "This Article's Title goes Here, but not too long.",
    views: 68,
    likes: 86,
    image: img_article,
  },
];

const NewsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet and smaller
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center space-x-2 mt-8">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 bg-gray-300 rounded-full transition-all duration-300 cursor-pointer hover:bg-bimec-green slick-active:bg-bimec-green slick-active:w-8"></div>
    ),
  };

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-bimec-green font-medium mb-2">
            Better Information, Better Health
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-bimec-heavy-green">
            News & Articles
          </h2>
          <div className="w-16 h-0.5 bg-bimec-green mx-auto mt-4"></div>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {articles.map((article) => (
            <div key={article.id} className="px-3">
              <article className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                {/* Article Image */}
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Article Info */}
                <div className="p-6">
                  {/* Date and Author */}
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <time className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {article.date}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{article.author}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-bimec-heavy-green mb-4 line-clamp-2 hover:text-bimec-green transition-colors duration-200">
                    <a href="#">{article.title}</a>
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-bimec-red" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                      <span>{article.likes}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </Slider>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a 
            href="/news" 
            className="inline-flex items-center text-sm font-medium text-bimec-green hover:text-bimec-heavy-green transition-colors duration-200"
          >
            View All Articles
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsSlider;