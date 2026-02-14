import images from "../assets/assets";

function LandingView() {
  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-semibold">Github Profile Visualizer</h1>
      <div className="flex justify-center mt-12">
        <img src={images.home_icon} alt="home_icon" className="h-60 w-80" />
      </div>
    </div>
  );
}

export default LandingView;
