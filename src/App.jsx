import { useState, useEffect } from 'react'
import './App.css'

const activate4 = async function () {
  const info = await fetch('https://openexchangerates.org/api/latest.json?app_id=4ac697e2dee54ba58dc89a4df4310306');
  const data4 = await info.json();
  return data4
}
activate4()
function App() {
  const [data, setData] = useState(null);
  const [databcv, setData2] = useState(null)
  const [datageneral, setData3] = useState(null)
  const [datacoins, setData4] = useState(null)
  const [resultc, setresultc] = useState(0)
  const [resultc2, setresultc2] = useState(0)
  const [content, setcontent] = useState(0)
  const [content2, setcontent2] = useState(0)
  const [moneda, setMoneda] = useState(0)
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const actual_date = `${day}/${month}/${year}`;
  useEffect(() => {
    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/enparalelovzla')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/bcv')
      .then((response) => response.json())
      .then((databcv) => setData2(databcv))
      .catch((error) => console.error('Error:', error));
    fetch('https://ve.dolarapi.com/v1/dolares')
      .then((response) => response.json())
      .then((datageneral) => setData3(datageneral[2]))
      .catch((error) => console.error('Error:', error));
    fetch('https://openexchangerates.org/api/latest.json?app_id=4ac697e2dee54ba58dc89a4df4310306')
      .then((response) => response.json())
      .then((datacoins) => setData4(datacoins.rates))
      .catch((error) => console.error('Error:', error));
    $("#element1").fadeOut()
  }, []);
  const [status, setdolar] = useState(true)
  const [string, setString] = useState("DolarHoy")
  function change(){
    document.getElementById("calculadora").style.removeProperty("display")
    setdolar(!status)
    setString("Dolarhoy")
    const result = document.getElementById("results2")
    document.getElementById("values").innerHTML=""
    document.getElementById("values").innerHTML += `<div className="fixed">Banco</div><div className="fixed">Valor (Bs)</div>`
    result.innerHTML=""
    result.innerHTML+=`<div className="grid-item">BCV</div>
            <div className="grid-item">${databcv && databcv.price}</div>
            <div className="grid-item">Dolar Paralelo</div>
            <div className="grid-item">${data && data.price}</div>
            <div className="grid-item">Dolar Bitcoin</div>
            <div className="grid-item">${datageneral && datageneral.promedio}</div>
            <div className="grid-item">Promedio General</div>
            <div className="grid-item">${(datageneral && databcv && data) && ((databcv.price+datageneral.promedio+data.price)/3).toFixed(2)}</div>`
    result.style.animation = "animation1 0.8s ease-out"
    setTimeout(()=>{
      result.style.animation = ""
    }, 900)
  }
  function change2(){
    document.getElementById("calculadora").style.display = "none"
    setdolar(!status)
    setString("Coins")
    const result = document.getElementById("results2")
    const coins = Object.keys(datacoins)
    const values = datacoins
    console.log(coins)
    result.innerHTML = ""
    document.getElementById("values").innerHTML=""
    document.getElementById("values").innerHTML += `<div className="fixed">Moneda</div><div className="fixed">Valor ($)</div>`
    for (let i =0; i<coins.length; i++){
      result.innerHTML += `<div className="grid-item">${coins[i]}</div><div className="grid-item">${datacoins[coins[i]]}</div>`
    }
    result.style.animation = "animation1 0.8s ease-out"
    setTimeout(()=>{
      result.style.animation = ""
    }, 900)
  }
  function result(event){
    const promedioG = (datageneral && databcv && data) && ((databcv.price+datageneral.promedio+data.price)/3)
    const value = parseFloat(event.target.value)
    if (!isNaN(value)){
      setresultc(value)
    }else{
      setresultc(0)
    }
    if (moneda===0 || moneda===1){
      if (!isNaN(value)){
        setcontent((value*(databcv && databcv.price)).toFixed(3))
      }else{
        setcontent(0)
      }
    }else if (moneda===2){
      if (!isNaN(value)){
        setcontent((value*(data && data.price)).toFixed(3))
      }else{
        setcontent(0)
      }
    }else if (moneda===3){
      if (!isNaN(value)){
        setcontent((value*(datageneral && datageneral.promedio)).toFixed(3))
      }else{
        setcontent(0)
      }
    }else{
      if (!isNaN(value)){
        setcontent((value*(promedioG)).toFixed(3))
      }else{
        setcontent(0)
      }
    }
  }
  function result2(event){
    const promedioG = (datageneral && databcv && data) && ((databcv.price+datageneral.promedio+data.price)/3)
    const value = parseFloat(event.target.value)
    if (!isNaN(value)){
      setresultc2(value)
    }else{
      setresultc2(0)
    }
    if (moneda===0 || moneda===1){
      if (!isNaN(value)){
        setcontent2((value/(databcv && databcv.price)).toFixed(3))
      }else{
        setcontent2(0)
      }
    }else if (moneda===2){
      if (!isNaN(value)){
        setcontent2((value/(data && data.price)).toFixed(3))
      }else{
        setcontent2(0)
      }
    }else if (moneda===3){
      if (!isNaN(value)){
        setcontent2((value/(datageneral && datageneral.promedio)).toFixed(3))
      }else{
        setcontent2(0)
      }
    }else{
      if (!isNaN(value)){
        setcontent2((value/(promedioG)).toFixed(3))
      }else{
        setcontent2(0)
      }
    }
  }
  function valueselect(event){
    const value = parseFloat(event.target.value)
    setMoneda(value)
    setresultc(0)
    setcontent(0)
    setcontent2(0)
    setresultc2(0)
  }
  return (
    <>
      <div className="center" id="element1"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
      <header id='navegation'>
        <div className='display' id='options2'>
          <p className='text'>DolarHoy</p>
          <img src="https://th.bing.com/th/id/OIG2.SaDD6ZRkMSCImqO_MCGr?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="logo" id='logo'/>
        </div>
        <div id='options' className='display'>
          <p className='text'>"Consulta en Tiempo Real"</p>
        </div>
      </header>
      <img src='https://cdn.ttgtmedia.com/visuals/searchVMware/infrastructure_management/vmware_article_021.jpg' className='background1'/>
      <p className='text' id='title'>Control del Dólar a la tasa del día, según tu moneda de preferencia</p>
      <div id='options-menu' className='menu'>
        <button className='button' onClick={change}>Dolar Today</button>
        <button className='button' onClick={change2}>Otras Monedas</button>
      </div>
      <div id='results'>
        <p className='text2'>{string} - {actual_date}</p>
        <div id='images' className='images-display'>
          <img src="https://www.numismatica.info.ve/data/photos/m/v/1bsf/mv1bsf-aa03_r-n-c-1.jpg" alt="bolivar" className='image'/>
          <img src="https://1.bp.blogspot.com/-8hbeBDfvGq8/YCbCNtbz1OI/AAAAAAAAWfQ/u76x9sI7SJYBcitHHYgAjccCBXF8J4fkQCLcBGAsYHQ/s575/BCV1.png" alt="bcv-logo" className='image'/>
          <img src="https://www.pnguniverse.com/wp-content/uploads/2020/11/Escudo-de-Venezuela-958x1024.png" alt="escudo-venezuela" className='image'/>
        </div>
        <div id='values'>
          <div className="fixed">Banco</div>
          <div className="fixed">Valor (Bs)</div>
        </div>
        <div className='displaysi' id='results2'>
            <div className="grid-item">BCV</div>
            <div className="grid-item">{databcv && databcv.price}</div>
            <div className="grid-item">Dolar Paralelo</div>
            <div className="grid-item">{data && data.price}</div>
            <div className="grid-item">Dolar Bitcoin</div>
            <div className="grid-item">{datageneral && datageneral.promedio}</div>
            <div className="grid-item">Promedio General</div>
            <div className="grid-item">{(datageneral && databcv && data) && ((databcv.price+datageneral.promedio+data.price)/3).toFixed(2)}</div>
        </div>
        <div className='calculadora' id='calculadora'>
          <p className='text3'>Conversor</p>
          <select id='tasa' onChange={valueselect}>
            <option value="0">(Selecciona una Tasa)</option>
            <option value="1">Dolar BCV</option>
            <option value="2">Dolar Paralelo</option>
            <option value="3">Dolar Bitcoin</option>
            <option value="4">Promedio General</option>
          </select>
          <p className='text3'>$ → Bs</p>
          <div id='inputs'>
            <input placeholder='Cantidad en $' id='cantidad$' onChange={result}  value={resultc}></input>
            <p className='text3'>=</p>
            <input placeholder='Resultado en Bs' value={content}></input>
          </div>
          <p className='text3'>Bs → $</p>
          <div id='inputs'>
            <input placeholder='Cantidad en Bs' onChange={result2}  value={resultc2}></input>
            <p className='text3'>=</p>
            <input placeholder='Resultado en $' value={content2}></input>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
