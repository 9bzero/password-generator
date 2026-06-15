import{useState,useCallback}from'react'
  const UPPER='ABCDEFGHIJKLMNOPQRSTUVWXYZ',LOWER='abcdefghijklmnopqrstuvwxyz',NUMS='0123456789',SYMS='!@#$%^&*()_+-=[]{}|;:,.<>?'
  function generate(len:number,u:boolean,l:boolean,n:boolean,s:boolean){
    let pool='';if(u)pool+=UPPER;if(l)pool+=LOWER;if(n)pool+=NUMS;if(s)pool+=SYMS
    if(!pool)return''
    const arr=new Uint32Array(len)
    crypto.getRandomValues(arr)
    return Array.from(arr).map(v=>pool[v%pool.length]).join('')
  }
  function strength(p:string){
    let sc=0;if(p.length>=8)sc++;if(p.length>=16)sc++;if(/[A-Z]/.test(p))sc++;if(/[a-z]/.test(p))sc++;if(/d/.test(p))sc++;if(/[^A-Za-z0-9]/.test(p))sc++
    if(sc<=2)return{label:'Weak',color:'#ef4444'}
    if(sc<=4)return{label:'Fair',color:'#f59e0b'}
    if(sc===5)return{label:'Strong',color:'#22c55e'}
    return{label:'Very Strong',color:'#06b6d4'}
  }
  export default function App(){
    const[len,setLen]=useState(16)
    const[upper,setUpper]=useState(true)
    const[lower,setLower]=useState(true)
    const[nums,setNums]=useState(true)
    const[syms,setSyms]=useState(false)
    const[pass,setPass]=useState(()=>generate(16,true,true,true,false))
    const[copied,setCopied]=useState(false)
    const gen=useCallback(()=>setPass(generate(len,upper,lower,nums,syms)),[len,upper,lower,nums,syms])
    const copy=()=>{navigator.clipboard.writeText(pass);setCopied(true);setTimeout(()=>setCopied(false),2000)}
    const str=strength(pass)
    const Check=({val,set,label}:{val:boolean,set:(v:boolean)=>void,label:string})=>(
      <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',color:'#94a3b8',fontSize:'0.9rem'}}>
        <input type="checkbox" checked={val} onChange={e=>set(e.target.checked)} style={{width:16,height:16,accentColor:'#38bdf8'}}/>
        {label}
      </label>
    )
    return(
      <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter,system-ui,sans-serif',padding:'1rem'}}>
        <div style={{width:'100%',maxWidth:480,background:'#111827',border:'1px solid #1e293b',borderRadius:16,padding:'2rem',boxShadow:'0 25px 50px rgba(0,0,0,0.5)'}}>
          <h1 style={{fontWeight:800,fontSize:'1.5rem',marginBottom:'1.5rem',color:'#f8fafc',textAlign:'center'}}>🔐 Password Generator</h1>
          <div style={{position:'relative',marginBottom:'1rem'}}>
            <div style={{background:'#0f172a',border:'1px solid #334155',borderRadius:10,padding:'1rem 3rem 1rem 1rem',fontFamily:'JetBrains Mono,monospace',fontSize:'1rem',color:'#38bdf8',wordBreak:'break-all',minHeight:60,display:'flex',alignItems:'center'}}>{pass||'—'}</div>
            <button onClick={copy} style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:copied?'#22c55e':'#94a3b8',fontSize:'1.2rem'}}>{copied?'✓':'⎘'}</button>
          </div>
          <div style={{marginBottom:'1.5rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.5rem'}}>
              <span style={{color:'#94a3b8',fontSize:'0.85rem'}}>Length</span>
              <span style={{color:'#38bdf8',fontWeight:700,fontFamily:'monospace'}}>{len}</span>
            </div>
            <input type="range" min={4} max={64} value={len} onChange={e=>setLen(+e.target.value)} style={{width:'100%',accentColor:'#38bdf8'}}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem',marginBottom:'1.5rem'}}>
            <Check val={upper} set={setUpper} label="Uppercase A-Z"/>
            <Check val={lower} set={setLower} label="Lowercase a-z"/>
            <Check val={nums} set={setNums} label="Numbers 0-9"/>
            <Check val={syms} set={setSyms} label="Symbols !@#"/>
          </div>
          <div style={{marginBottom:'1.5rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.4rem'}}>
              <span style={{color:'#94a3b8',fontSize:'0.85rem'}}>Strength</span>
              <span style={{color:str.color,fontWeight:700,fontSize:'0.85rem'}}>{str.label}</span>
            </div>
            <div style={{height:6,background:'#1e293b',borderRadius:3,overflow:'hidden'}}>
              <div style={{height:'100%',background:str.color,borderRadius:3,width:str.label==='Weak'?'25%':str.label==='Fair'?'50%':str.label==='Strong'?'75%':'100%',transition:'width 0.3s,background 0.3s'}}/>
            </div>
          </div>
          <button onClick={gen} style={{width:'100%',padding:'0.85rem',background:'linear-gradient(135deg,#0ea5e9,#38bdf8)',color:'#0f172a',border:'none',borderRadius:10,cursor:'pointer',fontWeight:700,fontSize:'1rem'}}>
            ↻ Generate Password
          </button>
        </div>
      </div>
    )
  }