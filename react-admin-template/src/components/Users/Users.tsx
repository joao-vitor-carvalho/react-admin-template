import React, { Fragment, Dispatch } from "react";
import TopCard from "../../common/components/TopCard";
import { IUser } from "../../store/models/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { addAdmin, removeAdmin } from "../../store/actions/users.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import axios from "axios";

const Users: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("user", "list"));
  
  const users: IUser[] = useSelector((state: IStateType) => state.users.users);
  const admins: IUser[] = useSelector((state: IStateType) => state.users.admins);

  function setUserAdmin(user: IUser): void {
    dispatch(addAdmin(user));
  }

  function setUserNotAdmin(admin: IUser): void {
    dispatch(removeAdmin(admin)); 
  }
  const [Usuarios, setUsuarios] = React.useState({usuarios:[{id:"",nome:"",email:"",tel_celular:"",tipoId:0}]});

  React.useEffect(() => {
    axios.get("http://192.168.3.100:3000/api/auth/getAll").then((response) => {
      setUsuarios({usuarios: response.data.usuario});
    });
  }, []);
  
let tipo = "Pessoal";
let numE = 0;
let numP = 0;
  const usuarioElements: (JSX.Element | null)[] = Usuarios.usuarios.map(usuario => {
    if (!usuario) { return null; }
    if(usuario.tipoId === 3){tipo = "Empresa"; numE++;}
    if(usuario.tipoId === 4){tipo = "Pessoal";numP++;}
    return (<tr className={`table-row`}
    
      key={`product_${usuario.id}`}>
      <th scope="row">{usuario.id}</th>
      <td>{usuario.nome}</td>
      <td>{usuario.email}</td>
      <td>{usuario.tel_celular}</td>
      <td>{tipo}</td>
      
    </tr>);
  });
 
  const userElements: JSX.Element[] = users.map(user => {
    return (
      <tr className={`table-row`}
        key={`user_${user.id}`}>
        <th scope="row">{user.id}</th>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td><button className="btn btn-success" onClick={() => setUserAdmin(user)}>Set admin</button> </td>
      </tr>);
  });

  const adminElements: JSX.Element[] = admins.map(admin => {
    return (
      <tr className={`table-row`}
        key={`user_${admin.id}`}>
        <th scope="row">{admin.id}</th>
        <td>{admin.firstName}</td>
        <td>{admin.email}</td>
        <td><button className="btn btn-danger" onClick={() => setUserNotAdmin(admin)}>Remover admin</button> </td>
      </tr>);
  });

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Usuários</h1>
      <p className="mb-4">Users here</p>

      <div className="row">
        <TopCard title="ADMINS" text={admins.length.toString()} icon="user-tie" class="primary" />
        <TopCard title="USER" text={Usuarios.usuarios.length.toString()} icon="user" class="danger" />
      </div>
{Usuarios.usuarios[0].tipoId}
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Administradores</h6>
              <div className="header-buttons">
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
                      <th scope="col">Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminElements}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Usuários</h6>
              <div className="header-buttons">
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
                    {usuarioElements}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default Users;
