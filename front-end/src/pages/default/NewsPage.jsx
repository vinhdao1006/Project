import {Link} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';
import new_img_1 from '../../assets/image/news_img_1.png'
import new_img_2 from '../../assets/image/news_img_2.png'   
import new_img_3 from '../../assets/image/news_img_3.png'
import new_img_4 from '../../assets/image/news_img_4.png'
import Footer from '../../components/Footer/BimecFooter'
import Contact from '../../components/utils/Contact'
import { useNavigate } from 'react-router-dom';
import FloatButtonGroup from '../../components/utils/FloatButtonGroup'

const NewsPage = () => {
  const navigate = useNavigate();

  const handleReadMore = (post) => {
    navigate(`/news/${post.title}`, { state: { post, posts } });  // Pass the current post and all posts
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
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et."
        },
        {
            title: "Doctors lead with empathy and care",
            date: "Monday 05, September 2021",
            author: "Dr. John Doe",
            views: "120",
            likes: "60",
            image: new_img_2,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et."
        },
        {
            title: "Our mission to revolutionize health",
            date: "Monday 05, September 2021",
            author: "Dr. John Doe",
            views: "120",
            likes: "70",
            image: new_img_3,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et."
        },
        {
            title: "Take care of your health", 
            date: "Monday 05, September 2021",
            author: "Dr. John Doe",
            views: "120",
            likes: "80",
            image: new_img_4,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et."
        },
    ]

    return (
        <div className="overflow-x-hidden overflow-y-auto">

          <Navbar />
    
          {/* Content */}
          <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* News Posts */}
            <div className="lg:col-span-2 space-y-12">
              {posts.map((post, index) => (
                <article key={index} className="space-y-4">
                  <img src={post.image} alt={post.title} className="w-full rounded-md" />
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>📅{post.date}</span>
                    <span>👨‍⚕️{post.author}</span>
                    <span>💬 {post.views}</span>
                    <span>❤️ {post.likes}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p>{post.description}</p>
                  <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                    onClick={() => handleReadMore(post)}>
                    Read More
                  </button>
                </article>
              ))}
    
              {/* Pagination */}
              <div className="flex justify-between mt-10">
                <button className="text-sm text-gray-600 hover:text-green-700">← Previous</button>
                <button className="text-sm text-gray-600 hover:text-green-700">Next →</button>
              </div>
            </div>
    
            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Search */}
              <div>
                <div className="flex items-center border rounded">
                  <input type="text" className="flex-1 px-3 py-2" placeholder="Search" />
                  <button className="text-white px-3 py-2 border bg-bimec-green">🔍</button>
                </div>
              </div>
    
              {/* Recent Posts */}
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">Recent Posts</h3>
                <ul className="space-y-3 text-sm">
                    {posts.map((recentPost, index) => (
                        <li key={index}>
                            <button
                                onClick={() =>
                                    navigate(`/news/${recentPost.title}`, {
                                        state: { post: recentPost, posts },
                                    })
                                }
                                className="text-gray-700 hover:text-green-700"
                            >
                                {recentPost.title}
                            </button>
                        </li>
                    ))}
                </ul>
              </div>
    
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-3">Categories</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="#" className="text-gray-600 hover:text-green-700">Surgery</Link></li>
                  <li><Link to="#" className="text-gray-600 hover:text-green-700">Health Care</Link></li>
                  <li><Link to="#" className="text-gray-600 hover:text-green-700">Medical</Link></li>
                  <li><Link to="#" className="text-gray-600 hover:text-green-700">Professional</Link></li>
                </ul>
              </div>
            </aside>
          </main>
    
          <div className="mt-[4rem] mx-auto w-full">
                <Contact></Contact>
          </div>

            <div className="mt-[6rem] mx-auto w-full">
                <Footer></Footer>
            </div>

            <FloatButtonGroup></FloatButtonGroup>
        </div>
      );
}

export default NewsPage