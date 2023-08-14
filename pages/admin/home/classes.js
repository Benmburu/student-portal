import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';


// import classesStyles from '@styles/classesStyles.module.css'

const classesSchedule = () =>{
    // const [ users, setUsers ] = useState([])
    // const [ school, setSchool] = useState("SITDS")
    // const [ classes_code, setclassesCode ] = useState("12345")
    // const [ classesName, setclassesName ] = useState("Diploma in ICT")
    const [ action, setAction ] = useState("get")
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");
    

    
    useEffect(()=>{
        (async ()=>{
            try {
            
                const  res  = await axios.post("/api/admin/classes", JSON.stringify({ action }), {headers:{"Content-Type" : "application/json"} })
                res.data.map((res)=>{addRow(res)})

            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const addRow = (classes)=>{
        let table = document.getElementById("classess")
        let row = table.insertRow(-1)

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        
        cell1.innerHTML = classes.className
        cell2.innerHTML = classes.school
        cell3.innerHTML = classes.course
        cell4.innerHTML = `<button id=${classes.className}>save</button> <button id=${classes.className+"-del"}>delete</button>`

        cell1.setAttribute("contenteditable", true)
        cell2.setAttribute("contenteditable", true)
        cell3.setAttribute("contenteditable", true)

        let editButton = document.getElementById(classes.className);
        let deleteButton = document.getElementById(`${classes.className+"-del"}`);

        editButton.addEventListener('click', async (e) => {
            e.preventDefault()
            setSuccessMessage("")

            let clickedElement = e.target
            let clickedRow = clickedElement.parentNode.parentNode;
            console.log(clickedRow.children[0].innerHTML)
            let className = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let course = clickedRow.children[2].innerHTML
            const  res  = await axios.post("/api/admin/classes", JSON.stringify({ action: "add", className, school, course }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            setSuccess()
            
        });

        deleteButton.addEventListener('click', async (e) => {
            e.preventDefault()
            setSuccessMessage("")

            console.log(e.target)
            let clickedElement = e.target
            let clickedRow = clickedElement.parentNode.parentNode;
            console.log(clickedRow.children[0].innerHTML)
            let className = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let course = clickedRow.children[2].innerHTML
            const  res  = await axios.post("/api/admin/classes", JSON.stringify({ action: "delete", className, school, course }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            clickedRow.remove()
            setSuccess()
            
        });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        
        
        let table = document.getElementById("classess")
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
            let className = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let course = clickedRow.children[2].innerHTML
            const  res  = await axios.post("/api/admin/classes", JSON.stringify({ action: "add", className, school, course }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            setSuccess()
            
        });

        deleteButton.addEventListener('click', async (e) => {
            e.preventDefault()
            setSuccessMessage("")

            console.log(e.target)
            let clickedElement = e.target
            let clickedRow = clickedElement.parentNode.parentNode;
            console.log(clickedRow.children[0].innerHTML)
            let className = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let course = clickedRow.children[2].innerHTML
            const  res  = await axios.post("/api/admin/classes", JSON.stringify({ action: "delete", className, school, course }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            clickedRow.remove()
            setSuccess()
            
        });
        
    }

    const setSuccess = ()=>{
        setSuccessMessage("Success")
        setTimeout(()=>{
            setSuccessMessage("")
        }, 3000)
    }

    return (
        <div className={styles.Dashboard}>
            <AdminNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="body">
                    <table id="classess">
                        <tbody>
                        <tr>
                            
                            <th>Class name</th>
                            <th>School</th>
                            <th>Course</th>
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

                    #classess td, th {
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

export default classesSchedule;
