import React from 'react'

const Pagination = (props) => {
    const { showedRecords, totalRecords, nextPage, getMoreRecords } = props

    return (
        <div className="my-pagination">
            <ul className="pagination justify-content-start">
                <li className="page-item disabled">
                    <small> Showing <strong>{showedRecords}</strong> out of <strong>{totalRecords}</strong> Records</small>
                </li>

            </ul>

            <ul className="pagination pagination-sm justify-content-end">
                {nextPage && <li className="page-item">
                    <span className="pagination-btn tooltips" onClick={getMoreRecords}>
                        <i className='fa fa-angle-down'></i>
                        <span className='tooltiptext'>More Records</span>
                    </span>
                </li>}
            </ul>
        </div>
    )
}

export default Pagination