const Footer = () => {
  return (
    <div className="flex items-center justify-center mt-6 py-6 bg-purple-300 text-black rounded-lg">
      <div className="text-center">
        <blockquote className="italic text-white border-l-4 bg-gray-800 px-2 py-2 border-[#00D4FF] pl-4">
          This website is made for the cutest, hard-working, soon-to-be doctor!
        </blockquote>
        <p className="text- mt-5">
          Website developed by <span className="font-bold">BBKK</span>
        </p>
        <p className="text-xs mt-2">
          &copy; {new Date().getFullYear()} BBKK. All rights reserved.
        </p>
        <p className="text-xs mt-1">Made with ❤️ And React + AI.</p>
      </div>
    </div>
  );
};

export default Footer;
