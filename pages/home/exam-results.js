import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import VerticalNavBar from "@components/VerticalNavBar"
import styles from '@styles/Dashboard.module.css';
import { useSession } from "next-auth/react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function ExamResults(){

    let email = "";
    let res = "";
    const { data } = useSession()

    useEffect(async ()=>{
        try {
            // const { data } = useSession()
            email = data?.user?.email
            console.log(email)

            res  = await axios.post("/api/exam-results", JSON.stringify({ email: email }), {headers:{"Content-Type" : "application/json"} })
            let table = document.getElementById("results")

            for (let i=0; i<res.data.results.length;i++){
                let semester = res.data.results[i].semester
                res.data.results[i].results.map((result)=>addRow(result, semester))
            }

            let semesters = []
            res.data.results.map((unit)=>{ 
                if (semesters.indexOf(unit.semester) === -1){
                    semesters.push(unit.semester)
                }
            })

            semesters.map((semester)=>addOptions(semester))

        } catch (error) {
            console.log(error) 
        }
    }, [data])

    const addRow = async (results, semester, grade)=>{
        
        let table = document.getElementById("results")
        let row = table.insertRow(-1)

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        
       
        cell1.innerHTML = results?.unitName
        cell2.innerHTML = results?.marks
        cell3.innerHTML = results?.grade  
        cell4.innerHTML = semester        
    }

    const updateTable = async (value)=>{
        try {
            console.log('email2', email)

            console.log('classDropDownOption: ', value)
            let table = document.getElementById("results")

            for(let i = table.rows.length - 1; i > 0; i--)
            {
                table.deleteRow(i);
            }
            console.log('deleted')

            const filtered = res.data.results.filter((results)=>results.semester===value)
            filtered[0].results.map((result)=>addRow(result, filtered[0].semester))


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

    const print = ()=>{
        const doc = new jsPDF()
        doc.autoTable({ html: '#results', theme:'grid' })
        doc.save('table.pdf')
    }

    return (
        <div className={styles.Dashboard}>
            <VerticalNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="info">
                    <select name="class" id="class" onChange={(e)=>updateTable(e.target.value)}>
                        <option value="">Select semester</option>
                    </select>

                    <button onClick={print}>Print results</button>

                    <table id="results">
                        <tbody>
                        <tr id="10">
                            
                            <th>Unit name</th>
                            <th>Total marks</th>
                            <th>Grade</th>
                            <th>Semester</th>
                            
                        </tr>
                        </tbody>
                        
                        
                    </table>
                    
                </div>
            </div>
            
            <style jsx>
                {
                    `
                    

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

