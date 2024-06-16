// import { createContext,useState,useContext, Children } from "react";

// const ThemeContext = createContext()

// export const ThemeProvider = ({Children}) => {
//     const [theme,setTheme] = useState(false)

//     const changeTheme = () => {
//         setTheme(prevState => !prevState)
//     }
//     return (
//         <ThemeContext.Provider value={{theme,changeTheme}}>
//             {Children}
//         </ThemeContext.Provider>
//     )

// }

// export const useTheme = () => useContext(ThemeContext)

import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => { // Corrected children prop
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
