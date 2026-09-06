// Zuverlässige Nachübersetzung aller 1025 Pokémon auf Deutsch.
(async()=>{
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  for(let attempt=0;attempt<8;attempt++){
    if(typeof pokemon==='undefined'||pokemon.length<1025){await sleep(500);continue}
    const normal=pokemon.filter(p=>!p.mega&&p.id>=1&&p.id<=1025);
    for(let start=0;start<normal.length;start+=8){
      await Promise.all(normal.slice(start,start+8).map(async p=>{
        for(let retry=0;retry<4;retry++){
          try{
            const r=await fetch(`https://pokeapi.co/api/v2/pokemon-species/${p.id}`);
            if(r.ok){const s=await r.json();const de=s.names?.find(x=>x.language?.name==='de');if(de?.name)p.name=de.name;break}
          }catch(e){}
          await sleep(350*(retry+1));
        }
      }));
      if(typeof render==='function')render();
      await sleep(120);
    }
    if(typeof render==='function')render();
    return;
  }
})();