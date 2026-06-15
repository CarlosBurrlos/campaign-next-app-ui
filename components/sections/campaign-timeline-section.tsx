"use client";

import { useCampaign } from "@carlosburroughs/campaign-next-app-kit";
import { Card, CardContent } from "../../primitives/card";
import { Calendar } from "lucide-react";

export function CampaignTimelineSection() {
  const { config } = useCampaign();
  if (!config.details.campaignTimeline.enabled) return null;
  return (
    <section className="py-24 lg:py-36 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            On the Campaign Trail
          </h2>
          <p className="text-xl text-gray-600">
            Where we&apos;ve been and what we&apos;ve accomplished
          </p>
        </div>
        <div className="space-y-8">
          {PLACEHOLDER_EVENTS.map((event, i) => (
            <TimelineEvent key={i} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}

type TimelineEventProps = {
  title: string;
  date: string;
  description: string;
};

const PLACEHOLDER_EVENTS: TimelineEventProps[] = [
  { title: "Title", date: "Month Day, Year", description: "Description" },
  { title: "Title", date: "Month Day, Year", description: "Description" },
  { title: "Title", date: "Month Day, Year", description: "Description" },
];

function TimelineEvent({ title, date, description }: TimelineEventProps) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-[var(--color-button-bg)] rounded flex items-center justify-center flex-shrink-0">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div className="w-1 h-full bg-[var(--color-decorative-accent)] min-h-[80px]" />
      </div>
      <Card className="flex-1 border-0 shadow-md rounded-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          <p className="text-gray-700">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
