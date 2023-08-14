import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import VerticalNavBar from "@components/VerticalNavBar"
import styles from '@styles/Dashboard.module.css';


const CourseSchedule = () =>{

    useEffect(()=>{
        (async ()=>{
            try {
            
                const  res  = await axios.post("/api/admin/course-schedule", JSON.stringify({ action: "get" }), {headers:{"Content-Type" : "application/json"} })
                res.data.map((res)=>{addRow(res)})

            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const addRow = async (course)=>{
        
        let table = document.getElementById("schedule")
        let row = table.insertRow(-1)
        // let buttonId = Math.floor((Math.random() * 1000000) + 3);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        // let cell4 = row.insertCell(3);

        // Add some text to the new cells:
        cell1.innerHTML = course?.activity
        cell2.innerHTML = course?.startDate
        cell3.innerHTML = course?.endDate
        
    }

    return (
        <div className={styles.Dashboard}>
            <VerticalNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="body">
                    <table id="schedule">
                        <tbody>
                        <tr>
                            
                            <th>Activity</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                        </tbody>
                        
                        
                    </table>
                    
                </div>
            </div>
            
            <style jsx>
                {
                    `
                    .body{
                        height: 100%;
                        color: black;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }

                    #schedule td, th {
                        border: 1px solid #000000;
                        text-align: left;
                        padding: 8px;
                      }

                    tr:nth-child(even) {
                        background-color: #dddddd;
                    }

                    button{
                        margin: 12px;
                        width: 9em;
                        height: 45px;
                        background-color: inherit;
                        color: black;
                        border: 2px solid black;
                        border-radius: 5px;
                    }

                    .row{
                        display: flex;
                    }

                    #successMessage{
                        background-color: rgba(103, 230, 143, 0.1);
                        padding: 5px;
                        border: 1px solid #67e68f;
                        border-radius: 4px;
                        color: #67e68f;
                        margin-bottom: 10px;
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 13px;
                    `
                }
            </style>
        </div>
    )
}

export default CourseSchedule;
