import Hero from "@/pages/components/landing/hero.tsx";
import user from "../../backend/src/models/User.ts";
import {TopNav} from "@/components/Navbar/TopNav.tsx";

export default function LandingPage() {
return (
    <>
        <TopNav/>
    <Hero user={"test"}/>
    </>
)
}