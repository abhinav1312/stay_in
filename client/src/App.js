import { Route, Routes } from "react-router-dom";
import IndexPage from "./components/indexPage/IndexPage";
import LoginPage from "./components/authentication/LoginPage";
import RegisterPage from "./components/authentication/RegisterPage";
import Template from "./components/template/Template";
import axios from 'axios';
import UserState from "./context/UserState";
// import AccountPage from "./components/accountPage/AccountPage";
import LoaderState from "./context/loader/LoaderState";
import NewAccomodation from "./components/accountPage/accomodation/newAccomodation/NewAccomodation";
import SecTemplate from "./components/template/SecTemplate";
import ProfilePage from "./components/accountPage/profile/ProfilePage";
import AccomodationPage from "./components/accountPage/accomodation/AccomodationPage";
import AccomodationList from "./components/accountPage/accomodation/accomodationList/AccomodationList";

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
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='account' element={<SecTemplate />}>
            <Route index element = {<ProfilePage />} />
            <Route path='bookings' element = {<h1>Booking</h1>} />
            <Route path='accomodations' element={<AccomodationPage />} />
            <Route path='accomodations/add_new' element={<NewAccomodation />} />
            <Route path='accomodations/accomodation_list' element={<AccomodationList />} />
            <Route path='accomodations/accomodation_list/:id' element={<NewAccomodation />} />
          </Route>
        </Route>
      </Routes>
    </UserState>
   </LoaderState>
   </>
  );
}

export default App;
