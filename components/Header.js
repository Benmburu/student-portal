import { useSession, signOut } from 'next-auth/react';
import styles from '@styles/Header.module.css';

export default function Header() {
    const { data } = useSession()
   
    return (
        <header className={styles.header}>
            <div className={styles.userInfo}>
                {data?.user ? (
                    <div className={styles.userProfile}>
                        <span className={styles.username}>{`Hi ${data?.user?.name}`}</span>
                        <img src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${data.user.name}`} alt={data?.user?.name} />
                        
                        <button className={styles.logout} onClick={()=> signOut()}>Logout</button>
                    </div>
                    ):
                    (
                        <div>
                            login
                        </div>
                    )
                }
            </div>

            {/* <style jsx>{`
                .header {
                    font-family: monospace;
                    color: black;
                    display: flex;
                    align-items: center;
                    justify-content: right;
                    padding: 20px;
                    background-color: #d5d5e6;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    height: 50px;
                    border-left: 1px solid black;
                
                }

                .user-info {
                    display: flex;
                    align-items: center;
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                }

                .user-profile img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-right: 10px;
                    margin-left: 10px;
                    // margin: 20px;
                }

                .username {
                    font-weight: bold;
                    text-transform: capitalize;
                }

                .logout{
                    background-color: inherit;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    
                }
            `}</style> */}
        </header>
    );
}
