
import {
  Users,
  ShieldCheck,
  UserCog,
  PenSquare,
  Shield,
} from "lucide-react";

import Text from "@/components/shared/Text";
import { cn } from "@/utils/cn";

const statStyles = {
  total: {
    icon: Users,
    iconClass: "bg-muted",
    iconColor: "text-foreground/60",
    valueColor: "text-foreground",
  },
  super_admin: {
    icon: ShieldCheck,
    iconClass: "bg-purple-50",
    iconColor: "text-purple-600",
    valueColor: "text-purple-600",
  },
  admin: {
    icon: Shield,
    iconClass: "bg-blue-50",
    iconColor: "text-blue-600",
    valueColor: "text-blue-600",
  },
  moderator: {
    icon: UserCog,
    iconClass: "bg-indigo-50",
    iconColor: "text-indigo-600",
    valueColor: "text-indigo-600",
  },
  author: {
    icon: PenSquare,
    iconClass: "bg-amber-50",
    iconColor: "text-amber-600",
    valueColor: "text-amber-600",
  },
};

export default function UsersStats({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const style = statStyles[stat.type];
        const Icon = style.icon;

        return (
          <div
            key={stat.type}
            className="rounded-xl border border-border bg-background p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <Text variant="smallText">{stat.label}</Text>

              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  style.iconClass
                )}
              >
                <Icon className={cn("h-4 w-4", style.iconColor)} />
              </div>
            </div>

            <p className={cn("mt-3 text-2xl font-bold", style.valueColor)}>
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
