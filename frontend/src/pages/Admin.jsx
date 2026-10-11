import {useState} from 'react'
import {guruBaru} from '../data'
export default function Admin(){
  const [l,setL]=useState(guruBaru)
  return <><h1>Persetujuan guru</h1><section className="panel">
    {l.length?<div className="scroll"><table><thead><tr><th>Nama</th><th>Email</th><th>Sekolah</th><th/></tr></thead>
      <tbody>{l.map(g=><tr key={g.id}><td>{g.nama}</td><td>{g.email}</td><td>{g.sekolah}</td>
        <td><button className="btn sm" onClick={()=>setL(l.filter(x=>x.id!==g.id))}>Setujui</button></td></tr>)}</tbody></table></div>
    :<p>Tidak ada guru yang menunggu persetujuan.</p>}</section></>
}
