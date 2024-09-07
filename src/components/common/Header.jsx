import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <>
            <header className="site-header">
                <Link to="/">
                    <img src="/images/logo.png" alt="" />
                    <h1>
                        EURO 2024
                    </h1>
                </Link>
            </header>
        </>
    )
}