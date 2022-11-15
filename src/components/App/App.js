import {Route, Routes, useLocation} from "react-router-dom";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { config } from '../../config';
import * as en from '../../utils/Localization/En/constants';
import * as ru from '../../utils/Localization/Ru/constants';
import Auth from "../Auth/Auth";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import OrganizationsList from "../OrganizationsList/OrganizationsList";
import AddNewOrganization from "../AddNewOrganization/AddNewOrganization";
import ProfileUser from "../ProfileUser/ProfileUser";
import * as UserAuth from '../../Api/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import GroupUsers from "../GroupUsers/GroupUsers";
import ListUsers from "../ListUsers/ListUsers";
import AddNewGroupUsers from "../AddNewGroupUsers/AddNewGroupUsers";
// import Reg from "../Reg/Reg";
// import AuthSetPass from "../AuthSetPass/AuthSetPass";
// import AuthForgetPass from "../AuthForgetPass/AuthForgetPass";

function App() {

    const [constants, setConstants] = useState(ru.constants);
    const [changeLanguageBtn, setChangeLanguageBtn] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(true);
    const { pathname } = useLocation();

    function handleLangChange(value) {
        const lang = {
            lang: value
        }
        if (value === 'ru') {
            setConstants(ru.constants);
            localStorage.setItem('lang', JSON.stringify(lang));
            setChangeLanguageBtn(true);
        } else {
            setConstants(en.constants);
            localStorage.setItem('lang', JSON.stringify(lang));
            setChangeLanguageBtn(false);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('lang')) {
            const storageLang = localStorage.getItem('lang');
            const lang = JSON.parse(storageLang);
            if (lang.lang === 'en') {
                setConstants(en.constants);
                setChangeLanguageBtn(false);
            } else {
                setConstants(ru.constants);
                setChangeLanguageBtn(true);
            }
        } else {
            setConstants(ru.constants);
        }
    }, []);


  return (
    <div className="app">
        {isLoggedIn && (
            <Header constants={constants}/>
        )}
        <Routes>
            <Route path={'/auth'} element={<Auth
                handleLangChange={handleLangChange}
                constants={constants}
                changeLanguageBtn={changeLanguageBtn}/>}/>
            <Route path={'/reg'} element={<Reg
                handleLangChange={handleLangChange}
                constants={constants}
                changeLanguageBtn={changeLanguageBtn}
            />}/>
            <Route path={'/forget-pass'} element={<AuthForgetPass
                handleLangChange={handleLangChange}
                constants={constants}
                changeLanguageBtn={changeLanguageBtn}
            />}/>
            <Route path={'/rstpwd'} element={<AuthSetPass
                handleLangChange={handleLangChange}
                constants={constants}
                changeLanguageBtn={changeLanguageBtn}
            />}/>
            <Route exact path={'/'} element={<OrganizationsList
                constants={constants}
            />}/>
            <Route path={'/add-org-page'} element={<AddNewOrganization
                constants={constants}
            />}/>
            <Route path={'/add-new-group'} element={<AddNewGroupUsers
                constants={constants}
            />}/>
            <Route path={'/profile-user'} element={<ProfileUser
                constants={constants}
            />}/>
            <Route path={'/group-users'} element={<GroupUsers
                constants={constants}
            />}/>
            <Route path={'/list-users'} element={<ListUsers
                constants={constants}
            />}/>
        </Routes>
        {isLoggedIn && (
            <Footer
                handleLangChange={handleLangChange}
                constants={constants}
                changeLanguageBtn={changeLanguageBtn}
            />)}
    </div>
  );
}
export default App;
