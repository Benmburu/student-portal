import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import VerticalNavBar from "@components/VerticalNavBar"
import styles from '@styles/Dashboard.module.css';
import { useSession } from "next-auth/react";
import axios from "axios";

export default function UnitRegistration(){
    const [ successMessage, setSuccessMessage ] = useState("");
    const { data } = useSession();

    let email = "";
    let res = "";
    let registeredUnits = [];
    let unitDetails = "";

    useEffect (async ()=>{
        try {
            // const { data } = useSession()
            email = data?.user?.email

            res  = await axios.post("/api/unit-registration", JSON.stringify({ action: "get", email: email }), {headers:{"Content-Type" : "application/json"} })

            res.data.units.map((unit)=>addRow(unit))

            let semesters = []
            res.data.units.map((unit)=>{
                if (semesters.indexOf(unit.semester) === -1){
                    semesters.push(unit.semester)
                }
            })

            semesters.map((semester)=>addOptions(semester))

        } catch (error) {
            console.log(error)
        }
    }, [data])

    const addRow = async (unit)=>{
        
        let table = document.getElementById("units")
        let row = table.insertRow(-1)
        let rowId = Math.floor((Math.random() * 1000000) + 3);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        // Add some text to the new cells:
        cell1.innerHTML = `<input type="checkbox" id=${rowId}>`
        cell2.innerHTML = unit.unitCode
        cell3.innerHTML = unit.unitName
        cell4.innerHTML = unit.semester

        let rowCheckbox = document.getElementById(rowId);
        rowCheckbox.addEventListener('change', (e)=>{
            let unitCode = e.target.parentNode.parentNode.children[1].innerHTML
            let unitName = e.target.parentNode.parentNode.children[2].innerHTML
            let semester = e.target.parentNode.parentNode.children[3].innerHTML

            unitDetails = {
                unitCode: unitCode,
                unitName: unitName,
                semester: semester
            }

            if (e.target.checked){
                registeredUnits.push(unitDetails)

            }
        })
           
    }

    const submitUnits = async ()=>{
        // e.preventDefault()

        res  = await axios.post("/api/unit-registration", JSON.stringify({ action: "add", email: email, registeredUnits }), {headers:{"Content-Type" : "application/json"} })
        console.log(res.data.units)
        // setSuccess()
    }

    const updateTable = async (value)=>{
        try {
            
            console.log('classDropDownOption: ', value)
            let table = document.getElementById("units")

            for(let i = table.rows.length - 1; i > 0; i--)
            {
                table.deleteRow(i);
            }
            console.log('deleted')

            const filtered = res.data.units.filter((unit)=>unit.semester===value)

            filtered.map((student)=>{addRow(student)})
        } catch (error) {
            console.log(error)
        }
    }

    const addOptions = (semester) =>{
        let unitsDropDown = document.getElementById("semester")
        let option = document.createElement("option");
        option.text = semester;
        option.value = semester;
        unitsDropDown.add(option);
    }
    return (
        <div className={styles.Dashboard}>
            <VerticalNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="info">
                    <select name="class" id="semester" onChange={(e)=>updateTable(e.target.value)}>
                        <option value="">Select</option>
                    </select>

                    <table id="units">
                        <tbody>
                        <tr>
                            
                            <th>Select</th>
                            <th>Unit code</th>
                            <th>Unit name </th>
                            <th>Semester</th>
                        </tr>
                        </tbody>
                    </table>
                    { successMessage && <p id="successMessage">{successMessage}</p>}
                    <button onClick={submitUnits}>Submit</button>
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

                    #units td, th {
                        border: 1px solid #000000;
                        text-align: left;
                        padding: 8px;
                      }

                    button{
                        margin: 12px;
                        width: 7em;
                        height: 35px;
                        background-color: inherit;
                        color: black;
                        border: 2px solid black;
                        border-radius: 5px;
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
                    }
                    `
                }
            </style>
        </div>
        
    )
}