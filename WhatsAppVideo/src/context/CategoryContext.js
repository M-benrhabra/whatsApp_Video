import React, {createContext, useState} from 'react';

// create context
export const CategoryContext = createContext(null);

export const CategoryProvider = ({children}) => {
  const [infos, setInfos] = useState({id: null});

  return (
    <CategoryContext.Provider value={{infos, setInfos}}>
      {children}
    </CategoryContext.Provider>
  );
};
