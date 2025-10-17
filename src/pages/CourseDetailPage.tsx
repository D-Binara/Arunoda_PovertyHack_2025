import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { mockStoryPacks } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Play,
  CheckCircle2,
  Clock,
  ArrowLeft,
  BookOpen,
  Star,
  Shield,
  Calendar,
} from "lucide-react";
import { OfflineBadge } from "@/components/OfflineBadge";

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = useMemo(() => mockStoryPacks.find((c) => c.id === id), [id]);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(!!course?.isDownloaded);

  if (!course) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Course not found</h2>
          <p className="text-muted-foreground">This course may have been moved or removed.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    setIsDownloaded(true);
    alert(`${course.title} downloaded for offline use.`);
  };

  // --- Lessons mock fallback ---
  const lessons =
    course.stories?.map((s: any, i: number) => ({
      ...s,
      duration: s.duration || `${8 + (i % 5)} min`,
      completed: s.completed ?? false,
    })) || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ---------- HERO ---------- */}
      <section
        className="relative w-full h-56 md:h-72 lg:h-80 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.7)), url('${course.thumbnail}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Top Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="bg-white/80 backdrop-blur text-gray-800 hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/80 text-gray-800">
              {course.category}
            </Badge>
            {course.featured && <Badge className="bg-[#F57C00] text-white">Featured</Badge>}
            {isDownloaded && <OfflineBadge />}
          </div>
        </div>

        {/* Title + Meta */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-5xl mx-auto px-4 pb-6 text-white space-y-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
              {course.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-white/90">
              <span className="inline-flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> {lessons.length} lessons
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" /> ~{course.duration || "45 min"}
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4" /> {course.rating || "4.8"} / 5
              </span>
              <span className="inline-flex items-center gap-1">
                <Shield className="h-4 w-4" /> Offline ready
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Updated {course.updatedAt || "recently"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* LEFT: Overview + Lessons */}
        <div className="space-y-8">
          {/* CTA + Progress */}
          <div className="rounded-xl border bg-card shadow-sm">
            <div className="p-5 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    {isDownloaded && <OfflineBadge />}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.subtitle || course.description}
                  </p>
                </div>

                <div className="flex w-full md:w-auto gap-2">
                  {isDownloaded ? (
                    <Button className="flex-1 md:flex-none bg-[#F57C00] hover:bg-[#EF6C00] text-white">
                      <Play className="h-4 w-4 mr-2" /> Continue
                    </Button>
                  ) : (
                    <Button
                      className="flex-1 md:flex-none bg-[#F57C00] hover:bg-[#EF6C00] text-white"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  )}
                </div>
              </div>

              <div className="pt-1 space-y-2">
                <Progress value={course.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{course.progress}% complete</span>
                  <span>{course.downloadSize} MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div className="rounded-xl border bg-card p-5 space-y-3">
            <h2 className="text-lg font-semibold">About this course</h2>
            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {course.description}
            </p>

            {course.badges?.length > 0 && (
              <>
                <Separator />
                <div className="flex flex-wrap gap-2">
                  {course.badges.map((b: string, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {b}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* LESSONS */}
          <div className="rounded-xl border bg-card">
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-3">Lessons</h2>
              <ul className="divide-y">
                {lessons.map((lesson: any, i: number) => (
                  <li key={i} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {lesson.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <Play className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <button
                            onClick={() => navigate(`/learn/${course.id}?lesson=${i}`)}
                            className="text-left font-medium hover:text-[#F57C00] line-clamp-1"
                            title={lesson.title}
                          >
                            {i + 1}. {lesson.title}
                          </button>
                          <span className="text-xs text-muted-foreground inline-flex items-center gap-1 whitespace-nowrap">
                            <Clock className="h-3.5 w-3.5" />
                            {lesson.duration}
                          </span>
                        </div>
                        {lesson.summary && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {lesson.summary}
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/learn/${course.id}?lesson=${i}`)}
                      >
                        {lesson.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <aside className="lg:sticky lg:top-6 space-y-4">
          {/* INFO CARD */}
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <h3 className="font-semibold">Course Info</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium">{course.category}</span>
              <span className="text-muted-foreground">Level</span>
              <span className="font-medium">{course.level || "Beginner"}</span>
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{course.duration || "~45 min"}</span>
              <span className="text-muted-foreground">Updated</span>
              <span className="font-medium">{course.updatedAt || "Recently"}</span>
            </div>

            <Separator />

            {/* Instructor */}
            <div className="flex items-center gap-3">
              <img
                src={course.instructor?.avatar || "/img/story/profile.png"}
                alt={course.instructor?.name || "Instructor"}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-muted"
              />
              <div>
                <p className="text-sm font-medium">
                  {course.instructor?.name || "Arunoda Coach"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {course.instructor?.title || "Coach & Mentor"}
                </p>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              {isDownloaded ? (
                <Button className="flex-1 bg-[#F57C00] hover:bg-[#EF6C00] text-white">
                  <Play className="h-4 w-4 mr-2" /> Continue
                </Button>
              ) : (
                <Button
                  className="flex-1 bg-[#F57C00] hover:bg-[#EF6C00] text-white"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              )}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold mb-2">You’ll Learn</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {(course.outcomes || [
                "Make a weekly budget that works",
                "Price your first product confidently",
                "Grow customers with simple marketing tactics",
              ]).map((o: string, i: number) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      {/* ---------- MOBILE ACTION BAR ---------- */}
      <div className="lg:hidden sticky bottom-0 inset-x-0 border-t bg-background/95 backdrop-blur p-3 flex items-center gap-2">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{course.progress}% complete</span>
            <span>{course.downloadSize} MB</span>
          </div>
          <Progress value={course.progress} className="h-1.5 mt-1" />
        </div>
        {isDownloaded ? (
          <Button className="shrink-0 bg-[#F57C00] hover:bg-[#EF6C00] text-white">
            <Play className="h-4 w-4 mr-2" /> Continue
          </Button>
        ) : (
          <Button
            className="shrink-0 bg-[#F57C00] hover:bg-[#EF6C00] text-white"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
        )}
      </div>
    </div>
  );
}
