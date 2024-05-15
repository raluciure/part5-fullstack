import { useState } from "react"

const Blog = ({ blog }) => {
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

  const details = () => {
    return (
      <div>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button>like</button></div>
        <div>added by {blog.user ? blog.user.name : 'Unknown'}</div>
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