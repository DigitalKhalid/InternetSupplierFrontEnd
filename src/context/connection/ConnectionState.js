import React, { useContext, useState } from "react";
import ConnectionContext from './ConnectionContext'
import AlertContext from "../alert/AlertContext"

const ConnectionState = (props) => {
  const { toggleAlert } = useContext(AlertContext)

  const host = process.env.REACT_APP_HOST
  const [connections, setConnections] = useState([])

  const getConnectionID = () => {
    let serial = Math.max(...connections.map(o => (o.id))) + 1
    const connectionID = 'ClickPick-' + serial.toString().padStart(5, '0')
    return connectionID
  }

  const blankFields = {
    id: '',
    customer: '',
    connection_id: getConnectionID(),
    installation_date: new Date().toISOString().slice(0, 10),
    package: '',
    status: 'Inactive',
    new: 'True'
  }

  const [connection, setConnection] = useState(blankFields)

  // const removeKeys = (key) => {
  //   const copy = connection // make a copy of dictionary
  //   delete copy[key] // remove keys from dictionary)
  //   setConnection(copy)
  // }

  const showAlert = (status) => {
    if (status === 200) {
      toggleAlert('success', 'Information of ' + connection.connection_id + ' is updated!')
    } else if (status === 201) {
      toggleAlert('success', 'New Connection, ' + connection.connection_id + ' is added!')
    } else if (status === 204) {
      toggleAlert('success', connection.connection_id + ' has been delete!')
    } else if (status === 400) {
      toggleAlert('error', '(' + status + ') Invalid request or data.')
    } else if (status === 401) {
      toggleAlert('error', '(' + status + ') Application is unable to recognize your identity. Please login through valid credentials.')
    } else if (status === 403) {
      toggleAlert('warning', '(' + status + ') You are not authorize to perform this action.')
    } else if (status === 404) {
      toggleAlert('error', '(' + status + ') Information not found. Unable to process your requested.')
    } else if (status > 499) {
      toggleAlert('error', '(' + status + ') Application is unable to connect to the server.')
    }
  }


  // Get all Records
  const getAllConnections = async (field, sort, search) => {
    if (sort === 'DESC') {
      field = '-' + field
    }
    if (field !== null) {
      sort = '?ordering=' + field
    }
    if (field === null & search !== '') {
      search = '?search=' + search
    } else if (field !== null && search !== '') {
      search = '&search=' + search
    }

    const url = `${host}connectionapirelated/${sort+search}`
    console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setConnections(json)
  }


  // Add Record
  const addConnection = async () => {
    // Add record to server
    const url = `${host}connectionapi/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },

      body: JSON.stringify(connection)
    });
    getAllConnections('connection_id', 'ASC', '')
    showAlert(response.status)
  }


  // Update Record
  const updateConnection = async () => {
    // Update record to server side
    const url = `${host}connectionapi/${connection.id}/`

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
      body: JSON.stringify(connection)
    });
    // const json = await response.json();
    showAlert(response.status)

    // Update record in frontend
    if (response.ok) {
      getAllConnections('connection_id', 'ASC', '')
    }
  }


  // Delete Record
  const deleteConnection = async () => {
    // delete record from server using API
    const url = `${host}connectionapi/${connection.id}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    showAlert(response.status)

    // delete record from frontend
    if (response.ok) {
      const connectionsLeft = connections.filter((con) => { return con.id !== connection.id })
      setConnections(connectionsLeft)
    }
  }


  return (
    <ConnectionContext.Provider value={{ blankFields, connections, connection, getConnectionID, setConnection, getAllConnections, addConnection, updateConnection, deleteConnection }}>
      {props.children}
    </ConnectionContext.Provider>
  )
}

export default ConnectionState;