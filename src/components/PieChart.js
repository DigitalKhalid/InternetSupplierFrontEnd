import '../assets/css/PieChart.css'
import React from 'react'

const PieChart = (props) => {
    const { percentage, color, width } = props

    const pieStyle = {
        '--percentage': percentage,
        '--pie-color': color,
        '--pie-width': width
    }

    return (
        <div class="pie animate" style={pieStyle}>
            {percentage}%
        </div>
    )
}

export default PieChart