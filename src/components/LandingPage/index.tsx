import React, {useState,useEffect} from 'react';
import axios from 'axios';
import styles from './styles.module.scss';
import { Button, ButtonGroup, Form, FormControl, InputGroup } from 'react-bootstrap';
import { BsTrash } from "react-icons/bs";
import Swal from 'sweetalert2';
export interface Imenus{
  key:number,
  id:number,
  nome:string,
  valor:string
}

export function LandingPage(){  
  const [request,setRequest] = useState(false);
  const [menu,setMenu] = useState<Imenus[]>([]);    
  const [menuSelected,setMenuSelected] = useState<Imenus[]>([]);
  const [itemMenuSelected,setItemMenuSelected] = useState(0);

  useEffect(()=>{
    getMenus();    
  },[]);

  const handleRequest = ()=>{
    if(request == true){
      setMenuSelected([]);
    }
    setRequest(!request);
  } 
  const getRandomNumber = ()=>{
    return Math.floor(Math.random() * 10000);
  }

  const getMenus  = async () =>{
    const response = await axios.get('https://pizzaria.roxo.dev.br/');       
    let dataGeneral = [];
    response.data.map((resp)=>{
      dataGeneral.push({
        key: getRandomNumber(),
        id:resp.id,
        nome:resp.nome,
        valor:resp.valor
      })
    })    
    setMenu(dataGeneral);              
  }
  const handleMenuSelected=() =>{        
    if(itemMenuSelected == 0){      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecione um sabor antes de clicar em adicionar.',        
      })
      return;
    } 
    if(menuSelected.findIndex(e=>e.id == itemMenuSelected) >= 0){      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Este sabor já foi adicionado anteriormente.',        
      })
      return;
    }

    let itemSelecionado = menu.find((m)=> m.id == itemMenuSelected)
    let newMenuSelected = [...menuSelected,itemSelecionado];   
    
    setMenuSelected(newMenuSelected);    
    calculateSubTotal(newMenuSelected);
  }
  
  const handleChangeSelect = (event)=>{ 
    setItemMenuSelected(event.target.value);
  }

  const handleRemoveItem = (key) =>{    
    const newMenuSelected = menuSelected.filter(e => e.key != key);
    setMenuSelected(newMenuSelected);
    calculateSubTotal(newMenuSelected);
  }

  const calculateSubTotal = (dados)=>{             
      let newData = [];      
      dados.map((e)=>{        
        newData.push({
          key: getRandomNumber(),
          id: e.id,
          nome: e.nome,
          valor: `${parseFloat(menu.find((teste) => teste.id == e.id).valor) / dados.length}`
        })
      })      
      setMenuSelected(newData)
  }

  return(
    <>
    <section className={`${styles.container}`}>
      <div className={`${styles.containerLeft}`}>       
          <img src="/img/logo.png"/>        
          <h1>Boa, Saborosa e Inesquecível</h1>   
          <table>
            <thead>
              <tr>
                <th className={`${styles.tdAlignLeft}`}>Sabor</th>                
                <th className={`${styles.tdAlignRight}`}>Valor</th>
              </tr>
            </thead>
            <tbody>              
              {menu.map((item) =>{
                return(<tr key={item.id}>
                  <td className={`${styles.tdAlignLeft}`}>{item.nome}</td>                  
                  <td className={`${styles.tdAlignRight}`}>
                    {parseFloat(item.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                </tr>)
              })}              
            </tbody>
          </table>          
      </div>
      {!request && 
      <div className={`${styles.containerRight}`}>
        <img src="/img/pizzaiolo.png"/>
        <p>Seja bem vindo, confira nossa Lista de sabores.</p>
        <Button onClick={handleRequest}>Realizar pedido</Button>        
      </div>
      }

    {request && 
      <div className={`${styles.containerRequest}`}>   
      <img src="/img/pizzaiolo.png"/> 
      <div className={`${styles.containerActions}`}>
       <select onChange={handleChangeSelect}>        
       <option key={0} value={0}>-- Selecione --</option> 
         {menu.map((item) =>{
           return(<option key={item.key} value={item.id}>{item.nome}</option>)
         })}                           
       </select>
        <button onClick={handleMenuSelected} className={`${styles.add}`}>Adicionar</button>
        <button onClick={handleRequest}>Cancelar</button>
       </div>  
      
         <div className={`${styles.containerSelectedList}`}>
         <p>Sabores Selecionados</p>         
             <table>
            <thead>
              <tr>
                <th className={`${styles.tdAlignLeft}`}>Sabor</th>                
                <th className={`${styles.tdAlignRight}`}>Sub Total</th>
              </tr>
            </thead>
            <tbody>              
              {menuSelected.map((item) =>{
                return(<tr key={item.key}>
                  <td className={`${styles.tdAlignLeft}`}>{item?.nome}</td>                  
                  <td className={`${styles.tdAlignRight}`}>{parseFloat(item?.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} 
                  <button onClick={() =>handleRemoveItem(item.key)} title="Remover"><BsTrash /></button></td>
                </tr>)
              })}              
            </tbody>
            {menuSelected.length > 0 && (
              <tfoot>
              <tr>
                <td className={`${styles.tdAlignLeft}`}>Total</td>
                <td className={`${styles.tdAlignRight}`}>{menuSelected.reduce((a,b) =>{return a+= parseFloat(b.valor)},0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
              </tr>
            </tfoot>
            )}            
          </table>            
        </div>         
      </div>
      }      
    </section>
    </>
  )
}