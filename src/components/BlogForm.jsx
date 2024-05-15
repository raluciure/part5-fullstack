import { useState } from "react"

const BlogForm = ({ onSubmit }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
    const [buttonVisible, setButtonVisible] = useState(false)

    const handleAddBlog = (event) => {
        event.preventDefault()
        console.log(newBlog)
        onSubmit(newBlog)
        setNewBlog({ title: '', author: '', url: '' })
    }

    const handleCancel = () => {
        setNewBlog({ title: '', author: '', url: '' })
        setButtonVisible(false)
    }

    const newBlogButton = () => (
        <button onClick={() => setButtonVisible(true)}>new blog</button>
    )

    const addBlogForm = () => (
        <form onSubmit={handleAddBlog}>
            <div>
                title:
                <input value={newBlog.title} onChange={(event) => { setNewBlog({ ...newBlog, title: event.target.value }) }} />
            </div>
            <div>
                author:
                <input value={newBlog.author} onChange={(event) => { setNewBlog({ ...newBlog, author: event.target.value }) }} />
            </div>
            <div>
                url:
                <input value={newBlog.url} onChange={(event) => { setNewBlog({ ...newBlog, url: event.target.value }) }} />
            </div>
            <button type="submit">create</button>
            <button type="button" onClick={handleCancel}>cancel</button>
        </form>
    )

    return (
        <div>
            {buttonVisible ? addBlogForm() : newBlogButton()}
        </div>
    )
}

export default BlogForm
