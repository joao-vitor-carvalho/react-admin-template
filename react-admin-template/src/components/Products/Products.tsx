import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ProductList from "./ProductsList";

import TopCard from "../../common/components/TopCard";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeProduct, clearSelectedProduct, setModificationState,
  changeSelectedProduct } from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import axios from "axios";
const Products: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = products.products.length;
 
 
  const [popup, setPopup] = useState(false);
  const [Vagas, setVagas] = React.useState({vagas:[{id:"",titulo:"",descricao:"",valor_premio:"",salario:"", status:""}]});


  useEffect(() => {
    dispatch(clearSelectedProduct());
    dispatch(updateCurrentPath("products", "list"));
  }, [path.area, dispatch]);

  function onProductSelect(product: IProduct): void {
    dispatch(changeSelectedProduct(product));
    dispatch(setModificationState(ProductModificationStatus.None));
  }

  function onProductRemove() {
    if(products.selectedProduct) {
      setPopup(true);
    }
  }

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
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Vagas</h1>
      <p className="mb-4">Vagas abertas</p>
      <div className="row">
        <TopCard title="Vagas disponíveis" text={`${numE}`} icon="box" class="primary" />
        <TopCard title="Premios " text={`${premios}`} icon="warehouse" class="danger" />
        
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Lista de vagas</h6>
              
            </div>
            <div className="card-body">
            <div className="table-responsive portlet">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Titulo</th>
                      <th scope="col">Prêmio</th>
                      <th scope="col">Salario</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {vagaElements}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
      </div>


      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Are you sure?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!products.selectedProduct) {
                  return;
                }
            
                dispatch(removeProduct(products.selectedProduct.id));
                dispatch(clearSelectedProduct());
                setPopup(false);
              }}>Remove
              </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default Products;
