import React, { useState, useEffect } from 'react'
import LoadingScreen from '../components/LoadingScreen';
import Mascot from '../components/Mascot';

import { manGIFs, firstGIFs, introGIFs, flyGIFs, angerGIFs, blurbGIFs } from '../public/gifData/gifData';

const Home = () => {

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const man = manGIFs.map(a => a.src);
    const first = firstGIFs.map(a => a);
    const intro = introGIFs.map(a => a);
    const fly = flyGIFs.map(a => a.src)
    const anger = angerGIFs.map(a => a)
    const blurb = blurbGIFs.map(a => a)

    const firstCache = man.concat(first.flat(), intro.flat());
    const secondCache = fly.concat(anger.flat(), blurb.flat());

    (async () => {
      await cacheImages(firstCache);
      setTimeout(()=> {setLoading(false)}, 1000);
    })();

    cacheImages(secondCache);

  }, []);


    return (
      <div>
        <LoadingScreen class={(loading) ? "" : "fadeOut"} />
        <Mascot loading={loading} />
      </div>
    );


}

export default Home

async function cacheImages(srcArray: string[]) {
  const promises = await srcArray.map((src) => {
    
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener("load", () => resolve(`${src} is loaded`));
        img.addEventListener("error", (err) => reject(err));
        img.src = src;
      });

  });

  await Promise.all(promises)
  .then((msg) =>{
    console.log(msg);
  });
}