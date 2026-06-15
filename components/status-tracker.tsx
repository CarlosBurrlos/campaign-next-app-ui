import { Progress } from "./ui/progress";

type Props = {
  label: string;
  current: number;
  goal: number;
  unit: string;
};

export function StatusTracker({ label, current, goal, unit }: Props) {
  const percentage = Math.min(Math.round((current / goal) * 100), 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline text-sm font-medium text-gray-900">
        <span>{label}</span>
        <span className="text-xs text-gray-500">
          {current.toLocaleString()} / {goal.toLocaleString()} {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <p className="text-xs text-gray-500 text-right">{percentage}% complete</p>
    </div>
  );
}
