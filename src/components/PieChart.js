import '../assets/css/PieChart.css'
import React from 'react'

const PieChart = (props) => {
    const { value, color, width } = props

    const pieStyle = {
        '--percentage': value,
        '--pie-color': color,
        '--pie-width': width
    }

    return (
        <div className="pie animate" style={pieStyle}>
            {value}
        </div>
    )
}

export default PieChart