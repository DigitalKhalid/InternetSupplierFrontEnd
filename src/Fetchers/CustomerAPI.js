import React, { useState } from 'react'

export const addCustomer = async () => {
    const [customer, setCustomer] = useState(null)
    const url = 'http://127.0.0.1:8000/customerapi';
    let data = await fetch(url);
    let parseddata = await data.json();
    setCustomer(parseddata)
}

export const getCustomerList = async () => {
    const [customer, setCustomer] = useState(null)
    const url = 'http://127.0.0.1:8000/customerapi';
    let data = await fetch(url);
    let parseddata = await data.json();
    setCustomer(parseddata)
}

export const getCustomer = async (id) => {
    const [customer, setCustomer] = useState(null)
    const url = `http://127.0.0.1:8000/customerapi/${id}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    setCustomer(parseddata)
}

export const deleteCustomer = async (id) => {
    const [customer, setCustomer] = useState(null)
    const url = `http://127.0.0.1:8000/customerapi/${id}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    setCustomer(parseddata)
}

export const updateCustomer = async (id) => {
    const [customer, setCustomer] = useState(null)
    const url = `http://127.0.0.1:8000/customerapi/${id}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    setCustomer(parseddata)
}