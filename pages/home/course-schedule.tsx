import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import VerticalNavBar from "@components/VerticalNavBar"
import styles from '@styles/Dashboard.module.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Course{
    activity?: string;
    startDate?: string;
    endDate?: string;
}


const CourseSchedule: React.FC = () =>{

    useEffect(()=>{
        (async ()=>{
            try {
            
                const  res  = await axios.post("/api/admin/course-schedule", JSON.stringify({ action: "get" }), {headers:{"Content-Type" : "application/json"} });
                res.data.map(( res: Course )=>{addRow( res )});

            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const addRow = async (course: Course): Promise<void> =>{
        
        let table = document.getElementById("schedule") as HTMLTableElement || null;
        if (table){
            let row = table.insertRow(-1);

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = course?.activity || '';
            cell2.innerHTML = course?.startDate || '';
            cell3.innerHTML = course?.endDate || '';
        }
    }

    const print = (): void =>{
        const doc = new jsPDF()
        autoTable(doc, { html: '#schedule', theme:'grid' })
        doc.save('table.pdf')
    }

    return (
        <div className={styles.Dashboard}>
            <VerticalNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="info">
                    <button onClick={print}>Print schedule</button>
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
