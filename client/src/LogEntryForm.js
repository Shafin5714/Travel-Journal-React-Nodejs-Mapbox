import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import { createLogEntry } from "./Api";

const LogEntryForm = ({location, onClose}) => {
    const { register,handleSubmit} = useForm()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const onSubmit = async(data)=>{
        console.log(data);
        try {
            setLoading(true)
            data.latitude = location.latitude
            data.longitude = location.longitude
            const entry =await createLogEntry(data)
            console.log(entry);
            onClose()
            
        } catch (error) {
            console.error(error);
            setError(error.message)
            setLoading(false)
        }
      
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            {error ? <h3>{error}</h3>:null}
            <label htmlFor="Title">Title</label>
            <input type="text" name="title" required ref={register}/>
            <label htmlFor="comments">Comments</label>
            <textarea name="description" rows={3} ref={register}></textarea>
            <label htmlFor="image">Image</label>
            <input type="text" name="image" id="" ref={register}/>
            <label htmlFor="visitDate" ref={register}>VisitDate</label>
            <input type="date" name="visitDate"/>
            <button disabled={loading}>{loading ? "Loading" :"Create Log Entry"}</button>
        </form>
    )
}

export default LogEntryForm
