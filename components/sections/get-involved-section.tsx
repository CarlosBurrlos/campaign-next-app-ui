"use client";

import { useCampaign, shareOrFallback, env } from "@carlosburroughs/campaign-next-app-kit";
import { InvolvementCard } from "../involvement-card";
import { VolunteerDialog } from "../volunteer-dialog";
import { SignRequestDialog } from "../sign-request-dialog";
import { FadeIn, FadeInStagger, FadeInItem } from "../fade-in";
import { DollarSign, Signpost, HandHeart, Megaphone } from "lucide-react";
import { useState } from "react";

export function GetInvolvedSection() {
  const { campaign } = useCampaign();
  const { committee, candidate } = campaign;
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [signRequestOpen, setSignRequestOpen] = useState(false);

  return (
    <section id="get-involved" className="py-24 lg:py-36 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every contribution of time, talent, or resources makes a difference.{" "}
            <br />
            Here&apos;s how you can help.
          </p>
        </FadeIn>

        <FadeInStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <FadeInItem>
            <InvolvementCard
              icon={DollarSign}
              title="Donate"
              description="Power our campaign with a financial contribution of any amount"
              action={{ type: "link", href: committee.donationUrl, label: "Contribute" }}
            />
          </FadeInItem>
          <FadeInItem>
            <InvolvementCard
              icon={HandHeart}
              title="Volunteer"
              description="Join our team and help make a difference on the ground"
              action={{ type: "button", label: "Sign Me Up", onClick: () => setVolunteerOpen(true) }}
            />
          </FadeInItem>
          <FadeInItem>
            <InvolvementCard
              icon={Signpost}
              title="Request A Sign"
              description="Request a yard sign to show your support"
              action={{ type: "button", label: "Request Sign", onClick: () => setSignRequestOpen(true) }}
            />
          </FadeInItem>
          <FadeInItem>
            <InvolvementCard
              icon={Megaphone}
              title="Spread the Word"
              description="Share our message on social media and talk to your neighbors"
              action={{
                type: "button",
                label: "Share",
                onClick: () => { void shareOrFallback(candidate.share); },
              }}
            />
          </FadeInItem>
        </FadeInStagger>

        <VolunteerDialog
          open={volunteerOpen}
          onOpenChange={setVolunteerOpen}
          formId={env.formspree.newsletter}
        />
        <SignRequestDialog
          open={signRequestOpen}
          onOpenChange={setSignRequestOpen}
          formId={env.formspree.signRequest}
        />
      </div>
    </section>
  );
}
