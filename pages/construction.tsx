"use client";

import { useCampaign, env, useFormspree } from "@carlosburrlos/campaign-next-app-kit";
import { ElectionCountdown } from "../../components/election-countdown";
import { Button } from "../../primitives/button";
import { Input } from "../../primitives/input";
import { Separator } from "../../primitives/separator";
import Image from "next/image";
import { Facebook, HardHat } from "lucide-react";

export function ConstructionPage() {
  const { campaign } = useCampaign();
  const { candidate, committee, platform } = campaign;
  const primarySocial = committee.social.find((s) => s.primary) ?? committee.social[0];
  const footerSubscribe = useFormspree(env.formspree.newsletter);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-gray-900 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <Image
              src="/logo.svg"
              width={1024}
              height={1024}
              alt={`${candidate.name} Logo`}
              className="h-20 w-auto"
            />
            <div className="flex items-center gap-5">
              <Button
                asChild
                size="sm"
                className="bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white px-4"
              >
                <a href={committee.donationUrl} target="_blank" rel="noopener noreferrer">
                  Donate Now
                </a>
              </Button>
              {primarySocial && (
                <Facebook
                  onClick={() => window.open(primarySocial.url, "_blank", "noopener,noreferrer")}
                  className="w-6 h-6 text-gray-200 hover:text-[var(--color-icon-hover)] transition-colors cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 pb-32">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-8">
          <HardHat className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
          Page Under Construction
        </h1>
        <p className="text-xl text-gray-500 max-w-md">
          You are in the right place. Check back later.
        </p>
      </main>

      <footer className="bg-gray-900 text-white py-16 pb-24 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Stay in Touch</h3>
              <p className="text-gray-400 mb-4">Get updates directly to your inbox</p>
              {footerSubscribe.status === "success" ? (
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-4 text-center">
                  <p className="text-green-400 font-semibold text-sm">You're signed up!</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Thanks for joining — we'll be in touch.
                  </p>
                </div>
              ) : (
                <form className="space-y-3" onSubmit={footerSubscribe.handleSubmit}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="bg-gray-800 border-gray-700 text-white h-12"
                    required
                  />
                  {footerSubscribe.status === "error" && (
                    <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
                  )}
                  <Button
                    className="w-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] h-12"
                    disabled={footerSubscribe.status === "submitting"}
                  >
                    {footerSubscribe.status === "submitting" ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              )}
            </div>
            <div className="lg:col-start-4">
              <p className="text-white font-medium">{committee.mailingAddress.label}</p>
              <p className="text-sm mt-1 leading-relaxed text-gray-400">
                {committee.mailingAddress.lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < committee.mailingAddress.lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <Separator className="bg-gray-800 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex flex-wrap justify-center gap-4">
              {platform.accessibilityUrl ? (
                <a href={platform.accessibilityUrl} className="hover:text-white transition-colors">
                  Web Accessibility
                </a>
              ) : null}
              {platform.termsUrl ? (
                <>
                  <span>•</span>
                  <a href={platform.termsUrl} className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </>
              ) : null}
            </div>
            <div className="text-center md:text-right">
              <p>{committee.disclaimer}</p>
              <p className="mt-1">
                © {new Date().getFullYear()} {platform.copyrightHolder}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ElectionCountdown />
    </div>
  );
}
