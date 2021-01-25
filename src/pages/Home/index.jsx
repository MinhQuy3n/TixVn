import { React } from "react";

import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListCinema } from "../../redux/action/cinemaAction";
import Slider from "../../components/layout/home/Slider";
import HomeTool from "../../components/layout/home/HomeTool";
import FilmBlock from "../../components/layout/home/film/filmBlock";
import CinemaBlock from "../../components/layout/home/cinemaBlock";
import AppBlock from "../../components/layout/home/AppBlock";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getListCinema(dispatch);
  }, [dispatch]);
  useEffect(() => {
    // window.scrollTo(0, 0);
  });

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 579 });
    return isDesktop ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ minWidth: 950 });
    return isMobile ? children : null;
  };
  return (
    <>
      {/* <Header /> */}

      <div className="wrapperTrailer">
        <Desktop>
          <Slider />
        </Desktop>

        <Mobile>
          <HomeTool />
        </Mobile>
      </div>
      <div className="container" id="filmBlock">
        <FilmBlock />
      </div>
      <div className="container" id="cinemaBlock">
        <CinemaBlock />
      </div>
      <AppBlock />
    </>
  );
};
export default Home;
