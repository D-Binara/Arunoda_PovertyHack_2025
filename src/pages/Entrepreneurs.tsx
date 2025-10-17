import React, { useEffect, useMemo, useState } from "react";
import { entrepreneursAPI } from "@/lib/api";
import {
    Loader2,
    Search,
    MapPin,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    BadgeCheck,
    Filter,
    RefreshCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Entrepreneur = {
    _id: string;
    name: string;
    district: string;
    village?: string;
    bio?: string;
    skills?: string[];
    photo?: string;
    isActive?: boolean;
    createdAt?: string;
};

type Pagination = {
    page: number;
    limit: number;
    total: number;
    pages: number;
};

const PAGE_LIMIT = 12;

const SkeletonCard = () => (
    <div className="rounded-xl border border-border bg-card p-4 animate-pulse">
        <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-muted" />
        <div className="mx-auto h-4 w-2/3 rounded bg-muted" />
        <div className="mx-auto mt-2 h-3 w-1/3 rounded bg-muted" />
        <div className="mx-auto mt-3 h-3 w-4/5 rounded bg-muted" />
    </div>
);

const EmptyState = ({ onReset }: { onReset: () => void }) => (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
        <div className="mb-3 rounded-xl border border-dashed border-border p-6">
            <Sparkles className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No entrepreneurs found</h3>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Try changing filters, clearing your search, or widening your district selection.
        </p>
        <button
            onClick={onReset}
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/50"
        >
            <RefreshCcw className="h-4 w-4" /> Reset filters
        </button>
    </div>
);

const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
        <div className="mb-3 rounded-xl border border-destructive/40 bg-destructive/10 p-6">
            <RefreshCcw className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-destructive">Something went wrong</h3>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
        <button
            onClick={onRetry}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90"
        >
            <RefreshCcw className="h-4 w-4" /> Try again
        </button>
    </div>
);

const Pill = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span
        className={cn(
            "inline-flex items-center rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground",
            className
        )}
    >
    {children}
  </span>
);

const Entrepreneurs: React.FC = () => {
    const [items, setItems] = useState<Entrepreneur[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false); // for page-only spinners
    const [error, setError] = useState<string | null>(null);

    // UI state / filters
    const [q, setQ] = useState("");
    const [qDebounced, setQDebounced] = useState("");
    const [district, setDistrict] = useState("");
    const [skill, setSkill] = useState("");
    const [onlyActive, setOnlyActive] = useState(true);
    const [sort, setSort] = useState("-createdAt");
    const [page, setPage] = useState(1);

    // Debounce search input
    useEffect(() => {
        const t = setTimeout(() => setQDebounced(q.trim()), 300);
        return () => clearTimeout(t);
    }, [q]);

    const fetchData = async (opts?: { page?: number; initial?: boolean }) => {
        const isInitial = opts?.initial ?? false;
        setError(null);
        setLoading(isInitial);
        setLoadingPage(!isInitial);

        try {
            const res = await entrepreneursAPI.getAll({
                q: qDebounced || undefined,
                district: district || undefined,
                skill: skill || undefined,
                onlyActive,
                page: opts?.page ?? page,
                limit: PAGE_LIMIT,
                sort,
            });

            const payload = res.data;
            setItems(payload?.data ?? []);
            setPagination(payload?.pagination ?? null);
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || "Failed to load entrepreneurs.");
        } finally {
            setLoading(false);
            setLoadingPage(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchData({ initial: true, page: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // React to filters / search / sort
    useEffect(() => {
        setPage(1);
        fetchData({ page: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qDebounced, district, skill, sort, onlyActive]);

    const totalPages = pagination?.pages ?? 1;

    // derive facet options from current items (lightweight; for real scale, use backend facets)
    const districtOptions = useMemo(() => {
        const set = new Set<string>();
        items.forEach((i) => i.district && set.add(i.district));
        return Array.from(set).sort();
    }, [items]);

    const skillOptions = useMemo(() => {
        const set = new Set<string>();
        items.forEach((i) => (i.skills || []).forEach((s) => s && set.add(s)));
        return Array.from(set).sort();
    }, [items]);

    const resetFilters = () => {
        setQ("");
        setDistrict("");
        setSkill("");
        setOnlyActive(true);
        setSort("-createdAt");
        setPage(1);
        fetchData({ page: 1 });
    };

    const goToPage = (p: number) => {
        const clamped = Math.max(1, Math.min(p, totalPages));
        setPage(clamped);
        fetchData({ page: clamped });
    };

    // ---- UI ----
    if (loading) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-10">
                <HeaderBar />
                <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <ErrorState message={error} onRetry={() => fetchData({ page, initial: true })} />;
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            <HeaderBar />

            {/* Toolbar */}
            <div className="sticky top-16 z-10 mt-4 rounded-xl border border-border bg-background/80 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    {/* Left: Search */}
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search by name, bio, village, district, skills…"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                        {q && (
                            <button
                                onClick={() => setQ("")}
                                className="text-xs text-muted-foreground hover:underline"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Right: Filters */}
                    <div className="flex flex-1 flex-wrap items-center justify-end gap-2 md:flex-none">
                        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <select
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="bg-transparent text-sm outline-none"
                            >
                                <option value="">All districts</option>
                                {districtOptions.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                            <span className="mx-1 text-muted-foreground">|</span>
                            <select
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                className="bg-transparent text-sm outline-none"
                            >
                                <option value="">All skills</option>
                                {skillOptions.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-2">
                            <label className="text-xs text-muted-foreground">Sort</label>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="bg-transparent text-sm outline-none"
                                title="Sort"
                            >
                                <option value="-createdAt">Newest</option>
                                <option value="name">Name A–Z</option>
                                <option value="-name">Name Z–A</option>
                                <option value="district">District A–Z</option>
                            </select>
                        </div>

                        <label className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
                            <input
                                type="checkbox"
                                checked={onlyActive}
                                onChange={(e) => setOnlyActive(e.target.checked)}
                            />
                            <span>Only active</span>
                        </label>

                        <button
                            onClick={resetFilters}
                            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-muted/60"
                        >
                            <RefreshCcw className="h-4 w-4" />
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            {items.length === 0 ? (
                <EmptyState onReset={resetFilters} />
            ) : (
                <>
                    {/* Subtle info row */}
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing{" "}
                            <span className="font-medium">
                {(pagination?.page ?? 1 - 1) * (pagination?.limit ?? PAGE_LIMIT) + 1}
              </span>{" "}
                            –{" "}
                            <span className="font-medium">
                {Math.min((pagination?.page ?? 1) * (pagination?.limit ?? PAGE_LIMIT), pagination?.total ?? items.length)}
              </span>{" "}
                            of <span className="font-medium">{pagination?.total ?? items.length}</span>
                        </p>
                        {loadingPage && (
                            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                updating…
              </span>
                        )}
                    </div>

                    {/* Grid */}
                    <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {items.map((e) => (
                            <article
                                key={e._id}
                                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
                            >
                                {/* subtle gradient halo */}
                                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                                     aria-hidden
                                     style={{
                                         background:
                                             "radial-gradient(800px 240px at 10% -10%, rgba(255,200,150,0.15), transparent 50%)",
                                     }}
                                />
                                <div className="relative p-4">
                                    <div className="flex flex-col items-center text-center">
                                        <img
                                            src={e.photo || "/img/placeholder-user.jpg"}
                                            alt={e.name}
                                            className="mb-3 h-20 w-20 rounded-full object-cover ring-2 ring-background ring-offset-2 ring-offset-muted/50"
                                            onError={(ev) => ((ev.currentTarget.src = "/img/placeholder-user.jpg"))}
                                        />
                                        <h3 className="line-clamp-1 text-lg font-semibold">{e.name}</h3>

                                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                            <MapPin className="h-3.5 w-3.5" />
                                            <span className="line-clamp-1">
                        {e.village ? `${e.village}, ` : ""}
                                                {e.district}
                      </span>
                                        </div>

                                        {e.skills && e.skills.length > 0 && (
                                            <div className="mt-3 flex flex-wrap justify-center gap-1">
                                                {e.skills.slice(0, 3).map((s, i) => (
                                                    <Pill key={i}>{s}</Pill>
                                                ))}
                                                {e.skills.length > 3 && (
                                                    <Pill className="text-foreground">+{e.skills.length - 3}</Pill>
                                                )}
                                            </div>
                                        )}

                                        {e.bio && (
                                            <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{e.bio}</p>
                                        )}

                                        <div className="mt-4 flex w-full items-center justify-center gap-2">
                                            <Link
                                                to={`/entrepreneurs/${e._id}`}
                                                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                                            >
                                                View profile
                                            </Link>
                                        </div>

                                        {e.isActive && (
                                            <div className="absolute right-2 top-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 ring-1 ring-emerald-500/20">
                          <BadgeCheck className="h-3 w-3" />
                          Active
                        </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2">
                            <button
                                onClick={() => goToPage(page - 1)}
                                disabled={page <= 1}
                                className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm disabled:opacity-50"
                            >
                                <ChevronLeft className="h-4 w-4" /> Prev
                            </button>

                            <div className="mx-2 text-sm text-muted-foreground">
                                Page <span className="font-medium text-foreground">{page}</span> of{" "}
                                <span className="font-medium text-foreground">{totalPages}</span>
                            </div>

                            <button
                                onClick={() => goToPage(page + 1)}
                                disabled={page >= totalPages}
                                className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm disabled:opacity-50"
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Entrepreneurs;

/* ---------- Local subcomponents ---------- */
const HeaderBar = () => (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
            <h1 className="text-2xl font-semibold tracking-tight">Entrepreneurs</h1>
            <p className="mt-1 text-sm text-muted-foreground">
                Discover local talent across Sri Lanka — filtered by district, skills, and more.
            </p>
        </div>
        <div className="mt-2 flex items-center gap-2 sm:mt-0">
      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
        Directory
      </span>
        </div>
    </div>
);
