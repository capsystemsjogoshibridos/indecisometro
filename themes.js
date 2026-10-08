// Topic similarity only. Opposite positions on the same subject are close matches.
(function(root){
 const groups=[
 ['F','values','tradition',[1,2,3,29]],
 ['F','security','weapons',[4,5,23]],
 ['F','security','criminal-justice',[6,8]],
 ['F','security','police',[7,9,10,24,25]],
 ['F','international','defense',[11]],
 ['F','economy','state-role',[12,16,19]],
 ['F','institutions','political-identity',[13,30]],
 ['F','values','expression',[14,15]],
 ['F','economy','taxation',[17,22]],
 ['F','economy','enterprise',[18]],
 ['F','economy','property',[20]],
 ['F','economy','investment',[21]],
 ['F','international','sovereignty',[26,27]],
 ['F','institutions','authority',[28]],
 ['L','social','inequality',[1]],
 ['L','social','social-programs',[2]],
 ['L','work','income',[3]],
 ['L','work','labor-rights',[4,6]],
 ['L','work','hours',[5]],
 ['L','economy','state-role',[7]],
 ['L','economy','investment',[8]],
 ['L','economy','industry',[9,10]],
 ['L','economy','taxation',[11,12]],
 ['L','social','food',[13,14]],
 ['L','services','health',[15]],
 ['L','services','education',[16,17]],
 ['L','values','equality',[18,19,20]],
 ['L','values','diversity',[21,23]],
 ['L','security','violence-prevention',[22]],
 ['L','environment','protection',[24,25]],
 ['L','environment','energy',[26]],
 ['L','environment','development',[27]],
 ['L','institutions','participation',[28]],
 ['L','international','integration',[29]],
 ['L','international','sovereignty',[30]]
 ];
 const metadata={};
 for(const [prefix,theme,topic,ids] of groups)for(const id of ids){const key=prefix+id;if(metadata[key])throw new Error('Tema duplicado: '+key);metadata[key]={theme,topic};}
 const related={
  'economy|work':1,'economy|social':1,'economy|services':1,'economy|environment':1,
  'social|work':1,'services|social':1,'values|social':1,'institutions|values':1,
  'institutions|security':1,'security|values':2,'international|institutions':1,
  'international|environment':2,'environment|social':2,'services|values':2,
  'services|work':2,'international|economy':2
 };
 function distance(a,b){const x=metadata[a.id],y=metadata[b.id];if(!x||!y)throw new Error('Item sem tema.');if(x.topic===y.topic)return 0;if(x.theme===y.theme)return 2;return 4+(related[x.theme+'|'+y.theme]??related[y.theme+'|'+x.theme]??4)*2;}
 const api={metadata,distance};if(typeof module!=='undefined')module.exports=api;else root.GAME_MATCHING=api;
})(typeof window!=='undefined'?window:globalThis);
