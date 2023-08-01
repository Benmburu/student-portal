import React from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';

const Dashboard = () =>{
    return (
        <div className={styles.Dashboard}>
            <AdminNavBar/>
            <div className={styles.body}>
                <Header/>
                <div>
                    Hello World
                </div>
            </div>
        </div>
    )
}

export default Dashboard