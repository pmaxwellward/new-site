import AnimationItem from "../components/AnimationItem";

const animationItems = [
    {
        id: "xmas2018",
        itemURL: "https://youtu.be/OxmRK7cV0uk",
        img: "./img/xmas2018.png",
        title: "WGNO Holiday Card 2018 | Commercial | 3D",
        info: `A charming little 3D spot done for the 2018 Holiday season. I wrote, storyboared, and 
            animated the characters in this spot and Justin Babin created the environments, colors, 
            and animated the camera. The NOLA Ad Club gave this spot an AAF Addy Award in 2019.<br><br>
            More of Justin Babin: <a href="http://www.jbabsdesign.com">www.jbabsdesign.com</a>`
    },
    {
        id: "slot",
        itemURL: "https://vimeo.com/310917637",
        img: "./img/slot.png",
        title: "Short Life of Trouble | Trailer | 2D & StopMo",
        info: `I animated this trailer for a conceptual game about 
            country musicians through a distorted, mixed-media world while having 
            experiences, completing objectives, and then writing songs about it. You use those songs 
            to tour, perform, make money, and upgrade or downgrade your life as you see fit.`
    },
    {
        id: "rosie-joe",
        itemURL: "https://vimeo.com/274286340",
        img: "./img/rosieJoe.png",
        title: "Rosie & Joe | FX Series | 2D",
        info: `My friends Zim+Teemo asked me to animate on this upcoming project they produced for the FX 
            network. Zim+Teemo made all the artwork which I assembled and animated in After Effects. 
            There are excerpts of the show in their reel. Click the banner above to view.<br><br>
            See more of Zim+Teemo: <a href="http://www.zimteemo.com">www.zimteemo.com</a>`
    },
    {
        id: "nrg-1",
        itemURL: "https://www.808inc.com/nrg-carbon-capture",
        img: "./img/nrg.png",
        title: "NRG: In The Future 1 | Branding | 2D",
        info: `My first commercial project! I actually had quite a big role on it, too. I storyboarded,
            created the artwork, and animated the chicken. <br><br>
            This was produced by 808 inc. In Houston, TX.<br>
            See more of their work at <a href="http://808inc.com">www.808inc.com</a>`
    },
    {
        id: "nrg-2",
        itemURL: "https://www.808inc.com/nrg-wireless-electricity",
        img: "./img/nrg2.png",
        title: "NRG: In The Future 2 | Branding | 2D",
        info: `Part of the same series as above. The scene where the fellow is carrying boxes, trips
            and then morphs into a electrical outlet is the first scene I animated as a professional
            and it remains one of my favorite pieces I've animated.`
    },
    {
        id: "doomed",
        itemURL: "https://vimeo.com/190627063",
        img: "./img/doomed.png",
        title: "Doomed | Short Film | 2D & Miniatures",
        info: `I was sitting in a Wal-Mart parking lot, and while bracing myself to leave the car 
            and go shopping, I had the idea for this film.<br><br>
            Official Selection 2017:<br>
            New Orleans Film Festival<br>
            Cape Town Intl. Animation Festival<br>
            Mexico International Film Festival`
    },
    {
        id: "wgno2016",
        itemURL: "https://vimeo.com/196020697",
        img: "./img/xmas2016.png",
        title: "WGNO Holiday Card 2016 | Commercial | StopMo",
        info: `Here is the first Holiday card I did for WGNO in New Orleans, LA. I once again worked on 
            this with Justin Babin (he built that wonderful street car). We spent about 2.5 months 
            building the sets, characters, and then animating them. By next Holiday season, 
            most of the anchors in the video no longer worked at our station, thus nullifying this spot, 
            hence why the 2018 version features no personalities (except Santa). Still a charming spot.`
    },
    {
        id: "alpha",
        itemURL: "https://vimeo.com/293068530",
        img: "./img/alpha.png",
        title: "5 Ways To Be An Alpha Male | Short Film | 2D",
        info: `I made this for The Backyard Film Festival in New Orleans. The theme was "Macho" and
            this is what I came up with. I made the silly song in GarageBand and finished it in 
            about 2 weeks in my spare time. I had fun doing it, but don't plan on tackling topical
            subjects again.`
    },
    {
        id: "mashcots",
        itemURL: "https://vimeo.com/135125161",
        img: "./img/mashcots.png",
        title: "Mashed Potato Mash-cots | Short Film | 2D",
        info: `I can't remember why or when I made this, but people seem to enjoy this more than my serious films
            that have been in film festivals and stuff.`
    },
    {
        id: "seinfeld",
        itemURL: "https://www.youtube.com/watch?v=30rXZGG3fM0",
        img: "./img/seinfeld.png",
        title: "Seinfeld Apartment | Commercial | Miniatures",
        info: `I painstakingly re-created the apartment from Seinfeld in this promo. I used cheap craft 
            paint, cardboard, and a hot glue gun. I think the most expensive item was the wood panel
            used for the floor.`
    },
    {
        id: "swallowedkin",
        itemURL: "https://vimeo.com/126224327",
        img: "./img/swallowedkin.png",
        title: "Swalloed Kin | Short Film | 2D",
        info: `My first short film. It's a bit odd but we keep it around the for the good memories`
    }
]

const AnimationRoute = () => {
    return (
        <main>
            {
                animationItems.map((item) => 
                    <AnimationItem key={item.id} {...item} /> 
                )
            }
        </main>
    );
}

export default AnimationRoute;