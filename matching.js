// Editorial estimates of the supplied text. These are not guilt or truth scores.
(function(root){
 const groups=[
  ['flavio','financial',3,'allegation',[1,2,3,4,5,7,8,11,12,13,14,15,16,21,26]],
  ['flavio','financial',2,'context',[6,19,22,24]],
  ['flavio','financial',3,'family-allegation',[17,18,20,25]],
  ['flavio','financial',3,'closed',[23,27]],
  ['flavio','security',3,'association',[9,10]],
  ['flavio','security',3,'policy',[28,29,30,32,33,34,69,70]],
  ['flavio','security',2,'policy',[31,35,36]],
  ['flavio','institutions',2,'policy',[37,38,39,42,43,45,72]],
  ['flavio','institutions',3,'policy',[40,41,71]],
  ['flavio','fiscal',2,'policy',[44,46,48]],
  ['flavio','economy',2,'policy',[47]],
  ['flavio','work',2,'policy',[49]],
  ['flavio','education',2,'policy',[50,51,52]],
  ['flavio','health',2,'policy',[53,54]],
  ['flavio','environment',3,'policy',[55,56]],
  ['flavio','democracy',5,'assertion',[57,58]],
  ['flavio','security',5,'allegation',[59]],
  ['flavio','heritage',3,'assertion',[60]],
  ['flavio','democracy',2,'rhetoric',[61]],
  ['flavio','democracy',3,'allegation',[62]],
  ['flavio','democracy',3,'rhetoric',[63,64]],
  ['flavio','democracy',4,'rhetoric',[65]],
  ['flavio','rights',4,'rhetoric',[66,68]],
  ['flavio','rights',3,'rhetoric',[67]],
  ['flavio','civic',1,'context',[73]],
  ['lula','financial',3,'closed',[1,2,3,4,6]],
  ['lula','institutions',2,'context',[5]],
  ['lula','financial',4,'government-context',[7,8,9]],
  ['lula','financial',3,'allegation',[10,11]],
  ['lula','financial',2,'context',[12,16]],
  ['lula','financial',3,'family-allegation',[13,14,15]],
  ['lula','financial',3,'allegation',[17,18]],
  ['lula','fiscal',2,'criticism',[19,20]],
  ['lula','work',2,'policy',[21,22,30,31]],
  ['lula','security',2,'policy',[23,25,26]],
  ['lula','institutions',2,'policy',[24]],
  ['lula','fiscal',2,'policy',[27,33,36]],
  ['lula','social',2,'policy',[28,29,37]],
  ['lula','economy',2,'policy',[32,35,50]],
  ['lula','institutions',2,'policy',[34]],
  ['lula','health',2,'policy',[38,51]],
  ['lula','democracy',2,'rhetoric',[39]],
  ['lula','diplomacy',2,'rhetoric',[40,41,42,43]],
  ['lula','institutions',3,'context',[44]],
  ['lula','institutions',3,'policy',[45]],
  ['lula','institutions',3,'allegation',[46]],
  ['lula','economy',2,'criticism',[47,49]],
  ['lula','economy',2,'context',[48]],
  ['lula','civic',1,'context',[52]]
 ];
 const metadata={};
 for(const [candidate,theme,severity,status,ids] of groups) for(const id of ids) {
  const key=(candidate==='lula'?'L':'F')+id;
  if(metadata[key])throw new Error('Classificação editorial duplicada: '+key);
  metadata[key]={theme,severity,status};
 }
 const policy=s=>s==='policy';
 function distance(a,b){
  const x=metadata[a.id],y=metadata[b.id];
  if(!x||!y)throw new Error('Item sem classificação editorial.');
  // Prefer the same kind of statement, then a nearby harm band and topic.
  return (policy(x.status)!==policy(y.status)?20:0)+Math.abs(x.severity-y.severity)*5+(x.theme===y.theme?0:4)+(x.status===y.status?0:3);
 }
 const api={metadata,distance};if(typeof module!=='undefined')module.exports=api;else root.GAME_MATCHING=api;
})(typeof window!=='undefined'?window:globalThis);
