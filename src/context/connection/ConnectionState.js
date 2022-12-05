import React, { useContext, useState } from "react";
import ConnectionContext from './ConnectionContext'
import AlertContext from "../alert/AlertContext"
import getListURL from "../../functions/URLs";

const ConnectionState = (props) => {
  const { showAlert } = useContext(AlertContext)

  const host = process.env.REACT_APP_HOST

  const [connections, setConnections] = useState([])
  const [connectionsCount, setConnectionsCount] = useState(0)
  const [connectionsNext, setConnectionsNext] = useState('')

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

  // Get all Records
  const getAllConnections = async (sortField = 'city', sort = 'ASC', search = '', filterField = '') => {
    const url = getListURL('connectionapirelated', sortField, sort, search, filterField)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setConnectionsCount(json.count)
    setConnections(json.results)
    setConnectionsNext(json.next)
  }

  // Append more records used for pagination
  const getMoreConnections = async () => {
    const url = connectionsNext
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setConnections(connections.concat(json.results))
    setConnectionsNext(json.next)
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
    showAlert(response.status, connection.connection_id)
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
    showAlert(response.status, connection.connection_id)

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
    showAlert(response.status, connection.connection_id)

    // delete record from frontend
    if (response.ok) {
      const connectionsLeft = connections.filter((con) => { return con.id !== connection.id })
      setConnections(connectionsLeft)
    }
  }


  return (
    <ConnectionContext.Provider value={{ blankFields, connections, connectionsCount, connectionsNext, connection, getConnectionID, setConnection, getAllConnections, getMoreConnections, addConnection, updateConnection, deleteConnection }}>
      {props.children}
    </ConnectionContext.Provider>
  )
}

export default ConnectionState;