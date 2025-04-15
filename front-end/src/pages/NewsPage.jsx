import react from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar';
import BimecLogo from '../components/BimecLogo';
import new_img_1 from '../assets/image/news_img_1.png'
import new_img_2 from '../assets/image/news_img_2.png'   
import new_img_3 from '../assets/image/news_img_3.png'
import new_img_4 from '../assets/image/news_img_4.png'

const NewsPage = () => {
    const posts = [
        {
            title: "A passion to putting patients first",
            date: "Monday 05, September 2021",
            author: "Dr. John Doe",
            views: "120",
            likes: "50",
            image: new_img_1,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        },
        {
            title: "A passion to putting patients first",
            date: "Monday 05, September 2021",
            author: "Dr. John Doe",
            views: "120",
            likes: "50",
            image:new_img_2,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        },
        {
            title: "A passion to putting patients first",
            date: "Monday 05, September 2021",
            author: "Dr. John Doe",
            views: "120",
            likes: "50",
            image: new_img_3,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        },
        {
            title: "A passion to putting patients first",
            date: "Monday 05, September 2021",
            author: "Dr. John Doe",
            views: "120",
            likes: "50",
            image: new_img_4,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        },
    ]

    return (
        <div className="overflow-x-hidden overflow-y-auto">

          <BimecLogo />

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
                  <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Read More</button>
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
                  <li><Link to="#" className="text-gray-700 hover:text-green-700">A passion for putting patients first</Link></li>
                  <li><Link to="#" className="text-gray-700 hover:text-green-700">Doctors lead with empathy and care</Link></li>
                  <li><Link to="#" className="text-gray-700 hover:text-green-700">Our mission to revolutionize health</Link></li>
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
    
          {/* Contact Info Section */}
          <section className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-sm">
              <div>
                <h4 className="font-bold mb-2">EMERGENCY</h4>
                <p>+021-345-67890</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">LOCATION</h4>
                <p>123 Demo Street, Country</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">EMAIL</h4>
                <p>bimec@hospital.com</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">WORKING HOURS</h4>
                <p>Sunday to Thursday</p>
              </div>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="bg-green-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h5 className="font-bold mb-2">BIMEC</h5>
                <p>Leading the way in medical excellence.</p>
              </div>
              <div>
                <h5 className="font-bold mb-2">Contact</h5>
                <p>Call: +021-456-789</p>
                <p>Email: info@bimec.com</p>
              </div>
              <div>
                <h5 className="font-bold mb-2">Newsletter</h5>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded text-black"
                />
              </div>
            </div>
            <div className="text-center text-sm mt-6">© 2025 BIMEC. All rights reserved.</div>
          </footer>
        </div>
      );
}

export default NewsPage