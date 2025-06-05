import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import NewsFeedMiddle from "../components/NewsFeedMiddle";

const Home = () => {
  return (
    <div className="Home flex w-full h-screen">

      <div className="hidden xl:block">
        <LeftNav />
      </div>

      <div className="flex-1 flex justify-center">
        <NewsFeedMiddle />
      </div>

      <div className="hidden xl:block">
        <RightNav />
      </div>
    </div>
  );
};

export default Home;
