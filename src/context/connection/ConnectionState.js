import React, { useContext, useState } from "react";
import ConnectionContext from './ConnectionContext'
import AlertContext from "../alert/AlertContext"
import getListURL from "../../functions/URLs";
import { useSelector } from "react-redux";
// import OrderContext from "../order/OrderContext";

const ConnectionState = (props) => {
  const { showAlert, toggleAlert } = useContext(AlertContext)
  // const { addOrder, order } = useContext(OrderContext)

  const settings = useSelector((state) => state.setting.settings)

  const host = process.env.REACT_APP_HOST

  const [connections, setConnections] = useState([])
  const [connectionsCount, setConnectionsCount] = useState(0)
  const [connectionsNext, setConnectionsNext] = useState('')

  const getConnectionID = () => {
    let serial = Math.max(...connections.map(o => (o.id))) + 1
    const connectionID = serial.toString().padStart(5, '0')
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
  const getAllConnections = async (sortField = 'connection_id', sort = 'DESC', search = '', filterField = '') => {
    const url = getListURL('connectionapirelated', sortField, sort, search, filterField)

    try {
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

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }

  // Append more records used for pagination
  const getMoreConnections = async () => {
    const url = connectionsNext

    try {
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

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }

  // Get Connections List
  const getConnectionsList = async (sortField = 'connection_id', sort = 'DESC', search = '', filterField = '') => {
    const url = getListURL('connectionlistapi', sortField, sort, search, filterField)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
        },
      });
      const json = await response.json();
      setConnections(json)

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }

  // Add Record
  const addConnection = async (customer_type) => {
    // let connection_id_prefix = ''
    // if (customer_type === 'Individual') {
    //   connection_id_prefix = 'ClickPick-'

    // } else if (customer_type === 'Dealer') {
    //   connection_id_prefix = 'ClickDealer-'
    // }

    // Add record to server
    const url = `${host}connectionapi/`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
        },

        body: JSON.stringify({ ...connection, 'connection_id': settings.connection_id_prefix + connection.connection_id })
      });
      getAllConnections()
      showAlert(response.status, connection.connection_id)

      if (response.ok) {
        const json = await response.json();
        setConnection(json)
      }

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }


  // Update Record
  const updateConnection = async (customerType = 'Individual') => {
    // Update record to server side
    const url = `${host}connectionapi/${connection.id}/`

    try {
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
        if (customerType === 'Individual') {
          getAllConnections('connection_id', 'DESC', 'Individual', 'customer__customer_type')
        } else if (customerType === 'Dealer') {
          getAllConnections('connection_id', 'DESC', 'Dealer', 'customer__customer_type')
        } else {
          getAllConnections()
        }
      }

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }

  // Delete Record
  const deleteConnection = async () => {
    // delete record from server using API
    const url = `${host}connectionapi/${connection.id}`

    try {
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

    } catch (error) {
      toggleAlert('error', error.message)
    }
  }


  return (
    <ConnectionContext.Provider value={{ blankFields, connections, connectionsCount, connectionsNext, connection, getConnectionsList, getConnectionID, setConnection, getAllConnections, getMoreConnections, addConnection, updateConnection, deleteConnection }}>
      {props.children}
    </ConnectionContext.Provider>
  )
}

export default ConnectionState;