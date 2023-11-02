import React, { useContext, useState } from "react";
import axios from "axios";
import { baseURL } from "../api/baseUrl";

const AppContext = React.createContext();

const SnackbarContext = React.createContext({
  isDisplayed: false,
  displayMsg: (msg) => {},
  onClose: () => {},
});

const AuthProvider = ({ children }) => {
// SET NCID TO A STATE
const[NcId,setNcId]=useState('')
const [selectedProgram, setSelectedProgram] = useState({});
 const[afterloadData,setAfterloadData]=useState({}) 
 const[SheetId,setSheetId]=useState('');
 const[FormattedDate , setFormattedDate] = useState('');

  
  return (
    <AppContext.Provider
      value={{
        NcId,setNcId,selectedProgram, setSelectedProgram,afterloadData,setAfterloadData
        ,SheetId,setSheetId,FormattedDate , setFormattedDate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AuthProvider, SnackbarContext };
