import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../primitives/card";
import { Button } from "../primitives/button";

type Action =
  | { type: "link"; href: string; label: string }
  | { type: "button"; label: string; onClick: () => void };

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  action: Action;
};

export function InvolvementCard({ icon: Icon, title, description, action }: Props) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow rounded-sm">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-[var(--color-button-bg)] rounded flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-700 mb-4 text-sm">{description}</p>
        {action.type === "link" ? (
          <Button
            asChild
            className="w-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white"
          >
            <a href={action.href} target="_blank" rel="noopener noreferrer">
              {action.label}
            </a>
          </Button>
        ) : (
          <Button
            className="w-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
