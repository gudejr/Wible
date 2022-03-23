import React, { useState, useEffect } from "react";
import axios from "axios";
import search from "../../../res/img/search.png";
import ReviewItem from "./ReviewItem";
import Pagination from "react-js-pagination";
import "../../main/Search/Paging.css";
import { connect } from "react-redux";

function UserReview({ userSlice }) {
  const url = "http://localhost:8080";
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getUserReview();
  }, []);

  function handlePageChange(event) {
    setPage(event);
  }

  //userSeq 어케 처리?
  const [userSeq, setUserSeq] = useState(userSlice.userSeq);
  function getUserReview() {
    ////userSeq 어케 처리??
    axios
      .get(url + `/userinfo/reviews/${userSeq}`)
      .then(function (response) {
        setReviews(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div
      style={{
        marginTop: 60,
        marginLeft: "15%",
        marginRight: "15%",
        position: "absolute",
        width: "70%",
        height: "100%",
      }}
    >
      <div
        style={{
          marginLeft: "11%",
          marginRight: "11%",
          width: "78%",
          borderTop: "1px solid black",
        }}
      >
        {reviews &&
          reviews.map((review) => (
            <ReviewItem
              url={url}
              review={review}
              userSeq={userSeq}
            ></ReviewItem>
          ))}
      </div>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={reviews.length}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </div>
  );
}
function mapStateToProps(state) {
  return { userSlice: state.user };
}
export default connect(mapStateToProps)(UserReview);
