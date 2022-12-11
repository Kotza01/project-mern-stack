import React, { useRef, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentRef = useRef();

  const handleClick = async () => {
    const newComment = await dispatch(
      commentPost(`${user?.result?.name} : ${comment}`, post._id)
    );
    setComments(newComment);
    setComment("");
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.length > 0 ? (
            comments.map((comment, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                {comment}
              </Typography>
            ))
          ) : (
            <Typography gutterBottom variant="subtitle1">
              No comments yet
            </Typography>
          )}
          <div ref={commentRef}></div>
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
