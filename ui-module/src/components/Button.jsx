import React, { useRef } from "react";

const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  variant = "primary",
  ...rest
}) => {
  const btnRef = useRef();

  const handleClick = (e) => {
    const button = btnRef.current;
    if (!button) return;
    // Create ripple
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    button.appendChild(circle);
    setTimeout(() => {
      circle.remove();
    }, 600);
    if (onClick) onClick(e);
  };

  const base =
    variant === "primary"
      ? "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400";

  return (
    <button
      ref={btnRef}
      type={type}
      className={`relative overflow-hidden transition-colors duration-200 rounded-lg px-4 py-2 font-medium focus:outline-none focus:ring-2 ${base} ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background: rgba(255,255,255,0.5);
          pointer-events: none;
          z-index: 10;
        }
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default Button; 