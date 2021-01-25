import {
  Input,
  Form,
  Modal,
  DatePicker,
  Upload,
  message,
  InputNumber,
} from "antd";
import React, { memo, useState } from "react";
import moment from "moment";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  createFilmByAdmin,
  updateFilmByAdmin,
} from "../../../../redux/action/adminAction";
import { useDispatch } from "react-redux";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Modals = ({ setIsModalVisible, filmUpdating, ...props }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    filmUpdating === true && filmUpdating.hinhAnh
  );
  const dateFormat = "DD/MM/YYYY";
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const normFile = (e) => {

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      ngayKhoiChieu: fieldsValue["ngayKhoiChieu"].format("DD-MM-YYYY"),
    };
    if (filmUpdating === undefined) {

      createFilmByAdmin(dispatch, values);
    } else {
      updateFilmByAdmin(dispatch, values, filmUpdating.hinhAnh);
    }

    setTimeout(() => {
      setIsModalVisible(false);
    }, 1500);
  };

  const handleChange = (info) => {
    setLoading(true);
    getBase64(info.file.originFileObj, (imageUrl) => {
      return setLoading(false), setImageUrl(imageUrl);
    });
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Modal
        // title={`${
        //   userUpdating === undefined ? "Thêm Người Dùng" : "Cập Nhật Người Dùng"
        // }`}
        title={filmUpdating === undefined ? "Thêm Phim" : "Cập Nhật Phim"}
        visible="true"
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        width={1000}
      >
        <div>
          {filmUpdating === undefined ? (
            <Form
              className="grid grid-rows-4 grid-cols-4 grid-flow-col grid-flow-row gap-4"
              name="normal_login"
              // layout={`${screen < 783 ? "vertical" : "horizontal"}`}
              layout="horizontal"
              onFinish={onFinish}
            >
              <Form.Item
                className="row-span-1 col-span-2"
                label="Mã phim"
                name="maPhim"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã phim!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  className="focus:outline-none"
                  placeholder="Mã phim"
                />
              </Form.Item>
              <Form.Item
                className="row-span-1 col-span-2 col-end-5"
                label="Tên phim"
                name="tenPhim"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên phim!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  className="focus:outline-none"
                  placeholder="Tên phim"
                />
              </Form.Item>
              <Form.Item
                className="row-span-1 col-span-2 "
                label="Bí danh"
                name="biDanh"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập bí danh phim!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  className="focus:outline-none"
                  placeholder="Bí danh"
                />
              </Form.Item>
              <Form.Item
                className="row-span-1 col-span-2 col-end-5"
                label="Trailer"
                name="trailer"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng thêm trailer!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  className="focus:outline-none"
                  placeholder="Trailer"
                />
              </Form.Item>

              <Form.Item
                className="row-span-2 col-span-2 "
                name={["hinhAnh", "upload"]}
                label="Hình ảnh"
                getValueFromEvent={normFile}
                valuePropName="fileList"
                style={{ display: "flex", alignItems: "center" }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hình!",
                  },
                ]}
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://run.mocky.io/v3/c53557bb-39b7-446c-95a4-b6ad8b865c92"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng thêm phim!",
                      whitespace: true,
                    },
                  ]}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%", height: 100 }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>

              <Form.Item
                className="col-span-2 col-end-5"
                label="Ngày khởi chiếu"
                name="ngayKhoiChieu"
                rules={[
                  {
                    type: "object",
                    required: true,
                    message: "Vui lòng chọn ngày!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format={dateFormat} />
              </Form.Item>
              <Form.Item
                className="col-span-2 col-end-5"
                label="Đánh giá"
                name="danhGia"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 10,
                    message: "Vui lòng nhập từ 0-10",
                  },
                  { required: true, message: "Vui lòng nhập đánh giá phim!" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                className="col-start-1 col-end-7"
                label="Mô tả"
                name="moTa"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả phim!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  className="focus:outline-none"
                  placeholder="Mô tả"
                />
              </Form.Item>
              <Form.Item className="col-start-1 col-end-7 text-center">
                <button
                  className="bg-white text-lg	text-red-600 text-base font-semibold px-20 py-3 rounded-lg transition-all hover:text-red-400 focus:outline-none"
                  type="submit"
                >
                  Thêm Phim
                </button>
              </Form.Item>
            </Form>
          ) : (
            <Form
              className="grid grid-rows-4 grid-cols-4 grid-flow-col grid-flow-row gap-4"
              name="normal_login"
              // layout={`${screen < 783 ? "vertical" : "horizontal"}`}
              layout="horizontal"
              onFinish={onFinish}
              initialValues={
                //   userUpdating === undefined
                //     ? {}
                {
                  maPhim: filmUpdating.maPhim.props.children,
                  tenPhim: filmUpdating.tenPhim.props.children,
                  biDanh: filmUpdating.biDanh.props.children,
                  trailer: filmUpdating.trailer.props.children,
                  danhGia: filmUpdating.danhGia.props.children,
                  ngayKhoiChieu: moment(
                    `${filmUpdating.ngayKhoiChieu.props.children}`
                  ),
                  hinhAnh: filmUpdating.hinhAnh,
                  moTa: filmUpdating.moTa.props.children,
                }
              }
            >
              <Form.Item
                className="row-span-1 col-span-2"
                label="Mã phim"
                name="maPhim"
                style={{ background: "#F5F5F5" }}
              >
                <Input
                  size="large"
                  className="focus:outline-none"
                  placeholder="Mã phim"
                  disabled
                />
              </Form.Item>
              <Form.Item
                className="row-span-1 col-span-2 col-end-5"
                label="Tên phim"
                name="tenPhim"
              >
                <Input
                  size="large"
                  className="focus:outline-none"
                  placeholder="Tên phim"
                />
              </Form.Item>
              <Form.Item
                className="row-span-1 col-span-2 "
                label="Bí danh"
                name="biDanh"
              >
                <Input
                  size="large"
                  className="focus:outline-none"
                  placeholder="Bí danh"
                />
              </Form.Item>
              <Form.Item
                className="row-span-1 col-span-2 col-end-5"
                label="Trailer"
                name="trailer"
              >
                <Input
                  size="large"
                  className="focus:outline-none"
                  placeholder="Trailer"
                />
              </Form.Item>

              <Form.Item
                className="row-span-2 col-span-2 "
                name={["hinhAnh", "upload"]}
                label="Hình ảnh"
                getValueFromEvent={normFile}
                valuePropName="fileList"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://run.mocky.io/v3/c53557bb-39b7-446c-95a4-b6ad8b865c92"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {/* <img
                        src={filmUpdating.hinhAnh}
                        alt="avatar"
                        style={{ width: "100%", height: 100 }}
                      /> */}
                  {filmUpdating.hinhAnh ? (
                    <>
                      <img
                        src={filmUpdating.hinhAnh}
                        alt="avatar"
                        style={{ width: "100%", height: 100 }}
                      />
                    </>
                  ) : (
                    <>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%", height: 100 }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </>
                  )}
                </Upload>
                {/* <Input
                size="large"
                className="focus:outline-none"
                placeholder="HinhAnh"
              /> */}
              </Form.Item>

              <Form.Item
                className="col-span-2 col-end-5"
                label="Ngày khởi chiếu"
                name="ngayKhoiChieu"
              >
                <DatePicker style={{ width: "100%" }} format={dateFormat} />
              </Form.Item>
              <Form.Item
                className="col-span-2 col-end-5"
                label="Đánh giá"
                name="danhGia"
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                className="col-start-1 col-end-7"
                label="Mô tả"
                name="moTa"
              >
                <Input
                  size="large"
                  className="focus:outline-none"
                  placeholder="Mô tả"
                />
              </Form.Item>
              <Form.Item className="col-start-1 col-end-7 text-center">
                <button
                  className="bg-white text-lg	text-red-600 text-base font-semibold px-20 py-3 rounded-lg transition-all hover:text-red-400 focus:outline-none"
                  type="submit"
                >
                  Cập Nhật
                </button>
              </Form.Item>
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
};
export default memo(Modals);
