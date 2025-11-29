import { ORGANISATION_OVERVIEW } from "@/app/graphql/queries/organisation-queries/organisation.queries";
import { useQuery } from "@apollo/client/react";
import { Award, BookOpen, FolderOpen, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BusinessOverview {
  totalMembers: number;
  totalGroups: number;
  totalCourses: number;
  totalCertificates: number;
}

interface Props {
  organisationId: String;
}

function StatCard({
  title,
  icon,
  value,
  loading,
}: {
  title: string;
  icon: React.ReactNode;
  value: number | undefined;
  loading: boolean;
}) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground">
          {loading ? <Skeleton className="h-4 w-24" /> : title}
        </CardTitle>
        {loading ? <Skeleton className="h-4 w-4 rounded" /> : icon}
      </CardHeader>

      <CardContent>
        {loading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="text-2xl font-bold text-foreground">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}

function OrganisationStats({ organisationId }: Props) {
  const {
    data: statsData,
    loading,
    refetch,
  } = useQuery<{
    businessOverview: BusinessOverview;
  }>(ORGANISATION_OVERVIEW, {
    variables: { businessId: organisationId },
  });

  const stats = statsData?.businessOverview;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total members"
        icon={<Users className="h-4 w-4 text-primary" />}
        value={stats?.totalMembers}
        loading={loading}
      />

      <StatCard
        title="Total courses"
        icon={<BookOpen className="h-4 w-4 text-primary" />}
        value={stats?.totalCourses}
        loading={loading}
      />

      <StatCard
        title="Total groups"
        icon={<FolderOpen className="h-4 w-4 text-primary" />}
        value={stats?.totalGroups}
        loading={loading}
      />

      <StatCard
        title="Certificates issued"
        icon={<Award className="h-4 w-4 text-primary" />}
        value={stats?.totalCertificates}
        loading={loading}
      />
    </div>
  );
}

export default OrganisationStats;
