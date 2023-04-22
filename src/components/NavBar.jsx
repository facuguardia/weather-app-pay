function NavBar() {
  return (
    <div className="flex gap-2 lg:gap-6 md:gap-4 justify-center py-5 pb-10">
    <div>
      <span className="text-white text-5xl font-extrabold text-center md:text-6xl lg:text-8xl">
        Weather
      </span>
    </div>
    <div>
      <span className="text-white text-5xl font-extrabold text-center md:text-6xl lg:text-8xl">
        App
      </span>
    </div>
  </div>
  );
}
export default NavBar;
