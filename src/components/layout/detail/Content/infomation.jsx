import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Information = () => {
  const Infomation = useSelector((state) => state.Film.detailFilm);

  return (
    <>
      <Row className="detailMainStyle">
        <Col md={12} xs={24} className="film__left">
          <div className=" film__left__info">
            <p className="contentTitle">Ngày công chiếu</p>
            <p className="contentInfo">
              {`
                ${new Date(Infomation.ngayKhoiChieu).getDate()}/${new Date(
                Infomation.ngayKhoiChieu
              ).getMonth()}/${new Date(
                Infomation.ngayKhoiChieu
              ).getFullYear()}
`}
            </p>
          </div>
          <div className=" film__left__info">
            <p className="contentTitle">Đạo diễn</p>
            <p className="contentInfo">Minh Quyền</p>
          </div>
          <div className=" film__left__info">
            <p className="contentTitle">Diễn Viên</p>
            <p className="contentInfo">MK , MQ </p>
          </div>
          <div className=" film__left__info">
            <p className="contentTitle">Thể Loại</p>
            <p className="contentInfo">Hài hước</p>
          </div>
          <div className=" film__left__info">
            <p className="contentTitle">Định dạng</p>
            <p className="contentInfo">2D.Digital</p>
          </div>
          <div className=" film__left__info">
            <p className="contentTitle">Quốc Gia SX</p>
            <p className="contentInfo">Việt Nam</p>
          </div>
        </Col>
        <Col md={12} xs={24} className="film__right">
          <p>Nội dung</p>
          <div className="film__right__content">
            <p>{Infomation.moTa}</p>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Information;
