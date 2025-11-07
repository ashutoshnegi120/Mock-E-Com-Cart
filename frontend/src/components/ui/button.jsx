
/* eslint-disable react/prop-types */
const Button = ({
                    text = "Click Me",
                    color = "bg-indigo-600",
                    textColor = "text-white",
                    onHoverColor = "bg-indigo-700",
                    onHoverTextColor = "text-white",
                    onClick = () => {},
                    className = "",
                }) => (
    <button
        onClick={onClick}
        className={`
      ${color} ${textColor}
      hover:${onHoverColor} hover:${onHoverTextColor}
      font-medium px-4 py-2 rounded-lg transition-all duration-300
      shadow-sm active:scale-95 ${className}
    `}
    >
        {text}
    </button>
);

export default Button;
