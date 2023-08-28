import './Navbar.css'

export default function Navbar() {
    const token = localStorage.getItem('token')
    const handelLogOut = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/'
    }
    const handelCreateBlog = ()=>{
        window.location.href = '/blogCreate'
    }
    return (
        <div>
            <div className="navbar">
                <div className='left'>
                    <img className='logo' src="https://i.postimg.cc/YSh6KsWs/Screenshot-2023-08-21-221606-removebg-preview.png" alt="logo" />
                    <a href="/" className='Name'>
                        <h1>Blogger</h1>
                    </a>
                </div>
                <div className='right'>
                    {token ? <div>
                        <button onClick={handelLogOut} className='nav-button'>LogOut</button>
                        {" "}
                        <button className='nav-button' onClick={handelCreateBlog}>Create Blog</button>
                        </div> :
                        <a href="/Login">
                            <h1>SIGN IN</h1>
                        </a>}
                </div>
            </div>
        </div>
    )
}
