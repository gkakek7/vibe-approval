import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ApprovalPage from './pages/ApprovalPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ApprovalPage />} />
      </Routes>
    </BrowserRouter>
  )
}
