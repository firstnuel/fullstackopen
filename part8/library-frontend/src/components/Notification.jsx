/* eslint-disable react/prop-types */
const Notification = ({ msg, setMsg}) => {
    
    if (msg) {
        setTimeout(() => setMsg(''), 3000)
    }

    const style  = {
        width: '100vw',
        border: '2px solid black',
        margin: '10px'

    }

    return (
        <>
            {msg ? <div style={style}>{msg}</div> : null}
        </>
    )
}   

export default Notification