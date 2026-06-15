"use client";

import { useCampaign } from "../campaign-provider";
import { useFormspree } from "../../hooks/use-formspree";
import { env } from "../../lib/env";
import { StatusTracker } from "../status-tracker";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";
import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const { campaign, config } = useCampaign();
  const { candidate, committee } = campaign;
  const goalTrackerEnabled = config.details.goalTracker.enabled;
  const stayConnected = useFormspree(env.formspree.stayConnected);

  const [firstHalf, secondHalf] = splitTagline(candidate.tagline);

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] py-10 md:py-12 overflow-x-clip bg-gradient-to-br from-amber-50 via-white to-slate-100">
      {candidate.heroBackground && (
        <div
          className="hidden md:block absolute inset-0 opacity-[0.65] bg-no-repeat bg-center"
          style={{
            backgroundImage: `url('${candidate.heroBackground.src}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "grayscale(80%) brightness(1.1)",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-gray-900/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-[3fr_2fr] gap-8 md:gap-10 lg:gap-12 items-start min-h-[75vh]">
          <motion.div
            className="order-1 space-y-4 relative z-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight drop-shadow-sm">
              {firstHalf}
              <br />
              {secondHalf}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
              {candidate.currentTitle}
            </p>
          </motion.div>

          <motion.div
            className="order-2 md:row-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] max-h-[640px] max-w-sm md:max-w-none mx-auto rounded-sm overflow-hidden">
              <Image
                src={candidate.headshot.src}
                alt={candidate.headshot.alt}
                fill
                className="object-cover"
                priority={candidate.headshot.priority}
                placeholder={candidate.headshot.blurDataURL ? "blur" : "empty"}
                blurDataURL={candidate.headshot.blurDataURL}
              />
            </div>
          </motion.div>

          <motion.div
            className="order-3 space-y-6 relative z-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
          >
            {goalTrackerEnabled && config.details.goalTracker.data && (
              <div className="backdrop-blur-sm bg-white/40 rounded-sm p-4 shadow-lg border border-white/60">
                <StatusTracker
                  label={config.details.goalTracker.title}
                  current={config.details.goalTracker.data.current}
                  goal={config.details.goalTracker.data.goal}
                  unit={config.details.goalTracker.data.unit}
                />
              </div>
            )}

            <div className="text-gray-900">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Stay Connected
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Sign up to receive the latest campaign updates
              </p>
              {stayConnected.status === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-sm p-4 text-center">
                  <p className="text-green-800 font-semibold text-sm">
                    You're signed up!
                  </p>
                  <p className="text-green-700 text-xs mt-1">
                    Thanks for joining — we'll be in touch.
                  </p>
                </div>
              ) : (
                <form
                  className="grid grid-cols-2 gap-3"
                  onSubmit={stayConnected.handleSubmit}
                >
                  <div className="space-y-1">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      className="h-10 bg-white/80"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      className="h-10 bg-white/80"
                      required
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="h-10 bg-white/80"
                      required
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      className="h-10 bg-white/80"
                      required
                    />
                  </div>
                  {stayConnected.status === "error" && (
                    <p className="col-span-2 text-xs text-red-600">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <div className="col-span-2">
                    <Button
                      size="lg"
                      className="w-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white h-12"
                      disabled={stayConnected.status === "submitting"}
                    >
                      {stayConnected.status === "submitting"
                        ? "Signing up..."
                        : "Sign Up"}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <div className="text-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-300/70" />
                <span className="text-sm font-semibold text-gray-800 tracking-widest uppercase">
                  or
                </span>
                <div className="flex-1 h-px bg-gray-300/70" />
              </div>
              <Button
                size="lg"
                className="w-full bg-[var(--color-button-bg)] hover:bg-[var(--color-button-bg-hover)] text-white text-lg h-12 shadow-lg hover:shadow-xl transition-all"
                onClick={() =>
                  window.open(
                    committee.donationUrl,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Donate Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function splitTagline(tagline: string): [string, string] {
  const words = tagline.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
