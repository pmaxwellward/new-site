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
                - Fullstack Development<br/>
                - 2D/3D Animation<br/>
                - Interactive media<br/>
                - Cartooning/Illustration<br/>
                <br/>
                Q: Film festivals<br/>
                Big clients?<br/>
                <br/>
                A: Yeah, a couple!<br/> 
                <br/>
                Check out my <br/>
                <Link href="/work" passHref><a ><b>WORK</b></a></Link> | <Link href="files/pmaxwellward_resume_2022.pdf"><a><b>Resume</b></a></Link><br/>
                for more info.<br/>
                <br/>
                <strong><Link href={`mailto:${scramble()}`} passHref><a>{scramble()}</a></Link></strong>
                <br/>
            </p>
        </main>
    );
}

export default InfoRoute;
