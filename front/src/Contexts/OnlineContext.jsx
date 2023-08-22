import { createContext, useEffect, useState } from "react";
export const OnlineContext = createContext();
export const OnlineProvider = ({ children }) => {
    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {
        const online = window.addEventListener('online', () => setOnline(true))
        const offline = window.addEventListener('offline', () => setOnline(false))

        return () => {
            window.removeEventListener('online', online);
            window.removeEventListener('offline', offline);
        }
    }, [])

    return (
        <OnlineContext.Provider value={{ online }}>
            {children}
        </OnlineContext.Provider>
    )
}