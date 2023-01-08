import '../assets/css/BarChart.css'
import React from 'react'
import chartData from '../data/BarChart.json'

const BarChart = (props) => {
    const { data } = props

    return (
        <div>
            <section>
                <div class="barchart-body">
                    {chartData.map((item, index) => {
                        return (
                            <div className="barchart-bar" key={index}>
                                <div className="barchart-content" style={{ height: item.percentage }}>
                                    <div className='barchart-bar-progress'>{item.percentage}</div>
                                </div>
                                <div className="barchart-bar-title">{item.title}</div>
                            </div>
                        )
                    })}

                    {/* <div className="barchart-bar">
                        <div className="barchart-content" style={{ height: '85%' }}>
                            <div className='barchart-bar-progress'>20%</div>
                        </div>
                        <div className="barchart-bar-title">html</div>
                    </div>

                    <div className="barchart-bar">
                        <div className="barchart-content" style={{ height: '50%' }}>
                            <div className='barchart-bar-progress'>50%</div>
                        </div>
                        <div className="barchart-bar-title">css</div>
                    </div>

                    <div className="barchart-bar">
                        <div className="barchart-content" style={{ height: '35%' }}>
                            <div className='barchart-bar-progress'>35%</div>
                        </div>
                        <div className="barchart-bar-title">java</div>
                    </div> */}
                </div>

            </section>
        </div>
    )
}

export default BarChart