import React, { useState, FormEvent, Fragment, Dispatch } from "react";
import { IProduct } from "../../store/models/product.interface";
import TextInput from "../../common/components/TextInput";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, IOrderFormState } from "../../common/types/Form.types";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../store/actions/orders.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { clearSelectedProduct, changeProductAmount } from "../../store/actions/products.action";
import { IStateType } from "../../store/models/root.interface";
import axios from "axios";
const OrderForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const selectedProduct: IProduct | null = useSelector((state: IStateType) => state.products.selectedProduct);
    const initialFormState: IOrderFormState = {
        titulo: { error: "", value: "" },
        corpo: { error: "", value: "" },
        meta_title: { error: "", value: "" },
        meta_description: { error: "", value: "" },
        rodape: { error: "", value: "" },
    };

    const [formState, setFormState] = useState(initialFormState);

    function hasAmountChanged(model: OnChangeModel): void {
       
       
        setFormState({
            ...formState
        });

    }

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function resetForm(): void {
        setFormState(initialFormState);
    }

    function saveOrder(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        saveForm(formState);
    }

    function saveForm(formState: IOrderFormState): void {

          var titulo = formState.titulo.value;
          var corpo = formState.corpo.value;

          axios.post("http://192.168.3.100:3000/api/artigo/nova",
            { 
              titulo,corpo
               
            }).then(response => {
                dispatch(addNotification("Artigo adicionado", `Artigo ${formState.titulo.value} adicionado por vocÊ`));  
                ;
                resetForm();
                
                
            });  
            
            
         
        }
    

    function isFormInvalid(): boolean {
        return (formState.titulo.error || formState.corpo.error
            || formState.meta_title.error || formState.meta_description.error || !formState.titulo.value
            ) as boolean;
    }

    function getDisabledClass(): string {
        let isError: boolean =  isFormInvalid();
        return isError ? "disabled" : "";
    }

    return (
        <Fragment>
            <div className="card shadow mb-6">
                <div className="card-header py-6">
                    <h6 className="m-0 font-weight-bold text-green">Create order</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={saveOrder}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <TextInput id="input_name"
                                    value={formState.titulo.value}
                                    field="titulo"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={100}
                                    label="Título"
                                    placeholder="Título do seu artigo" />
                            </div>
                            

                           
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <TextInput id="input_name"
                                    value={formState.corpo.value}
                                    field="corpo"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={10000}
                                    label="Corpo"
                                    placeholder="Corpo do seu artigo" />
                            </div>
                            

                           
                        </div>
                        <button className="btn btn-danger" onClick={() => resetForm()}>Reset</button>
                        <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Create</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default OrderForm;
