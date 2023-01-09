import '../assets/css/BarChart.css'
import React from 'react'
import chartData from '../data/BarChart.json'

const BarChart = (props) => {
    const { data } = props

    return (
        <div>
            <section>
                <div className="barchart-body">
                    {data.map((item, index) => {
                        return (
                            <div className="barchart-bar" key={index}>
                                <div className="barchart-content" style={{ height: item.percentage }}>
                                    <div className='barchart-bar-progress'>{item.value}</div>
                                </div>
                                <div className="barchart-bar-title">{item.title}</div>
                            </div>
                        )
                    })}
                </div>

            </section>
        </div>
    )
}

export default BarChart