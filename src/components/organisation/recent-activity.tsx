import { RECENT_ACTIVITY } from "@/app/graphql/queries/analytics/analytics.queries";
import { useQuery } from "@apollo/client/react";
import { CardContent } from "../ui/card";
import { Activity, Loader2 } from "lucide-react";
import { timeAgo } from "@/lib/timeAgo";
import { EmptyAnalytics } from "./empty-analytics";

interface Props {
  organisationId: string;
}

interface Activity {
  id: string;
  userName: string;
  action: string;
  target: string;
  type: string;
  timestamp: any;
}

function RecentActivity({ organisationId }: Props) {
  const { data, loading, refetch } = useQuery<{ recentActivities: Activity[] }>(
    RECENT_ACTIVITY,
    {
      variables: { businessId: organisationId },
      fetchPolicy: "network-only",
    }
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[220px]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (data?.recentActivities.length === 0) {
    return <EmptyAnalytics />;
  }

  return (
    <CardContent>
      <div className="space-y-4">
        {data?.recentActivities.map((activity, index) => (
          <div
            key={`${activity?.timestamp}+${index}`}
            className="flex items-start gap-4 pb-4 border-b border-border last:border-0"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-foreground">
                {activity.userName}{" "}
                <span className="text-muted-foreground font-normal capitalize">
                  {activity.action}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {activity?.target} • {timeAgo(activity?.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  );
}

export default RecentActivity;
