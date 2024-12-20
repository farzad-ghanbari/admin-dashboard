import { createContext, useContext, useEffect, useReducer } from "react";
import { useTranslation } from 'react-i18next';
import appReduser from "./app/app-reduser";


const AppContext = createContext();

const initialState = {
    language: localStorage.getItem('language') || 'fa',
    theme: localStorage.getItem('theme') || 'light',
    showSidebar: false
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReduser, initialState);
    const { i18n } = useTranslation();

    const changeLanguage = (language) => {
        dispatch({ type: 'CHANGE_LANGUAGE', payload: language });
    };

    const changeTheme = (theme) => {
        dispatch({ type: 'CHANGE_THEME', payload: theme });
    }

    const toggleSidebar = () => {
        dispatch({type: 'TOGGLE_SIDEBAR'});
    }

    useEffect(() => {
        i18n.changeLanguage(state.language);
        localStorage.setItem("language", state.language);
        document.body.dataset.direction = state.language === 'fa' ? 'rtl' : 'ltr';
        document.body.dataset.sidebarPosition = state.language === 'fa' ? 'right' : 'left';
    }, [state.language]);

    useEffect(() => {
        localStorage.setItem("thme", state.theme)
    }, [state.theme])

    return <AppContext.Provider value={{ ...state, changeLanguage, changeTheme, toggleSidebar }}>
        {children}
    </AppContext.Provider>
};

const useAppContext = () => {
    return useContext(AppContext);
}

export { useAppContext, AppProvider }

