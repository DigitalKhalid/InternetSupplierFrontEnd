import React from 'react'

const Toast = (props) => {
    let { title, body } = props

    return (
        <div>
            <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>

            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="..." class="rounded me-2" alt="..."></img>
                        <strong class="me-auto">{title}</strong>
                        {/* <small>11 mins ago</small> */}
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Toast