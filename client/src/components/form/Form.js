import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";

import { TextField, Button, Typography, Paper } from "@material-ui/core";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const navigate = useNavigate();

  /**State for managment form data */
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  /**If have id, search post by this id  */
  const post = useSelector((posts) =>
    currentId ? posts.posts.posts.find((el) => el._id === currentId) : null
  );

  const handleAddTag = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag.trim()] });
  };

  const handleDeleteTags = (deleteTag) => {
    let newTags = postData.tags.filter((tag) => tag !== deleteTag);
    setPostData({ ...postData, tags: newTags });
  };

  useEffect(() => {
    /**If have id, add data from the post to the form */
    if (currentId) {
      setPostData({
        title: post.title,
        message: post.message,
        tags: post.tags,
        selectedFile: post.selectedFile,
      });
    }
  }, [currentId, post]);

  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.name }, navigate));
    }

    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  if (!user?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign In to share your memories and like other`s memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <ChipInput
          style={{ margin: "10px 0", width: "95%" }}
          value={postData.tags}
          label="Tags"
          variant="outlined"
          onAdd={handleAddTag}
          onDelete={handleDeleteTags}
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiply={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
