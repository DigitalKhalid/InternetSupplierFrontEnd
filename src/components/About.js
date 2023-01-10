import '../assets/css/About.css'
import React from 'react'

const About = () => {
    return (
        <div>
            <p className="paragraph">
                BizzISP Manager is a simple and interactive application to manage connections and business activities among customers and dealers. The focus is to minimize efforts to keep track of package subscriptions and their renewal.
            </p>
            <p className="paragraph">
                The application BizzISP version 1.0 is an initial Beta release and will be released final product after several trials to provide seemless and bug free service. Improvements will be shared among all BizzISP Manager Users and deployed to their dedicated hosting on request.
            </p>
            <p className="paragraph">
                The product is solely property of BizzSole hence distribution and sharing of source code by ones will be liable to legal procecutions.
            </p>
            <strong>Contact Information:</strong>
            <p className="paragraph">
                For more information, please contact <a href="/" target='_blank' rel='nooperner'>bizzsole.com</a>. <br />
                <i className='fa fa-envelope'></i> bizzsole@gmail.com <br />
                <i className='fa-brands fa-facebook'></i> https://facebook.com/bizzsole <br />
                <i className='fa-brands fa-whatsapp'></i> 0301-5339757
            </p>
        </div>
    )
}

export default About