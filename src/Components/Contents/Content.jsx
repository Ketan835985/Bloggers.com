/* eslint-disable react/prop-types */

import './Content.css';


function Content({ blogImage, body, category, subCategory, tags, authorId, isPublished, title }) {
    return (
        <div className='content-container'>
            <div className='content-img'>
                <div >
                    <img src={blogImage} alt="" width={"150px"}  />
                </div>
            </div>
            <div className='content-all'>
                <div className='content-title'>
                    <h2>{title}</h2>
                    <span></span>
                    {' - '}
                    <span></span>
                    <p>{authorId}</p>
                </div>
                <div className='content-body'>
                    <p>{body}</p>
                </div>
                <div className='content-categories'>
                    <div className='tags'>
                        <select name="" id="">
                            {tags.map((tag, index) => {
                                return (<option
                                    key={index}
                                    value={tag}>
                                    {tag}
                                </option>)
                            })}
                        </select>
                    </div>

                    <div className='sub-Content'>
                        <select name="" id="">
                            {subCategory.map((sub, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={sub}>
                                        {sub}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='category'>
                        <p>{category}</p>
                    </div>
                    <div>
                        <button disabled style={{ backgroundColor: isPublished ? "#9cf296" : "#De503f", color: 'white' }}>{isPublished ? "Published" : "Not Published"}</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Content