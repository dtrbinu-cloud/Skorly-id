import ExamPage from './exam/ExamPage';

export default function Exam({ mode = 'student' }) {
  return <ExamPage mode={mode} />;
}

export { ExamPage };
