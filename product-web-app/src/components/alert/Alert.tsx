interface AlertProps {
    message: string;
    type: "success" | "danger";
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => (
    <div 
        className={`alert alert-${type} alert-dismissible fade show`}
        role="alert"
    >
        {message}
        <button
            type="button"
            className="btn-close"
            onClick={onClose}
        >
        </button>
    </div>
);

export default Alert;