export default function ProfileCard({ children, className = "" }: any) {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}
