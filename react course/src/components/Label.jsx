import React from 'react'

const Label = ({ className, label, htmlFor }) => {
    return (
        <>
            <label className={className} htmlFor={htmlFor}>{label}</label>
        </>
    )
}

export default Label;
