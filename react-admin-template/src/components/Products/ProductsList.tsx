import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IProductState } from "../../store/models/root.interface";
import { IProduct } from "../../store/models/product.interface";
import axios from "axios";


export type productListProps = {
  onSelect?: (product: IProduct) => void;
  children?: React.ReactNode;
};

function ProductList(props: productListProps): JSX.Element  {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const [Vagas, setVagas] = React.useState({vagas:[{id:"",titulo:"",descricao:"",valor_premio:"",salario:"", status:""}]});
  React.useEffect(() => {
    axios.get("http://192.168.3.100:3000/api/vaga/getAll").then((response) => {
      setVagas({vagas: response.data.vaga});
    });
  }, []);
  
let situacao= "Aberta";
let numE = 0;
let premios = 0.00;

  const vagaElements: (JSX.Element | null)[] = Vagas.vagas.map(vaga => {
    if (!vaga) { return null; }
    if(vaga.status === "Aberto"){
      numE++;
      premios = premios + parseFloat(vaga.valor_premio);
    }
    return (<tr className={`table-row`}
    
    key={`product_${vaga.id}`}>
    <th scope="row">{vaga.id}</th>
    <td>{vaga.titulo}</td>
    <td>{vaga.valor_premio}</td>
    <td>{vaga.salario}</td>
  
    
  </tr>);
   
    });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titulo</th>
            <th scope="col">Premio</th>
            <th scope="col">Salario</th>
            
          </tr>
        </thead>
        <tbody>
          {vagaElements}
        </tbody>
      </table>
    </div>

  );
}

export default ProductList;
