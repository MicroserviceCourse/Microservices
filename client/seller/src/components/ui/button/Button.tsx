type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  color?: string;
  size?: "sm" | "md" | "lg" | "full";
  disabled?: boolean;
  rounded?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  color = "bg-blue-600",
  disabled = false,
  rounded,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline: "border border-gray-500 text-gray-200 hover:bg-gray-700 focus:ring-gray-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
    full: "py-3 w-full",
  };
  // chưa handle color cho button
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${color} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } rounded-${rounded ? rounded : ""}`}
    >
      {children}
    </button>
  );
}
