import axios from "axios";
import React, { HTMLInputAutoCompleteAttribute, useEffect, useState } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';

interface Unit{
    unitCode: string;
    unitName: string;
    className: string;
    semester: string;
}

interface Class{
    className: string
}

const UnitRegistration: React.FC = () =>{
    const [ action, setAction ] = useState<string>("get")
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ successMessage, setSuccessMessage ] = useState<string>("");
    

    
    useEffect(()=>{
        (async ()=>{
            try {
            
                const  res  = await axios.post<{ classes: Class[], units: Unit[] }>("/api/admin/unit-registration", JSON.stringify({ action, className: "" }), {headers:{"Content-Type" : "application/json"} })
                res.data.classes.forEach(( className: Class )=>{addOptions(className)})
                res.data.units.forEach(( unit: Unit )=>{addNewUnit(unit)})

            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const addRow = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        addNewUnit();
    }

    const addNewUnit = async ( unit?: Unit)=>{
        
        let table = document.getElementById("units") as HTMLTableElement;
        let row = table.insertRow(-1)
        let buttonId = Math.floor((Math.random() * 1000000) + 3).toString();

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        // Add some text to the new cells:
        cell1.innerHTML = unit?.unitCode || "";
        cell2.innerHTML = unit?.unitName || "";
        cell3.innerHTML = unit?.className || (document.getElementById("class") as HTMLSelectElement)?.value;
        cell4.innerHTML = unit?.semester || "";
        cell5.innerHTML = `<button id=${buttonId}>save</button> <button id=${buttonId + "-del"}>delete</button>`
        

        cell1.setAttribute("contenteditable", "true")
        cell2.setAttribute("contenteditable", "true")
        cell4.setAttribute("contenteditable", "true")

        let editButton = document.getElementById(buttonId) as HTMLButtonElement;
        let deleteButton = document.getElementById(`${buttonId+"-del"}`)as HTMLButtonElement;

        editButton.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault()
            setSuccessMessage("")

            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode as HTMLTableRowElement;
            let unitCode = clickedRow.children[0].innerHTML
            let unitName = clickedRow.children[1].innerHTML
            let className = (document.getElementById("class") as HTMLSelectElement)?.value 
            let semester = clickedRow.children[2].innerHTML

            const  res  = await axios.post("/api/admin/unit-registration", JSON.stringify({ action: "add", unitCode, unitName, className, semester }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res)
            setSuccess()
            
        });

        deleteButton.addEventListener('click', async (e) => {
            e.preventDefault()
            setSuccessMessage("")

            console.log(e.target)
            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode as HTMLTableRowElement;
            console.log(clickedRow.children[0].innerHTML)
            let unitCode = clickedRow.children[0].innerHTML
            let unitName = clickedRow.children[1].innerHTML
            let semester = clickedRow.children[2].innerHTML 

            const  res  = await axios.post("/api/admin/unit-registration", JSON.stringify({ action: "delete", unitCode, semester }), {headers:{"Content-Type" : "application/json"} })
            // console.log( res)
            clickedRow.remove()
            setSuccess()
            
        });
        
    }

    const updateTable = async ( value: string )=>{
        try {
            
            console.log('unitDropDownOption: ', value)
            let table = document.getElementById("units") as HTMLTableElement;

            for(let i = table.rows.length - 1; i > 0; i--)
            {
                table.deleteRow(i);
            }
            console.log('deleted')
            const  res  = await axios.post("/api/admin/unit-registration", JSON.stringify({ action, className: value }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res.data.students)
            res.data.units.map(( unit: Unit )=>{addNewUnit(unit)})
        } catch (error) {
            console.log(error)
        }
    }

    const addOptions = ( classes: Class ) =>{
        let classDropDown = document.getElementById("class") as HTMLSelectElement;
        let option = document.createElement("option");
        option.text = classes.className;
        option.value = classes.className;
        classDropDown.add(option);
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
                <div className="info">
                    

                    <table id="units">
                        <tbody>
                        <tr>
                            
                            <th>Unit code</th>
                            <th>Unit name</th>
                            <th>
                                <select name="class" id="class" onChange={(e)=>updateTable(e.target.value)}>
                                    <option value="">Select class</option>
                                </select>
                            </th>
                            <th>Semester</th>
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

export default UnitRegistration;
