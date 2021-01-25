import React, { useCallback, useState } from "react";
import { Input, Table, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Modals from "./userManagement/modal";
import Highlighter from "react-highlight-words";

import { deleteUserByAdmin } from "../../../redux/action/adminAction";
import Swal from "sweetalert2";

const UserManagement = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  // Find USer
  const getColumnSearchProps = useCallback(
    (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",

      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    }),
    [searchText, searchedColumn]
  );
  const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }, []);

  const handleReset = useCallback((clearFilters) => {
    clearFilters();
    setSearchText("");
  }, []);
  // End Find User
  const columns = [
    {
      title: "Tài Khoản",
      width: 100,
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      ...getColumnSearchProps("taiKhoan"),
    },
    {
      title: "Mật khẩu",
      width: 100,
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: 100,
      ...getColumnSearchProps("taiKhoan"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 100,
      ...getColumnSearchProps("taiKhoan"),
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "soDt",
      key: "soDt",
      width: 100,
      ...getColumnSearchProps("taiKhoan"),
    },
    {
      title: "Mã Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      width: 150,
    },
    {
      title: "Hành động",
      key: "operation",
      width: 200,
      render: (text, record) => (
        <div className="UserManagement__action">
          <FormOutlined
            onClick={() => {
              showModal();
              setUserUpdating(record);
            }}
            className="UserManagement__action__icon"
          />
          <DeleteOutlined
            onClick={() => {
              Swal.fire({
                title: "Xóa Người Dùng?",
                text: `Bạn chắc chắn muốn xóa người dùng ${record.taiKhoan} `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK,Xoá!",
                cancelButtonText: "Huỷ!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteUserByAdmin(dispatch, record.taiKhoan);
                }
              });
            }}
            className="UserManagement__action__icon"
          />
        </div>
      ),
    },
  ];

  const userList = useSelector((state) => state.Auth.userList);
  const data = [];

  userList.map((user, index) => {
    return data.push({
      key: index,
      taiKhoan: user.taiKhoan,
      matKhau: user.matKhau,
      hoTen: user.hoTen,
      email: user.email,
      soDt: user.soDt,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
    });
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [userUpdating, setUserUpdating] = useState([]);
  const showModal = useCallback(() => {
    if (userUpdating === false) {
      setIsModalVisible(!isModalVisible);
    } else {
      setUserUpdating();
      setIsModalVisible(!isModalVisible);
    }
  }, [isModalVisible, userUpdating]);

  return (
    <div className="UserManagement px-16 py-8">
      <button
        onClick={showModal}
        className="m-4 float-right bg-red-600 text-white text-lg font-semibold  px-10 py-2 rounded-lg focus:outline-none hover:bg-red-500 transition-all	"
      >
        Thêm Người Dùng
      </button>

      <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} sticky />
      {isModalVisible === true ? (
        <Modals
          setIsModalVisible={setIsModalVisible}
          userUpdating={userUpdating}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default UserManagement;
