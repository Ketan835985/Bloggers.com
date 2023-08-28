import './HomePage.css'

export default function HomePage() {
    const handelCreateBlog = () => {
        window.location.href = '/blogCreate'
    }

    const handelBlogList = () => {
        window.location.href = '/blogList'
    }

    let token = localStorage.getItem('token')
    return (
        <div className='home'>
            <div className="container">
                <h1 className='big'>Publish Your Passions, Your Way</h1>
                <h2 className='sub'>Create A beautiful and Unique Blog</h2>
                {token ? <div style={{textAlign: "center"}}><div><button className='createBtn' onClick={handelCreateBlog}><i>Create Your Blog</i></button></div>
                    <div><button className='createBtn' onClick={handelBlogList}><i>Blog List`s</i></button></div></div> : <button className='createBtn'onClick={()=>window.location.href = '/login'}>SING IN</button>}
            </div>
        </div>
    )
}
