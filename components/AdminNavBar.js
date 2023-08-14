import Link from 'next/link';
import styles from '@styles/VerticalNavBar.module.css';

const AdminNavBar = () => {
  return (
    <nav className={styles.verticalNavBar}>
      <ul>
        <li>
          <Link href="/admin/home" passHref>
            <div className={styles.navItem}>Home</div>
          </Link>
        </li>
        <li>
          <Link href="/admin/home/classes" passHref>
            <div className={styles.navItem}>Register a class</div>
          </Link>
        </li>
        <li>
          <Link href="/admin/home/student-registration" passHref>
            <div className={styles.navItem}>Student Registration</div>
          </Link>
        </li>
        <li>
          <Link href="/admin/home/course-schedule" passHref>
            <div className={styles.navItem}>Course Schedule</div>
          </Link>
        </li>
        <li>
          <Link href="/admin/home/courses" passHref>
            <div className={styles.navItem}>Courses</div>
          </Link>
        </li>
        <li>
          <Link href="/admin/home/unit-registration" passHref>
            <div className={styles.navItem}>Units</div>
          </Link>
        </li>
        <li>
          <Link href="/admin/home/classes" passHref>
            <div className={styles.navItem}>Classes</div>
          </Link>
        </li>
        
        <li>
          <Link href="/admin/home/exam-results" passHref>
            <div className={styles.navItem}>Exam Results</div>
          </Link>
        </li>
        {/* <li>
          <Link href="/admin/home/transcripts" passHref>
            <div className={styles.navItem}>Transcripts</div>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default AdminNavBar;
