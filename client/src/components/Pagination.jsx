import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Pagination, PaginationItem } from "@material-ui/lab";

import useStyles from "./styles";
import { getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.posts);

  useEffect(() => {
    /**Get post from server */
    dispatch(getPosts(page));
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPages}
      page={Number(page) || 1}
      color="primary"
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
