import React, { useState, useEffect } from 'react';
import DisplayEnquiry from './DisplayEnquiry.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEnquiresList } from '../../store/viewEnquiresSlice.jsx';


const ViewEnquires = () => {

    const [listOfEnquires, setListOfEnquires] = useState([]);
    const enquiryList = useSelector((state) => state.viewEnquires.enquiresList);
    const dispatch = useDispatch();

    console.log(enquiryList)

    useEffect(() => {
        dispatch(fetchEnquiresList());
    }, [dispatch]);

    useEffect(() => {
        if (enquiryList)
            setListOfEnquires(enquiryList)
    }, [enquiryList]);

    return (
        <div className='container'>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <center>
                        <h3>List of Enquires</h3>
                    </center>
                </div>
                <div className="panel-body">
                    <DisplayEnquiry listOfEnquiry={enquiryList} />
                </div>
            </div>
        </div>
    );
}

export default ViewEnquires;