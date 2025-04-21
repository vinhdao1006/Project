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
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-green-700 rounded-full opacity-70 hover:opacity-100 transition"></div>
    ),
  };

  return (
    <div className="py-10 ">
      <h2 className="text-center text-xl font-semibold text-bimec-green uppercase mb-2">
        Better Information, Better Health
      </h2>
      <h3 className="text-center text-4xl font-bold text-bimec-heavy-green font-yeseva mb-8">
        News
      </h3>
      <Slider {...settings}>
        {articles.map((article) => (
          <div key={article.id} className="p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                  {article.date} | {article.author}
                </p>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  {article.title}
                </h4>
                <div className="flex items-center space-x-4 text-gray-500">
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-eye"></i>
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-heart text-red-500"></i>
                    <span>{article.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSlider;
