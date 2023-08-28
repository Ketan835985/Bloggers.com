/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Content from '../Contents/Content';
import Loader from '../loader/Loader';


export default function BlogList() {
    const [loader, setLoader] = useState(false);
    const [blogs, setBlogData] = useState([])
    const fetchData = () => {
        setLoader(true)
        fetch('http://localhost:8080/getBlogs', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === true) {
                    setTimeout(()=>{
                        setBlogData(data.data);
                        setLoader(false)
                    },300)
                }
                else {
                    toast.error(data.message);
                    setLoader(false)
                }
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    // console.log(blogs);
    return (
        <div>{loader ? <Loader /> :
            <div>
                {blogs.map((blog) => {
                    return <Content
                        title={blog.title}
                        body={blog.body}
                        tags={blog.tags}
                        category={blog.category}
                        subCategory={blog.subCategory}
                        isPublished={blog.isPublished}
                        publishedAt={blog.publishedAt}
                        blogImage={blog.blogImage}
                        authorId={blog.authorId.fname + ' ' + blog.authorId.lname}
                        key={blog._id} ></Content>
                })}
                <ToastContainer />
            </div>}
        </div>
    )
}
