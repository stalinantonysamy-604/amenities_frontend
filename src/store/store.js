
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../features/api/api";


export const store = configureStore({
  reducer: {
    
    [api.reducerPath]: api.reducer,

  },
  
  middleware: (getDefaultMiddleware) => {
     
     return getDefaultMiddleware().concat(api.middleware)

  }

  
});

