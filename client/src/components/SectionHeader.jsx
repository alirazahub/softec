import React from 'react'

function SectionHeader({ title }) {
    return (
        <>
            <h3 style={{ marginTop: 20 }}>{title}</h3>
            <hr />
        </>
    )
}

export default SectionHeader