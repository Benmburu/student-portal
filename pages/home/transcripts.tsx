import React from "react";
import Header from "@components/Header";
import VerticalNavBar from "@components/VerticalNavBar"
import styles from '@styles/Dashboard.module.css';

const Transcripts: React.FC = () =>{
    return (
        <div className={styles.Dashboard}>
            <VerticalNavBar/>
            <div className={styles.body}>
                <Header/>
                <div>
                    Hello World
                </div>
            </div>
        </div>
    )
}

export default Transcripts;