import axios from "axios";

 const API_URL ="http://localhost:5000"

 export const listLogEntries = async()=>{
    const res = await axios.get(`${API_URL}/api/logs`)
    return res.data
}


export const createLogEntry = async(entry) =>{
    console.log(entry);
    const res = await axios.post(`${API_URL}/api/logs`,entry, {
        headers:{
            "Content-Type": "application/json",
        }
      })
    return res.data
}