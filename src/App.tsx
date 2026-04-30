// import { useState } from 'react'
import Nav from './components/Nav.tsx'
import Footer from './components/Footer.tsx'
import Form from './components/Form.tsx'
import './App.css'

function App() {
  

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <nav>
        <Nav />
      </nav>
      <main className="flex-1 container max-w-1/2 mx-auto">
        <div className="flex text-2xl font-bold mt-12 justify-self-center">
        <div className="text-green-600">&lt;</div><div>Pass</div><div className="text-green-600">OP/&gt;</div>
        </div>
        <div className="mb-4 text-sm justify-self-center text-gray-700">Your own Password Manager</div>
        <Form />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
