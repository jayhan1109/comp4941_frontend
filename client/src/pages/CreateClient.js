import React, {useState} from 'react';
import axios from 'axios';

const CreateClient = () => {
    const [formData, setFormData] = useState({firstName: '', lastName: ''})

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('http://localhost:30735/api/Clients', formData);
            console.log(res);
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div></div>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text"className="form-control" onChange={onChange} name="firstName" value={formData.firstName}/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control"  onChange={onChange} name="lastName" value={formData.lastName}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateClient