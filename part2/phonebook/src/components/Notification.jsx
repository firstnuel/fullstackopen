import '../index.css'

const Notification = ({message, success}) => {
    let status = success ? "success" : "error";

    return(
        <div className={message? status : "hide"}>
            {message}
        </div>
    )
};

export default Notification;