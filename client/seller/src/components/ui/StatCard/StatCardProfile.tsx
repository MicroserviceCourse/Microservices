import Card from "../Card/ProfileCard.tsx";
export default function StatCardProfile({label,value,right}:any){
    return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-3">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
          {label}
        </p>
        {right}
      </div>

      <p className="text-2xl font-extrabold text-slate-900">
        {value}
      </p>
    </Card>
  );
}