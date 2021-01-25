import React from "react";
import firebase from "../../../../config";
import { Comment, Avatar, Form, Button, List, Input, Rate } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const useComment = (tenPhim) => {
  const [comment, setComment] = useState();
  useEffect(() => {
    firebase
      .firestore()
      .collection(`${tenPhim}`)
      .onSnapshot((snapshot) => {
        const newComment = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComment(newComment);
      });
  }, []);
  return comment;
};

const CommentList = ({ comments }) => {
  return (
    <>
      <List
        dataSource={comments}
        // header={`${comments.length} ${
        //   comments.length > 1 ? "replies" : "reply"
        // }`}
        itemLayout="horizontal"
        renderItem={(props) =>
          comments.length > 0 ? (
            <>
              <div className="evaluate__formComment__listComment">
                <Rate disabled defaultValue={props.rate} />

                <Comment
                  avatar={<Avatar icon={<UserOutlined />} />}
                  {...props}
                />
              </div>
            </>
          ) : (
            <></>
          )
        }
      />
    </>
  );
};

const Editor = ({ onChange, onSubmit, submitting, value, handleRate }) => (
  <div className="evaluate__formComment grid grid-cols-3 gap-4">
    <Form.Item className="evaluate__formComment__rate col-span-3">
      <Rate defaultValue={3} onChange={handleRate} />
    </Form.Item>
    <Form.Item className="  col-span-3">
      <TextArea
        placeholder="Bạn nghĩ gì về phim này?"
        rows={4}
        onChange={onChange}
        value={value}
      />
    </Form.Item>

    <Form.Item className=" col-span-3">
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        className="evaluate__formComment__submit"
      >
        Đăng
      </Button>
    </Form.Item>
  </div>
);

const Evaluate = () => {
  const userInfo = useSelector((state) => state.Auth.userInfo);
  const filmDetail = useSelector((state) => state.Film.detailFilm);
  const listComment = useComment(filmDetail.tenPhim);

  const [comments, setComment] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [rate, setRate] = useState(0);

  const [value, setValue] = useState("");
  useEffect(() => {
    setComment(listComment);
  }, [listComment]);

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    let postContent = {
      author: "Han Solo",
      content: `${value}`,
      datetime: moment().fromNow(),
      rate: rate,
    };
    setSubmitting(true);
    firebase.firestore().collection(`${filmDetail.tenPhim}`).add(postContent);
    setRate(0);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComment([postContent, ...comments]);
    }, 1000);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleRate = (e) => {

    setRate(e);
  };

  return (
    <div className="evaluate">
      <Comment
        avatar={
          <Avatar size={60} icon={<UserOutlined />} alt={userInfo.hoTen} />
        }
        content={
          <Editor
            onChange={handleChange}
            handleRate={handleRate}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
      {listComment && <CommentList comments={listComment} />}
    </div>
  );
};
export default Evaluate;
