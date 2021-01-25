import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Space, Table } from "antd";
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Modals from "./filmManagement/modal";
import Swal from "sweetalert2";
import { deleteFilmByAdmin } from "../../../redux/action/adminAction";
import Highlighter from "react-highlight-words";

const FilmManagement = () => {
  const dispatch = useDispatch();
  const filmList = useSelector((state) => state.Film.listFilm);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filmUpdating, setFilmUpdating] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const columnFilm = [
    {
      title: "Mã Phim",
      width: 150,
      height: 150,
      dataIndex: "maPhim",
      key: "maPhim",
      ...getColumnSearchProps("maPhim"),
      render: (text, record) => {
        return <span className="column__detail">{record.maPhim}</span>;
      },
    },
    {
      title: "Tên Phim",
      width: 150,
      dataIndex: "tenPhim",
      key: "tenPhim",
      ...getColumnSearchProps("tenPhim"),
      render: (text, record) => {
        return <span className="column__detail">{record.tenPhim}</span>;
      },
    },
    {
      title: "Bí Danh",
      dataIndex: "biDanh",
      key: "biDanh",
      width: 150,
      ...getColumnSearchProps("biDanh"),
      render: (text, record) => {
        return <span className="column__detail">{record.biDanh}</span>;
      },
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      width: 200,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: 200,
      render: (text, record) => {
        return (
          <div className="column__Images">
            <img src={record.hinhAnh} alt="hinhAnh" />
          </div>
        );
      },
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      key: "moTa",
      width: 200,
    },
    {
      title: "Ngày Khởi Chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      width: 150,
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      key: "danhGia",
      width: 100,
    },
    {
      title: "Hành động",
      key: "operation",
      width: 150,
      render: (text, record) => (
        <div className="FilmManagement__action">
          <FormOutlined
            onClick={() => {
              showModal();
              setFilmUpdating(record);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              Swal.fire({
                title: "Xoá Phim?",
                text: `Bạn chắc chắn muốn xóa phim ${record.tenPhim.props.children} `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK,Xoá!",
                cancelButtonText: "Huỷ!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteFilmByAdmin(
                    dispatch,
                    record.maPhim.props.children,
                    record.tenPhim.props.children
                  );
                }
              });
            }}
          />
        </div>
      ),
    },
  ];
  const data = [];
  filmList.map((film, index) => {
    return data.push({
      key: index,
      maPhim: film.maPhim,
      tenPhim: film.tenPhim,
      biDanh: film.biDanh,
      trailer: <span className="column__detail trailer">{film.trailer}</span>,
      hinhAnh: film.hinhAnh,
      moTa: <span className="column__detail description">{film.moTa}</span>,
      ngayKhoiChieu: (
        <span className="column__detail">{film.ngayKhoiChieu}</span>
      ),
      danhGia: <span className="column__detail">{film.danhGia}</span>,
    });
  });

  const showModal = useCallback(() => {
    if (filmUpdating === false) {
      setIsModalVisible(!isModalVisible);
    } else {
      setFilmUpdating();
      setIsModalVisible(!isModalVisible);
    }
  }, [isModalVisible, filmUpdating]);

  return (
    <div className="filmManagement px-16 py-8">
      <button
        onClick={showModal}
        className="m-4 float-right bg-red-600 text-white text-lg font-semibold  px-10 py-2 rounded-lg focus:outline-none hover:bg-red-500 transition-all	"
      >
        Thêm phim
      </button>

      <Table
        columns={columnFilm}
        dataSource={data}
        scroll={{ x: 1000 }}
        sticky
      />

      {isModalVisible === true ? (
        <Modals
          setIsModalVisible={setIsModalVisible}
          filmUpdating={filmUpdating}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default FilmManagement;
