import React, { useState, Component,  FormEvent, Dispatch, Fragment } from "react";

import { IStateType, IProductState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IProduct, ProductModificationStatus } from "../../store/models/product.interface";
import TextInput from "../../common/components/TextInput";
import { editProduct, clearSelectedProduct, setModificationState, addProduct } from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import Popup from "reactjs-popup";
import NumberInput from "../../common/components/NumberInput";
import Checkbox from "../../common/components/Checkbox";
import SelectInput from "../../common/components/Select";
import OrderForm from "../Orders/OrderForm";
import { OnChangeModel, IProductFormState } from "../../common/types/Form.types";
import axios from "axios";

const Artigo: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [Artigos, setArtigos] = React.useState({artigo:[{id:"",titulo:"",corpo:"",meta_title:"", meta_description:"", rodape:""}]});
  const [popup, setPopup] = useState(false);
  React.useEffect(() => {
    axios.get("http://192.168.3.100:3000/api/artigo/getAll").then((response) => {
      setArtigos({artigo: response.data.artigo});
    });
  }, []);
  
  const indicaElements: (JSX.Element | null)[] = Artigos.artigo.map(vaga => {
    if (!vaga) { return null; }
   
    
    return (<tr className={`table-row`}
    
    key={`product_${vaga.id}`}>
    <th scope="row">{vaga.id}</th>
    <td>{vaga.titulo}</td>
    <td>{vaga.meta_title}</td>
    <td>{vaga.meta_description}</td>
  
    
  </tr>);
   
    });
  
/*
  const [formState, setFormState] = useState({
    name: { error: "", value: product.name },
    description: { error: "", value: product.description },
    amount: { error: "", value: product.amount },
    price: { error: "", value: product.price },
    hasExpiryDate: { error: "", value: product.hasExpiryDate },
    category: { error: "", value: product.category }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addProduct : editProduct;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IProductFormState, saveFn: Function): void {
    if (product) {
      dispatch(saveFn({
        ...product,
        name: formState.name.value,
        description: formState.description.value,
        price: formState.price.value,
        amount: formState.amount.value,
        hasExpiryDate: formState.hasExpiryDate.value,
        category: formState.category.value
      }));

      dispatch(addNotification("Product edited", `Product ${formState.name.value} edited by you`));
      dispatch(clearSelectedProduct());
      dispatch(setModificationState(ProductModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(ProductModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.amount.error || formState.description.error
      || formState.name.error || formState.price.error || formState.hasExpiryDate.error
      || formState.category.error || !formState.name.value || !formState.category.value) as boolean;
}
*/

  return (
    <Fragment>
       <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">Artigos</h6>
            <div className="header-buttons">
                <button className="btn btn-success btn-green" onClick={() =>
                  setPopup(true)}>
                  <i className="fas fa fa-plus"></i>
                </button>
            
                <button className="btn btn-success btn-red" onClick={() => setPopup(false)}>
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
                        <th scope="col">Titulo </th>
                        <th scope="col">Meta titulo</th>
                        <th scope="col">Meta descricao</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {indicaElements}
                </tbody>
            </table>
        </div>
            
          </div>
        </div>
      </div>
      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick>
      
        <div className="popup-modal">
          <div className="popup-title">
            Artigo Novo
          </div>
     
          <div className="popup-content">
            <OrderForm />
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                
                setPopup(false);
              }}>Registrar
              </button>
          </div>
        </div>
      </Popup>

    </Fragment>
  );
};

export default Artigo;
