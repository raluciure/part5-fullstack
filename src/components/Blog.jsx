import { useState } from "react"

const Blog = ({ blog, onLike, onDelete, user }) => {
  const [visibleDetails, setVisibleDetails] = useState(false)

  const toggleDetails = () => {
    setVisibleDetails(!visibleDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButtonStyle = {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    padding: "5px",
    borderRadius: "5px",
  }

  const confirmDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      onDelete(blog)
    }
  }

  const details = () => {
    return (
      <div>
        <div>{blog.url}</div>
        <div>{blog.likes} likes
          <button
            onClick={() => {
              onLike(blog);
            }}
          >
            like
          </button>
        </div>
        <div>added by {blog.user ? blog.user.name : 'Unknown'}</div>
        {blog.user.username === user.username && <button onClick={confirmDelete} style={deleteButtonStyle}>remove</button>}
      </div>
    );
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetails}>{visibleDetails ? "hide details" : "view details"}</button>
      </div>
      {visibleDetails && details()}
    </div>
  )
}

export default Blog