import React,{useState} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postEnquiryForm } from '../../store/enquiryFormSlice.js';

const EnquiryForm = () => {

    const navigate = useNavigate();
    const [searchParams]  = useSearchParams();
    const dispatch = useDispatch();

    const [inquiryObj, setInquiryObj] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        enquiryMessage: "",
        courseName: "",
        errors: {
          name: "",
          email: "",
          phoneNumber: ""
        }
    });

    const handleInquiry = (event) => {

        const { name, value } = event.target;

        setInquiryObj(prevState => ({
            ...prevState,
            [name]: value,
            errors :{
                [name]: validate(name,value)
            }
        }));
    }

    const submitForm = (event) => {

        event.preventDefault();

        inquiryObj.courseName = searchParams.get('courseName');

        if(inquiryObj.name !=="" && 
            (inquiryObj.email !== "" || inquiryObj.phoneNumber !== "") && 
            inquiryObj.enquiryMessage!== "") {

            /* axios.post(url,JSON.stringify(inquiryObj),{
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                console.log(res.status);

            }).catch((err) => {
                console.error(err);
            }); */

            dispatch(postEnquiryForm(inquiryObj));

            setInquiryObj({
                name: "",
                phoneNumber: "",
                email: "",
                courseName: "",
                enquiryMessage: "",
                errors: {
                    name: "",
                    email: "",
                    phoneNumber: ""
                }
            });

            navigate("/viewEnquires", { replace: true });

        }else {
            return;
        }
    }

    // generic validation in JS
    const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value) {
          return "First name is Required";
        } else if (!value.match(/^[a-zA-Z]+$/g)) {
          return "Please enter valid first name";
        } else {
          return "";
        }
      case "phoneNumber":
        if(value.match(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/)){
            return "Please enter valid Phone Number";
        }
       break;
      case "email":
        if (!value) {
          return "Email is Required";
        } else if (
          !value.match(
            /^[a-z0-9]([a-z0-9_\-\.]*)@([a-z0-9_\-\.]*)(\.[a-z]{2,4}(\.[a-z]{2}){0,2})$/i
          )
        ) {
          return "Enter a valid email address";
        } else {
          return "";
        }
      case "password":
        if (!value) {
          return "Password is Required";
        } else if (value.length < 8 || value.length > 15) {
          return "Please fill at least 8 character";
        } else if (!value.match(/[a-z]/g)) {
          return "Please enter at least lower character.";
        } else if (!value.match(/[A-Z]/g)) {
          return "Please enter at least upper character.";
        } else if (!value.match(/[0-9]/g)) {
          return "Please enter at least one digit.";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

    return(
        <div className="container">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3>Enquiry Form for Course - {searchParams.get('courseName')}</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="form-group">
                                <form className='col-md-10'>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" 
                                            name="name" value={inquiryObj.name} placeholder="Name"
                                            onChange={handleInquiry} />
                                        <span className="text-danger">{inquiryObj.errors.name}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="text" className="form-control" 
                                            name="phoneNumber" value={inquiryObj.phoneNumber} 
                                            placeholder="Phone Number"
                                            onChange={handleInquiry} />
                                        <span className="text-danger">{inquiryObj.errors.phoneNumber}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" 
                                            name="email" value={inquiryObj.email} 
                                            placeholder="Email"
                                            onChange={handleInquiry} />
                                        <span className="text-danger">{inquiryObj.errors.email}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>Leave Your Message</label>
                                        <textarea  className="form-control" 
                                            name="enquiryMessage" value={inquiryObj.enquiryMessage}
                                             placeholder="Leave Your Message"
                                            onChange={handleInquiry} />
                                    </div>
                                    <button type="submit" className="btn btn-success"
                                        onClick={submitForm}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
            
    );
}

export default EnquiryForm;