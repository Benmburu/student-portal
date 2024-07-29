import Link from 'next/link';
import styles from '@styles/VerticalNavBar.module.css';
import Image from 'next/image';

const VerticalNavBar = ():JSX.Element => {
  return (
    <nav className={styles.verticalNavBar}>
      <Image src="/deftec.png" alt="deftec logo" width="150" height="120" />
      <ul>
        <li>
          <Link href="/home/dashboard" passHref>
            <div className={styles.navItem}>Home</div>
          </Link>
        </li>
        <li>
          <Link href="/home/unit-registration" passHref>
            <div className={styles.navItem}>Unit Registration</div>
          </Link>
        </li>
        <li>
          <Link href="/home/course-schedule" passHref>
            <div className={styles.navItem}>Course Schedule</div>
          </Link>
        </li>
        <li>
          <Link href="/home/exam-results" passHref>
            <div className={styles.navItem}>Exam Results</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default VerticalNavBar;
