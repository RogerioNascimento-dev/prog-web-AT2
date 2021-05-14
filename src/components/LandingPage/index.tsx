import {useState,useEffect} from 'react';
import axios from 'axios';
import styles from './styles.module.scss';

export interface Imenus{
  id:number,
  nome:string,
  valor:string
}

export function LandingPage(){

  const [pedido,setPedido] = useState(false);
  const [menu,setMenu] = useState<Imenus[]>([]);
  const handlePedido = ()=>{
    console.log('Realizar pedido');
  }
  useEffect(()=>{
    getMenus();    
  },[]);

  const getMenus  = async () =>{
    const response = await axios.get('https://pizzaria.roxo.dev.br/');         
    setMenu(response.data);     
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
      {!pedido && 
      <div className={`${styles.containerRight}`}>
        <img src="/img/pizzaiolo.png"/>
        <p>Seja bem vindo, confira nossa Lista de sabores.</p>
        <button onClick={handlePedido}>Realizar pedido</button>
      </div>
      }
      
    </section>
    </>
  )
}