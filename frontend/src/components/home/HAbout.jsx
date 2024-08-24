import React from "react";
import Heading from "../common/heading/Heading";
import "../allcourses/courses.css";  // You might want to rename this to something like "jobs.css" for clarity
import { jobCard } from "../../dummydata";  // Assuming jobCard has been defined in dummydata.js

const HAbout = () => {
  return (
    <>
      <section className='homeAbout'>
        <div className='container'>
          <Heading subtitle='Success Stories' title='Discover How We Connect Talent with Opportunity' />

          <div className='jobCard'>
            <div className='grid2'>
              {jobCard.slice(0, 3).map((val) => (
                <div className='items' key={val.id}>
                  <div className='content flex'>
                    <div className='left'>
                      <div className='img'>
                        <img src={val.cover} alt={val.jobTitle} />
                      </div>
                    </div>
                    <div className='text'>
                      <h1>{val.jobTitle}</h1>
                      <div className='company'>
                        <h4>{val.companyName}</h4>
                        <p>{val.location}</p>
                      </div>
                      <div className='details'>
                        <div className='box'>
                          <div className='dimg'>
                            <img src={val.courTeacher[0].dcover} alt={val.companyName} />
                          </div>
                          <div className='para'>
                            <h4>{val.courTeacher[0].name}</h4>
                            <span>{val.courTeacher[0].totalTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='salary'>
                    <h3>Salary: {val.salary}</h3>
                  </div>
                  <button className='outline-btn'>APPLY NOW</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HAbout;
