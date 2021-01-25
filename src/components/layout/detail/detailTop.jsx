import React from "react";
import { Row, Col, Progress, Rate } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { iconURL } from "../../../asset/iconfont";
import { useSelector } from "react-redux";
const DetailTop = () => {
  const IconFont = createFromIconfontCN({
    scriptUrl: iconURL,
  });
  const detailFilm = useSelector((state) => state.Film.detailFilm);

  const openVideo = () => {
    // const video = document.getElementById("video");
    // const btnPlay = document.getElementById("btnPlay");
    // btnPlay.style.display = "none";
    // video.style.display = "block";
  };

  return (
    <div className="detailTop">
      <div className="img_background">
        <img
          className="posterLandscapeFilm"
          src="https://picsum.photos/id/237/200/300"
          alt=""
        />
      </div>
      <div className="detailmain__info mainMaxWidth">
        <Row>
          <Col xs={6} sm={6}>
            <div className="film__poster__top">
              <img src={detailFilm.hinhAnh} alt="img" />
            </div>
          </Col>
          <Col className="film__poster__detail" sm={12}>
            <div>
              <span>14.02.2022</span>
              <p>
                <span>16</span>
                {detailFilm.tenPhim}
              </p>
              <p>91 phút - 0 IMDb - 2D/Digital</p>
              <a href="#showTime" className="buySticker">
                Mua vé
              </a>
            </div>
          </Col>
          <Col className="circleStar" sm={6}>
            <Progress
              type="circle"
              percent={(detailFilm.danhGia / 10) * 100}
              format={() => `${detailFilm.danhGia}`}
              width={150}
              strokeColor="red"
            />
            {detailFilm.danhGia ? (
              <Rate disabled allowHalf defaultValue={detailFilm.danhGia} />
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </div>
      {/* <div id="video" className="video__trailer">
    <iframe
      width={721}
      height={300}
      src="https://www.youtube.com/embed/gknlpnjWJ-M"
      frameBorder={0}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="trailer"
    />
  </div> */}
      <span className="btn__play" id="btnPlay" onClick={openVideo}>
        <span className="btn-play">
          <IconFont style={{ fontSize: "60px" }} type="icon-play" />
        </span>
      </span>
      <div className="overlay" />
    </div>
  );
};
export default DetailTop;
