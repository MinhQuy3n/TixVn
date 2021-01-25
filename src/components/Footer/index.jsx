import { Col, Row } from "antd";
import React, { memo } from "react";

import { createFromIconfontCN } from "@ant-design/icons";
import { iconURL } from "../../asset/iconfont";

const Footer = () => {
  const IconFont = createFromIconfontCN({
    scriptUrl: iconURL,
  });

  return (
    <div className="footer">
      <div>
        <Row gutter={[10, 16]}>
          <Col span={8} xs={24} sm={24} md={10} lg={8} xl={8}>
            <p> TIX </p>
            <ul>
              <li>
                <Row gutter={[1, 16]}>
                  <Col span={12} xs={12} sm={8} md={11}>
                    <ul>
                      <li>
                        <a href="12">FAQ</a>
                      </li>
                      <li>
                        <a href="ss">Brand Guidelines</a>
                      </li>
                    </ul>
                  </Col>
                  <Col span={12} xs={12} sm={8} md={13}>
                    <ul>
                      <li>
                        <a href="z">Thỏa thuận sử dụng</a>
                      </li>
                      <li>
                        <a href="zs">Chính sách bảo mật </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </li>
            </ul>
          </Col>

          <Col className="social" span={5} xs={12} sm={8} md={7} lg={5} xl={5}>
            <p>SOCIAL</p>
            <a href="as">
              <IconFont className="icon" type="icon-icon-facebook" />
            </a>
            <a href="as">
              <IconFont className="icon" type="icon-zalo" />
            </a>
          </Col>
          <Col span={5} className="app" xs={12} sm={8} md={7} lg={5} xl={5}>
            <div>
              <p>MOBILE APP</p>

              <a href="as">
                <IconFont className="icon" type="icon-android" />
              </a>

              <a href="as">
                <IconFont className="icon" type="icon-ios" />
              </a>
            </div>
          </Col>

          <Col span={6} xs={12} sm={12} md={8} lg={6} xl={6}>
            <p> CONTACT </p>
            <ul>
              <li>
                <a href="tel:+84938947843">+84 938947843</a>{" "}
              </li>
              <li>
                <a href="mailto:webmquyennn@gmail.com"> mquyennn@gmail.com</a>
              </li>
              <li>
                <a href="https://facebook.com/kylary.vu">
                  <IconFont type="icon-facebooks" />
                </a>
                <a href="https://www.instagram.com/manh_quen/">
                  <IconFont type="icon-instagram" />
                </a>
                <a href="zz">
                  <IconFont type="icon-twitter" />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <div className="footer_copyright">
        <p>
          © 2020 FlixGo. Create by <span> Minh Quyền </span>
        </p>
      </div>
    </div>
  );
};
export default memo(Footer);
