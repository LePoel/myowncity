import { Routes, Route } from 'react-router-dom';
import Home from "../home/Home";
import About from "../about/About";
import ReportPlace from "../reportplace/ReportPlace";

function Main() {
    return (
        <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route exact path='/reportplace' element={<ReportPlace/>}></Route>
            <Route exact path='/about' element={<About/>}></Route>
        </Routes>
    );
};

export default Main;

