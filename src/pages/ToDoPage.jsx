import Content from './components/Content/Content';
import styles from './ToDoPage.module.scss';

function ToDoPage() {
  return (
    <div className={styles.pageBackground}>
      <Content />
    </div>
  );
}

export default ToDoPage;
