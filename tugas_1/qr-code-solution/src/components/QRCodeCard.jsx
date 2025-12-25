import qrCodeImage from '../assets/image-qr-code.png';

const QRCodeCard = () => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl max-w-[320px] w-full text-center">
            <img
                src={qrCodeImage}
                alt="QR Code to frontend mentor"
                className="w-full h-auto rounded-xl mb-6"
            />
            <div className="px-4 pb-6">
                <h1 className="text-slate-900 font-bold text-[22px] leading-tight mb-4">
                    Improve your front-end skills by building projects
                </h1>
                <p className="text-slate-500 text-[15px] leading-normal tracking-wide">
                    Scan the QR code to visit Frontend Mentor and take your coding skills to the next level
                </p>
            </div>
        </div>
    );
};

export default QRCodeCard;
