import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';


// import courseStyles from '@styles/courseStyles.module.css'

const Course = () =>{
    // const [ courses, setCourses ] = useState([])
    // const [ school, setSchool] = useState("SITDS")
    // const [ course_code, setCourseCode ] = useState("12345")
    // const [ courseName, setCourseName ] = useState("Diploma in ICT")
    const [ action, setAction ] = useState("get")
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");

    
    useEffect(()=>{
        (async ()=>{
            try {
            
                // const {res} = await axios.post("/api/admin/courses", JSON.stringify({ action: "get" }), {headers:{"Content-Type" : "application/json"} })
                const  res  = await axios.post("/api/admin/courses", JSON.stringify({ action }), {headers:{"Content-Type" : "application/json"} })
                // setCourses(res.data)

                res.data.map((res, index)=>{addRow(res, index)})
                // console.log(res.data)
                // console.log(courses)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const handleSave = (e)=>{
        console.log(e)
    }

    const addRow = (course, index)=>{
        let table = document.getElementById("courses")
        let row = table.insertRow(-1)

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        // let cell5 = row.insertCell(4);
        // let cell6 = row.insertCell(5);

        // Add some text to the new cells:
        cell1.innerHTML = '<input type="checkbox">';
        // cell2.innerHTML = index;
        cell2.innerHTML = course.school
        cell3.innerHTML = course.course_code
        cell4.innerHTML = course.course_name
        // cell6.innerHTML = '<button onclick={code=this.parentElement.parentElement.children[2].textContent;console.log(code);await axios.post("/api/admin/courses", JSON.stringify({ code }), {headers:{"Content-Type" : "application/json"} });}>save</button> <button onclick={code=this.parentElement.parentElement.children[2].textContent;>delete</button>';

        cell1.setAttribute("contenteditable", false)
        cell2.setAttribute("contenteditable", true)
        cell3.setAttribute("contenteditable", true)
        cell4.setAttribute("contenteditable", true)
        // cell5.setAttribute("contenteditable", true)
        // cell6.setAttribute("contenteditable", true)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        
        
        let table = document.getElementById("courses")
        let row = table.insertRow(-1)

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        // let cell5 = row.insertCell(4);
        // let cell6 = row.insertCell(5);

        // Add some text to the new cells:
        cell1.innerHTML = '<input type="checkbox">';
        cell2.innerHTML = "NEW";
        cell3.innerHTML = "NEW";
        cell4.innerHTML = "NEW";
        // cell5.innerHTML = "NEW CELL2";
        // cell6.innerHTML = "<button>save</button> <button>delete</button>";

        cell1.setAttribute("contenteditable", false)
        cell2.setAttribute("contenteditable", true)
        cell3.setAttribute("contenteditable", true)
        cell4.setAttribute("contenteditable", true)
        // cell5.setAttribute("contenteditable", true)
        // cell6.setAttribute("contenteditable", true)
        
    }

    const handleDelete = async ()=>{
        // console.log('delete')
        let table = document.getElementById('courses');
        let length = table.children[0].children.length ;
        for (let row = 1; row < length; row++){
            // console.log(i)
            // let row = i
            // console.log(table)
            let check = table.children[0].children[row].children[0].children[0].checked 
            let code = table.children[0].children[row].children[2].textContent
            console.log(row, check, code)
            // console.log(code)
            // let row = i
            // console.log(row)
            // setCourseCode(code)
            if(check === true){
                try {
                    const  res  = await axios.post("/api/admin/courses", JSON.stringify({ action: "delete", code }), {headers:{"Content-Type" : "application/json"} })
                    // console.log(res)
                    table.children[0].deleteRow(row)
                } catch (error) {
                    console.log(error)
                }
                
                // console.log(course_code)
            }
            // else{
            //     // break
            // }
        }
    }

    const handleAdd = async ()=>{
        let table = document.getElementById('courses');
        let length = table.children[0].children.length ;

        for (let i=1; i<length; i++){
            // console.log(i)
            // let checked = table.children[0].children[i].children[0].children[0].checked 
            // let course_number = table.children[0].children[i].children[1].textContent
            let school = table.children[0].children[i].children[1].textContent
            let course_code = table.children[0].children[i].children[2].textContent
            let course_name = table.children[0].children[i].children[3].textContent
            // console.log(checked)
            // console.log(code)
            let row = i
            // setCourseCode(code)
            // if(checked === true){
            try {
                const  res  = await axios.post("/api/admin/courses", JSON.stringify({ action: "add", school, course_code, course_name }), {headers:{"Content-Type" : "application/json"} })
                console.log(res)
                // table.children[0].deleteRow(row)
            } catch (error) {
                console.log(error)
            }
            
            console.log(course_code)
            // }
        }
        setSuccessMessage("Success")
    }

    

    return (
        <div className={styles.Dashboard}>
            <AdminNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="body">
                    <table id="courses">
                        <tbody>
                        <tr>
                            <th>Checked</th>
                            {/* <th>Course No.</th> */}
                            <th>School</th>
                            <th>Course code</th>
                            <th>Course name</th>
                            {/* <th>Action</th> */}
                        </tr>
                        </tbody>
                        
                        
                    </table>
                    { successMessage && <p className="success">{successMessage}</p> }
                    <div className="row">
                    {/* { successMessage && <p className="success">{successMessage}</p> } */}
                        <button onClick={handleSubmit}>Add new row</button>
                        <button onClick={handleAdd}>Add new course</button>
                        <button onClick={handleDelete}>Delete selected fields</button>
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
