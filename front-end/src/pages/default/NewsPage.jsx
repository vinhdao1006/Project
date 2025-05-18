import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import new_img_1 from "../../assets/image/news_img_1.png";
import new_img_2 from "../../assets/image/news_img_2.png";
import new_img_3 from "../../assets/image/news_img_3.png";
import new_img_4 from "../../assets/image/news_img_4.png";
import Footer from "../../components/Footer/BimecFooter";
import Contact from "../../components/utils/Contact";
import { useNavigate } from "react-router-dom";
import FloatButtonGroup from "../../components/utils/FloatButtonGroup";
import {
  CalendarIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

const NewsPage = () => {
  const navigate = useNavigate();

  const handleReadMore = (post) => {
    navigate(`/default/news/${post.title}`, { state: { post, posts } }); // Pass the current post and all posts
  };

  const posts = [
    {
      title: "A passion to putting patients first",
      date: "Monday 05, September 2021",
      author: "Dr. John Doe",
      views: "120",
      likes: "50",
      image: new_img_1,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.",
    },
    {
      title: "Doctors lead with empathy and care",
      date: "Monday 05, September 2021",
      author: "Dr. John Doe",
      views: "120",
      likes: "60",
      image: new_img_2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.",
    },
    {
      title: "Our mission to revolutionize health",
      date: "Monday 05, September 2021",
      author: "Dr. John Doe",
      views: "120",
      likes: "70",
      image: new_img_3,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.",
    },
    {
      title: "Take care of your health",
      date: "Monday 05, September 2021",
      author: "Dr. John Doe",
      views: "120",
      likes: "80",
      image: new_img_4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-light text-bimec-heavy-green">
            News & Articles
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Stay updated with the latest healthcare news
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Posts */}
          <div className="lg:col-span-2 space-y-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4 text-bimec-green" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4 text-bimec-green" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <ChatBubbleLeftRightIcon className="w-4 h-4 text-bimec-green" />
                      {post.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <HeartIcon className="w-4 h-4 text-bimec-red" />
                      {post.likes}
                    </span>
                  </div>

                  {/* Title and Content */}
                  <h2 className="text-xl font-medium text-bimec-heavy-green mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {post.description}
                  </p>

                  {/* Read More Button */}
                  <button
                    className="inline-flex items-center gap-2 px-4 py-2 bg-bimec-green text-white rounded-lg hover:bg-bimec-heavy-green transition-colors"
                    onClick={() => handleReadMore(post)}
                  >
                    Read More
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}

            {/* Pagination */}
            <div className="flex justify-between items-center pt-8">
              <button className="flex items-center gap-2 text-gray-600 hover:text-bimec-green transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg bg-bimec-green text-white">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors">
                  3
                </button>
              </div>
              <button className="flex items-center gap-2 text-gray-600 hover:text-bimec-green transition-colors">
                Next
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-bimec-heavy-green mb-4">
                Search Articles
              </h3>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bimec-green focus:border-transparent"
                  placeholder="Search..."
                />
                <button className="absolute right-2 top-2 p-2 bg-bimec-green text-white rounded-md hover:bg-bimec-heavy-green transition-colors">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-bimec-heavy-green mb-4 pb-2 border-b border-gray-200">
                Recent Posts
              </h3>
              <ul className="space-y-3">
                {posts.map((recentPost, index) => (
                  <li key={index} className="group">
                    <button
                      onClick={() =>
                        navigate(`/default/news/${recentPost.title}`, {
                          state: { post: recentPost, posts },
                        })
                      }
                      className="text-sm text-gray-700 hover:text-bimec-green transition-colors flex items-start gap-2"
                    >
                      <ClockIcon className="w-4 h-4 text-gray-400 group-hover:text-bimec-green transition-colors mt-0.5 flex-shrink-0" />
                      <span className="text-left">{recentPost.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-bimec-heavy-green mb-4 pb-2 border-b border-gray-200">
                Categories
              </h3>
              <ul className="space-y-3">
                {["Surgery", "Health Care", "Medical", "Professional"].map(
                  (category, index) => (
                    <li key={index} className="group">
                      <Link
                        to="#"
                        className="text-sm text-gray-700 hover:text-bimec-green transition-colors flex items-center gap-2"
                      >
                        <TagIcon className="w-4 h-4 text-gray-400 group-hover:text-bimec-green transition-colors" />
                        {category}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-bimec-light-green rounded-xl p-6">
              <h3 className="text-lg font-medium text-bimec-heavy-green mb-2">
                Subscribe to Newsletter
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest health news delivered to your inbox
              </p>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-bimec-green focus:border-transparent"
                placeholder="Your email"
              />
              <button className="w-full px-4 py-2 bg-bimec-heavy-green text-white rounded-lg hover:bg-bimec-green transition-colors">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Contact Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Contact />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Button Group */}
      <FloatButtonGroup />
    </div>
  );
};

export default NewsPage;
