import {useAuth} from '../auth'
export function Profil(){
  const {user}=useAuth()
  return <><h1>Profil</h1><section className="panel"><form className="formgrid" onSubmit={e=>e.preventDefault()}>
    <label>Nama<input defaultValue={user.nama}/></label><label>Email<input type="email" defaultValue={user.email}/></label>
    <div className="row"><button className="btn">Simpan perubahan</button></div></form></section></>
}
export function Pengaturan(){
  return <><h1>Pengaturan</h1><section className="panel"><form className="formgrid" onSubmit={e=>e.preventDefault()}>
    <label>Kata sandi saat ini<input type="password"/></label><label>Kata sandi baru<input type="password" minLength={8}/></label>
    <div className="row"><button className="btn">Ganti kata sandi</button></div></form></section></>
}
