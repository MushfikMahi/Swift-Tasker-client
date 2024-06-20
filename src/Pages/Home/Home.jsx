import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>SwiftTasker | Home</title>
      </Helmet>
      <Banner></Banner>
      <h1>hello from home</h1>
    </div>
  );
};

export default Home;
