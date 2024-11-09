import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatBot /> } />
      </Routes>
    </BrowserRouter>
  )
}