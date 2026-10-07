(function(root) {
  function shuffle(items, random = Math.random) { const copy = [...items]; for(let i=copy.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [copy[i],copy[j]]=[copy[j],copy[i]]; } return copy; }
  const matching=typeof module!=='undefined'?require('./matching.js'):root.GAME_MATCHING;
  function rounds(data, random = Math.random) {
    if(data.lula.length<7||data.flavio.length<7)throw new Error('São necessários sete itens por candidato.');
    for(const item of [...data.lula,...data.flavio])if(!matching.metadata[item.id])throw new Error('Item sem classificação editorial.');
    // Randomize which column supplies the initial sample, so every item remains eligible.
    const anchor=random()<.5?'lula':'flavio',other=anchor==='lula'?'flavio':'lula';
    const available=shuffle(data[other],random),left=shuffle([true,true,true,false,false,false,random()<.5],random);
    return shuffle(data[anchor],random).slice(0,7).map((item,i)=>{
      let best=0;
      for(let j=1;j<available.length;j++)if(matching.distance(item,available[j])<matching.distance(item,available[best]))best=j;
      const counterpart=available.splice(best,1)[0],a={...item,candidate:anchor},b={...counterpart,candidate:other};
      const l=anchor==='lula'?a:b,f=anchor==='flavio'?a:b;
      return left[i]?[l,f]:[f,l];
    });
  }
  function result(answers) { if(answers.length!==7) throw new Error('Complete as sete rodadas.'); const lula=answers.filter(a=>a.candidate==='lula').length; return {lula,flavio:7-lula,winner:lula>=4?'flavio':'lula',number:lula>=4?22:13}; }
  const api={shuffle,rounds,result}; if(typeof module!=='undefined') module.exports=api; else root.GameLogic=api;
})(typeof window!=='undefined'?window:globalThis);
