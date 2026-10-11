import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Logo} from '../components'
import {useAuth} from '../auth'
const Frame=({title,sub,children})=><div className="authpage"><div className="authside"><Logo light/><h2>Ujian online yang rapi untuk guru dan murid</h2><p>Unggah soal, bagikan token, nilai keluar otomatis.</p></div>
  <div className="authform"><h1>{title}</h1><p className="small">{sub}</p>{children}</div></div>
export { default as Login } from './Login';
export { default as Register } from './Register';
