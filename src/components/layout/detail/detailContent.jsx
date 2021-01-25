import { Tabs } from "antd";
import React from "react";
import Evaluate from "./Content/evaluate";

import Information from "./Content/infomation";

import ShowTimes from "./Content/showTimes";
// import Evaluate from "./Content/evaluate";

const { TabPane } = Tabs;

const DetailContent = () => {
  return (
    <>
      <Tabs
        className="filmBlock max-width detailContent"
        id="detailContent"
        defaultActiveKey="1"
        centered
      >
        <TabPane tab="Lịch Chiếu" key="1">
          <ShowTimes />
        </TabPane>
        <TabPane tab="Thông Tin" key="2">
          <Information />
        </TabPane>
        <TabPane tab="Đánh Giá" key="3">
          {/* <button onClick={update}> Lô </button> */}

          <Evaluate />
        </TabPane>
      </Tabs>
    </>
  );
};
export default DetailContent;
