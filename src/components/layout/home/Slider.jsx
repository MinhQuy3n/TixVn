import { Carousel } from "antd";
import React, { memo } from "react";
// import Slider from "react-slick";
import Mv1 from "../../../asset/Images/Movie1.jpg";
import Mv2 from "../../../asset/Images/Movie2.jpg";
import Mv3 from "../../../asset/Images/Movie3.jpg";
import Mv4 from "../../../asset/Images/Movie4.jpg";

const Sliders = () => {
  return (
    <div>
      <Carousel effect="fade">
        <div className="Slider__img">
          <img src={Mv1} alt="mv1" />
        </div>
        <div className="Slider__img">
          <img src={Mv2} alt="mv2" />
        </div>
        <div className="Slider__img">
          <img src={Mv3} alt="mv2" />
        </div>
        <div className="Slider__img">
          <img src={Mv4} alt="mv2" />
        </div>
      </Carousel>
      ,
    </div>
  );
};
export default memo(Sliders);
