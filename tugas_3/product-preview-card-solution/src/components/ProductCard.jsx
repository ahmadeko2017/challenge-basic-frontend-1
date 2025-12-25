import iconCart from '../assets/icon-cart.svg';
import imageProductDesktop from '../assets/image-product-desktop.jpg';
import imageProductMobile from '../assets/image-product-mobile.jpg';

const ProductCard = () => {
    return (
        <article className="bg-white rounded-[10px] overflow-hidden flex flex-col md:flex-row max-w-[343px] md:max-w-[600px] shadow-lg">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
                <picture>
                    <source media="(min-width: 768px)" srcSet={imageProductDesktop} />
                    <img
                        src={imageProductMobile}
                        alt="Gabrielle Essence Eau De Parfum"
                        className="w-full h-full object-cover"
                    />
                </picture>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between">
                <div>
                    <span className="block font-montserrat text-xs tracking-[5px] text-grey uppercase mb-3 md:mb-5">
                        Perfume
                    </span>

                    <h1 className="font-fraunces text-[32px] leading-none text-black mb-4 md:mb-6">
                        Gabrielle Essence Eau De Parfum
                    </h1>

                    <p className="font-montserrat text-sm leading-[23px] text-grey mb-6">
                        A floral, solar and voluptuous interpretation composed by Olivier Polge,
                        Perfumer-Creator for the House of CHANEL.
                    </p>

                    <div className="flex items-center gap-5 mb-5 md:mb-8">
                        <span className="font-fraunces text-3xl text-green-500">
                            $149.99
                        </span>
                        <span className="font-montserrat text-[13px] text-grey line-through">
                            $169.99
                        </span>
                    </div>
                </div>

                <button className="w-full bg-green-500 hover:bg-green-700 text-white font-montserrat font-bold text-sm py-4 rounded-lg flex items-center justify-center gap-3 transition-colors duration-300">
                    <img src={iconCart} alt="" />
                    Add to Cart
                </button>
            </div>
        </article>
    );
};

export default ProductCard;
