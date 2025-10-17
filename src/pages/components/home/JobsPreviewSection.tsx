import { useEffect, useState } from "react";
import { MapPin, DollarSign, ChevronRight, Loader2, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jobsAPI, handleApiError } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface Job {
  _id: string;
  title: string;
  description: string;
  pay: string;
  location: string;
  district: string;
  status: "open" | "filled";
}

export default function JobsPreviewSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch latest jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsAPI.getAll({ limit: 3 }); // fetch top 3
        const fetchedJobs = response.data.data || response.data;
        setJobs(fetchedJobs.slice(0, 3)); // only show first 3
      } catch (error) {
        handleApiError(error, "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Navigate to job detail page
  const handleViewDetails = (id: string) => {
    navigate(`/jobs/${id}`);
  };

  return (
    <section className="py-12">
      {/* Header */}
      <div className="mt-12 mb-6 flex flex-col items-center text-center space-y-3">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900">
          Jobs & Collaboration
        </h1>
        <p className="text-muted-foreground max-w-md">
          Explore local and online opportunities to earn, collaborate, and grow
          with your skills.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading available jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center">
          <Briefcase className="h-10 w-10 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground text-sm">
            No active job posts found. Be the first to post or check again later.
          </p>
        </div>
      ) : (
        <>
          {/* Job Cards Grid */}
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card
                key={job._id}
                className="overflow-hidden border border-neutral-200/70 dark:border-neutral-800 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <CardContent className="p-5 space-y-3">
                  {/* Title + Status */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-lg leading-snug text-gray-900 dark:text-white line-clamp-1">
                      {job.title}
                    </h3>
                    <Badge
                      variant={job.status === "open" ? "default" : "secondary"}
                      className={
                        job.status === "open"
                          ? "bg-[#F57C00] text-white"
                          : "bg-gray-300 text-gray-700"
                      }
                    >
                      {job.status === "open" ? "Open" : "Filled"}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description || "A local job opportunity where you can learn and earn."}
                  </p>

                  {/* Meta info */}
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location || job.district || "Sri Lanka"}
                    </p>
                    {job.pay && (
                      <p className="flex items-center gap-1.5 font-medium text-[#F57C00]">
                        <DollarSign className="h-4 w-4" />
                        {job.pay}
                      </p>
                    )}
                  </div>

                  {/* Button */}
                  <Button
                    onClick={() => handleViewDetails(job._id)}
                    className="w-full bg-[#F57C00] hover:bg-[#EF6C00] text-white mt-2"
                  >
                    {job.status === "open" ? "Apply Now" : "View Details"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All (centered) */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium"
            >
              View All Jobs
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
