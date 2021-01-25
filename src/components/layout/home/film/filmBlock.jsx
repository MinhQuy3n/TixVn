import React, { memo, useCallback, useEffect, useState } from "react";
import { Tabs, Row, Col } from "antd";
import FilmCard from "./FilmCard";
import { getListFilm } from "../../../../redux/action/filmAction";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const FilmBlock = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [urlFilm, setUrlFilm] = useState();

  useEffect(() => {
    getListFilm(dispatch);
  }, [dispatch]);
  const handleOpen = useCallback(
    (url) => {

      setIsOpen(!isOpen);
      setUrlFilm(url);
    },
    [isOpen]
  );
  const listFilm = useSelector((state) => state.Film.listFilm);
  const renderFilmList = useCallback(() => {
    return listFilm.slice(12, 20).map((film, index) => {
      return (
        <Col key={index} span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
          <FilmCard handleOpen={handleOpen} film={film} />
        </Col>
      );
    });
  }, [listFilm]);

  return (
    <>
      <Tabs className="filmBlock" defaultActiveKey="1" centered>
        <TabPane tab="Đang Chiếu" key="1">
          <Row gutter={[16, 24]}>{renderFilmList()}</Row>
        </TabPane>
        <TabPane tab="Sắp Chiếu" key="2">
          <Row gutter={[16, 24]}>{renderFilmList()}</Row>
        </TabPane>
      </Tabs>
      {isOpen ? (
        <div className="trailer">
          <div className="trailer__video">
            <iframe
              width="966"
              height="543"
              src={urlFilm}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <CloseOutlined className="closeBtn" onClick={handleOpen} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default memo(FilmBlock);
