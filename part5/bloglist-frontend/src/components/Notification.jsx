const Notification = ({ message, success }) => {
    const successStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        border: "5px solid green",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    };

    const errorStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        border: "5px solid red",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    };

    const hideStyle = {
        display: "none"
    };

    const statusStyle = success ? successStyle : errorStyle;

    return (
        <div style={message ? statusStyle : hideStyle}>
            {message}
        </div>
    );
};

export default Notification;