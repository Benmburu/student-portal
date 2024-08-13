import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';

interface Class{
    className: string;
    school: string;
    courseCode: string;
    course: string;
}

const ClassesSchedule: React.FC = () =>{
    const [ action, setAction ] = useState("get")
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");
    

    
    useEffect(()=>{
        (async (): Promise<void> =>{
            try {
            
                const  res  = await axios.post<Class[]>("/api/admin/classes", JSON.stringify({ action }), {headers:{"Content-Type" : "application/json"} })
                res.data.map(( res: Class )=>{addRow(res)})

            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const addRow = ( classes: Class ): void =>{
        let table = document.getElementById("classess") as HTMLTableElement;
        let row = table.insertRow(-1)

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        
        cell1.innerHTML = classes.className
        cell2.innerHTML = classes.school
        cell3.innerHTML = classes.courseCode
        cell4.innerHTML = classes.course
        cell5.innerHTML = `<button id=${classes.className}>save</button> <button id=${classes.className+"-del"}>delete</button>`

        cell1.setAttribute("contenteditable", "true")
        cell2.setAttribute("contenteditable", "true")
        cell3.setAttribute("contenteditable", "true")
        cell4.setAttribute("contenteditable", "true")

        let editButton = document.getElementById(classes.className) as HTMLButtonElement;
        let deleteButton = document.getElementById(`${classes.className+"-del"}`) as HTMLButtonElement;

        editButton.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault()
            setSuccessMessage("")

            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode as HTMLTableRowElement;
            console.log(clickedRow.children[0].innerHTML)
            let className = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let courseCode = clickedRow.children[2].innerHTML
            let course = clickedRow.children[3].innerHTML
            const  res  = await axios.post("/api/admin/classes", JSON.stringify({ action: "add", className, school, courseCode, course }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            setSuccess()
            
        });

        deleteButton.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault()
            setSuccessMessage("")

            console.log(e.target)
            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode  as HTMLTableRowElement;
            console.log(clickedRow.children[0].innerHTML)
            let className = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let courseCode = clickedRow.children[3].innerHTML
            let course = clickedRow.children[3].innerHTML
            const  res  = await axios.post("/api/admin/classes", JSON.stringify({ action: "delete", className, school, courseCode, course }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            clickedRow.remove()
            setSuccess()
            
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>): Promise<void> =>{
        e.preventDefault()
        
        
        
        let table = document.getElementById("classess") as HTMLTableElement;
        let row = table.insertRow(-1)
        let buttonId = Math.floor((Math.random() * 10000) + 3).toString();

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        // Add some text to the new cells:
        cell1.innerHTML = "";
        cell2.innerHTML = "";
        cell3.innerHTML = "";
        cell4.innerHTML = "";
        cell5.innerHTML = `<button id=${buttonId}>save</button> <button id=${buttonId + "-del"}>delete</button>`
        

        cell1.setAttribute("contenteditable", "true")
        cell2.setAttribute("contenteditable", "true")
        cell3.setAttribute("contenteditable", "true")
        cell4.setAttribute("contenteditable", "true")

        let editButton = document.getElementById(buttonId) as HTMLButtonElement;
        let deleteButton = document.getElementById(`${buttonId+"-del"}`) as HTMLButtonElement;

        editButton.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault()
            setSuccessMessage("")

            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode as HTMLTableRowElement;
            console.log(clickedRow.children[0].innerHTML)
            let className = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let courseCode = clickedRow.children[2].innerHTML
            let course = clickedRow.children[3].innerHTML
            const  res  = await axios.post("/api/admin/classes", JSON.stringify({ action: "add", className, school, courseCode, course }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            setSuccess()
            
        });

        deleteButton.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault()
            setSuccessMessage("")

            console.log(e.target)
            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode as HTMLTableRowElement;
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

    const setSuccess = (): void =>{
        setSuccessMessage("Success")
        setTimeout((): void =>{
            setSuccessMessage("")
        }, 3000)
    }

    return (
        <div className={styles.Dashboard}>
            <AdminNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="info">
                    <table id="classess">
                        <tbody>
                        <tr>
                            
                            <th>Class name</th>
                            <th>School</th>
                            <th>Course code</th>
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

export default ClassesSchedule;
