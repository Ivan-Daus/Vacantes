import { BrowserRouter, Route, Routes } from "react-router-dom";
import Formulario from "./pages/Formulario";
import Admin from "./pages/Admin"



function App(){
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Formulario />} />
                    <Route path="/Admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;

