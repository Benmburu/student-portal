import { useSession, signOut } from 'next-auth/react';
import styles from '@styles/Header.module.css';
import Image from 'next/image';

export default function Header() {
    const { data: session } = useSession();
   
    return (
        <header className={styles.header}>
            <div className={styles.userInfo}>
                {session?.user ? (
                    <div className={styles.userProfile}>
                        <span className={styles.username}>{`Hi ${session?.user?.name}`}</span>
                        <Image
                         src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${session.user.name as string}`}
                          alt={session?.user?.name as string}
                        />
                        
                        <button className={styles.logout} onClick={(): Promise<void> => signOut()}>Logout</button>
                    </div>
                    ):
                    (
                        <div>
                            login
                        </div>
                    )
                }
            </div>

            
        </header>
    );
}
