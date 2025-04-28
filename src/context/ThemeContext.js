import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => { 
    const [theme, setTheme] = useState(false);

    const changeTheme = () => {
        setTheme(prevTheme => !prevTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children} {/* Corrected to use lower case `children` */}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
