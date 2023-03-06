import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IProductState, IStateType } from "../../store/models/root.interface";
import ProductList from "../Products/ProductsList";
import { IOrder } from "../../store/models/order.interface";
import OrderList from "../Orders/OrderList";
import axios from "axios";

const Home: React.FC = () => {

  


  const [Contadores, setContadores] = React.useState({vaga: "", indica: "", empresa: "", pessoa: "", premio: 0.00});
  
  React.useEffect(() => {
    axios.get("http://192.168.3.100:3000/api/vaga/contab").then((response) => {
      setContadores({vaga: response.data.vaga, indica: response.data.indica, empresa: response.data.empresa, pessoa: response.data.pessoa, premio: response.data.premio   });
    });
  }, []);

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("home", ""));

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <p className="mb-4">Resumo das operações</p>

      <div className="row">
        <TopCard title="Vagas" text={`${Contadores.vaga}`} icon="box" class="primary" />
        <TopCard title="Indicações" text={`${Contadores.indica}`} icon="warehouse" class="danger" />
        <TopCard title="Prêmios" text={`$${Contadores.premio}`} icon="dollar-sign" class="success" />
      </div>

      <div className="row">
        <TopCard title="Pessoas" text={Contadores.pessoa} icon="donate" class="primary" />
        <TopCard title="Empresas" text={Contadores.empresa} icon="calculator" class="danger" />
      </div>

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Vagas</h6>
            </div>
            <div className="card-body">
              <ProductList />
            </div>
          </div>

        </div>

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Indicações</h6>
            </div>
            <div className="card-body">
              <OrderList />
            </div>
          </div>
        </div>

      </div>

    </Fragment>
  );
};

export default Home;
