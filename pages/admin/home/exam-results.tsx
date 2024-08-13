import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';

interface Class{
    className: string;
    semester: string
}
interface Result{
    serviceNumber: string;
    studentName: string;
    semester: string;
    results: Results[];
}
interface Results{
    unitName: string;
    marks: string;
    grade: string;
} 
interface Unit{
    unitName: string;
}

const ExamResults: React.FC = () =>{
    const [ action, setAction ] = useState<string>("get")
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ successMessage, setSuccessMessage ] = useState<string>("");
    

    
    useEffect(()=>{
        (async ()=>{
            try {
            
                const  res  = await axios.post<{ examResults: Result[], classes: Class[], units: Unit[] }>("/api/admin/exam-results", JSON.stringify({ action, className: "" }), {headers:{"Content-Type" : "application/json"} })
                modifyColumnName(res.data.units)
                res.data.examResults.map((res)=>{addNewUnit(res)})
                res.data.classes.map((className: Class)=>{addOptions(className)})

            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const modifyColumnName = ( units: Unit[] ): void =>{
        let table = document.getElementById("results") as HTMLTableElement;

        //set the column names for the units for each class
        table.rows[0].children[3].innerHTML = units[0]?.unitName || "unit1"
        table.rows[0].children[4].innerHTML = units[1]?.unitName || "unit2"
        table.rows[0].children[5].innerHTML = units[2]?.unitName || "unit3"
        table.rows[0].children[6].innerHTML = units[3]?.unitName || "unit4"
        table.rows[0].children[7].innerHTML = units[4]?.unitName || "unit5"
        table.rows[0].children[8].innerHTML = units[5]?.unitName || "unit6"
        table.rows[0].children[9].innerHTML = units[6]?.unitName || "unit7"
        table.rows[0].children[10].innerHTML = units[7]?.unitName || "unit8"
    }

    const addRow = ( e: React.MouseEvent<HTMLButtonElement> ): void =>{
        e.preventDefault()
        addNewUnit()
    }

    const addNewUnit = async ( results?: Result ): Promise<void> =>{
        
        let table = document.getElementById("results") as HTMLTableElement;
        let row = table.insertRow(-1)
        let buttonId = Math.floor((Math.random() * 1000000) + 3).toString();

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
        let cell11 = row.insertCell(10);
        let cell12 = row.insertCell(11);

        

        //read the column names for the units for each class which are to be used to populate the table according to the respective units
        let unit1Name = table.rows[0].children[3].innerHTML 
        let unit2Name = table.rows[0].children[4].innerHTML 
        let unit3Name = table.rows[0].children[5].innerHTML 
        let unit4Name = table.rows[0].children[6].innerHTML 
        let unit5Name = table.rows[0].children[7].innerHTML 
        let unit6Name = table.rows[0].children[8].innerHTML 
        let unit7Name = table.rows[0].children[9].innerHTML 
        let unit8Name = table.rows[0].children[10].innerHTML 

        // Add some text to the new cells:
        cell1.innerHTML = results?.serviceNumber || "";
        cell2.innerHTML = results?.studentName || "";
        cell3.innerHTML = results?.semester || "";

        //populate the table according to the respective units
        cell4.innerHTML = results?.results?.filter((result)=>result.unitName === unit1Name)[0]?.marks || "";
        cell5.innerHTML = results?.results?.filter((result)=>result.unitName === unit2Name)[0]?.marks || "";
        cell6.innerHTML = results?.results?.filter((result)=>result.unitName === unit3Name)[0]?.marks || "";
        cell7.innerHTML = results?.results?.filter((result)=>result.unitName === unit4Name)[0]?.marks || "";
        cell8.innerHTML = results?.results?.filter((result)=>result.unitName === unit5Name)[0]?.marks || "";
        cell9.innerHTML = results?.results?.filter((result)=>result.unitName === unit6Name)[0]?.marks || "";
        cell10.innerHTML = results?.results?.filter((result)=>result.unitName === unit7Name)[0]?.marks || "";
        cell11.innerHTML = results?.results?.filter((result)=>result.unitName === unit8Name)[0]?.marks || "";

        cell12.innerHTML = `<button id=${buttonId}>save</button> <button id=${buttonId + "-del"}>delete</button>`
        
        //make the cells editable
        cell1.setAttribute("contenteditable", "true")
        cell2.setAttribute("contenteditable", "true")
        cell3.setAttribute("contenteditable", "true")
        cell4.setAttribute("contenteditable", "true")
        cell5.setAttribute("contenteditable", "true")
        cell6.setAttribute("contenteditable", "true")
        cell7.setAttribute("contenteditable", "true")
        cell8.setAttribute("contenteditable", "true")
        cell9.setAttribute("contenteditable", "true")
        cell10.setAttribute("contenteditable", "true")
        cell11.setAttribute("contenteditable", "true")

        let editButton = document.getElementById(buttonId) as HTMLButtonElement;
        let deleteButton = document.getElementById(`${buttonId+"-del"}`) as HTMLButtonElement;

        editButton.addEventListener('click', async (e): Promise<void> => {
            e.preventDefault()
            setSuccessMessage("")

            let clickedElement = e.target as HTMLElement;
            let clickedRow = clickedElement.parentNode?.parentNode as HTMLTableRowElement;;

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

            let className = (document.getElementById("class") as HTMLSelectElement)?.value

            let results = [
                {
                    unitName: unit1Name,
                    marks: unit1,
                    grade: gradeMarks(unit1)
                },
                {
                    unitName: unit2Name,
                    marks: unit2,
                    grade: gradeMarks(unit2)
                },
                {
                    unitName: unit3Name,
                    marks: unit3,
                    grade: gradeMarks(unit3)
                },
                {
                    unitName: unit4Name,
                    marks: unit4,
                    grade: gradeMarks(unit4)
                },
                {
                    unitName: unit5Name,
                    marks: unit5,
                    grade: gradeMarks(unit5)
                },
                {
                    unitName: unit6Name,
                    marks: unit6,
                    grade: gradeMarks(unit6)
                },
                {
                    unitName: unit7Name,
                    marks: unit7,
                    grade: gradeMarks(unit7)
                },
                {
                    unitName: unit8Name,
                    marks: unit8,
                    grade: gradeMarks(unit8)
                },
            ]

            console.log(results)

            const  res  = await axios.post("/api/admin/exam-results", JSON.stringify({ action: "add", serviceNumber, studentName, semester, className, results }), {headers:{"Content-Type" : "application/json"} })
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
            let serviceNumber = clickedRow.children[0].innerHTML
            let studentName = clickedRow.children[1].innerHTML
            let semester = clickedRow.children[2].innerHTML
            const  res  = await axios.post("/api/admin/exam-results", JSON.stringify({ action: "delete", serviceNumber, studentName, semester }), {headers:{"Content-Type" : "application/json"} })
            // console.log( res)
            clickedRow.remove()
            setSuccess()
            
        });
        
    }

    const gradeMarks = ( result: string ): string =>{
        let marks = parseInt(result)
        if (marks >= 70){
            return 'A'
        }
        else if (marks >= 60){
            return 'B'
        }
        else if (marks >= 50){
            return 'C'
        }
        else if (marks >= 40){
            return 'PASS'
        }
        else{
            return 'FAIL'
        }
    }

    const updateTable = async (value: string): Promise<void> =>{
        try {
            
            console.log('classDropDownOption: ', value)
            let table = document.getElementById("results") as HTMLTableElement;

            for(let i = table.rows.length - 1; i > 0; i--)
            {
                table.deleteRow(i);
            }
            console.log('deleted')
            const  res  = await axios.post("/api/admin/exam-results", JSON.stringify({ action, className: value }), {headers:{"Content-Type" : "application/json"} })
            
            modifyColumnName(res.data.units)
            // console.log('units: ',res.data.units)
            res.data.examResults.map(( student: Result )=>{addNewUnit(student)})
        } catch (error) {
            console.log(error)
        }
    }

    const updateSemesterTable = async (value: string): Promise<void> =>{
        try {
            
            console.log('classDropDownOption: ', value)
            let table = document.getElementById("results") as HTMLTableElement;

            for(let i = table.rows.length - 1; i > 0; i--)
            {
                table.deleteRow(i);
            }
            console.log('deleted')
            const  res  = await axios.post("/api/admin/exam-results", JSON.stringify({ action, semester: value }), {headers:{"Content-Type" : "application/json"} })
            // console.log(res.data.students)
            // console.log(res.data.units)
            modifyColumnName(res.data.units)
            res.data.examResults.map(( student: Result )=>{addNewUnit(student)})
        } catch (error) {
            console.log(error)
        }
    }

    const addSemesterOptions = ( classes: Class ): void =>{
        let classDropDown = document.getElementById("semester") as HTMLSelectElement;
        let option = document.createElement("option");
        option.text = classes.semester;
        option.value = classes.semester;
        classDropDown.add(option);
    }

    const addOptions = ( classes: Class ): void =>{
        let classDropDown = document.getElementById("class") as HTMLSelectElement;
        let option = document.createElement("option");
        option.text = classes.className;
        option.value = classes.className;
        classDropDown.add(option);
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
                    <div className="options">
                        <select name="class" id="class" onChange={(e)=>updateTable(e.target.value)}>
                            <option value="">Select class</option>
                        </select>

                        {/* <select name="semester" id="semester" onChange={(e)=>updateSemesterTable(e.target.value)}>
                            <option value="">Select semester</option>
                        </select> */}

                    </div>
                    

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
                    

                    .options{
                        display: flex;
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

export default ExamResults;
