import { Col, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import LeftCheckOut from "../../components/layout/CheckOut/leftCheckOut";
import RightCheckOut from "../../components/layout/CheckOut/rightCheckOut";
import { getListTicketRoom } from "../../redux/action/\u001DcinemaAction";

import ImgNofi from "../../asset/Images/Post-notification.png";

const CheckOut = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    getListTicketRoom(dispatch, id);
  }, [dispatch, id]);
  const [isOverlay, setOverlay] = useState(false);
  const handleTime = useCallback(() => {
    setTimeout(() => {
      setOverlay(true);
    }, 300500);
  }, []);

  return (
    <div className="checkOut">
      <Row>
        <Col xs={24} sm={24} md={18} xl={18} lg={18}>
          <LeftCheckOut />
        </Col>
        <Col xs={24} md={6} xl={6} lg={6}>
          <RightCheckOut />
        </Col>
        {handleTime()}
      </Row>

      {isOverlay === true ? (
        <>
          <div className="checkOut__nofi">
            <div className="checkOut__nofi__img">
              <img src={ImgNofi} alt="IMG NOFI" />
            </div>
            <div className="checkOut__nofi__content">
              <p>
                Đã hết thời gian giữ ghế. Vui lòng thực hiện đơn hàng trong thời
                hạn 5 phút.
                <span
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Đặt vé lại
                </span>
              </p>
            </div>
          </div>
          <div className="checkOut__overlay"></div>
        </>
      ) : (
        <></>
      )}
    </div>
  
  );
};
export default CheckOut;
