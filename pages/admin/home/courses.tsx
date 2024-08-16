import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';

interface Courses{
    course_code: string;
    school: string;
    course_name: string;
}

const Course: React.FC = () =>{

    const [ action, setAction ] = useState<string>("get")
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ successMessage, setSuccessMessage ] = useState<string>("");

    
    useEffect(()=>{
        (async ()=>{
            try {
                const  res  = await axios.post("/api/admin/courses", JSON.stringify({ action }), {headers:{"Content-Type" : "application/json"} })

                res.data.map(( res: Courses )=>{addRow(res)})
                
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
    
    const addRow = ( course: Courses ): void =>{
        let table = document.getElementById("courses") as HTMLTableElement;
        let row = table.insertRow(-1)

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        
        cell1.innerHTML = course.course_code
        cell2.innerHTML = course.school
        cell3.innerHTML = course.course_name
        cell4.innerHTML = `<button id=${course.course_code}>save</button> <button id=${course.course_code+"-del"}>delete</button>`

        cell1.setAttribute("contenteditable", "true")
        cell2.setAttribute("contenteditable", "true")
        cell3.setAttribute("contenteditable", "true")

        let editButton = document.getElementById(course.course_code) as HTMLButtonElement;
        let deleteButton = document.getElementById(`${course.course_code+"-del"}`) as HTMLButtonElement;

        editButton.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault()
            setSuccessMessage("")

            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode as HTMLTableRowElement;

            let course_code = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let course_name = clickedRow.children[2].innerHTML
            await axios.post("/api/admin/courses", JSON.stringify({ action: "add", course_code, school, course_name }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            setSuccess()
            
        });

        deleteButton.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault()
            setSuccessMessage("")

            // console.log(e.target)
            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode as HTMLTableRowElement;
            // console.log(clickedRow.children[0].innerHTML)

            let course_code = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let course_name = clickedRow.children[2].innerHTML
            await axios.post("/api/admin/courses", JSON.stringify({ action: "delete", course_code, school, course_name }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            clickedRow.remove()
            setSuccess()
            
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>): Promise<void> =>{
        e.preventDefault()
        
        
        
        let table = document.getElementById("courses") as HTMLTableElement;
        let row = table.insertRow(-1)
        let buttonId = Math.floor((Math.random() * 10000) + 3).toString();

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        // Add some text to the new cells:
        cell1.innerHTML = 'NEW';
        cell2.innerHTML = "";
        cell3.innerHTML = "";
        cell4.innerHTML = `<button id=${buttonId}>save</button> <button id=${buttonId + "-del"}>delete</button>`
        

        cell1.setAttribute("contenteditable", "true")
        cell2.setAttribute("contenteditable", "true")
        cell3.setAttribute("contenteditable", "true")

        let editButton = document.getElementById(buttonId) as HTMLButtonElement;
        let deleteButton = document.getElementById(`${buttonId+"-del"}`) as HTMLButtonElement;

        editButton.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault()
            setSuccessMessage("")

            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode as HTMLTableRowElement;
            console.log(clickedRow.children[0].innerHTML)
            let course_code = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let course_name = clickedRow.children[2].innerHTML
            const  res  = await axios.post("/api/admin/courses", JSON.stringify({ action: "add", course_code, school, course_name }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            setSuccess()
            
        });

        deleteButton.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault()
            setSuccessMessage("")

            // console.log(e.target)
            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode as HTMLTableRowElement;
            console.log(clickedRow)
            let course_code = clickedRow.children[0].innerHTML
            let school = clickedRow.children[1].innerHTML
            let course_name = clickedRow.children[2].innerHTML
            const  res  = await axios.post("/api/admin/courses", JSON.stringify({ action: "delete", course_code, school, course_name }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            clickedRow.remove()
            setSuccess()
            
        });
        
    }

    const setSuccess = (): void =>{
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
                <div className="info">
                    <table id="courses">
                        <tbody>
                        <tr>
                            
                            <th>Course_code</th>
                            <th>School</th>
                            <th>Course name</th>
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

export default Course;
