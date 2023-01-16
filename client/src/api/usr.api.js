import axios from "axios";


export const getUsrRequest = async (rfc) =>
    await axios.get(`http://localhost:3000/usr/${rfc}`);