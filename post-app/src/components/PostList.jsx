import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [userIdFilter, setUserIdFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterPosts(term, sortOrder, userIdFilter);
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    filterPosts(searchTerm, order, userIdFilter);
  };

  const handleFilterByUserId = (e) => {
    const userId = e.target.value;
    setUserIdFilter(userId);
    filterPosts(searchTerm, sortOrder, userId);
  };

  const filterPosts = (search, order, userId) => {
    let updatedPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(search)
    );
    if (userId) {
      updatedPosts = updatedPosts.filter((post) => post.userId === Number(userId));
    }
    updatedPosts.sort((a, b) => {
      return order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
    setFilteredPosts(updatedPosts);
  };

  return (
    <div>
      <h1>Cards</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <select onChange={handleSort} value={sortOrder}>
        <option value="asc">Sort by Title: A-Z</option>
        <option value="desc">Sort by Title: Z-A</option>
      </select>
      <input
        type="number"
        placeholder="Filter by User ID"
        value={userIdFilter}
        onChange={handleFilterByUserId}
      />
      {loading ? (
        <p>Loading...</p>
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default PostList;
