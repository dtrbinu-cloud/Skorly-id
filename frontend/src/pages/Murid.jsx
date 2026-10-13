import {useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom'
import {rooms,soalUjian} from '../data'
import {useAuth} from '../auth'
import {Stat} from '../components'

const normalizeToken=value=>value.replace(/[^a-z0-9]/gi,'').toUpperCase()

export function MuridDash(){
  const [q]=useSearchParams(),initial=normalizeToken(q.get('token')||'').slice(0,6),[chars,setChars]=useState([...initial,...Array(6-initial.length).fill('')]),[error,setError]=useState(''),go=useNavigate(),{user}=useAuth()
  const token=chars.join(''),submit=(value=token)=>{
    const input=normalizeToken(value)
    const room=rooms.find(item=>normalizeToken(item.token)===input&&item.status==='Buka')
    if(!room){setError('Token tidak ditemukan atau ruang ujian sudah ditutup.');return}
    go(`/ujian?token=${encodeURIComponent(room.token)}`)
  }
  const updateChar=(index,value)=>{
    const clean=value.toUpperCase().replace(/[^A-Z0-9]/g,'')
    if(!clean)return setChars(current=>current.map((char,i)=>i===index?'':char))
    const next=[...chars]
    clean.slice(0,6-index).split('').forEach((char,offset)=>{next[index+offset]=char})
    setChars(next);setError('')
    const nextInput=document.querySelector(`[data-token-index="${Math.min(index+clean.length,5)}"]`)
    if(index+clean.length<6) nextInput?.focus()
    if(next.every(Boolean)) setTimeout(()=>submit(next.join('')),0)
  }
  const handleKeyDown=(index,event)=>{
    if(event.key==='Backspace'&&!chars[index]&&index>0)document.querySelector(`[data-token-index="${index-1}"]`)?.focus()
    if(event.key==='Enter'&&token.length===6){event.preventDefault();submit()}
  }
  const handlePaste=event=>{
    event.preventDefault()
    const pasted=normalizeToken(event.clipboardData.getData('text')).slice(0,6)
    if(!pasted)return
    setChars([...pasted,...Array(6-pasted.length).fill('')]);setError('')
    if(pasted.length===6)setTimeout(()=>submit(pasted),0)
  }
  return <div className="student-entry">
    <div className="student-greeting"><h1>Halo, {user?.nama||'Siswa'}</h1><span className="chip">Siswa Aktif</span></div>
    <section className="panel student-token-card">
      <p className="eyebrow">AKSES EVALUASI CBT</p><h2>Masukkan Token Ruang</h2>
      <p className="small">Masukkan 6 karakter token unik dari pengawas ruang atau guru untuk memulai.</p>
      <form className="student-token-form" onSubmit={e=>{e.preventDefault();submit()}}>
        <div className="token-inputs" role="group" aria-label="Token ruang">
          {chars.slice(0,3).map((char,index)=><input key={index} data-token-index={index} value={char} onChange={e=>updateChar(index,e.target.value)} onKeyDown={e=>handleKeyDown(index,e)} onPaste={handlePaste} maxLength={1} autoFocus={index===0&&!token} aria-label={`Karakter ${index+1} dari 6`}/>)}
          <span className="token-dot" aria-hidden="true">•</span>
          {chars.slice(3).map((char,index)=>{const actualIndex=index+3;return <input key={actualIndex} data-token-index={actualIndex} value={char} onChange={e=>updateChar(actualIndex,e.target.value)} onKeyDown={e=>handleKeyDown(actualIndex,e)} onPaste={handlePaste} maxLength={1} aria-label={`Karakter ${actualIndex+1} dari 6`}/>})}
        </div>
        <button className="btn" disabled={token.length<6}>Masuk ruang <span aria-hidden="true">→</span></button>
      </form>
      {error&&<p className="err" role="alert">{error}</p>}
    </section>
  </div>
}

const fmt=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
export function Ujian(){
  const [q]=useSearchParams(),go=useNavigate(),{user}=useAuth(),token=q.get('token')||'',room=rooms.find(item=>normalizeToken(item.token)===normalizeToken(token)&&item.status==='Buka')
  const [i,setI]=useState(0),[a,setA]=useState({}),[s,setS]=useState(5400),[saved,setSaved]=useState(true)
  useEffect(()=>{if(!user)go('/masuk',{replace:true});else if(!room)go('/murid',{replace:true})},[go,room,user])
  useEffect(()=>{const id=setInterval(()=>setS(x=>Math.max(0,x-1)),1000);return()=>clearInterval(id)},[])
  useEffect(()=>{if(s===0)go('/hasil')},[s])
  if(!user||!room)return null
  const question=soalUjian[i],pick=k=>{setA({...a,[question.id]:k});setSaved(false);setTimeout(()=>setSaved(true),600)}
  const done=Object.keys(a).length
  return <div className="exam"><header className="exam-bar"><b>{room.judul}</b>
    <span className={'timer'+(s<300?' low':'')} role="timer">{fmt(s)}</span><span className="small">{saved?'Tersimpan':'Menyimpan...'}</span></header>
  <div className="exam-body"><section className="panel qcard"><p className="small">Soal {i+1} dari {soalUjian.length}</p><h2>{question.teks}</h2>
    <div className="opts">{question.opsi.map((o,k)=>{const L='ABCDE'[k];return <label key={L} className={a[question.id]===L?'opt on':'opt'}>
      <input type="radio" name="o" checked={a[question.id]===L} onChange={()=>pick(L)}/><b>{L}</b><span>{o}</span></label>})}</div>
    <div className="row"><button className="btn ghost" disabled={!i} onClick={()=>setI(i-1)}>Sebelumnya</button>
      {i<soalUjian.length-1?<button className="btn" onClick={()=>setI(i+1)}>Berikutnya</button>:<button className="btn" onClick={()=>confirm(`Kumpulkan sekarang? ${done} dari ${soalUjian.length} soal terjawab.`)&&go('/hasil')}>Kumpulkan</button>}</div></section>
  <aside className="panel nav-q"><h3>Daftar soal</h3><div className="qgrid">{soalUjian.map((x,k)=><button key={x.id} aria-label={`Soal ${k+1}`} className={(k===i?'cur ':'')+(a[x.id]?'ans':'')} onClick={()=>setI(k)}>{k+1}</button>)}</div>
    <p className="small">{done} dari {soalUjian.length} terjawab</p></aside></div></div>
}

export function Hasil(){
  return <><h1>Hasil ujian</h1><section className="panel result"><div className="score">86</div><div><h2>Matematika Dasar - Bab 3</h2><p className="small">Dikumpulkan 9 Okt 2026, 09.41</p></div></section>
  <div className="stats"><Stat n="172" t="Jawaban benar"/><Stat n="28" t="Jawaban salah"/><Stat n="200" t="Total soal"/></div>
  <a className="btn" href="/murid">Kembali ke dashboard</a></>
}
