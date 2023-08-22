import { createContext, useState } from "react";
export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
    const [result, setResult] = useState();
    const [isLoading, setLoading] = useState(false);
    return (
        <ResultContext.Provider value={{ result, setResult, isLoading, setLoading }}>
            {children}
        </ResultContext.Provider>
    )
}