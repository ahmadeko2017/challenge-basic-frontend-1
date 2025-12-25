import illustrationArticle from '../assets/illustration-article.svg';
import imageAvatar from '../assets/image-avatar.webp';

const BlogCard = () => {
    return (
        <article className="w-[327px] md:w-[384px] bg-white border border-grey-950 rounded-[20px] p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 md:cursor-pointer group">
            <img
                src={illustrationArticle}
                alt="Article illustration"
                className="w-full h-[200px] object-cover rounded-[10px] mb-6"
            />

            <div className="flex flex-col items-start gap-3 mb-6">
                <span className="bg-yellow px-3 py-1 rounded-[4px] text-xs font-extrabold text-grey-950">
                    Learning
                </span>

                <p className="text-sm font-medium text-grey-950">
                    Published 21 Dec 2023
                </p>

                <h1 className="text-xl md:text-2xl font-extrabold text-grey-950 group-hover:text-yellow transition-colors duration-300 cursor-pointer">
                    HTML & CSS foundations
                </h1>

                <p className="text-grey-500 text-sm md:text-base leading-relaxed">
                    These languages are the backbone of every website, defining structure, content, and presentation.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <img
                    src={imageAvatar}
                    alt="Greg Hooper"
                    className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-extrabold text-grey-950">
                    Greg Hooper
                </span>
            </div>
        </article>
    );
};

export default BlogCard;
