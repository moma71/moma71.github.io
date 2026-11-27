(function(){
  var store={get:function(k){try{return localStorage.getItem('ax:'+k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem('ax:'+k,v)}catch(e){}}};
  var toast=document.createElement('div');toast.className='toast';document.body.appendChild(toast);
  function say(t){toast.textContent=t;toast.classList.add('on');setTimeout(function(){toast.classList.remove('on')},1400)}
  document.querySelectorAll('.say').forEach(function(b){
    var box=b.querySelector('.say-text'), orig=box.innerHTML, key='say:'+b.id, saved=store.get(key);
    if(saved){box.textContent=saved}
    box.addEventListener('input',function(){store.set(key,box.innerText)});
    b.querySelector('.copy').addEventListener('click',function(){
      var t=box.innerText.trim();
      if(navigator.clipboard){navigator.clipboard.writeText(t).then(function(){say('복사했습니다')},function(){fallback(t)})}else{fallback(t)}
    });
    b.querySelector('.reset').addEventListener('click',function(){box.innerHTML=orig;store.set(key,'');say('처음 말로 되돌렸습니다')});
  });
  function fallback(t){var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');say('복사했습니다')}catch(e){say('길게 눌러 복사하세요')}a.remove()}
  document.querySelectorAll('[data-key]').forEach(function(el){
    var k=el.getAttribute('data-key'),v=store.get(k);
    if(el.type==='checkbox'){el.checked=v==='1';el.addEventListener('change',function(){store.set(k,el.checked?'1':'')})}
    else{if(v)el.value=v;el.addEventListener('input',function(){store.set(k,el.value)})}
  });
  var q=document.getElementById('q');
  if(q){q.addEventListener('input',function(){var s=q.value.trim().toLowerCase();document.querySelectorAll('table.map tbody tr').forEach(function(tr){tr.style.display=!s||tr.textContent.toLowerCase().indexOf(s)>=0?'':'none'})})}
})();
