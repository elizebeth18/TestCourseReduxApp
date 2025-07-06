import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseList,selectCourseList } from '../../store/courseListSlice.jsx';

const ListCourses = () => {

    const [courses,setCourses] = useState([]);
    const navigate = useNavigate();
    const courseList =  useSelector(selectCourseList);
    const dispatch =  useDispatch();
    

    useEffect(()=>{
        setCourses(courseList);
    },[courseList]);

    useEffect(()=>{
        dispatch(fetchCourseList());
    },[]);

    const displayCourses = (cData) => {
        if(cData){
            return cData.map((item) => {
                return (<div className='col-md-4 courseDiv' data-testid="item" key={Math.random(1)}>
                    <div className='col-md-12'>
                        <img src={item.img} alt={item.name} style={{width: '100%'}}/>
                    </div>
                    <div className='col-md-12 text-center' style={{margin: 10}}>
                        <span>{item.details}</span>
                    </div>
                    <center>
                        <button className='btn btn-primary'
                            onClick={() => {navigate('enquiryForm?courseName='+item.name,{ replace: true })}}>
                                Enquiry
                        </button>
                    </center>
                </div>)
            });
        }
    }
    return(
        <div>
            <div className='col-md-12'>
                {displayCourses(courses)}
            </div>
        </div>
    );
}

export default ListCourses;