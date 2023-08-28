/* eslint-disable no-constant-condition */
import { useState } from 'react'
import './blogCreation.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export default function BlogCreation() {
    const [isChecked, setIsChecked] = useState(false)
    const [blogImage, setBlogImage] = useState('')
    const [blogData, setBlogData] = useState({
        title: '',
        body: '',
        tags: '',
        category: '',
        subCategory: '',
        isPublished: isChecked,
    })


    const handelImage = (e) => {
        setBlogImage(e.target.files[0])
    }
    const handelOnChange = (e) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value,
        })
    }

    const handelCheck = () => {
        setIsChecked(!isChecked)
    }

    function createBlog() {

        const dataDetail = new FormData()
        dataDetail.append('blogImage', blogImage)
        for (let key in blogData) {
            dataDetail.append(key, blogData[key])
        }
        fetch('http://localhost:8080/createBlog', {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: dataDetail
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === true) {
                    toast.success(data.message)
                    setBlogData({
                        title: '',
                        body: '',
                        tags: '',
                        category: '',
                        subCategory: '',
                        blogImage: '',
                        isPublished: isChecked,
                    })
                }
                else {
                    toast.error(data.message)
                }
            })
            .catch(err => console.log(err))
    }

    const handelOnSubmit = (e) => {
        e.preventDefault()
        createBlog()
    }
    return (
        <div className='blog-container'>
            <div className='blog-header'>
                <h1>Create Blog</h1>
            </div>
            <form className='blog-form' onSubmit={handelOnSubmit}>
                <div className='blog_Image stand'>
                    <label htmlFor="image" className='blog-label'>Image :</label>
                    <div className='image-blog'>
                        <input type="file"
                            id='image'
                            name='blogImage'
                            autoComplete='image'
                            placeholder="Enter Your Image"
                            onChange={handelImage}
                        />
                    </div>
                </div>
                <div className='blog_title stand'>
                    <label htmlFor="title-area" className='blog-label'>Title :</label>
                    <input type="text"
                        id='title-area'
                        className='t-blog in'
                        name='title'
                        autoComplete='title'
                        value={blogData.title}
                        placeholder="Enter Your Title"
                        onChange={handelOnChange}
                    />
                </div>



                {/* <div className='blog_author stand'>
                    <label htmlFor="author" className='blog-label'>Author :</label>
                    <input
                        type="text"
                        id='author'
                        className='author-blog in'
                        name='authorId'
                        autoComplete='author'
                        placeholder="Enter Your Author"
                        onChange={handelOnChange}
                    />
                </div> */}

                <div className='blog_category stand'>
                    <label htmlFor="category" className='blog-label'>Category :</label>
                    <input
                        type="text"
                        id='category'
                        className='category-blog in'
                        name='category'
                        value={blogData.category}
                        autoComplete='category'
                        placeholder="Enter Your Category"
                        onChange={handelOnChange}
                    />
                </div>

                <div className='blog_tags stand'>
                    <label htmlFor="tags" className='blog-label'>Tags :</label>
                    <input
                        type="text"
                        id='tags'
                        className='tags-blog in'
                        name='tags'
                        autoComplete='tags'
                        value={blogData.tags}
                        placeholder="Enter Your Tags"
                        onChange={handelOnChange}
                    />
                </div>

                <div className='blog_subCategory stand'>
                    <label htmlFor="subCategory" className='blog-label'>SubCategory :</label>
                    <input
                        type="text"
                        id='subCategory'
                        className='subCategory-blog in'
                        name='subCategory'
                        value={blogData.subCategory}
                        autoComplete='subCategory'
                        placeholder="Enter Your SubCategory"
                        onChange={handelOnChange}
                    />
                </div>
                <div className='blog_body stand'>
                    <label htmlFor="body" className='blog-label'>Body :</label>
                    <input type="text"
                        id='body'
                        className='body-blog in'
                        name='body'
                        autoComplete='body'
                        value={blogData.body}
                        placeholder="Enter Your Body"
                        onChange={handelOnChange}
                        style={{ height: "7em" }}
                    />
                </div>
                <div className='blog_isPublished stand'>
                    <label htmlFor="cbx-12" className='blog-label'>Publish :</label>
                    <div className="checkbox-wrapper-12">
                        <div className="cbx">
                            <input
                                id="cbx-12"
                                type="checkbox"
                                name="isPublished"
                                checked={isChecked}
                                onChange={handelCheck}
                            />
                            <label htmlFor="cbx-12" />
                            <svg width={15} height={14} viewBox="0 0 15 14" fill="none">
                                <path d="M2 8.36364L6.23077 12L13 2" />
                            </svg>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="goo-12">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation={4} result="blur" />
                                    <feColorMatrix
                                        in="blur"
                                        mode="matrix"
                                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                                        result="goo-12"
                                    />
                                    <feBlend in="SourceGraphic" in2="goo-12" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>
                <button type="submit" className='blog-btn'>Submit</button>
            </form>
            <ToastContainer/>
        </div>
    )
}
