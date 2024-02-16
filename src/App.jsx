import { useState ,useCallback,useEffect} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]= useState('');
  const [copy,setCopy]=useState('copy')

const copyToClipBoard = useCallback(()=>{window.navigator.clipboard.writeText(password);setCopy('copied')},[password])


  const passwordGenerator =useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()"
    for(let i=1;i<=length;i++){
      const char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword])
  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-800 text-orange-300'>
      <h1 className="text-5xl font-bold text-top text-yellow">
      Password Generator
    </h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly></input>
      <button className='outline-none bg-blue-700 text-yellow-200 px-3 py-0.5 shrink-0' onClick={copyToClipBoard}> {copy} </button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={8} max={15} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
        <label>Length:{length}</label>

      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={numberAllowed} id="numberInput" onChange={()=>setNumberAllowed((prev)=>!prev)}/>
        <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={charAllowed} id="charInput" onChange={()=>setCharAllowed((prev)=>!prev) }/>
        <label htmlFor='charInput'>Charecter</label>
      </div>
    </div>
      </div>
    </>
  )
}

export default App
