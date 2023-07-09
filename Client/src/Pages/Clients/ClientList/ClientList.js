import Navbar from 'Components/Admin/Navbar/Navbar'
import ClientTable from 'Components/Admin/ClientTable/ClientTable.js'
import React from 'react'

function ClientList() {
  return (
    <div>
      <Navbar/>
      <ClientTable/>
    </div>
  )
}

export default ClientList
