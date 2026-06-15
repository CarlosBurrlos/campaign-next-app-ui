"use client";

import React from "react";
import { useCampaign } from "@carlosburroughs/campaign-next-app-kit";
import { Button } from "../primitives/button";
import { Popover, PopoverContent, PopoverTrigger } from "../primitives/popover";
import { Bell, Calendar, Download } from "lucide-react";
import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function computeTimeLeft(isoDate: string): TimeLeft {
  const diff = new Date(isoDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function toCalendarDate(isoDate: string): string {
  return isoDate.replace(/-/g, "");
}

export function ElectionCountdown() {
  const { campaign } = useCampaign();
  const { candidate, election } = campaign;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    computeTimeLeft(election.date),
  );

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft(computeTimeLeft(election.date)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const calDate = toCalendarDate(election.date);
  const nextDay = toCalendarDate(
    new Date(new Date(election.date).getTime() + 86400000)
      .toISOString()
      .slice(0, 10),
  );

  const eventTitle = encodeURIComponent(
    `Vote ${candidate.name} — ${candidate.officeTargeted}`,
  );
  const eventDescription = encodeURIComponent(
    `Election Day! Vote for ${candidate.name} for ${candidate.officeTargeted}.`,
  );
  const eventLocation = encodeURIComponent(election.location ?? "");

  const googleCalendarUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${eventTitle}` +
    `&dates=${calDate}/${nextDay}` +
    `&details=${eventDescription}` +
    `&location=${eventLocation}`;

  const handleDownloadIcs = () => {
    const slug = candidate.name.toLowerCase().replace(/\s+/g, "-");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:-//${candidate.name}//Election Day//EN`,
      "BEGIN:VEVENT",
      `DTSTART;VALUE=DATE:${calDate}`,
      `DTEND;VALUE=DATE:${nextDay}`,
      `SUMMARY:Vote ${candidate.name} — ${candidate.officeTargeted}`,
      `DESCRIPTION:${`Election Day! Vote for ${candidate.name} for ${candidate.officeTargeted}.`}`,
      `LOCATION:${election.location ?? ""}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vote-${slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const calendarLinks = (
    <>
      <a
        href={googleCalendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-sm hover:bg-gray-100 transition-colors"
      >
        <Calendar className="h-4 w-4 text-[var(--color-countdown-bg)]" />
        Google Calendar
      </a>
      <button
        onClick={handleDownloadIcs}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-sm hover:bg-gray-100 transition-colors"
      >
        <Download className="h-4 w-4 text-gray-600" />
        Download .ics
      </button>
    </>
  );

  return (
    <>
      {/* Desktop — fixed bottom bar */}
      <div className="hidden sm:block fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md py-3 border-t border-white/10 shadow-2xl" style={{ backgroundColor: "var(--color-countdown-bg)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center text-white">
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-sm sm:text-xl font-semibold">
                {election.label}:
              </span>
              <TimeDisplay timeLeft={timeLeft} />
            </div>
            <div className="absolute right-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-[var(--color-countdown-bg)] bg-transparent px-2 sm:px-3"
                  >
                    <Bell className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Remind Me</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-52 p-2" align="end" side="top">
                  {calendarLinks}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — pill */}
      <div className="sm:hidden fixed bottom-4 right-4 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-white rounded-full px-4 py-2 flex items-center gap-2 text-sm font-semibold shadow-lg border border-white/20 transition-colors" style={{ backgroundColor: "var(--color-countdown-bg)" }}>
              <Bell className="h-4 w-4" />
              {election.voteLabel}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-2" align="end" side="top">
            {calendarLinks}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

function TimeDisplay({ timeLeft }: { timeLeft: TimeLeft }) {
  const units = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HRS" },
    { value: timeLeft.minutes, label: "MIN" },
    { value: timeLeft.seconds, label: "SEC" },
  ];

  return (
    <div className="flex gap-2 sm:gap-3">
      {units.map(({ value, label }, i) => (
        <React.Fragment key={label}>
          {i > 0 && (
            <div className="text-lg sm:text-xl font-bold self-center">:</div>
          )}
          <div className="text-center">
            <div
              className="text-lg sm:text-2xl font-bold"
              suppressHydrationWarning
            >
              {value}
            </div>
            <div className="text-xs text-white">{label}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
