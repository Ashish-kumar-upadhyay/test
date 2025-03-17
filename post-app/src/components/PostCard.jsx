const PostCard = ({ post }) => {
    return (
      <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <small>User ID: {post.userId}</small>
      </div>
    );
  };
  
  export default PostCard;
  