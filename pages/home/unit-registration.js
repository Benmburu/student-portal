import React, { useEffect } from "react";
import Header from "@components/Header";
import VerticalNavBar from "@components/VerticalNavBar"
import styles from '@styles/Dashboard.module.css';
import { useSession } from "next-auth/react";
import axios from "axios";

const UnitRegistration = () =>{

    (async ()=>{
        try {
            const { data } = useSession()
            let email = data.user.email
            // // console.log(email)

            const  res  = await axios.post("/api/unit-registration", JSON.stringify({ email: email }), {headers:{"Content-Type" : "application/json"} })
            console.log(res.data.units)
            res.data.units.map((unit)=>addRow(unit))

            let semesters = []
            res.data.units.map((unit)=>{
                if (semesters.indexOf(unit.semester) === -1){
                    semesters.push(unit.semester)
                }
            })

            // console.log(semesters)
            semesters.map((semester)=>addOptions(semester))

        } catch (error) {
            console.log(error)
        }
    })()

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
           
    }

    const updateTable = async (value)=>{
        try {

            const { data } = useSession()
            let email = data.user.email
            
            console.log('classDropDownOption: ', value)
            let table = document.getElementById("units")

            for(let i = table.rows.length - 1; i > 0; i--)
            {
                table.deleteRow(i);
            }
            console.log('deleted')
            const  res  = await axios.post("/api/unit-registration", JSON.stringify({ email: email }), {headers:{"Content-Type" : "application/json"} })

            const filtered = res.data.units.filter((unit)=>unit.semester===value)
            console.log(filtered)
            // res.data.units.map((unit)=>addRow(unit))

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
                <div className="body">
                    <select name="class" id="semester" onChange={(e)=>updateTable(e.target.value)}>
                        <option value=""></option>
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

                    <button>Submit</button>
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
                    `
                }
            </style>
        </div>
        
    )
}

export default UnitRegistration