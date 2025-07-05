import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayEnquiry = (props) => {

    const navigate = useNavigate();
    
    const displayEnquiries = (enquiryList) => {
        if(enquiryList) {   
            return enquiryList.map((item) => {
                return (<tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.courseName}</td>
                    <td>{item.enquiryMessage}</td>
                </tr>);
            })
        }
    }

    return(
        <div>
            <table className='table table-condensed col-md-12'>
                <thead>
                    <th className='col-md-2'>Name</th>
                    <th className='col-md-2'>Email</th>
                    <th className='col-md-2'>Phone Number</th>
                    <th className='col-md-3'>Course Name</th>
                    <th className='col-md-3'>Enquiry</th>
                </thead>
                <tbody>
                    {displayEnquiries(props.listOfEnquiry)}
                </tbody>
            </table>
            <br />
            <br />
            <br />
            <button type="button" className='btn btn-primary' 
                onClick={() => {navigate("/")}}>
                    Back
            </button>
        </div>
    );
}

export default DisplayEnquiry;