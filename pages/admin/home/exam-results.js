import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';


const CourseSchedule = () =>{
    const [ action, setAction ] = useState("get")
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");
    

    
    useEffect(()=>{
        (async ()=>{
            try {
            
                const  res  = await axios.post("/api/admin/exam-results", JSON.stringify({ action }), {headers:{"Content-Type" : "application/json"} })
                res.data.results.map((res)=>{addRow(res)})
                res.data.classes.map((className)=>{addOptions(className)})

            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const addRow = async (course)=>{
        
        let table = document.getElementById("results")
        let row = table.insertRow(-1)
        let buttonId = Math.floor((Math.random() * 1000000) + 3);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        let cell9 = row.insertCell(8);        
        let cell10 = row.insertCell(9);
        let cell11 = row.insertCell(0);
        let cell12 = row.insertCell(11);

        // Add some text to the new cells:
        cell1.innerHTML = course?.serviceNumber || "NEW";
        cell2.innerHTML = course?.studentName || "NEW";
        cell3.innerHTML = course?.className || "NEW";
        cell4.innerHTML = course?.unit1 || "NEW";
        cell5.innerHTML = course?.unit2 || "NEW";
        cell6.innerHTML = course?.unit3 || "NEW";
        cell7.innerHTML = course?.unit4 || "NEW";
        cell8.innerHTML = course?.unit5 || "NEW";
        cell9.innerHTML = course?.unit6 || "NEW";
        cell10.innerHTML = course?.unit7 || "NEW";
        cell11.innerHTML = course?.unit8 || "NEW";
        cell12.innerHTML = `<button id=${buttonId}>save</button> <button id=${buttonId + "-del"}>delete</button>`
        

        cell1.setAttribute("contenteditable", true)
        cell2.setAttribute("contenteditable", true)
        cell3.setAttribute("contenteditable", true)
        cell4.setAttribute("contenteditable", true)
        cell5.setAttribute("contenteditable", true)
        cell6.setAttribute("contenteditable", true)
        cell7.setAttribute("contenteditable", true)
        cell8.setAttribute("contenteditable", true)
        cell9.setAttribute("contenteditable", true)
        cell10.setAttribute("contenteditable", true)
        cell11.setAttribute("contenteditable", true)

        let editButton = document.getElementById(buttonId);
        let deleteButton = document.getElementById(`${buttonId+"-del"}`);

        editButton.addEventListener('click', async (e) => {
            e.preventDefault()
            setSuccessMessage("")

            let clickedElement = e.target
            let clickedRow = clickedElement.parentNode.parentNode;

            let serviceNumber = clickedRow.children[0].innerHTML
            let studentName = clickedRow.children[1].innerHTML
            let semester = clickedRow.children[2].innerHTML
            let unit1 = clickedRow.children[3].innerHTML
            let unit2 = clickedRow.children[4].innerHTML
            let unit3 = clickedRow.children[5].innerHTML
            let unit4 = clickedRow.children[6].innerHTML
            let unit5 = clickedRow.children[7].innerHTML
            let unit6 = clickedRow.children[8].innerHTML
            let unit7 = clickedRow.children[9].innerHTML
            let unit8 = clickedRow.children[10].innerHTML

            let className = document.getElementById("class").value

            const  res  = await axios.post("/api/admin/exam-results", JSON.stringify({ action: "add", serviceNumber, studentName, semester, className, unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8 }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            setSuccessMessage("Success")
            
        });

        deleteButton.addEventListener('click', async (e) => {
            e.preventDefault()
            setSuccessMessage("")

            console.log(e.target)
            let clickedElement = e.target
            let clickedRow = clickedElement.parentNode.parentNode;
            console.log(clickedRow.children[0].innerHTML)
            let serviceNumber = clickedRow.children[0].innerHTML
            let studentName = clickedRow.children[1].innerHTML
            let semester = clickedRow.children[2].innerHTML
            const  res  = await axios.post("/api/admin/exam-results", JSON.stringify({ action: "delete", serviceNumber, studentName, semester }), {headers:{"Content-Type" : "application/json"} })
            // console.log( res)
            clickedRow.remove()
            setSuccessMessage("Success")
            
        });
        
    }

    const updateTable = async (value)=>{
        try {
            
            console.log('classDropDownOption: ', value)
            let table = document.getElementById("results")

            for(let i = table.rows.length - 1; i > 0; i--)
            {
                table.deleteRow(i);
            }
            console.log('deleted')
            const  res  = await axios.post("/api/admin/exam-results", JSON.stringify({ action, className: value }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res.data.students)
            res.data.results.map((student)=>{addRow(student)})
        } catch (error) {
            console.log(error)
        }
    }

    const addOptions = (classes) =>{
        let classDropDown = document.getElementById("class")
        let option = document.createElement("option");
        option.text = classes.className;
        option.value = classes.className;
        classDropDown.add(option);
    }

    return (
        <div className={styles.Dashboard}>
            <AdminNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="body">
                    <select name="class" id="class" onChange={(e)=>updateTable(e.target.value)}>
                        <option value=""></option>
                    </select>

                    <table id="results">
                        <tbody>
                        <tr id="10">
                            
                            <th>Service number</th>
                            <th>Student name</th>
                            <th>Semester</th>
                            

                            <th>unit 1</th>
                            <th>unit 2</th>
                            <th>unit 3</th>
                            <th>unit 4</th>
                            <th>unit 5</th>
                            <th>unit 6</th>
                            <th>unit 7</th>
                            <th>unit 8</th>

                            <th>Action</th>
                        </tr>
                        </tbody>
                        
                        
                    </table>
                    { successMessage && <p id="successMessage">{successMessage}</p>
                        // && setTimeout(()=>{
                        //     setSuccessMessage("")
                        // }, 3000)
                    }
                    <div className="row">
                        <button onClick={addRow}>Add new row</button>
                    </div>
                    
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
