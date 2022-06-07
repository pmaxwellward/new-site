import Link from 'next/link'

const NavBar = () => {
    return (
        <header>
            <Link href="/" passHref={true}><a tabIndex={1}><img className="home-title" alt='logo' src="/img/header-thin.svg"  /></a></Link>
                <nav>
                    <ul>
                       <li><Link href="/work" passHref={true}><a tabIndex={2}><img src="/img/nav-work_2.svg" alt="work" /></a></Link></li>
                       <li><Link href="/info" passHref={true}><a tabIndex={3}><img src="/img/nav-info_2.svg" alt="info" /></a></Link></li>
                       <li><Link href="/news" passHref={true}><a tabIndex={4}><img src="/img/nav-news_2.svg" alt="news" /></a></Link></li>
                    </ul>
                </nav>
        </header>
    );
}

export default NavBar;