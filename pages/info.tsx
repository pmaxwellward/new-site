import Link  from 'next/link'


const InfoRoute = () => {

     function scramble() {
        let s = '@';
        let n = 'pmaxwellward';
        let k = 'gmail.com';
        let e = n + s + k;
        let l = '{{spam@cia.gov}}'.replace(/{{.+?(}})/g, e);
        
        return l;
     }

    return (
        <main className="l-info">
            <p>
                Hello<br/> 
                <br/>
                I respect your time,<br/>
                so I&apos;ll be brief.<br/>
                <br/>
                I am Full Stack Developer<br/> 
                with one foot firmly planted in Design<br/>
                and the other stepping into AI Engineering.<br/>
                <br/>
                Check out my <br/>
                <Link href="/web" passHref><b>WORK</b></Link> | <Link href="/files/P_Maxwell_Ward_Resume_2025.pdf"><b>Resume</b></Link><br/>
                for more info.<br/>
                <br/>
                <strong><Link href={`mailto:${scramble()}`} passHref>{scramble()}</Link></strong>
                <br/>
            </p>
        </main>
    );
}

export default InfoRoute;
