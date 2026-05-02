import { useState } from 'react'
import Nav from './components/Nav.tsx'
import Footer from './components/Footer.tsx'
import Form from './components/Form.tsx'
import Table from './components/Table.tsx'
import type Record from './models/record.ts'

function App() {
  
  const mockRecords: Record[] = [
    {
      id: '1',
      site: "https://facebook.com",
      username: "ahmed123",
      password: "fbpass123",
    },
    {
      id: '2',
      site: "https://twitter.com",
      username: "space14",
      password: "twitStrongPass!",
    }
  ];
  const [Records, setRecords] = useState<Record[]>(mockRecords);

  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Nav />
      </nav>
      <main className="flex-1 container max-w-3/5 mx-auto">
        <div className="flex text-3xl font-bold mt-12 justify-self-center">
          <div className="text-green-600">&lt;</div><div>Pass</div><div className="text-green-600">OP/&gt;</div>
        </div>
        <div className="mb-4 text-[13px] justify-self-center text-gray-700">Your own Password Manager</div>
        <Form setRecords={setRecords}/>
        <div className="font-bold text-2xl mt-10 mb-6">Your Passwords</div>
        <Table records={Records}/>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
