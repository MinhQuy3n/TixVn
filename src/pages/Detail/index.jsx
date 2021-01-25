import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import DetailContent from "../../components/layout/detail/detailContent";
import DetailTop from "../../components/layout/detail/detailTop";
import { getFilmDetail, getFilmShowTime } from "../../redux/action/filmAction";
const Detail = () => {
  const dispatch = useDispatch();

  let { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);  
    getFilmDetail(dispatch, id);
    getFilmShowTime(dispatch, id);
  }, [dispatch, id]);
  return (
    <>
      <div className="detailmain">
        <DetailTop />
        <DetailContent />
      </div>
    </>
  );
};
export default memo(Detail);
