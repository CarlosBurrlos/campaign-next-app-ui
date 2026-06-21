"use client";

import type { Theme } from "@carlosburrlos/campaign-next-app-kit";

export function ThemeProvider({ theme, children }: { theme: Theme; children: React.ReactNode }) {
  const vars = {
    // Raw tokens
    "--token-brand":       theme.tokens.brand,
    "--token-brand-hover": theme.tokens.brandHover,
    "--token-accent":      theme.tokens.accent,

    // Semantic tokens — components consume these
    "--color-button-bg":          theme.semantic.buttonBg,
    "--color-button-bg-hover":    theme.semantic.buttonBgHover,
    "--color-button-text":        theme.semantic.buttonText,
    "--color-link-decoration":    theme.semantic.linkDecoration,
    "--color-icon-hover":         theme.semantic.iconHover,
    "--color-border-highlight":   theme.semantic.borderHighlight,
    "--color-decorative-accent":  theme.semantic.decorativeAccent,
    "--color-input-accent":       theme.semantic.inputAccent,
    "--color-countdown-bg":       theme.semantic.countdownBg,
    "--color-countdown-bg-hover": theme.semantic.countdownBgHover,

    // Typography
    "--font-heading": theme.fonts.heading,
    "--font-body":    theme.fonts.body,
  } as React.CSSProperties;

  return (
    <div style={vars} className="contents">
      {children}
    </div>
  );
}
