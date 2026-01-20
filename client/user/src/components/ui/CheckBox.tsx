const Checkbox = ({ checked, onChange }: any) => {
  return (
    <div
      onClick={onChange}
      className={`
        w-5 h-5 rounded-sm border cursor-pointer
        flex items-center justify-center
        transition-all duration-200
        ${checked
          ? 'bg-black border-black'
          : 'bg-white border-gray-400 hover:border-black'}
      `}
    >
      {checked && (
        <svg
          className="w-4 h-4 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  )
}

export default Checkbox
