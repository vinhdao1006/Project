import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/BimecFooter";
import Contact from "../../components/utils/Contact";
import FloatButtonGroup from "../../components/utils/FloatButtonGroup";
import {
  CalendarIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  TagIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon
} from "@heroicons/react/24/outline";

const SingleNews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(location.state?.post);
  const [posts, setPosts] = useState(location.state?.posts);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Update the post and posts when the location state changes
    setPost(location.state?.post);
    setPosts(location.state?.posts);
    
    // Trigger fade-in animation
    setIsVisible(true);
    
    // Scroll to top on new post
    window.scrollTo(0, 0);
  }, [location.state]);

  if (!post || !posts) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-bimec-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-medium text-bimec-heavy-green mb-2">Article Not Found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate("/default/news")}
            className="w-full px-4 py-2 bg-bimec-green text-white rounded-lg hover:bg-bimec-heavy-green transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Return to News
          </button>
        </div>
      </div>
    );
  }

  // Find the index of the current post
  const currentIndex = posts.findIndex((p) => p.title === post.title);

  // Navigate to the previous post
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const previousPost = posts[currentIndex - 1];
      navigate(`/default/news/${previousPost.title}`, {
        state: { post: previousPost, posts },
      });
    }
  };

  // Navigate to the next post
  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      const nextPost = posts[currentIndex + 1];
      navigate(`/default/news/${nextPost.title}`, {
        state: { post: nextPost, posts },
      });
    }
  };

  // Function to split content into paragraphs for better readability
  const formatContent = (content) => {
    // Split by periods followed by a space, but keep the period
    const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
    
    // Group sentences into paragraphs (4-5 sentences per paragraph)
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 4) {
      paragraphs.push(sentences.slice(i, i + 4).join(' '));
    }
    
    return paragraphs;
  };

  const paragraphs = formatContent(post.content);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate("/default/news")}
            className="flex items-center gap-2 text-gray-600 hover:text-bimec-green transition-colors mb-4"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to News
          </button>
          <h1 className="text-3xl font-light text-bimec-heavy-green">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transform transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <article className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Featured Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-72 object-cover"
              />
              
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">
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
                    {post.likes} likes
                  </span>
                </div>

                {/* Content - Made more readable with paragraphs and better spacing */}
                <div className="prose max-w-none">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t border-gray-100">
                  <span className="bg-bimec-light-green text-bimec-heavy-green px-3 py-1 rounded-full text-sm flex items-center">
                    <TagIcon className="w-3 h-3 mr-1" />
                    Health
                  </span>
                  <span className="bg-bimec-light-green text-bimec-heavy-green px-3 py-1 rounded-full text-sm flex items-center">
                    <TagIcon className="w-3 h-3 mr-1" />
                    Medical
                  </span>
                  <span className="bg-bimec-light-green text-bimec-heavy-green px-3 py-1 rounded-full text-sm flex items-center">
                    <TagIcon className="w-3 h-3 mr-1" />
                    News
                  </span>
                </div>

                {/* Share Article */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Share this article:</h4>
                  <div className="flex gap-2">
                    <button className="p-2 bg-[#3b5998] text-white rounded-full hover:opacity-90 transition-opacity">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-[#1da1f2] text-white rounded-full hover:opacity-90 transition-opacity">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-[#0077b5] text-white rounded-full hover:opacity-90 transition-opacity">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Pagination */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentIndex === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-white hover:text-bimec-green hover:shadow-sm"
                }`}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Previous Article
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === posts.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentIndex === posts.length - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-white hover:text-bimec-green hover:shadow-sm"
                }`}
              >
                Next Article
                <ArrowRightIcon className="w-4 h-4" />
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                      className={`text-sm hover:text-bimec-green transition-colors flex items-start gap-2 w-full text-left ${
                        recentPost.title === post.title
                          ? "text-bimec-green font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      <ClockIcon className="w-4 h-4 text-gray-400 group-hover:text-bimec-green transition-colors mt-0.5 flex-shrink-0" />
                      <span>{recentPost.title}</span>
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
                      <a
                        href="#"
                        className="text-sm text-gray-700 hover:text-bimec-green transition-colors flex items-center gap-2"
                      >
                        <TagIcon className="w-4 h-4 text-gray-400 group-hover:text-bimec-green transition-colors" />
                        {category}
                      </a>
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

export default SingleNews;