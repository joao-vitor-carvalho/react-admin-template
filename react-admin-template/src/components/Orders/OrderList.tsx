import React, { } from "react";
import { useSelector } from "react-redux";
import { IOrder } from "../../store/models/order.interface";
import { IStateType } from "../../store/models/root.interface";
import axios from "axios";
const OrderList: React.FC = () => {
    
    

    const [Indicas, setIndicas] = React.useState({indicacao:[{id:"",indicadorId:"",usuarioId:"",vagaId:""}]});
  
    React.useEffect(() => {
      axios.get("http://192.168.3.100:3000/api/indica/list").then((response) => {
        setIndicas({indicacao: response.data.indicacao});
      });
    }, []);
    
  let situacao= "Aberta";
  let numE = 0;
  let premios = 0.00;
  
    const indicaElements: (JSX.Element | null)[] = Indicas.indicacao.map(vaga => {
      if (!vaga) { return null; }
     
        numE++;
     
      return (<tr className={`table-row`}
      
      key={`product_${vaga.id}`}>
      <th scope="row">{vaga.id}</th>
      <td>{vaga.usuarioId}</td>
      <td>{vaga.indicadorId}</td>
      <td>{vaga.vagaId}</td>
    
      
    </tr>);
     
      });
  

    return (
        
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Indicador</th>
                        <th scope="col">VagaId</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {indicaElements}
                </tbody>
            </table>
        </div>
    )
}

export default OrderList;