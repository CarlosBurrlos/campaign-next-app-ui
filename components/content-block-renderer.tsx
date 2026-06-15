import type { ContentBlock } from "../content/types";
import Image from "next/image";

type Props = {
  block: ContentBlock;
};

export function ContentBlockRenderer({ block }: Props) {
  switch (block.type) {
    case "text":
      return (
        <p className="text-lg text-gray-700 leading-relaxed">{block.body}</p>
      );

    case "quote":
      return (
        <div className="text-left">
          <span className="text-4xl leading-none text-[var(--color-decorative-accent)] font-serif select-none block mb-1">
            &ldquo;
          </span>
          <p className="text-lg text-gray-600 italic font-bold leading-relaxed">
            {block.body}
          </p>
          <span className="text-4xl leading-none text-[var(--color-decorative-accent)] font-serif select-none block text-right">
            &rdquo;
          </span>
          {block.attribution && (
            <p className="text-sm font-semibold text-gray-800 mt-2 text-right">
              — {block.attribution}
            </p>
          )}
        </div>
      );

    case "image":
      return (
        <div className="relative aspect-square">
          <Image
            src={block.asset.src}
            alt={block.asset.alt}
            fill
            className="object-cover rounded-sm"
            priority={block.asset.priority}
            placeholder={block.asset.blurDataURL ? "blur" : "empty"}
            blurDataURL={block.asset.blurDataURL}
          />
          {block.asset.caption && (
            <p className="text-sm text-gray-600 text-center mt-2">
              {block.asset.caption}
            </p>
          )}
        </div>
      );

    case "images":
      return (
        <div className="flex gap-4">
          {block.assets.map((asset, i) => (
            <div key={i} className="flex-1 space-y-2">
              <div className="relative aspect-square">
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  fill
                  className="object-cover rounded-sm"
                  priority={asset.priority}
                  placeholder={asset.blurDataURL ? "blur" : "empty"}
                  blurDataURL={asset.blurDataURL}
                />
              </div>
              {asset.caption && (
                <p className="text-sm text-gray-600 text-center">
                  {asset.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      );
  }
}
