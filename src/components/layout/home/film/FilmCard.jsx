import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { iconURL } from "../../../../asset/iconfont";
import { useHistory } from "react-router-dom";

const FilmCard = ({ handleOpen, film, ...props }) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: iconURL,
  });
  const history = useHistory();
  const goToDetail = (id) => {
    history.push("/detail/" + id);
  };
  return (
    <>
      <div className="filmblock__item">
        <div
          className="film__img_1"
          style={{ backgroundImage: `url(${film.hinhAnh})` }}
        >
          <div className="overlay" />
          <div className="rate">
            <span>
            {film.danhGia}
              <div className="star">
                <IconFont
                  style={{ fontSize: "10px", display: "inline" }}
                  type="icon-star"
                />
                <IconFont
                  style={{ fontSize: "10px", display: "inline" }}
                  type="icon-star"
                />
                <IconFont
                  style={{ fontSize: "10px", display: "inline" }}
                  type="icon-star"
                />
                <IconFont
                  style={{ fontSize: "10px", display: "inline" }}
                  type="icon-star"
                />
              </div>
            </span>
          </div>
          <span
            className="btn-play"
            onClick={() => {
              handleOpen(film.trailer);
            }}
          >
            <IconFont style={{ fontSize: "60px" }} type="icon-play" />
          </span>
        </div>
        <div className="film__detail">
          <div className="namefilm">
            <span className="btn-red">C18</span>
            {film.tenPhim}
          </div>
          <div className="infofilm">116 phút</div>
        </div>
        <button
          onClick={() => {
            goToDetail(film.maPhim);
          }}
          className="buySticker"
        >
          Mua vé
        </button>
      </div>
    </>
  );
};
export default FilmCard;
