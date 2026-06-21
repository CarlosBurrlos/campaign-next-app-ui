import type { Endorsement } from "@carlosburrlos/campaign-next-app-kit";
import { Card, CardContent } from "../primitives/card";
import Image from "next/image";

type Props = {
  endorsement: Endorsement;
};

export function EndorsementCard({ endorsement }: Props) {
  const photo = endorsement.content?.find((b) => b.type === "image");
  const photoAsset = photo?.type === "image" ? photo.asset : undefined;

  return (
    <Card className="border-0 md:shadow-lg rounded-sm overflow-hidden shadow-none bg-transparent md:bg-white">
      <div className="flex flex-col md:flex-row">
        <CardContent className="flex-1 pt-0 pb-0 px-0 md:pt-8 md:pb-8 md:px-8 flex flex-col justify-between">
          <div className="border-l-2 border-[var(--color-border-highlight)] pl-4">
            <span className="text-4xl leading-none text-[var(--color-decorative-accent)] font-serif select-none block mb-1">
              &ldquo;
            </span>
            <p className="font-semibold text-sm text-gray-600 italic leading-relaxed">
              {endorsement.quote}
            </p>
            <span className="text-4xl leading-none text-[var(--color-decorative-accent)] font-serif select-none block text-right">
              &rdquo;
            </span>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 text-right">
            <p className="text-sm font-semibold text-gray-900">
              {endorsement.attribution}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {endorsement.organization}
            </p>
          </div>
        </CardContent>
        {photoAsset && (
          <div className="relative w-full aspect-square md:w-72 lg:w-80 md:aspect-auto shrink-0 mt-6 md:mt-0">
            <Image
              src={photoAsset.src}
              alt={photoAsset.alt}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </Card>
  );
}
