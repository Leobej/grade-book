import './App.css';

import Grade from './components/Grade';
import Student from './components/Students';
import Group from './components/Group';
import GroupType from './components/GroupType';
import Professor from './components/Professor';
import Subject from './components/Subject';
import SubjectType from './components/SubjectType';
import Menu from './components/Menu/AppBar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,

} from "react-router-dom";
function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
      <Menu />
        <Routes>
          <Route path="/" element={<Grade />} />
          <Route path="/group" element={<Group />} />
          <Route path="/grouptype" element={<GroupType />} />
          <Route path="/professor" element={<Professor />} />
          <Route path="/student" element={<Student />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/subjecttype" element={<SubjectType />} />
        </Routes>
      </BrowserRouter>

    </div>
  );

}

export default App;
