import {useEffect,useState} from 'react'
import {Link,useNavigate,useSearchParams} from 'react-router-dom'
import {riwayat,soalUjian} from '../data'
import {Stat} from '../components'
export function MuridDash(){
  const [q]=useSearchParams(),[t,setT]=useState(q.get('token')||''),go=useNavigate()
  return <><h1>Dashboard murid</h1>
  <section className="panel"><h2>Masukkan token ruang</h2><p className="small">Token dibagikan oleh guru Anda.</p>
    <form className="tokenbox inline" onSubmit={e=>{e.preventDefault();go('/ujian')}}>
      <input value={t} onChange={e=>setT(e.target.value.toUpperCase())} placeholder="K7M2-QX9P" aria-label="Token ruang"/><button className="btn">Masuk ruang</button></form></section>
  <section className="panel"><h2>Riwayat ujian</h2><div className="scroll"><table><thead><tr><th>Ujian</th><th>Tanggal</th><th>Benar</th><th>Nilai</th></tr></thead>
    <tbody>{riwayat.map(r=><tr key={r.judul}><td>{r.judul}</td><td>{r.tgl}</td><td>{r.benar}/{r.total}</td><td><b>{r.nilai}</b></td></tr>)}</tbody></table></div></section></>
}
const fmt=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
export function Ujian(){
  const [i,setI]=useState(0),[a,setA]=useState({}),[s,setS]=useState(5400),[saved,setSaved]=useState(true),go=useNavigate()
  useEffect(()=>{const id=setInterval(()=>setS(x=>Math.max(0,x-1)),1000);return()=>clearInterval(id)},[])
  useEffect(()=>{if(s===0)go('/hasil')},[s])
  const q=soalUjian[i],pick=k=>{setA({...a,[q.id]:k});setSaved(false);setTimeout(()=>setSaved(true),600)} // PUT /attempts/:id/answers
  const done=Object.keys(a).length
  return <div className="exam"><header className="exam-bar"><b>Matematika Dasar – Bab 3</b>
    <span className={'timer'+(s<300?' low':'')} role="timer">{fmt(s)}</span><span className="small">{saved?'Tersimpan':'Menyimpan…'}</span></header>
  <div className="exam-body"><section className="panel qcard"><p className="small">Soal {i+1} dari {soalUjian.length}</p><h2>{q.teks}</h2>
    <div className="opts">{q.opsi.map((o,k)=>{const L='ABCDE'[k];return <label key={L} className={a[q.id]===L?'opt on':'opt'}>
      <input type="radio" name="o" checked={a[q.id]===L} onChange={()=>pick(L)}/><b>{L}</b><span>{o}</span></label>})}</div>
    <div className="row"><button className="btn ghost" disabled={!i} onClick={()=>setI(i-1)}>Sebelumnya</button>
      {i<soalUjian.length-1?<button className="btn" onClick={()=>setI(i+1)}>Berikutnya</button>:<button className="btn" onClick={()=>confirm(`Kumpulkan sekarang? ${done} dari ${soalUjian.length} soal terjawab.`)&&go('/hasil')}>Kumpulkan</button>}</div></section>
  <aside className="panel nav-q"><h3>Daftar soal</h3><div className="qgrid">{soalUjian.map((x,k)=><button key={x.id} aria-label={`Soal ${k+1}`} className={(k===i?'cur ':'')+(a[x.id]?'ans':'')} onClick={()=>setI(k)}>{k+1}</button>)}</div>
    <p className="small">{done} dari {soalUjian.length} terjawab</p></aside></div></div>
}
export function Hasil(){
  return <><h1>Hasil ujian</h1><section className="panel result"><div className="score">86</div><div><h2>Matematika Dasar – Bab 3</h2><p className="small">Dikumpulkan 9 Okt 2026, 09.41</p></div></section>
  <div className="stats"><Stat n="172" t="Jawaban benar"/><Stat n="28" t="Jawaban salah"/><Stat n="200" t="Total soal"/></div>
  <Link className="btn" to="/murid">Kembali ke dashboard</Link></>
}
