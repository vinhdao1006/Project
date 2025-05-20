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
      date: "May 20, 2025",
      author: "Dr. Emily Carter",
      views: "200",
      likes: "90",
      image: new_img_1,
      description:
        "Patient-centered care models prioritize empathy and empowerment, driving better health outcomes.",
      content:
        "As healthcare systems navigate rising costs and administrative challenges, patient-centered care is emerging as a cornerstone of reform. Dr. Emily Carter, a senior consultant at Metro Health Institute, advocates for empowering patients through active involvement in treatment decisions. Her clinic’s 2024 initiative, which incorporates patient feedback into care plans, reduced readmissions by 20%. Technologies like AI diagnostics and telehealth are improving access, particularly in underserved regions. However, a 2025 *Journal of Medicine* study highlights that 70% of patients prioritize empathetic interactions, warning against overreliance on technology. While implementing these models requires cultural and financial investment, the data is clear: patient-first approaches enhance trust and recovery rates, potentially redefining healthcare delivery.",
    },
    {
      title: "Doctors lead with empathy and care",
      date: "May 20, 2025",
      author: "Dr. Michael Nguyen",
      views: "180",
      likes: "85",
      image: new_img_2,
      description:
        "Physicians are integrating empathy into practice to improve patient trust and treatment adherence.",
      content:
        "Empathy in medical practice is proving to be more than a soft skill—it’s a critical driver of health outcomes. Dr. Michael Nguyen, a cardiologist at Urban Medical Center, has trained his team to prioritize emotional intelligence in patient interactions. A 2024 trial showed that patients receiving empathetic care were 30% more likely to adhere to medication regimens. Techniques like active listening and personalized communication are central to this approach. Critics note that time constraints in busy clinics can hinder such practices, with 40% of physicians reporting insufficient consultation time in a 2025 *Health Policy Review*. Still, hospitals adopting empathy-focused training report higher patient satisfaction scores, suggesting that fostering emotional connections is a viable path to better care.",
    },
    {
      title: "Our mission to revolutionize health",
      date: "May 20, 2025",
      author: "Dr. Laura Bennett",
      views: "170",
      likes: "80",
      image: new_img_3,
      description:
        "Innovative healthcare initiatives aim to transform delivery through technology and collaboration.",
      content:
        "The healthcare sector is undergoing a transformation driven by innovation and interdisciplinary collaboration. Dr. Laura Bennett, director of Horizon Health Network, leads a program integrating AI-driven diagnostics with community-based care models. In 2024, her initiative reduced diagnostic errors by 15% in pilot regions. Partnerships between tech firms, hospitals, and local governments are key, enabling real-time data sharing and preventive care strategies. However, a 2025 *Global Health Journal* analysis warns that equitable access remains a challenge, with 25% of low-income patients unable to access digital health tools. Scaling these innovations requires addressing disparities and regulatory hurdles, but early results suggest a potential revolution in how health services are delivered.",
    },
    {
      title: "Take care of your health",
      date: "May 20, 2025",
      author: "Dr. Priya Sharma",
      views: "160",
      likes: "75",
      image: new_img_4,
      description:
        "Preventive care and patient education are key to promoting long-term health and wellness.",
      content:
        "Preventive care is gaining recognition as a cornerstone of sustainable healthcare. Dr. Priya Sharma, a public health expert at City Wellness Clinic, emphasizes patient education to encourage proactive health management. Her 2024 campaign, offering free screenings and workshops, increased early detection of chronic conditions by 22% in urban communities. Tools like wearable health monitors and mobile apps are empowering individuals to track their wellness. Yet, a 2025 *Public Health Review* study notes that misinformation online can undermine these efforts, with 30% of patients citing conflicting advice. Effective preventive care demands clear communication and accessible resources, but its impact on reducing healthcare costs and improving quality of life is undeniable.",
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
      {/* <FloatButtonGroup /> */}
    </div>
  );
};

export default NewsPage;
