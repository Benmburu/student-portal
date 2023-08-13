import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';


const StudentRegistration = () =>{
    const [ action, setAction ] = useState("get")
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");
    // const [ classDropDownOption, setClassDropDownOption ] = useState("")


    useEffect(()=>{
        (async ()=>{
            try {
                const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action, className: "" }), {headers:{"Content-Type" : "application/json"} })
                res.data.students.map((student)=>{addRow(student)})
                res.data.classes.map((className)=>{addOptions(className)})
                
            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const updateTable = async (value)=>{
        try {
            
            console.log('classDropDownOption: ', value)
            let table = document.getElementById("courses")

            for(let i = table.rows.length - 1; i > 0; i--)
            {
                table.deleteRow(i);
            }
            console.log('deleted')
            const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action, className: value }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res.data.students)
            res.data.students.map((student)=>{addRow(student)})
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

    const addRow = (course)=>{
        let table = document.getElementById("courses")
        let row = table.insertRow(-1)

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        
        cell1.innerHTML = course.serviceNumber
        cell2.innerHTML = course.name
        cell3.innerHTML = course.email
        cell4.innerHTML = `<button id=${course.serviceNumber}>save</button> <button id=${course.serviceNumber+"-del"}>delete</button>`

        cell1.setAttribute("contenteditable", true)
        cell2.setAttribute("contenteditable", true)
        cell3.setAttribute("contenteditable", true)

        let editButton = document.getElementById(course.serviceNumber);
        let deleteButton = document.getElementById(`${course.serviceNumber+"-del"}`);

        editButton.addEventListener('click', async (e) => {
            e.preventDefault()
            setSuccessMessage("")

            let clickedElement = e.target
            let clickedRow = clickedElement.parentNode.parentNode;
            console.log(clickedRow.children[0].innerHTML)
            let serviceNumber = clickedRow.children[0].innerHTML
            let name = clickedRow.children[1].innerHTML
            let email = clickedRow.children[2].innerHTML
            let className = document.getElementById('class').value 
            const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action: "add", serviceNumber, name, email, className }), {headers:{"Content-Type" : "application/json"} })
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
            let name = clickedRow.children[1].innerHTML
            let email = clickedRow.children[2].innerHTML
            let className = document.getElementById('class').value
            const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action: "delete", serviceNumber, name, email, className }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            clickedRow.remove()
            setSuccessMessage("Success")
            
        });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        
        
        let table = document.getElementById("courses")
        let row = table.insertRow(-1)
        let buttonId = Math.floor((Math.random() * 10000) + 3);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        // Add some text to the new cells:
        cell1.innerHTML = 'NEW';
        cell2.innerHTML = "NEW";
        cell3.innerHTML = "NEW";
        cell4.innerHTML = `<button id=${buttonId}>save</button> <button id=${buttonId + "-del"}>delete</button>`
        

        cell1.setAttribute("contenteditable", true)
        cell2.setAttribute("contenteditable", true)
        cell3.setAttribute("contenteditable", true)

        let editButton = document.getElementById(buttonId);
        let deleteButton = document.getElementById(`${buttonId+"-del"}`);

        editButton.addEventListener('click', async (e) => {
            e.preventDefault()
            setSuccessMessage("")

            let clickedElement = e.target
            let clickedRow = clickedElement.parentNode.parentNode;
            console.log(clickedRow.children[0].innerHTML)
            let serviceNumber = clickedRow.children[0].innerHTML
            let name = clickedRow.children[1].innerHTML
            let email = clickedRow.children[2].innerHTML
            let className = document.getElementById('class').value
            const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action: "add", serviceNumber, name, email, className }), {headers:{"Content-Type" : "application/json"} })
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
            let name = clickedRow.children[1].innerHTML
            let email = clickedRow.children[2].innerHTML
            let className = document.getElementById('class').value
            const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action: "delete", serviceNumber, name, email, className }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            clickedRow.remove()
            setSuccessMessage("Success")
            
        });
        
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

                    <table id="courses">
                        <tbody>
                        <tr>
                            
                            <th>serviceNumber</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        </tbody>
                        
                        
                    </table>
                    { successMessage && <p className="success">{successMessage}</p> }
                    <div className="row">
                        <button onClick={handleSubmit}>Add new row</button>
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

                    #courses td, th {
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

                    .success{
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

export default StudentRegistration;