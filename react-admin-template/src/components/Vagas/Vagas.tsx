import React, { Fragment, Dispatch, useState, useEffect } from "react";
import ProductList from "./VagasList";
import ProductForm from "./VagasForm";
import TopCard from "../../common/components/TopCard";
import "./Vagas.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeProduct, clearSelectedProduct, setModificationState,
  changeSelectedProduct } from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import axios from "axios";

const Vagas: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = products.products.length;
  const totalPrice: number = products.products.reduce((prev, next) => prev + ((next.price * next.amount) || 0), 0);
  const totalAmount: number = products.products.reduce((prev, next) => prev + (next.amount || 0), 0);
  const [popup, setPopup] = useState(false);
  const [Usuarios, setUsuarios] = React.useState({vagas:[{id:"",nome:"",email:"",tel_celular:"",tipoId:0}]});

  React.useEffect(() => {
    axios.get("http://localhost:3000/api/auth/getAll").then((response) => {
      setUsuarios({vagas:response.data.usuario});
    });
  }, []);
  
let tipo = "Pessoal";
let numE = 0;
let numP = 0;
  const vagaElements: (JSX.Element | null)[] = Usuarios.vagas.map(vaga => {
    if (!vaga) { return null; }
    if(vaga.tipoId === 3){tipo = "Empresa"; numE++;}
    if(vaga.tipoId === 4){tipo = "Pessoal";numP++;}
    return (<tr className={`table-row`}
    
      key={`product_${vaga.id}`}>
      <th scope="row">{vaga.id}</th>
      <td>{vaga.nome}</td>
      <td>{vaga.email}</td>
      <td>{vaga.tel_celular}</td>
      <td>{tipo}</td>
      
    </tr>);
  });
 
  //const numberUsersCount: number = Usuarios.length;
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

  


  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Products</h1>
      <p className="mb-4">Products here</p>
      <div className="row">
        <TopCard title="Usuários" text={`${Usuarios.vagas.length}`} icon="box" class="primary" />
        <TopCard title="Empresas" text={`${numE}`} icon="warehouse" class="danger" />
        <TopCard title="Pessoas" text={`${numP}`} icon="dollar-sign" class="success" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Product List</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(ProductModificationStatus.Create))}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(ProductModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onProductRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
          
         <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Telefone</th>
            <th scope="col">Tipo</th>
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
        {((products.modificationState === ProductModificationStatus.Create)
          || (products.modificationState === ProductModificationStatus.Edit && products.selectedProduct)) ?
          <ProductForm /> : null}
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
                dispatch(addNotification("Product removed", `Product ${products.selectedProduct.name} was removed`));
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

export default Vagas;
