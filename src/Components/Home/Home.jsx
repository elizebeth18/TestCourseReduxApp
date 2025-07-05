import React from 'react';
import './Home.css';
import ListCourses from '../ListCourses/ListCourses';

const Home = () => {

    return (
        <div>
            <center>
                <h2>List of Courses</h2>
            </center>
            <ListCourses />
        </div>
    )
}

export default Home;