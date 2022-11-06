import React from 'react'
import { Dashboard } from './contents/Dashboard'
import { User } from './contents/User'
import { Connections } from './contents/Connections'
import { Packages } from './contents/Packages'
import { Products } from './contents/Products'
import { MyAccount } from './contents/MyAccount'
import { Settings } from './contents/Settings'
import { SubDealer } from './contents/SubDealer'
import { Complaints } from './contents/Complaints'
import './Sidebar.css';

export const Sidebar = () => {
    let xMargin = 3
    let yMargin = 3

    return (
        <>
            <div className="d-flex align-items-start">
                <div className="nav flex-column nav-pills me-3 col-md-2" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{borderRadius: '10px'}}>
                    <a className="nav-link active" id="v-pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#v-pills-dashboard" type="button" role="tab" aria-controls="v-pills-dashboard" aria-selected="true" href='/'>Dashboard</a>

                    <a className="nav-link" id="v-pills-customers-tab" data-bs-toggle="pill" data-bs-target="#v-pills-customers" type="button" role="tab" aria-controls="v-pills-customers" aria-selected="false" href='/'>Customers</a>

                    <a className="nav-link disabled" id="v-pills-subdealer-tab" data-bs-toggle="pill" data-bs-target="#v-pills-subdealer" type="button" role="tab" aria-controls="v-pills-subdealer" aria-selected="false" href='/'>Sub Dealers</a>

                    <a className="nav-link" id="v-pills-connections-tab" data-bs-toggle="pill" data-bs-target="#v-pills-connections" type="button" role="tab" aria-controls="v-pills-connections" aria-selected="false" href='/'>Connections</a>

                    <a className="nav-link" id="v-pills-packages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-packages" type="button" role="tab" aria-controls="v-pills-packages" aria-selected="false" href='/'>Packages</a>

                    <a className="nav-link" id="v-pills-products-tab" data-bs-toggle="pill" data-bs-target="#v-pills-products" type="button" role="tab" aria-controls="v-pills-products" aria-selected="false" href='/'>Products</a>

                    <a className="nav-link" id="v-pills-complaints-tab" data-bs-toggle="pill" data-bs-target="#v-pills-complaints" type="button" role="tab" aria-controls="v-pills-complaints" aria-selected="false" href='/'>Complaints</a>

                    <a className="nav-link" id="v-pills-myaccount-tab" data-bs-toggle="pill" data-bs-target="#v-pills-myaccount" type="button" role="tab" aria-controls="v-pills-myaccount" aria-selected="false" href='/'>My Account</a>

                    <a className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false" href='/'>Settings</a>
                </div>

                <div className="container" style={{ border: '1px solid black', borderRadius: '10px' }}>
                    <div className="tab-content" id="v-pills-tabContent" >
                        <div className={`tab-pane fade show active my-${yMargin} mx-${xMargin}`} id="v-pills-dashboard" role="tabpanel" aria-labelledby="v-pills-dashboard-tab" tabindex="0"><Dashboard /></div>

                        <div className={`tab-pane fade my-${yMargin} mx-${xMargin}`} id="v-pills-customers" role="tabpanel" aria-labelledby="v-pills-customers-tab" tabindex="0"><User /></div>

                        <div className={`tab-pane fade my-${yMargin} mx-${xMargin}`} id="v-pills-subdealer" role="tabpanel" aria-labelledby="v-pills-subdealer-tab" tabindex="0"><SubDealer /></div>

                        <div className={`tab-pane fade my-${yMargin} mx-${xMargin}`} id="v-pills-connections" role="tabpanel" aria-labelledby="v-pills-connections-tab" tabindex="0"><Connections /></div>

                        <div className={`tab-pane fade my-${yMargin} mx-${xMargin}`} id="v-pills-packages" role="tabpanel" aria-labelledby="v-pills-packages-tab" tabindex="0"><Packages /></div>

                        <div className={`tab-pane fade my-${yMargin} mx-${xMargin}`} id="v-pills-products" role="tabpanel" aria-labelledby="v-pills-products-tab" tabindex="0"><Products /></div>

                        <div className={`tab-pane fade my-${yMargin} mx-${xMargin}`} id="v-pills-complaints" role="tabpanel" aria-labelledby="v-pills-complaints-tab" tabindex="0"><Complaints /></div>

                        <div className={`tab-pane fade my-${yMargin} mx-${xMargin}`} id="v-pills-myaccount" role="tabpanel" aria-labelledby="v-pills-myaccount-tab" tabindex="0"><MyAccount /></div>

                        <div className={`tab-pane fade my-${yMargin} mx-${xMargin}`} id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabindex="0"><Settings /></div>
                    </div>
                </div>
            </div>
        </>
    )
}
