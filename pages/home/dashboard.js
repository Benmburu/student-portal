import React, { useEffect } from "react";
import Header from "@components/Header";
import styles from '@styles/Dashboard.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import VerticalNavBar from "@components/VerticalNavBar";

const Dashboard = () =>{


    return (
        <div className={styles.Dashboard}>
            <VerticalNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="info center">
                    <Carousel
                        dynamicHeight={true}
                        width="99%"
                        height="auto"
                        autoPlay={true}
                        infiniteLoop={true}
                        centerMode={true}
                    >
                    <div>
                        <Image className="image" src="/IT.jpg" alt="deftec logo" width="1920" height="1186" />
                        <p className="legend" id="legend">Elevate your tech prowess with our IT diploma, merging theory and hands-on practice to groom skilled professionals for the digital world.</p>
    
                    </div>
                    <div>
                        <Image className="image" src="/mechanical.jpg" alt="deftec logo" width="1920" height="1279" />
                        <p className="legend" id="legend">Unlock the world of machines and innovation with our mechanical engineering diploma, shaping tomorrow&apos;s engineers through hands-on learning and creativity.</p>
    
                    </div>
                    <div>
                        <Image className="image" src="/electrical.jpg" alt="deftec logo" width="1920" height="1279" />
                        <p className="legend" id="legend">Spark your future at our college with a comprehensive electrical engineering diploma for hands-on expertise and cutting-edge innovation.</p>
    
                    </div>
                </Carousel>
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

                    #legend{
                        color: white;
                        bottom: 70px;
                        // background-color: inherit;
                        font-size: large;
                        background: linear-gradient(0deg, #00000088 30%, #ffffff44 100%);
                    }
                    `
                }
            </style>
        </div>
    )
}

export default Dashboard