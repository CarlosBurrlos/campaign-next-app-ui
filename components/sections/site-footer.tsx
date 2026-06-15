"use client";

import { useCampaign, useFormspree, env } from "@carlosburroughs/campaign-next-app-kit";
import { Button } from "../../primitives/button";
import { Input } from "../../primitives/input";
import { Separator } from "../../primitives/separator";
import { FadeIn } from "../fade-in";

export function SiteFooter() {
  const { campaign } = useCampaign();
  const { committee, platform } = campaign;
  const footerSubscribe = useFormspree(env.formspree.newsletter);

  return (
    <footer className="bg-gray-900 text-white py-20 lg:py-24">
      <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {platform.privacyUrl ? (
              <>
                <a href={platform.privacyUrl} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <span>•</span>
              </>
            ) : null}
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
      </FadeIn>
    </footer>
  );
}
