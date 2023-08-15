import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import VerticalNavBar from "@components/VerticalNavBar"
import styles from '@styles/Dashboard.module.css';
import { useSession } from "next-auth/react";


const examResults = () =>{
    
    (async ()=>{
        try {
            const { data } = useSession()
            let email = data.user.email
            // // console.log(email)

            const  res  = await axios.post("/api/exam-results", JSON.stringify({ email: email }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res.data.results[0].results)
            // res.data.results.map((result)=>addRow(result))
            for (let i=0; i<res.data.results.length;i++){
                console.log(i)
                let semester = res.data.results[i].semester
                // let grade = res.data.results[i]?.grade
                res.data.results[i].results.map((result)=>addRow(result, semester))
            }

            let semesters = []
            res.data.results.map((unit)=>{
                if (semesters.indexOf(unit.semester) === -1){
                    semesters.push(unit.semester)
                }
            })

            // console.log(semesters)
            semesters.map((semester)=>addOptions(semester))

        } catch (error) {
            console.log(error)
        }
    })()

    const addRow = async (results, semester)=>{
        
        let table = document.getElementById("results")
        let row = table.insertRow(-1)

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        // let cell3 = row.insertCell(2);
        let cell3 = row.insertCell(2);
        
       
        cell1.innerHTML = results?.unitName
        cell2.innerHTML = results?.marks
        // cell3.innerHTML = grade  
        cell3.innerHTML = semester        
    }

    const updateTable = async (value)=>{
        try {

            // const { data } = useSession()
            // let email = data.user.email
            
            console.log('classDropDownOption: ', value)
            let table = document.getElementById("results")

            for(let i = table.rows.length - 1; i > 0; i--)
            {
                table.deleteRow(i);
            }
            console.log('deleted')

            const  res  = await axios.post("/api/exam-results", JSON.stringify({ email: email }), {headers:{"Content-Type" : "application/json"} })

            const filtered = res.data.results.filter((unit)=>results.semester===value)
            console.log(filtered)
            // const  res  = await axios.post("/api/admin/exam-results", JSON.stringify({ action, className: value }), {headers:{"Content-Type" : "application/json"} })
            // // console.log(res.data.students)
            // console.log(res.data.units)
            // modifyColumnName(res.data.units)
            // res.data.examResults.map((student)=>{addRow(student)})
        } catch (error) {
            console.log(error)
        }
    }

    const addOptions = (semester) =>{
        let classDropDown = document.getElementById("class")
        let option = document.createElement("option");
        option.text = semester;
        option.value = semester;
        classDropDown.add(option);
    }

    return (
        <div className={styles.Dashboard}>
            <VerticalNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="body">
                    <select name="class" id="class" onChange={(e)=>updateTable(e.target.value)}>
                        <option value=""></option>
                    </select>

                    <table id="results">
                        <tbody>
                        <tr id="10">
                            
                            <th>Unit name</th>
                            <th>Total marks</th>
                            {/* <th>Grade</th> */}
                            <th>Semester</th>
                            
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

export default examResults;
