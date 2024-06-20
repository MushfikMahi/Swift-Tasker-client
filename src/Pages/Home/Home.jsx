import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import Future from "./Future/Future";
import HowItWorks from "./HowItWorks/HowItWorks";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>SwiftTasker | Home</title>
      </Helmet>
      <Banner></Banner>
      <Future></Future>
      <HowItWorks></HowItWorks>
      <h1>hello from home</h1>
    </div>
  );
};

export default Home;
