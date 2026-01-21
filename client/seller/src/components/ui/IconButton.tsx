const IconButton = ({ children, badge, badgeColor = "bg-red-500" }: any) => {
  return (
    <div className="relative">
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full
          bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
      >
        {children}
      </button>

      {badge !== undefined && (
        <span
          className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center
            rounded-full text-[10px] text-white ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </div>
  );
};
export default IconButton;