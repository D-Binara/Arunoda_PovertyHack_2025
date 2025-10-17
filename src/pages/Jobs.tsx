import { useState, useEffect } from "react";
import {
  MapPin,
  DollarSign,
  Plus,
  Loader2,
  Briefcase,
  Building2,
  Clock,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BottomNav } from "@/components/BottomNav";
import { jobsAPI, handleApiError } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Job {
  _id: string;
  title: string;
  description: string;
  pay: string;
  location: string;
  district: string;
  skills: string[];
  status: "open" | "filled";
  postedBy: any;
  postedAt: string;
}

export default function JobsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [status, setStatus] = useState<"all" | "open" | "filled">("all");
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchJobs = async () => {
    try {
      const params: any = {};
      if (status !== "all") params.status = status;
      if (search) params.search = search;

      const response = await jobsAPI.getAll(params);
      const fetchedJobs = response.data.data || response.data;
      setJobs(fetchedJobs);
    } catch (error) {
      handleApiError(error, "Failed to load jobs");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [status, search]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchJobs();
  };

  const handleCreateJob = () => {
    if (!isAuthenticated) {
      toast.error("Please login to post a job");
      navigate("/login");
      return;
    }
    navigate("/jobs/new");
  };

  const handleViewDetails = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* ---------- HERO SECTION ---------- */}
      <section
        className="relative flex flex-col items-center justify-center text-center text-white py-20 px-4"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('/img/Learn/top.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
            Jobs & Collaborations
          </h1>
          <p className="text-lg md:text-xl text-gray-100 opacity-90">
            Find real opportunities, projects, and partners in your community.
          </p>
          <Button
            onClick={handleCreateJob}
            className="mt-4 bg-[#F57C00] hover:bg-[#EF6C00] text-white font-medium px-6 py-2 rounded-lg"
          >
            <Plus className="h-4 w-4 mr-2" /> Post a Job
          </Button>
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>
      </section>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
        {/* Search + Tabs Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Input
            placeholder="Search by title, skills or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Tabs value={status} onValueChange={(v) => setStatus(v as any)}>
            <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="filled">Filled</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-between ">
             <h2 className="text-2xl font-bold">Recent Jobs</h2>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-sm"
          >
            {refreshing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Refreshing
              </>
            ) : (
              "Refresh Jobs"
            )}
          </Button>
        </div>

        {/* ---------- JOBS LIST ---------- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {jobs.map((job) => (
              <Card
                key={job._id}
                className="overflow-hidden border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    {/* Job Title */}
                    <div className="flex items-start justify-between">
                      <h3
                        onClick={() => handleViewDetails(job._id)}
                        className="font-semibold text-lg leading-tight cursor-pointer hover:text-[#F57C00] transition"
                      >
                        {job.title}
                      </h3>
                      <Badge
                        variant={job.status === "open" ? "default" : "secondary"}
                        className={
                          job.status === "open"
                            ? "bg-[#F57C00] text-white"
                            : "bg-gray-200 text-gray-700"
                        }
                      >
                        {job.status === "open" ? "Open" : "Filled"}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>

                    {/* Job Info */}
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location || job.district}
                      </span>
                      {job.pay && (
                        <span className="flex items-center gap-1 font-medium text-[#F57C00]">
                          <DollarSign className="h-4 w-4" />
                          {job.pay}
                        </span>
                      )}
                    </div>

                    {/* Skills */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.slice(0, 4).map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {job.postedBy?.name || "Anonymous"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(job.postedAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    size="sm"
                    className="mt-4 bg-[#F57C00] hover:bg-[#EF6C00] text-white w-full"
                    onClick={() => handleViewDetails(job._id)}
                  >
                    {job.status === "open" ? "Apply Now" : "View Details"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <Briefcase className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
            <div>
              <p className="text-lg font-semibold text-muted-foreground">
                No jobs found
              </p>
              <p className="text-sm text-muted-foreground">
                {search ? "Try adjusting your search" : "Be the first to post a job!"}
              </p>
            </div>
            <Button
              onClick={handleCreateJob}
              className="bg-[#F57C00] hover:bg-[#EF6C00] text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> Post a Job
            </Button>
          </div>
        )}
      </div>

    
    </div>
  );
}
