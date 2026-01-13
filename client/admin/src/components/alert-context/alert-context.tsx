import type React from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { AlertContextType, AlertState } from "../../types/alert.type";
import AlertModal from "../alert-modal/AlertModal";


const AlertCtx=createContext<AlertContextType|undefined>(undefined);
export function useAlert(){
    const ctx=useContext(AlertCtx);
    if(!ctx) throw new Error("useAlert must be used within AlertProvider");
    return ctx;
}
export function AlertProvider({children}:{children:React.ReactNode}){
    const [state,setState]=useState<AlertState>({open:false, title:""});
    const showAlert=useCallback((opts:Omit<AlertState,"open">)=>{
        setState({open:true,...opts});
    },[setState]);
    const hideAlert = useCallback(() => setState((s) => ({ ...s, open: false })), []);
    const value=useMemo(()=>({showAlert,hideAlert}),[showAlert,hideAlert]);
    return(
        <AlertCtx.Provider value={value}>
            <AlertModal
            open={state.open}
            onOpenChange={(open)=>setState(s=>({...s,open}))}
            title={state.title}
            description={state.description}
            type={state.type ?? "info"}
            autoClose={state.autoClose}
            primaryAction={state.primaryAction}
            secondaryAction={state.secondaryAction}
            />
            {children}
        </AlertCtx.Provider>
    )
}