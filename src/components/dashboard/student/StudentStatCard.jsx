import { Card, CardContent } from "@/components/ui/card";

const StudentStatCard = ({ title, value, description, icon: Icon }) => {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">{value}</h2>

          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={24} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentStatCard;
