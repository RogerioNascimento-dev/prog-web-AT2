import React, {useState,useEffect} from 'react';
import axios from 'axios';
import styles from './styles.module.scss';
import { Button, ButtonGroup, Form, FormControl, InputGroup } from 'react-bootstrap';

export interface Imenus{
  id:number,
  nome:string,
  valor:string
}

export function LandingPage(){  
  const [request,setRequest] = useState(false);
  const [menu,setMenu] = useState<Imenus[]>([]);
  const [menuSelected,setMenuSelected] = useState<Imenus[]>([]);
  
  const handleRequest = ()=>{
    setRequest(!request);
  }
  useEffect(()=>{
    getMenus();    
  },[]);

  const getMenus  = async () =>{
    const response = await axios.get('https://pizzaria.roxo.dev.br/');         
    setMenu(response.data);     
  }
  const handleMenuSelected=(id =2) =>{
    let menuTemp = menuSelected;
    let selecionado = menu.find((m)=> m.id == id);
    menuTemp.push(selecionado);
    setMenuSelected(menuTemp);
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
                  <td className={`${styles.tdAlignRight}`}>{parseFloat(item.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
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
       <select>
         <optgroup label="Sabores das pizzas">    
         {menu.map((item) =>{
           return(<option value={item.id}>{item.nome}</option>)
         })}                  
         </optgroup>
       </select>
        <button onClick={handleMenuSelected} className={`${styles.add}`}>Adicionar</button>
        <button onClick={handleRequest}>Cancelar</button>
       </div> 

       <ul>
         {menuSelected.map((item)=>{
           return(<li>item.nome</li>)
         })}         
      </ul> 
      </div>
      }
      
    </section>
    </>
  )
}