import janelImage from "../img/Janella_Logo.jpg";

const Header = () => {
  return (
    <div className="flex items-center justify-center py-5">
      <img
        src={janelImage}
        alt="Header Image"
        className="h-[400px] w-[400px] rounded-lg border-4 border-white shadow-md border-4 border-black outline outline-2 outline-black drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]"
      />
    </div>
  );
};

export default Header;
