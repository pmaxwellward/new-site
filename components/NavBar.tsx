import Link from 'next/link'

const NavBar = () => {
    return (
        <header>
            <Link href="/"><img className="home-title" alt='logo' src="/img/header-thin.svg" /></Link>
                <nav>
                    <ul>
                       <li><Link href="/work"><img src="/img/nav-work_2.svg" alt="work"/></Link></li>
                       <li><Link href="/info"><img src="/img/nav-info_2.svg" alt="info"/></Link></li>
                       <li><Link href="/news"><img src="/img/nav-news_2.svg" alt="news"/></Link></li>
                    </ul>
                </nav>
        </header>
    );
}

export default NavBar;