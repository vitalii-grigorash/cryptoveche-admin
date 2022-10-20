import Auth from "../Auth/Auth";
import { Route, Routes} from "react-router-dom";
import React, {useState, useEffect} from "react";
import Reg from "../Reg/Reg";
import * as en from '../../utils/Localization/En/constants';
import * as ru from '../../utils/Localization/Ru/constants';
import AuthForgetPass from "../AuthForgetPass/AuthForgetPass";

function App() {

    const [constants, setConstants] = useState(ru.constants);
    const [changeLanguageBtn, setChangeLanguageBtn] = useState(false);

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
        </Routes>
    </div>
  );
}
export default App;
