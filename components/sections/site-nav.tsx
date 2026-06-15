"use client";

import { useCampaign } from "../campaign-provider";
import { shareOrFallback } from "../../lib/share";
import { Button } from "../ui/button";
import Image from "next/image";
import { Facebook, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteNav() {
  const { campaign } = useCampaign();
  const { candidate, committee } = campaign;
  const primarySocial = committee.social.find((s) => s.primary) ?? committee.social[0];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-gray-900 backdrop-blur sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "py-1" : "py-3"}`}
        >
          <div className="flex items-center flex-1">
            <Image
              src="/logo.svg"
              width={1024}
              height={1024}
              alt={`${candidate.name} Logo`}
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-16" : "h-24"}`}
            />
          </div>

          <div className="flex md:hidden">
            <Button
              asChild
              size="sm"
              className="bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white text-sm px-4"
            >
              <a href={committee.donationUrl} target="_blank" rel="noopener noreferrer">
                Donate Now
              </a>
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className={`text-gray-300 font-medium transition-all hover:underline hover:decoration-[var(--color-link-decoration)] hover:decoration-2 hover:underline-offset-4 ${isScrolled ? "text-base" : "text-lg"}`}
            >
              About
            </a>
            <a
              href="#get-involved"
              className={`text-gray-300 font-medium transition-all hover:underline hover:decoration-[var(--color-link-decoration)] hover:decoration-2 hover:underline-offset-4 ${isScrolled ? "text-base" : "text-lg"}`}
            >
              Get Involved
            </a>
            <Button
              asChild
              size="lg"
              className={`bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white transition-all ${isScrolled ? "text-sm px-3 py-3" : "text-base px-5 py-5"}`}
            >
              <a href={committee.donationUrl} target="_blank" rel="noopener noreferrer">
                Donate Now
              </a>
            </Button>
            <div className="flex space-x-4">
              {primarySocial && (
                <Facebook
                  onClick={() => window.open(primarySocial.url, "_blank", "noopener,noreferrer")}
                  className={`text-gray-200 hover:text-[var(--color-button-bg)] transition-all cursor-pointer ${isScrolled ? "w-5 h-5" : "w-7 h-7"}`}
                />
              )}
              <Share2
                onClick={() => { void shareOrFallback(candidate.share); }}
                className={`text-gray-200 hover:text-[var(--color-button-bg)] transition-all cursor-pointer ${isScrolled ? "w-5 h-5" : "w-7 h-7"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
