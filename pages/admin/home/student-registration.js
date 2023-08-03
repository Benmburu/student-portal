import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';


// import courseStyles from '@styles/courseStyles.module.css'

const StudentRegistration = () =>{
    // const [ users, setUsers ] = useState([])
    // const [ school, setSchool] = useState("SITDS")
    // const [ course_code, setCourseCode ] = useState("12345")
    // const [ courseName, setCourseName ] = useState("Diploma in ICT")
    const [ action, setAction ] = useState("get")
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");
    

    
    useEffect(()=>{
        (async ()=>{
            try {
            
                const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action }), {headers:{"Content-Type" : "application/json"} })
                res.data.map((res)=>{addRow(res)})

            } catch (error) {
                console.log(error)
            }
        })()
    },[])

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
            const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action: "add", serviceNumber, name, email }), {headers:{"Content-Type" : "application/json"} })
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
            const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action: "delete", serviceNumber, name, email }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
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
            const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action: "add", serviceNumber, name, email }), {headers:{"Content-Type" : "application/json"} })
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
            const  res  = await axios.post("/api/admin/student-registration", JSON.stringify({ action: "delete", serviceNumber, name, email }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            setSuccessMessage("Success")
            
        });
        
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





// import React, { useState } from "react";
// import Header from "@components/Header";
// import AdminNavBar from "@components/AdminNavBar"
// import styles from '@styles/Dashboard.module.css';
// import axios from "axios";

// const Dashboard = () =>{
//     const [ serviceNumber, setserviceNumber ] = useState("");
//     const [ errorMessage, setErrorMessage ] = useState("");
//     const [ successMessage, setSuccessMessage ] = useState("");

//     const refreshMessages = ()=>{
//         setErrorMessage("")
//         setSuccessMessage("")
//       };
      
//     const handleSubmit = async (e) =>{
//         e.preventDefault()
//         // console.log(serviceNumber, name, email, password)
//         refreshMessages()

//         try{
//             const { res } = await axios.post("/api/admin/student-registration", JSON.stringify({ serviceNumber }), {headers:{"Content-Type" : "application/json"} })
            
//             setSuccessMessage("Success")
//             setErrorMessage("")

//         }catch(error){
//             refreshMessages()
//             setErrorMessage(error.response.data)
//             setSuccessMessage("")
//         }
//     }
  
//     return (
//         <div className={styles.Dashboard}>
//             <AdminNavBar/>
//             <div className={styles.body}>
//                 <Header/>
//                 <div>
//                     <div className="container">
//                         <h1>Add new student</h1>
//                         <form onSubmit={handleSubmit}>

//                             <div className="form-group">
//                             <label htmlFor="email">Please enter service number.</label>
//                             <input type="text" value={serviceNumber} onChange={(e)=>setserviceNumber(e.target.value)} placeholder="123456" pattern="\d{6}" title="Service number must be 6 numbers long." required />
//                             </div>
//                             { successMessage && <p className="success">{successMessage}</p> }
//                             { errorMessage && <p className="error">{errorMessage}</p> }
//                             <button type="submit">Submit</button>
//                         </form>

//                         <style jsx>{`
//                             .container {
//                             display: flex;
//                             flex-direction: column;
//                             align-items: center;
//                             justify-content: center;
//                             min-height: 100vh;
//                             background-color: #f5f5f5;
//                             font-family: monospace;
//                             font-size: 15px;
//                             color: #28282b;
//                             text-align: center;
//                             }

//                             h1 {
//                             font-size: 24px;
//                             margin-bottom: 20px;
//                             }

//                             form {
//                             display: flex;
//                             flex-direction: column;
//                             width: 300px;
//                             padding: 20px;
//                             background-color: #ffffff;
//                             border: 1px solid black;
//                             border-radius: 8px;
//                             box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
//                             }

//                             .form-group {
//                             display: flex;
//                             flex-direction: column;
//                             margin-bottom: 15px;
//                             }

//                             label {
//                             margin-bottom: 5px;
//                             font-size: 13px;
//                             }

//                             input {
//                             padding: 10px;
//                             border: 1px solid #cccccc;
//                             border-radius: 4px;
//                             outline: none;
//                             background-color: #ffffff;
//                             color: black;
//                             }

//                             button {
//                             padding: 10px 20px;
//                             background-color: #1a6aeb;
//                             color: white;
//                             border: none;
//                             border-radius: 4px;
//                             cursor: pointer;
//                             }

//                             button:hover {
//                             background-color: #0855d1;
//                             }

//                             .error{
//                             background-color: rgba(232, 46, 46, 0.2);
//                             padding: 5px;
//                             border: 1px solid #e62c38;
//                             border-radius: 4px;
//                             color: #e62c38;
//                             margin-bottom: 10px;
//                             font-family: 'Courier New', Courier, monospace;
//                             font-size: 13px;
//                             text-align: center;
//                             }

//                             .success{
//                             background-color: rgba(103, 230, 143, 0.1);
//                             padding: 5px;
//                             border: 1px solid #67e68f;
//                             border-radius: 4px;
//                             color: #67e68f;
//                             margin-bottom: 10px;
//                             font-family: 'Courier New', Courier, monospace;
//                             font-size: 13px;
//                             text-align: center;
//                             }
//                         `}</style>
//                         </div>
//                     </div>
//                 </div>
//         </div>
//     )
// }

// export default Dashboard