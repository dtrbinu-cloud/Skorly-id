import {createContext,useContext,useState} from 'react'
const Ctx=createContext(null)
export const useAuth=()=>useContext(Ctx)
// Demo: ganti dengan POST /auth/login + JWT. Role aplikasi hanya guru dan murid.
export function AuthProvider({children}){
  const [user,setUser]=useState(()=>{
    try{
      return JSON.parse(sessionStorage.getItem('skorly_user')||'null')
    }catch{
      return null
    }
  })
  const login=(email,nama,role='murid')=>{
    const u={email,role,nama:nama||({guru:'Budi Wijaya',murid:'Aisyah Putri'})[role]}
    setUser(u)
    try{sessionStorage.setItem('skorly_user',JSON.stringify(u))}catch{}
    return u}
  const logout=()=>{
    setUser(null)
    try{sessionStorage.removeItem('skorly_user')}catch{}
  }
  return <Ctx.Provider value={{user,login,logout}}>{children}</Ctx.Provider>
}
