import {useState} from 'react'
import {Link} from 'react-router-dom'
import {rooms,hasil,pratinjau} from '../data'
import {Stat} from '../components'
export function GuruDash(){
  const [sel,setSel]=useState(rooms[0])
  return <><div className="row between"><h1>Ruang saya</h1><Link className="btn" to="/guru/buat">Buat ruang</Link></div>
  <div className="stats"><Stat n={rooms.length} t="Ruang"/><Stat n={rooms.reduce((a,r)=>a+r.peserta,0)} t="Murid mengerjakan"/><Stat n={rooms.filter(r=>r.status==='Buka').length} t="Ruang terbuka"/></div>
  <section className="panel"><div className="scroll"><table><thead><tr><th>Ruang</th><th>Token</th><th>Soal</th><th>Peserta</th><th>Status</th><th/></tr></thead>
    <tbody>{rooms.map(r=><tr key={r.id} className={sel.id===r.id?'sel':''}><td>{r.judul}</td><td><code>{r.token}</code></td><td>{r.soal}</td><td>{r.peserta}</td>
      <td><span className={'chip '+(r.status==='Buka'?'ok':'')}>{r.status}</span></td><td><button className="link" onClick={()=>setSel(r)}>Lihat nilai</button></td></tr>)}</tbody></table></div></section>
  <section className="panel"><div className="row between"><h2>Nilai: {sel.judul}</h2><button className="btn ghost">Ekspor ke Excel</button></div>
    <div className="scroll"><table><thead><tr><th>Murid</th><th>Benar</th><th>Nilai</th><th>Waktu kumpul</th></tr></thead>
    <tbody>{hasil.map(h=><tr key={h.nama}><td>{h.nama}</td><td>{h.benar}/{sel.soal}</td><td><b>{h.nilai}</b></td><td>{h.waktu}</td></tr>)}</tbody></table></div></section></>
}
export function BuatRuang(){
  const [step,setStep]=useState(1),[file,setFile]=useState(null),[items,setItems]=useState(pratinjau),[token,setToken]=useState(null)
  const kosong=items.filter(x=>!x.kunci).length
  const setKey=(no,k)=>setItems(items.map(x=>x.no===no?{...x,kunci:k||null}:x))
  return <><h1>Buat ruang</h1>
  <div className="tabs">{['Unggah soal','Pratinjau','Pengaturan ruang'].map((t,i)=><span key={t} className={step===i+1?'on':step>i+1?'done':''}>{i+1}. {t}</span>)}</div>
  {step===1&&<section className="panel"><label className="drop"><input type="file" accept=".xlsx,.xls,.csv,.pdf" onChange={e=>setFile(e.target.files[0])}/>
    <b>{file?file.name:'Pilih file soal'}</b><span>Excel atau CSV (kolom soal, opsi A–E, kunci) atau PDF dengan template baku</span></label>
    <p className="small">File harus berisi soal dan kunci jawaban. Unggahan PDF perlu Anda periksa di pratinjau.</p>
    <button className="btn" disabled={!file} onClick={()=>setStep(2)}>Lanjut ke pratinjau</button></section>}
  {step===2&&<section className="panel"><div className="row between"><h2>{items.length} soal terbaca</h2>
    {kosong>0&&<span className="chip bad">{kosong} soal belum punya kunci</span>}</div>
    {items.map(x=><article key={x.no} className={'prev'+(x.kunci?'':' miss')}><p><b>{x.no}.</b> {x.teks}</p>
      <ol type="A">{x.opsi.map(o=><li key={o}>{o}</li>)}</ol>
      <label className="small">Kunci jawaban <select value={x.kunci||''} onChange={e=>setKey(x.no,e.target.value)}><option value="">Belum ada</option>{'ABCDE'.split('').map(k=><option key={k}>{k}</option>)}</select></label>
      {!x.kunci&&<p className="err">Soal ini belum punya kunci. Lengkapi sebelum membuat ruang.</p>}</article>)}
    <div className="row"><button className="btn ghost" onClick={()=>setStep(1)}>Ganti file</button><button className="btn" disabled={kosong>0} onClick={()=>setStep(3)}>Lanjut ke pengaturan</button></div></section>}
  {step===3&&<section className="panel">{token?<div className="made"><h2>Ruang dibuat</h2><p className="small">Bagikan token ini ke murid:</p><div className="tk-big">{token}</div><Link className="btn" to="/guru">Ke daftar ruang</Link></div>:
    <form className="formgrid" onSubmit={e=>{e.preventDefault();setToken('R5QD-7NWA')}}>
      <label>Judul ruang<input required placeholder="Contoh: IPA Terpadu – PTS"/></label><label>Durasi (menit)<input type="number" min="1" defaultValue={60}/></label>
      <label>Buka<input type="datetime-local" required/></label><label>Tutup<input type="datetime-local" required/></label>
      <label className="check"><input type="checkbox" defaultChecked/> Acak urutan soal</label>
      <div className="row"><button type="button" className="btn ghost" onClick={()=>setStep(2)}>Kembali</button><button className="btn">Buat ruang</button></div></form>}</section>}</>
}
