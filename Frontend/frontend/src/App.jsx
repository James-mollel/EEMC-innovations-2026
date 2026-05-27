import { Toaster } from 'react-hot-toast';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainStepRenderFormPage from './DataForm/FormMain';
import SuccessSubmittionPage from './DataForm/SuccessPage';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<MainStepRenderFormPage/>} />
        <Route path='success-submittion-page/' element={<SuccessSubmittionPage/>} />

      </Routes>
    </BrowserRouter>
    
    <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
     
     
    </>
  )
}

export default App
