import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = () => {
  // Use 'useSelector' to fetch data from global Redux Store ('state').
  // ('state.posts' => 'posts' comes from reducers/index.js)
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  console.log(posts);

  return (
    // Show loading spinner if there are no posts; otherwise, show the posts:
    !posts.length ? (
      <CircularProgress />
    ) : (
      <Grid
        className={classes.container}
        container
        alignItems='stretch'
        spacing={3}
      >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
