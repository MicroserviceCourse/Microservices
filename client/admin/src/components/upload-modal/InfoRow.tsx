type InfoRowProps = {
  label: string;
  value: string;
};

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex justify-between gap-2">
    <span className="text-gray-500">{label}</span>
    <span className="truncate font-medium text-gray-800">{value}</span>
  </div>
);
export default InfoRow;
