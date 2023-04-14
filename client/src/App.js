import { Route, Routes } from "react-router-dom";
import IndexPage from "./components/indexPage/IndexPage";
import LoginPage from "./components/authentication/LoginPage";
import RegisterPage from "./components/authentication/RegisterPage";
import Template from "./components/template/Template";
import axios from 'axios';
import UserState from "./context/UserState";
import AccountPage from "./components/accountPage/AccountPage";
import LoaderState from "./context/loader/LoaderState";

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;

function App() {
  return (
   <>
   <LoaderState>
    <UserState>
      <Routes>
        <Route path='/' element={<Template />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/:subpage/:action' element={<AccountPage />} />
        </Route>
      </Routes>
    </UserState>
   </LoaderState>
   </>
  );
}

export default App;
