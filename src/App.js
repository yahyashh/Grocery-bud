import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getlocalhost=()=>{
  let list=localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}

function App() {
  const [list,setList]=useState(getlocalhost())
  const [name,setName]=useState('')
  const [isediting,setIsediting]=useState(false)
  const [editId,setEditId]=useState(null)
  const [alert,setAlert]=useState({})
  const handlesubmit=(e)=>{
    e.preventDefault()
    if(!name){
    showAlert(true,'danger','please fill the value')
        }
    else if(name && isediting){
    setList(
      list.map((item)=>{
        if(item.id===editId){
          return {...item,title:name}
        }
        return item
      })
    )
    setName('')
    setEditId(null)
    setIsediting(false)
    }
    else{
      showAlert(true,'success','item added to the List')
      let newItems={ id:new Date().getTime().toString(),title:name}
      setList([...list,newItems])
      setName('')
    }

  }
  const showAlert= (show=false,type='',msg='')=>{
    setAlert({show,type,msg})
  }
  const delet=(id)=>{
    showAlert(true,'danger','item removed ok')
  setList(list.filter((item)=>item.id !== id))
  }
  const editItem=(id)=>{
  const specificItem=list.find((item)=>item.id === id)
  setIsediting(true)
  setEditId(id)
  setName(specificItem.title)

  }
  useEffect(()=>{
  localStorage.setItem('list',JSON.stringify(list))
  console.log('list')
  },[list])
  console.log(list)
  return (
    <section className="section-center">
      <form onSubmit={handlesubmit} className="grocery-form">
       {alert.show && <Alert {...alert} removeAlert={showAlert} />}
       <h3>Grocerry Bud</h3>
       <div className="form-control">
        <input type="text" className='grocery' placeholder='e.g. fruits'
        value={name} onChange={(e)=>setName(e.target.value)} />
        <button type='submit' className='submit-btn'>
          {isediting ? 'edit' : 'submit'}
        </button>
       </div>
      </form>
    <div className="grocery-container">
      <List items={list} removeitem={delet} editItem={editItem} />
      <button className="clear-btn">clear</button>
    </div>
    </section>
  )
}

export default App
