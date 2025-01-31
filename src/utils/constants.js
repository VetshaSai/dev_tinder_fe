// these two are backend api host address
//export const BASE_URL = "http://localhost:7777"; -- for local 
//export const BASE_URL = "/api"; -- for prod

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:7777" : "/api";