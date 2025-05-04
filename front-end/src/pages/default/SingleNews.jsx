import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/BimecFooter';
import Contact from '../../components/utils/Contact';

const SingleNews = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [post, setPost] = useState(location.state?.post); // Initialize with the current post
    const [posts, setPosts] = useState(location.state?.posts); // Initialize with all posts

    useEffect(() => {
        // Update the post and posts when the location state changes
        setPost(location.state?.post);
        setPosts(location.state?.posts);
    }, [location.state]);

    if (!post || !posts) {
        return <div>Post not found</div>;
    }

    // Find the index of the current post
    const currentIndex = posts.findIndex((p) => p.title === post.title);

    // Navigate to the previous post
    const handlePrevious = () => {
        if (currentIndex > 0) {
            const previousPost = posts[currentIndex - 1];
            navigate(`/news/${previousPost.title}`, { state: { post: previousPost, posts } });
        }
    };

    // Navigate to the next post
    const handleNext = () => {
        if (currentIndex < posts.length - 1) {
            const nextPost = posts[currentIndex + 1];
            navigate(`/news/${nextPost.title}`, { state: { post: nextPost, posts } });
        }
    };

    return (
        <div className="overflow-x-hidden overflow-y-auto">
        
            <Navbar />

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Post Content */}
                <div className="lg:col-span-2 space-y-6">
                    <button
                        onClick={() => navigate('/news')} // Navigate back to news page
                        className="text-sm text-gray-600 hover:text-green-700 mb-4"
                    >
                        ← Back to News
                    </button>
                    <h1 className="text-4xl font-bold">{post.title}</h1>
                    <img src={post.image} alt={post.title} className="w-full rounded-md" />
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>📅 {post.date}</span>
                        <span>👨‍⚕️ {post.author}</span>
                        <span>💬 {post.views}</span>
                        <span>❤️ {post.likes}</span>
                    </div>
                    <p className="text-lg text-gray-700">{post.content}</p>

                    {/* Pagination */}
                    <div className="flex justify-between mt-10">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className={`text-sm ${
                                currentIndex === 0
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-green-700'
                            }`}
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex === posts.length - 1}
                            className={`text-sm ${
                                currentIndex === posts.length - 1
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:text-green-700'
                            }`}
                        >
                            Next →
                        </button>
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
                            <li><a href="#" className="text-gray-600 hover:text-green-700">Surgery</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-green-700">Health Care</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-green-700">Medical</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-green-700">Professional</a></li>
                        </ul>
                    </div>
                </aside>
            </main>

            <div className="mt-[4rem] mx-auto w-full">
                <Contact />
            </div>

            <div className="mt-[6rem] mx-auto w-full">
                <Footer />
            </div>
        </div>
    );
};

export default SingleNews;