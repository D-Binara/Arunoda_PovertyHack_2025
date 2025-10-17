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
} from "lucide-react";
import { cn } from "@/lib/utils";

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

    const joined = useMemo(() => {
        if (!data?.createdAt) return "";
        return new Date(data.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
        });
    }, [data?.createdAt]);

    if (loading)
        return (
            <div className="flex h-[80vh] items-center justify-center text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" /> Loading profile...
            </div>
        );

    if (!data)
        return (
            <div className="text-center py-24">
                <p className="text-muted-foreground">Entrepreneur not found.</p>
                <Link to="/entrepreneurs" className="mt-3 inline-block text-primary underline">
                    Back to directory
                </Link>
            </div>
        );

    const contact = data.contactPrefs || {};
    const phone = contact.whatsapp || contact.call || data.phone;

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white">
            {/* Background pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 40px 40px, rgba(0,0,0,0.04) 1px, transparent 0)",
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
                <Link
                    to="/entrepreneurs"
                    className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to directory
                </Link>

                {/* Hero section */}
                <div className="grid gap-10 md:grid-cols-3 items-center">
                    {/* Left column */}
                    <div className="space-y-6 text-sm text-muted-foreground">
                        <h3 className="text-base font-semibold text-foreground/90">Services</h3>
                        <ServiceItem title="Skill Development" />
                        <ServiceItem title="Community Training" />
                        <ServiceItem title="Mentorship" />
                    </div>

                    {/* Center photo + name */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative">
                            <img
                                src={data.photo || "/img/placeholder-user.jpg"}
                                alt={data.name}
                                className="h-64 w-64 rounded-2xl object-cover shadow-md ring-1 ring-border"
                            />
                            {data.isActive && (
                                <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 ring-1 ring-emerald-500/20">
                  <BadgeCheck className="h-3 w-3" />
                  Active
                </span>
                            )}
                        </div>
                        <h1 className="mt-6 text-3xl font-bold tracking-tight">{data.name}</h1>
                        <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {data.village ? `${data.village}, ` : ""}
                            {data.district}
                        </p>
                        {joined && (
                            <p className="mt-1 text-xs text-muted-foreground">Joined {joined}</p>
                        )}
                    </div>

                    {/* Right column */}
                    <div className="space-y-6 text-sm">
                        <h3 className="text-base font-semibold text-foreground/90">
                            About {data.name.split(" ")[0]}
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                            {data.bio ||
                                "This entrepreneur hasn’t added a description yet, but they are part of a growing community of innovators and small business creators across Sri Lanka."}
                        </p>

                        {data.skills && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {data.skills.map((s, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
                                    >
                    {s}
                  </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Advice section */}
                <div className="mt-16 grid gap-10 md:grid-cols-2 items-start">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Ask for Advice</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Send a message or question to {data.name.split(" ")[0]} for guidance or insights.
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

                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold">Connect & Collaborate</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Reach out directly or explore similar entrepreneurs to collaborate on community
                            projects.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <ContactButton
                                label="WhatsApp"
                                icon={MessageSquareText}
                                href={phone ? `https://wa.me/${sanitizePhone(phone)}` : "#"}
                            />
                            <ContactButton
                                label="Call"
                                icon={PhoneCall}
                                href={phone ? `tel:${sanitizePhone(phone)}` : "#"}
                            />
                            <ContactButton
                                label="Find Similar"
                                icon={Users2}
                                href={`/entrepreneurs?skill=${encodeURIComponent(
                                    data.skills?.[0] || ""
                                )}&district=${encodeURIComponent(data.district)}`}
                            />
                            <ContactButton
                                label="Propose Collaboration"
                                icon={Handshake}
                                href={`/jobs?collabWith=${data._id}`}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer metrics */}
                <div className="mt-20 grid grid-cols-3 items-center text-center text-sm text-muted-foreground">
                    <div>
                        <h4 className="text-xl font-semibold text-foreground">
                            {joined ? new Date().getFullYear() - new Date(data.createdAt!).getFullYear() : "1"}+
                        </h4>
                        <p>Years Active</p>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-foreground">
                            {(data.skills?.length || 1) * 10}+
                        </h4>
                        <p>Community Links</p>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-foreground">98%</h4>
                        <p>Engagement</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntrepreneurProfile;

/* --- Components --- */

const ServiceItem = ({ title }: { title: string }) => (
    <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <svg width="16" height="16" fill="currentColor">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        </div>
        <div>
            <p className="font-medium text-foreground/90">{title}</p>
            <p className="text-xs text-muted-foreground">
                Helping communities learn and collaborate through skill sharing.
            </p>
        </div>
    </div>
);

const ContactButton = ({
                           label,
                           icon: Icon,
                           href,
                       }: {
    label: string;
    icon: React.ComponentType<any>;
    href: string;
}) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-muted/60"
    >
        <Icon className="h-4 w-4" />
        {label}
    </a>
);

function sanitizePhone(v?: string) {
    return v ? v.replace(/[^\d+]/g, "") : "";
}
