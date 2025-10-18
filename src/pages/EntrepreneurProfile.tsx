import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { entrepreneursAPI } from "@/lib/api";
import {
  ArrowLeft,
  MapPin,
  BadgeCheck,
  MessageSquareText,
  PhoneCall,
  Users2,
  Handshake,
  Send,
  Loader2,
  CalendarClock,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- Types ---------------- */
type Entrepreneur = {
  _id: string;
  name: string;
  district: string;
  village?: string;
  bio?: string;
  skills?: string[];
  photo?: string;
  phone?: string;
  isActive?: boolean;
  contactPrefs?: { whatsapp?: string; sms?: string; call?: string };
  createdAt?: string;
};

/* ---------------- Page ---------------- */
const EntrepreneurProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Entrepreneur | null>(null);
  const [loading, setLoading] = useState(true);
  const [adviceText, setAdviceText] = useState("");

  useEffect(() => {
    const fetchOne = async () => {
      if (!id) return;
      try {
        const res = await entrepreneursAPI.getById(id);
        setData(res.data?.data);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [id]);

  const joinedMonthYear = useMemo(() => {
    if (!data?.createdAt) return "";
    return new Date(data.createdAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  }, [data?.createdAt]);

  if (loading) {
    return (
      <div className="flex h-[75vh] items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        Loading profile…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-24">
        <p className="text-muted-foreground">Entrepreneur not found.</p>
        <Link to="/entrepreneurs" className="mt-3 inline-block text-primary underline">
          Back to directory
        </Link>
      </div>
    );
  }

  const contact = data.contactPrefs || {};
  const phoneRaw = contact.whatsapp || contact.call || data.phone;
  const phone = sanitizePhone(phoneRaw);
  const hasPhone = Boolean(phone);

  /* ---------------- UI ---------------- */
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white">
      {/* subtle dotted bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 40px 40px, rgba(0,0,0,0.035) 1px, transparent 0)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* breadcrumb/back */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/entrepreneurs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to directory
          </Link>
        </div>

        {/* HEADER / HERO */}
        <header className="rounded-2xl border border-border bg-card/60 backdrop-blur p-5 md:p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
            {/* Photo */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <img
                  src={data.photo || "/img/placeholder-user.jpg"}
                  alt={data.name}
                  className="h-28 w-28 md:h-32 md:w-32 rounded-2xl object-cover ring-1 ring-border shadow-sm"
                  onError={(ev) => ((ev.currentTarget.src = "/img/placeholder-user.jpg"))}
                />
                {data.isActive && (
                  <span className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 ring-1 ring-emerald-500/20">
                    <BadgeCheck className="h-3 w-3" />
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Identity */}
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {data.name}
              </h1>
              <p className="mt-1 flex items-center justify-center md:justify-start gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {data.village ? `${data.village}, ` : ""}
                {data.district}
              </p>
              {joinedMonthYear && (
                <p className="mt-1 text-xs text-muted-foreground inline-flex items-center gap-1">
                  <CalendarClock className="w-3.5 h-3.5" />
                  Joined {joinedMonthYear}
                </p>
              )}
              {data.skills?.length ? (
                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-1.5">
                  {data.skills.slice(0, 4).map((s, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                  {data.skills.length > 4 && (
                    <span className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs">
                      +{data.skills.length - 4}
                    </span>
                  )}
                </div>
              ) : null}
            </div>

            {/* Quick actions */}
            <div className="flex justify-center md:justify-end">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Contact
                </Link>
                <Link
                  to={`/entrepreneurs/${data._id}#collab`}
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-muted/60"
                >
                  Collaborate
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <main className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* LEFT: About + Services + Advice */}
          <section className="space-y-8">
            {/* About */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {data.bio ||
                  "This entrepreneur hasn’t added a description yet, but they are part of a growing community of innovators and small business creators across Sri Lanka."}
              </p>
            </div>

            {/* Services */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Services</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <ServiceItem title="Skill Development" />
                <ServiceItem title="Community Training" />
                <ServiceItem title="Mentorship" />
                <ServiceItem title="Project Support" />
              </div>
            </div>

            {/* Advice */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm" id="advice">
              <h2 className="text-lg font-semibold">Ask for Advice</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Send a message or question to {firstName(data.name)} for guidance or insights.
              </p>
              <textarea
                value={adviceText}
                onChange={(e) => setAdviceText(e.target.value)}
                placeholder="Write your message..."
                rows={3}
                className="mt-4 w-full resize-none rounded-lg border border-border bg-muted/30 p-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={() => alert("Advice request sent!")}
                className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
              >
                <Send className="h-4 w-4" />
                Send Request
              </button>
            </div>
          </section>

          {/* RIGHT: Contact & Collaborate (sticky) */}
          <aside className="lg:sticky lg:top-20 space-y-6" id="contact">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Connect & Collaborate</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Reach out directly or find similar entrepreneurs to collaborate on community projects.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <ContactButton
                  label="WhatsApp"
                  icon={MessageSquareText}
                  href={hasPhone ? `https://wa.me/${phone}` : "#"}
                  disabled={!hasPhone}
                  title={hasPhone ? undefined : "Phone not available"}
                />
                <ContactButton
                  label="Call"
                  icon={PhoneCall}
                  href={hasPhone ? `tel:${phone}` : "#"}
                  disabled={!hasPhone}
                  title={hasPhone ? undefined : "Phone not available"}
                />
                <ContactButton
                  label="Find Similar"
                  icon={Users2}
                  href={`/entrepreneurs?skill=${encodeURIComponent(data.skills?.[0] || "")}&district=${encodeURIComponent(
                    data.district
                  )}`}
                />
                <ContactButton
                  label="Propose Collaboration"
                  icon={Handshake}
                
                  href={`/investor-connect`}
                />
              </div>

              <div className="mt-5 rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
                Tip: Be specific about timelines, budget, and goals to speed up collaboration.
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm" id="collab">
              <h3 className="text-lg font-semibold">Profile Snapshot</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">{firstName(data.name)}</strong> is based in{" "}
                  <strong className="text-foreground">{data.district}</strong>
                  {data.village ? ` (${data.village})` : ""}.
                </li>
                {joinedMonthYear && (
                  <li>
                    Active since <strong className="text-foreground">{joinedMonthYear}</strong>.
                  </li>
                )}
                {!!data.skills?.length && (
                  <li>
                    Key skills:{" "}
                    <span className="text-foreground">{data.skills.slice(0, 3).join(", ")}</span>
                    {data.skills.length > 3 ? "…" : ""}
                  </li>
                )}
              </ul>
            </div>
          </aside>
        </main>

        {/* Footer metrics */}
        <section className="mt-12 grid grid-cols-3 items-center text-center text-sm text-muted-foreground">
          <Metric
            label="Years Active"
            value={
              joinedMonthYear && data.createdAt
                ? Math.max(1, new Date().getFullYear() - new Date(data.createdAt).getFullYear()) + "+"
                : "1+"
            }
          />
          <Metric label="Community Links" value={(data.skills?.length || 1) * 10 + "+"} />
          <Metric label="Engagement" value="98%" />
        </section>
      </div>
    </div>
  );
};

export default EntrepreneurProfile;

/* ---------------- Small Components ---------------- */
const ServiceItem = ({ title }: { title: string }) => (
  <div className="flex items-start gap-3">
    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
      <svg width="16" height="16" fill="currentColor" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
    <div>
      <p className="font-medium text-foreground/90">{title}</p>
      <p className="text-xs text-muted-foreground">Helping communities learn and collaborate.</p>
    </div>
  </div>
);

const ContactButton = ({
  label,
  icon: Icon,
  href,
  disabled,
  title,
}: {
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  disabled?: boolean;
  title?: string;
}) => (
  <a
    href={disabled ? undefined : href}
    target="_blank"
    rel="noreferrer"
    title={title}
    aria-disabled={disabled}
    className={cn(
      "inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm transition",
      disabled ? "pointer-events-none opacity-50" : "hover:bg-muted/60"
    )}
  >
    <Icon className="h-4 w-4" />
    {label}
  </a>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h4 className="text-xl font-semibold text-foreground">{value}</h4>
    <p>{label}</p>
  </div>
);

/* ---------------- Utils ---------------- */
function sanitizePhone(v?: string) {
  return v ? v.replace(/[^\d+]/g, "") : "";
}
function firstName(full: string) {
  return full?.split(" ")[0] || full;
}
