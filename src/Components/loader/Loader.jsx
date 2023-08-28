import './Loader.css'
export default function Loader() {
    return (
        <div className="loader">
            <div className="spinner">
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width={200}
                    height={200}
                    fill="none"
                >
                    <path
                        stroke="#E91E63"
                        strokeWidth="1.5"
                        d="M9.743 10.25c3.213 1.96 5.017 4.676 7.248 4.676 2.588 0 2.791-4.8.518-5.668-3.107-1.187-5.178 3.719-8.284 5.03-1.415.677-3.41 1.014-4.09-1.14-.251-.797-.13-1.65.133-2.442v0c.425-1.278 2.132-1.66 3.35-1.081.304.144.668.346 1.125.625z"
                        strokeDashoffset={100}
                        strokeDasharray={100}
                        className="path"
                    ></path>
                </svg>
            </div>
        </div>
    )
}
