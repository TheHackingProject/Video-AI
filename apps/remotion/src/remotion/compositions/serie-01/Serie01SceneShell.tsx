import type React from "react";
import { AbsoluteFill } from "remotion";
import { FadeSlide, SceneHeader, Wipe, ZoomBlur, solarTheme } from "@repo/ui/remotion";

export interface Serie01SceneShellProps {
  sceneNumber: number;
  totalScenes: number;
  keyword: string;
  /** Extra bottom padding inside the slide (e.g. room for FlowChart). */
  bottomPadding?: number;
  /**
   * `center` — hero/title scenes (default). `stack` — top-aligned column for body copy + bottom overlays (e.g. FlowChart).
   */
  layout?: "center" | "stack";
  transition?: "fade-slide" | "zoom-blur" | "wipe-left";
  children: React.ReactNode;
}

/**
 * Shared serie chrome: SceneHeader + catalog FadeSlide entry (runbook §04 / TransitionsDemo).
 */
export function Serie01SceneShell({
  sceneNumber,
  totalScenes,
  keyword,
  bottomPadding = 40,
  layout = "center",
  transition = "fade-slide",
  children,
}: Serie01SceneShellProps): React.ReactElement {
  const isStack = layout === "stack";
  const content = (
    <AbsoluteFill>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: isStack ? "stretch" : "center",
          justifyContent: isStack ? "flex-start" : "center",
          paddingTop: 88,
          paddingLeft: 40,
          paddingRight: 40,
          paddingBottom: bottomPadding,
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );

  const transitionNode =
    transition === "zoom-blur" ? (
      <ZoomBlur delay={3}>{content}</ZoomBlur>
    ) : transition === "wipe-left" ? (
      <Wipe direction="left" delay={3}>
        {content}
      </Wipe>
    ) : (
      <FadeSlide direction="bottom" delay={3} distance={36}>
        {content}
      </FadeSlide>
    );

  return (
    <AbsoluteFill style={{ zIndex: 1 }}>
      <SceneHeader
        sceneNumber={sceneNumber}
        totalScenes={totalScenes}
        keyword={keyword}
        startFrame={0}
        theme={solarTheme}
      />
      {transitionNode}
    </AbsoluteFill>
  );
}
