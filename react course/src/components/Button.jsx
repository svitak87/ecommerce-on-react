import React from 'react'

const Button = ({ className, label, type }) => {
    return (
        <button className={className} type={type}>{label}</button>
    )
}

export default Button;
