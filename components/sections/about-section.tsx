"use client";

import { useCampaign } from "@carlosburroughs/campaign-next-app-kit";
import { ContentBlockRenderer } from "../content-block-renderer";
import { EndorsementCard } from "../endorsement-card";
import { FadeIn, FadeInStagger, FadeInItem } from "../fade-in";
import { Card } from "../../primitives/card";
import Image from "next/image";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("../../primitives/carousel").then(m => m.Carousel), { ssr: false });
const CarouselContent = dynamic(() => import("../../primitives/carousel").then(m => m.CarouselContent), { ssr: false });
const CarouselItem = dynamic(() => import("../../primitives/carousel").then(m => m.CarouselItem), { ssr: false });
const CarouselNext = dynamic(() => import("../../primitives/carousel").then(m => m.CarouselNext), { ssr: false });
const CarouselPrevious = dynamic(() => import("../../primitives/carousel").then(m => m.CarouselPrevious), { ssr: false });

export function AboutSection() {
  const { campaign } = useCampaign();
  const { candidate } = campaign;

  return (
    <section id="about" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {candidate.about.heading}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="max-w-3xl mx-auto text-left space-y-6 mb-16">
          {candidate.about.content.map((block, i) => (
            <ContentBlockRenderer key={i} block={block} />
          ))}
        </FadeIn>

        <div id="career" className="mt-16 pt-16 border-t border-gray-200">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Experience</h2>
            {candidate.experienceSubheading && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {candidate.experienceSubheading}
              </p>
            )}
          </FadeIn>
          <FadeInStagger className="max-w-2xl mx-auto space-y-4">
            {candidate.experience.map((entry, i) => (
              <FadeInItem key={i}>
                <div className="border-l-2 border-[var(--color-border-highlight)] pl-4">
                  <h4 className="font-semibold text-gray-900">{entry.title}</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    {entry.content?.map((block, j) => (
                      <ContentBlockRenderer key={j} block={block} />
                    ))}
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-200">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Endorsements</h2>
            {candidate.endorsementsSubheading && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {candidate.endorsementsSubheading}
              </p>
            )}
          </FadeIn>
          {candidate.endorsements.map((endorsement, i) => (
            <FadeIn key={i} className="md:max-w-[75%] md:mx-auto">
              <EndorsementCard endorsement={endorsement} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 pt-16 border-t border-gray-200 space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">On the Campaign Trail</h3>
            <p className="text-sm text-gray-500 mt-2">Swipe left for more</p>
          </div>
          <Carousel opts={{ watchDrag: true }} className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {candidate.gallery.map((asset, i) => (
                <CarouselItem key={i} className="md:basis-1/2">
                  <Card className="border-0 shadow-lg overflow-hidden rounded-sm p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={asset.src}
                        alt={asset.alt}
                        fill
                        className="object-cover"
                        priority={asset.priority}
                        placeholder={asset.blurDataURL ? "blur" : "empty"}
                        blurDataURL={asset.blurDataURL}
                      />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </FadeIn>

      </div>
    </section>
  );
}
