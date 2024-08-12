import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import VerticalNavBar from "@components/VerticalNavBar"
import styles from '@styles/Dashboard.module.css';
import { useSession } from "next-auth/react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExamResult{
    unitName?: string;
    marks?: number;
    grade?: string;
    semester?: string;
}

interface semesterResults{
    semester?: string;
    results?: ExamResult[];
}

const ExamResults: React.FC = () => {

    let email = "";
    let res: { data: { results: semesterResults[] } } = { data: { results: [] } };
    const { data: sessionData } = useSession()

    useEffect(() => {
        (
            async ()=>{
                try {
                    // const { data } = useSession()
                    email = sessionData?.user?.email || "";
                    console.log(email)
        
                    res  = await axios.post("/api/exam-results", JSON.stringify({ email: email }), {headers:{"Content-Type" : "application/json"} })
                    // let table = document.getElementById("results") as HTMLTableElement
        
                    if (res.data && res.data.results){
                        for (let i=0; i<res.data.results.length;i++){
                            let semester = res.data.results[i].semester || '';
                            if (semester){
                                res.data.results[i].results?.map(( result: ExamResult )=>addRow(result, semester));
                            }
                        }
                    }
                    
        
                    let semesters: string[] = []
                    res.data.results.map(( unit: semesterResults )=>{ 
                        if (semesters.indexOf( unit.semester as string ) === -1){
                            semesters.push( unit.semester as string )
                        }
                    })
        
                    semesters.map((semester)=>addOptions(semester))
        
                } catch (error) {
                    console.log(error) 
                }
            }
        )()
    }, [sessionData])

    const addRow = async (results: ExamResult, semester: string): Promise<void> =>{
        
        let table = document.getElementById("results") as HTMLTableElement | null;
        if (table){
            let row = table.insertRow(-1)

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            
        
            cell1.innerHTML = results?.unitName || '';
            cell2.innerHTML = results?.marks ? results?.marks.toString(): '';
            cell3.innerHTML = results?.grade || '';
            cell4.innerHTML = semester   
        }
    }

    const updateTable = async (value: string): Promise<void> =>{
        try {
            console.log('email2', email)

            console.log('classDropDownOption: ', value)
            let table = document.getElementById("results") as HTMLTableElement || null;

            if (table){
                for (let i = table.rows.length - 1; i > 0; i--){
                    table.deleteRow(i);
                }
                console.log('deleted')
            }
            

            const filtered = res.data.results.filter((results)=>results.semester===value);
            filtered[0].results?.map(( result: ExamResult )=>addRow( result, filtered[0].semester as string ))


        } catch (error) {
            console.log(error)
        }
    }

    const addOptions = ( semester: string ): void =>{
        let classDropDown = document.getElementById("class") as HTMLSelectElement || null;
        let option = document.createElement("option");
        option.text = semester;
        option.value = semester;
        classDropDown.add(option);
    }

    const print = ()=>{
        const doc = new jsPDF()
        autoTable(doc, { html: '#results', theme:'grid' })
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

export default ExamResults;