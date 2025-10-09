import Link from 'next/link'

const NavBar = () => {
    return (
        <header>
            <Link href="/" passHref={true} tabIndex={1}><img className="home-title" alt='logo' src="/img/header-thin.svg"  /></Link>
                <nav>
                    <ul>
                       <li><Link href="/web" passHref={true} tabIndex={2}><img src="/img/nav-work_2.svg" alt="work" /></Link></li>
                       <li><Link href="/info" passHref={true} tabIndex={3}><img src="/img/nav-info_2.svg" alt="info" /></Link></li>                       
                    </ul>
                </nav>
        </header>
    );
}

export default NavBar;