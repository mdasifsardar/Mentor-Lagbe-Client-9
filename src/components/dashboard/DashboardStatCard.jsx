import { Card, CardContent } from "@/components/ui/card";

const DashboardStatCard = ({
  title,
  value,
  label,
  icon: Icon,
  iconClassName,
  labelClassName,
}) => {
  return (
    <Card className="border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${labelClassName}`}
          >
            {label}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <p className="mt-1 font-heading text-3xl font-bold text-foreground">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
