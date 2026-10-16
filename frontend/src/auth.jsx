import {createContext,useContext,useState} from 'react'
const Ctx=createContext(null)
export const useAuth=()=>useContext(Ctx)
// Demo: ganti dengan POST /auth/login + JWT. Email berisi "guru"/"admin" menentukan peran.
export function AuthProvider({children}){
  const [user,setUser]=useState(()=>{
    try{
      return JSON.parse(sessionStorage.getItem('skorly_user')||'null')
    }catch{
      return null
    }
  })
  const login=(email,nama)=>{const role=/admin/i.test(email)?'admin':/guru/i.test(email)?'guru':'murid'
    const u={email,role,nama:nama||({admin:'Admin Skorly',guru:'Bu Rina Wulandari',murid:'Aisyah Putri'})[role]}
    setUser(u)
    try{sessionStorage.setItem('skorly_user',JSON.stringify(u))}catch{}
    return u}
  const logout=()=>{
    setUser(null)
    try{sessionStorage.removeItem('skorly_user')}catch{}
  }
  return <Ctx.Provider value={{user,login,logout}}>{children}</Ctx.Provider>
}
