import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IOrder } from "../../store/models/order.interface";
import OrderList from "./OrderList";
import TopCard from "../../common/components/TopCard";

import ProductList from "../Products/ProductsList";
import { IProduct } from "../../store/models/product.interface";
import { changeSelectedProduct, clearSelectedProduct } from "../../store/actions/products.action";
import { IStateType } from "../../store/models/root.interface";
import axios from "axios";

const Orders: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const orders: IOrder[] = useSelector((state: IStateType) => state.orders.orders);
    const totalSales: number = orders.reduce((prev, next) => prev + next.totalPrice, 0);
    const totalAmount: number = orders.reduce((prev, next) => prev + next.amount, 0);
    dispatch(updateCurrentPath("orders", "list"));
    dispatch(clearSelectedProduct());

    const [Contadores, setContadores] = React.useState({vaga: "", indica: "", empresa: "", pessoa: "", premio: 0.00});
  
  React.useEffect(() => {
    axios.get("http://192.168.3.100:3000/api/vaga/contab").then((response) => {
      setContadores({vaga: response.data.vaga, indica: response.data.indica, empresa: response.data.empresa, pessoa: response.data.pessoa, premio: response.data.premio   });
    });
  }, []);

    function selectProduct(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
    }



    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Indicacões</h1>
            <p className="mb-4">HeadPrize</p>

            <div className="row">
                <TopCard title="TOTAL DE PRÊMIOS" text={`$${Contadores.premio}`} icon="donate" class="primary" />
                <TopCard title="TOTAL VAGAS" text={`${Contadores.vaga}`} icon="calculator" class="danger" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Lista de indicações</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <OrderList />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
           
            <div className="col-xl-12 col-lg-12">
                    <div className="card card-bottom-list shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Lista de vagas</h6>
                        </div>
                        <ProductList
                            onSelect={selectProduct}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Orders;