import Link from 'next/link';
import styles from '@styles/VerticalNavBar.module.css';

const VerticalNavBar = () => {
  return (
    <nav className={styles.verticalNavBar}>
      <ul>
        <li>
          <Link href="/" passHref>
            <div className={styles.navItem}>Home</div>
          </Link>
        </li>
        <li>
          <Link href="/course-registration" passHref>
            <div className={styles.navItem}>Course Registration</div>
          </Link>
        </li>
        <li>
          <Link href="/class-registration" passHref>
            <div className={styles.navItem}>Class Registration</div>
          </Link>
        </li>
        <li>
          <Link href="/course-schedule" passHref>
            <div className={styles.navItem}>Course Schedule</div>
          </Link>
        </li>
        <li>
          <Link href="/exam-results" passHref>
            <div className={styles.navItem}>Exam Results</div>
          </Link>
        </li>
        <li>
          <Link href="/transcripts" passHref>
            <div className={styles.navItem}>Transcripts</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default VerticalNavBar;
