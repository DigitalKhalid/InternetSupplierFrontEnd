import React, { useState } from 'react'
import { Sidebar } from './Sidebar/Sidebar.js'
import '../components/Content.css'

export const Content = () => {
    const [expand, setExpand] = useState(false)

    const expandContent = (sidebar) => {
        // setExpand(!sidebar)
    }

    return (
        <>
            <div className="main">
                <Sidebar expand={expandContent} />
                <div className={`${expand ? "container-content expand" : "container-content"}`}>
                    <div className='content'>
                        <div className="content-header">
                            Title
                        </div>

                        <div className="content-body">
                            body
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
