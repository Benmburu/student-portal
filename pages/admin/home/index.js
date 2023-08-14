import React, { useEffect } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Dashboard = () =>{


    return (
        <div className={styles.Dashboard}>
            <AdminNavBar/>
            <div className={styles.body}>
                <Header/>
                <div className="body">
                <Carousel>
                  <div>
                      <img src="https://mod.go.ke/wp-content/uploads/2021/12/deftec-01-01-01-01-01-1024x427-1.png" alt="image1"/>
                      <p className="legend">DefTec School is a cutting-edge educational institution renowned for its exceptional Information Technology (IT) course. With a reputation for innovation and excellence, DefTec equips students with a comprehensive understanding of IT fundamentals, advanced programming languages, network architecture, cybersecurity, and software development methodologies. Through hands-on projects, real-world simulations, and expert guidance from industry practitioners, DefTec School empowers students to thrive in the dynamic and ever-evolving field of technology. Graduates emerge well-prepared to tackle the challenges of the digital age, making DefTec School a prime choice for those seeking a top-tier IT education.</p>
  
                  </div>
                  <div>
                      <img src="https://mod.go.ke/wp-content/uploads/2021/12/deftec-01-01-01-01-01-1024x427-1.png" alt="image2" />
                      <p className="legend">This renowned school provides a comprehensive electrical engineering course designed to equip students with a deep understanding of principles and applications in the field. The program integrates theoretical knowledge with hands-on experience through state-of-the-art labs and cutting-edge projects. With a focus on fostering innovation and problem-solving skills, students engage in diverse subjects such as circuit analysis, electronics, digital systems, and renewable energy technologies. Faculty members, who are experts in their respective fields, mentor students in their academic journey, while industry partnerships provide opportunities for internships and real-world projects. Graduates of this program emerge as skilled electrical engineers ready to tackle challenges in industries ranging from telecommunications to power systems and beyond.</p>
  
                  </div>
                  <div>
                      <img src="https://mod.go.ke/wp-content/uploads/2021/12/deftec-01-01-01-01-01-1024x427-1.png" alt="image3"/>
                      <p className="legend">Nestled within a vibrant campus, our school provides an exceptional learning environment for aspiring mechanical engineers. With state-of-the-art laboratories and cutting-edge facilities, students engage in hands-on experiences that bridge theory and practice. Our dedicated faculty, comprised of accomplished industry professionals and scholars, guide students through a comprehensive curriculum that covers diverse aspects of mechanical engineering, from thermodynamics and materials science to robotics and automation. Collaborative projects and internships with renowned engineering firms empower students to apply their knowledge to real-world challenges, fostering innovation and problem-solving skills. Graduates emerge equipped with a strong foundation and practical expertise, ready to contribute to the advancement of technology and industry.</p>
  
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

                    
                    `
                }
            </style>
        </div>
    )
}

export default Dashboard