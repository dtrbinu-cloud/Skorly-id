import {Link,NavLink,Outlet,Navigate,useNavigate,useLocation} from 'react-router-dom'
import {useAuth} from './auth'
export const Logo=({light})=><Link to="/" className={'logo'+(light?' light':'')}><span className="mark"/>Skorly.id</Link>
export function Navbar(){
  const {user}=useAuth()
  return <header className="nav"><div className="wrap nav-in"><Logo/>
    <nav><a href="/#fitur">Fitur</a><a href="/#cara">Cara kerja</a><a href="/#aman">Keamanan</a><a href="/#hubungi">Hubungi</a></nav>
    <div className="nav-cta">{user?<Link className="btn" to={'/'+user.role}>Dashboard</Link>:<><Link className="btn ghost" to="/masuk">Masuk</Link><Link className="btn" to="/daftar">Daftar</Link></>}</div></div></header>
}
export function Footer(){
  return <footer id="hubungi" className="foot"><div className="wrap foot-in">
    <div><Logo light/><p>Platform ujian pilihan ganda online. Guru unggah soal, murid kerjakan dengan token, nilai keluar otomatis.</p></div>
    <div><h4>Untuk</h4><a href="/daftar">Guru</a><a href="/daftar">Murid</a><a href="/masuk">Admin sekolah</a></div>
    <div><h4>Fitur</h4><a href="/#fitur">Unggah Excel dan PDF</a><a href="/#fitur">Ruang dengan token</a><a href="/#fitur">Ekspor nilai</a></div>
    <div><h4>Hubungi kami</h4><p>halo@skorly.id</p></div></div>
    <div className="copy">© 2026 Skorly.id. Semua hak dilindungi.</div></footer>
}
const menu={
 murid:[['/murid','Dashboard'],['/profil','Profil'],['/pengaturan','Pengaturan']],
 guru:[['/guru','Ruang saya'],['/guru/buat','Buat ruang'],['/profil','Profil'],['/pengaturan','Pengaturan']],
 admin:[['/admin','Persetujuan guru'],['/profil','Profil'],['/pengaturan','Pengaturan']]}
export function Shell(){
  const {user,logout}=useAuth(),go=useNavigate(),location=useLocation()
  if(!user) return <Navigate to="/masuk" replace/>
  if(user.role==='murid') return <div className="student-shell">
    <header className="student-topbar"><Logo/><div className="student-topbar-actions"><span className="student-user-name">{user.nama}</span><button onClick={()=>{logout();go('/')}}>Keluar</button></div></header>
    <main><Outlet/></main>
  </div>
  if(user.role==='guru' && (location.pathname==='/guru' || location.pathname.startsWith('/guru/ruang/'))) return <Outlet/>
  return <div className="shell"><aside><Logo/><nav>
    {menu[user.role].map(([to,t])=><NavLink key={to} to={to} end>{t}</NavLink>)}
    <button onClick={()=>{logout();go('/')}}>Keluar</button></nav>
    <div className="who"><b>{user.nama}</b><span>{user.role}</span></div></aside>
    <main><Outlet/></main></div>
}
export const Guard=({role,children})=>{const {user}=useAuth();return user&&user.role!==role?<Navigate to={'/'+user.role} replace/>:children}
export const Stat=({n,t})=><div className="stat"><b>{n}</b><span>{t}</span></div>
