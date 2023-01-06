import './App.css';
import Appbar from './components/Appbar';
import Grade from './components/Grade';
import Student from './components/Students';
import Group from './components/Group';
import GroupType from './components/GroupType';
import Professor from './components/Professor';
import Subject from './components/Subject';
import SubjectType from './components/SubjectType';
import Menu from './components/Menu/Menu';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>

          </Route>

          <Route path="/grade" element={<Grade />} />
          <Route path="/group" element={<Group />} />
          <Route path="/grouptype" element={<GroupType />} />
          <Route path="/professor" element={<Professor />} />
          <Route path="/student" element={<Student />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/subjecttype" element={<SubjectType />} />
        </Routes>
      </BrowserRouter>
      <div style={{fontWeight:'bold', fontSize:'100px'}}>WELCOME</div>
    </div>
  );

}

export default App;
