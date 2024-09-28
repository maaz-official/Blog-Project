// actions.js
import {
    SET_OPEN_CONFIGURATOR,
    SET_SIDENAV_COLOR,
    SET_SIDENAV_TYPE,
    SET_FIXED_NAVBAR,
  } from "./actionTypes";
  
  export const setOpenConfigurator = (open) => ({
    type: SET_OPEN_CONFIGURATOR,
    payload: open,
  });
  
  export const setSidenavColor = (color) => ({
    type: SET_SIDENAV_COLOR,
    payload: color,
  });
  
  export const setSidenavType = (sidenavType) => ({
    type: SET_SIDENAV_TYPE,
    payload: sidenavType,
  });
  
  export const setFixedNavbar = (fixed) => ({
    type: SET_FIXED_NAVBAR,
    payload: fixed,
  });
  