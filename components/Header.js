import { useSession, signOut } from 'next-auth/react';

export default function Header() {
    const { data } = useSession()
   
    return (
        <header className="header">
            <div className="user-info">
                {data?.user ? (
                    <div className="user-profile">
                        <span className="username">{`Hi ${data?.user?.name}`}</span>
                        <img src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${data.user.name}`} alt={data?.user?.name} />
                        
                        <button className='logout' onClick={()=> signOut()}>Logout</button>
                    </div>
                    ):
                    (
                        <div>
                            login
                        </div>
                    )
                }
            </div>

            <style jsx>{`
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
            `}</style>
        </header>
    );
}
