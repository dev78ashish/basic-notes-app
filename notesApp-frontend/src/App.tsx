import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'sonner'

const App: React.FC = () => {
  return (
    <div>
      <AppRoutes />
      <Toaster richColors={true} position='top-right' />
    </div>
  )
}

export default App