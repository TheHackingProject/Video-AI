import type React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring } from "remotion";
import {
  Badge,
  Button,
  Card,
  ComparisonTable,
  CodeBlock,
  FlowChart,
  FloatingText,
  GlitchText,
  ParticleField,
  ProgressBar,
  RotatingObject,
  SceneHeader,
  SpeakingHead,
  Spectrum,
  Terminal,
  TextReveal,
  Timeline,
  Tree,
  Typewriter,
  WordByWord,
  Waveform,
  solarTheme,
} from "@repo/ui/remotion";
import { COLORS, DEMO_DURATION, FPS, SCENES } from "./lib/remotion/demo-showcase/config";

/** Animation offsets are sequence-local: children of `<Sequence>` see `useCurrentFrame()` 0..duration-1, not global composition frame. */

const VINE_TILE_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 Q45 15 30 30 Q15 45 30 60' fill='none' stroke='%2322c55e' stroke-width='1'/%3E%3C/svg%3E")`;

const BACKGROUND_DIAGONAL_ACCENT_LAYER = {
  position: "absolute" as const,
  inset: 0,
  pointerEvents: "none" as const,
  zIndex: 0,
  background: `
    linear-gradient(135deg, transparent 45%, ${COLORS.leaf}08 50%, transparent 55%),
    linear-gradient(225deg, transparent 45%, ${COLORS.teal}08 50%, transparent 55%)
  `,
};

function IntroScene() {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: `radial-gradient(ellipse at center, ${COLORS.backgroundGlow} 0%, ${COLORS.background} 70%, #000 100%)`,
      }}
    >
      <SceneHeader
        sceneNumber={1}
        totalScenes={5}
        title="Intro"
        keyword="WELCOME"
        startFrame={0}
        theme={solarTheme}
      />
      <ParticleField
        count={50}
        colors={[COLORS.leaf, COLORS.fern, COLORS.sun, COLORS.teal]}
        speed={0.25}
        theme={solarTheme}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(135deg, transparent 45%, ${COLORS.leaf}08 50%, transparent 55%),
            linear-gradient(225deg, transparent 45%, ${COLORS.teal}08 50%, transparent 55%)
          `,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.sun}15 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />

        <FloatingText
          text="🌿 Solarpunk"
          startFrame={10}
          floatAmplitude={6}
          fontSize={82}
          color={COLORS.text}
          shadowColor={COLORS.leaf}
          theme={solarTheme}
        />

        <GlitchText
          text="SUSTAINABLE TECH × NATURE"
          startFrame={40}
          duration={40}
          intensity={0.5}
          fontSize={26}
          color={COLORS.textMuted}
          glitchColor1={COLORS.leaf}
          glitchColor2={COLORS.sun}
          theme={solarTheme}
        />

        <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
          <Badge text="Organic" variant="success" icon="🌱" startFrame={70} theme={solarTheme} />
          <Badge text="Solar" variant="warning" icon="☀️" startFrame={80} theme={solarTheme} />
          <Badge text="Future" variant="info" icon="🔮" startFrame={90} theme={solarTheme} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

function TextDemoScene() {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.background} 0%, ${COLORS.backgroundLight} 50%, ${COLORS.background} 100%)`,
        padding: 60,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.32,
          pointerEvents: "none",
        }}
      >
        <ParticleField
          count={34}
          width={width}
          height={height}
          colors={[COLORS.leaf, COLORS.fern, COLORS.sun, COLORS.teal]}
          speed={0.16}
          theme={solarTheme}
        />
      </div>

      <div style={BACKGROUND_DIAGONAL_ACCENT_LAYER} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.04,
          pointerEvents: "none",
          backgroundImage: VINE_TILE_PATTERN,
        }}
      />

      <SceneHeader
        sceneNumber={2}
        totalScenes={5}
        title="Text Components"
        keyword="GROWTH"
        startFrame={0}
        theme={solarTheme}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          marginTop: 120,
          height: "calc(100% - 200px)",
        }}
      >
        <Card
          title="Typewriter"
          icon="🌱"
          startFrame={20}
          bordered
          borderColor={COLORS.leaf}
          theme={solarTheme}
        >
          <div style={{ padding: 20 }}>
            <Typewriter
              text="Biomimicry: nature's patterns inspire sustainable innovation..."
              startFrame={30}
              charsPerSecond={22}
              fontSize={22}
              color={COLORS.text}
              cursorColor={COLORS.leaf}
              theme={solarTheme}
            />
          </div>
        </Card>

        <Card
          title="Word Flow"
          icon="🍃"
          startFrame={30}
          bordered
          borderColor={COLORS.teal}
          theme={solarTheme}
        >
          <div style={{ padding: 20 }}>
            <WordByWord
              text="Technology rooted in ecological harmony"
              startFrame={40}
              wordDelay={10}
              fontSize={22}
              highlightColor={COLORS.sun}
              theme={solarTheme}
            />
          </div>
        </Card>

        <Card
          title="Reveal"
          icon="☀️"
          startFrame={40}
          style={{ gridColumn: "span 2" }}
          bordered
          borderColor={COLORS.sun}
          theme={solarTheme}
        >
          <div
            style={{
              padding: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextReveal
              text="🌿 GROW → ADAPT → THRIVE 🌿"
              startFrame={50}
              direction="center"
              fontSize={38}
              color={COLORS.leaf}
              theme={solarTheme}
            />
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
}

const ecoCode = `// 🌱 Sustainable Energy Grid
import { SolarPanel, WindTurbine } from '@eco/energy';

async function harvestEnergy() {
  const sun = await SolarPanel.capture();
  const wind = await WindTurbine.generate();
  
  return {
    clean: sun + wind,
    stored: Battery.save(sun + wind),
    shared: Grid.distribute()
  };
}

// 🌿 Zero waste, infinite growth`;

const terminalLines = [
  { type: "command" as const, text: "eco init sustainable-city" },
  { type: "output" as const, text: "🌱 Initializing green infrastructure...", delay: 20 },
  { type: "success" as const, text: "✓ Solar grid: ONLINE", delay: 12 },
  { type: "success" as const, text: "✓ Vertical farms: ACTIVE", delay: 10 },
  { type: "success" as const, text: "✓ Water recycling: 100%", delay: 10 },
  { type: "command" as const, text: "eco status --harmony", delay: 20 },
  { type: "output" as const, text: "🌍 Ecosystem balance: OPTIMAL", delay: 15 },
];

function CodeDemoScene() {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.background} 0%, ${COLORS.backgroundLight} 100%)`,
        padding: 60,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.28,
          pointerEvents: "none",
        }}
      >
        <ParticleField
          count={30}
          width={width}
          height={height}
          colors={[COLORS.leaf, COLORS.teal, COLORS.sun, COLORS.fern]}
          speed={0.14}
          theme={solarTheme}
        />
      </div>

      <div style={BACKGROUND_DIAGONAL_ACCENT_LAYER} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.035,
          pointerEvents: "none",
          backgroundImage: VINE_TILE_PATTERN,
        }}
      />

      <SceneHeader
        sceneNumber={3}
        totalScenes={5}
        title="Code Components"
        keyword="BUILD"
        startFrame={0}
        theme={solarTheme}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          marginTop: 100,
          height: "calc(100% - 180px)",
        }}
      >
        <CodeBlock
          code={ecoCode}
          title="sustainable.ts"
          startFrame={20}
          highlightLines={[6, 7, 8, 9, 10]}
          fontSize={15}
          style={{ height: "fit-content" }}
          theme={solarTheme}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <Terminal
            lines={terminalLines}
            title="eco-terminal"
            startFrame={40}
            typeSpeed={1.8}
            fontSize={14}
            prompt="🌿 "
            style={{ flex: 1 }}
            theme={solarTheme}
          />

          <FlowChart
            nodes={[
              { id: "1", label: "Capture", icon: "☀️", color: COLORS.sun },
              { id: "2", label: "Store", icon: "🔋", color: COLORS.teal },
              { id: "3", label: "Share", icon: "🌐", color: COLORS.leaf },
            ]}
            startFrame={90}
            nodeDelay={15}
            direction="horizontal"
            theme={solarTheme}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}

const ecoTimeline = [
  { id: "1", title: "Seed", description: "Plant the idea", icon: "🌱", color: COLORS.leaf },
  { id: "2", title: "Grow", description: "Nurture with care", icon: "🌿", color: COLORS.fern },
  { id: "3", title: "Bloom", description: "Energy harvest", icon: "🌻", color: COLORS.sun },
  { id: "4", title: "Share", description: "Community power", icon: "🤝", color: COLORS.teal },
];

const comparisonData = {
  columns: [
    { key: "aspect", header: "Aspect" },
    { key: "old", header: "🏭 Old World" },
    { key: "new", header: "🌿 Solarpunk" },
  ],
  rows: [
    { aspect: "Energy", old: "Fossil fuels", new: "☀️ Solar + Wind" },
    { aspect: "Food", old: "Monoculture", new: "🌱 Permaculture" },
    { aspect: "Cities", old: "Concrete jungle", new: "🌳 Garden cities" },
    { aspect: "Tech", old: "Extractive", new: "🔄 Regenerative" },
  ],
};

function CryptoDemoScene() {
  const localFrame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 70%, ${COLORS.leaf}10 0%, transparent 50%),
                     radial-gradient(ellipse at 70% 30%, ${COLORS.sun}08 0%, transparent 50%),
                     linear-gradient(135deg, ${COLORS.background} 0%, ${COLORS.backgroundLight} 100%)`,
        padding: 60,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.24,
          pointerEvents: "none",
        }}
      >
        <ParticleField
          count={38}
          width={width}
          height={height}
          colors={[COLORS.leaf, COLORS.sun, COLORS.teal, COLORS.amber]}
          speed={0.12}
          theme={solarTheme}
        />
      </div>

      <div style={BACKGROUND_DIAGONAL_ACCENT_LAYER} />

      <SceneHeader
        sceneNumber={4}
        totalScenes={5}
        title="Community"
        keyword="HARMONY"
        startFrame={0}
        theme={solarTheme}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: 40,
          marginTop: 100,
          height: "calc(100% - 180px)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <SpeakingHead
              name="Terra"
              emoji="🧑‍🌾"
              color={COLORS.leaf}
              startFrame={20}
              speaking={localFrame > 40 && localFrame < 100}
              message="Let's grow together!"
              theme={solarTheme}
            />
            <SpeakingHead
              name="Sol"
              emoji="🧑‍🔬"
              color={COLORS.sun}
              startFrame={30}
              speaking={localFrame > 100}
              message="Clean energy for all!"
              theme={solarTheme}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <RotatingObject
              size={70}
              shape="hexagon"
              color={COLORS.leaf}
              borderColor={COLORS.fern}
              rotationSpeed={0.3}
              theme={solarTheme}
            />
          </div>

          <Timeline
            items={ecoTimeline}
            startFrame={50}
            itemDelay={18}
            direction="vertical"
            theme={solarTheme}
          />
        </div>

        <Card
          title="Future vs Past"
          icon="⚖️"
          startFrame={40}
          bordered
          borderColor={COLORS.leaf}
          theme={solarTheme}
        >
          <ComparisonTable
            columns={comparisonData.columns}
            rows={comparisonData.rows}
            startFrame={60}
            rowDelay={14}
            highlightRow={3}
            theme={solarTheme}
          />
        </Card>
      </div>
    </AbsoluteFill>
  );
}

const componentTree = {
  id: "root",
  label: "🌳 solarpunk-lib",
  color: COLORS.leaf,
  children: [
    { id: "nature", label: "🌿 nature/", color: COLORS.fern },
    { id: "energy", label: "☀️ energy/", color: COLORS.sun },
    { id: "tech", label: "💧 tech/", color: COLORS.teal },
    { id: "community", label: "🤝 community/", color: COLORS.coral },
  ],
};

function OutroScene() {
  const localFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = spring({
    frame: localFrame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(ellipse at 50% 100%, ${COLORS.leaf}15 0%, transparent 50%),
          radial-gradient(ellipse at 50% 0%, ${COLORS.sun}10 0%, transparent 40%),
          linear-gradient(180deg, ${COLORS.background} 0%, ${COLORS.backgroundLight} 100%)
        `,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SceneHeader
        sceneNumber={5}
        totalScenes={5}
        title="Outro"
        keyword="GROW"
        startFrame={0}
        theme={solarTheme}
      />

      <ParticleField
        count={35}
        colors={[COLORS.leaf, COLORS.fern, COLORS.sun, COLORS.teal, COLORS.amber]}
        speed={0.2}
        theme={solarTheme}
      />

      <div
        style={{
          position: "absolute",
          top: -100,
          width: 600,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${COLORS.sun}20 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
          zIndex: 10,
          opacity: fadeIn,
        }}
      >
        <FloatingText
          text="🌍 22 Components"
          startFrame={0}
          fontSize={58}
          color={COLORS.text}
          shadowColor={COLORS.leaf}
          theme={solarTheme}
        />

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <Badge text="Organic" variant="success" icon="🌱" startFrame={30} theme={solarTheme} />
          <Badge text="Solar" variant="warning" icon="☀️" startFrame={38} theme={solarTheme} />
          <Badge text="Clean" variant="info" icon="💧" startFrame={46} theme={solarTheme} />
          <Badge text="Community" variant="error" icon="🤝" startFrame={54} theme={solarTheme} />
          <Badge text="Future" variant="default" icon="🔮" startFrame={62} theme={solarTheme} />
        </div>

        <Tree root={componentTree} startFrame={70} expandDelay={18} theme={solarTheme} />

        <div style={{ display: "flex", gap: 25, marginTop: 15 }}>
          <Waveform width={180} height={35} bars={18} color={COLORS.leaf} speed={0.12} theme={solarTheme} />
          <Spectrum
            width={180}
            height={35}
            bars={14}
            gradientColors={[COLORS.leaf, COLORS.sun]}
            speed={0.1}
            theme={solarTheme}
          />
        </div>

        <div style={{ display: "flex", gap: 20, marginTop: 15 }}>
          <Button
            text="Grow with us"
            variant="primary"
            icon="🌱"
            startFrame={120}
            hover
            theme={solarTheme}
          />
          <Button
            text="Open Source"
            variant="outline"
            icon="🌍"
            startFrame={130}
            theme={solarTheme}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}

export const DemoShowcaseSolarpunk = (): React.ReactElement => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={SCENES.intro.from} durationInFrames={SCENES.intro.duration}>
        <IntroScene />
      </Sequence>

      <Sequence from={SCENES.text.from} durationInFrames={SCENES.text.duration}>
        <TextDemoScene />
      </Sequence>

      <Sequence from={SCENES.code.from} durationInFrames={SCENES.code.duration}>
        <CodeDemoScene />
      </Sequence>

      <Sequence from={SCENES.crypto.from} durationInFrames={SCENES.crypto.duration}>
        <CryptoDemoScene />
      </Sequence>

      <Sequence from={SCENES.outro.from} durationInFrames={SCENES.outro.duration}>
        <OutroScene />
      </Sequence>

      <ProgressBar
        height={4}
        showTime
        gradientColors={[COLORS.primary, COLORS.accent]}
        theme={solarTheme}
      />
    </AbsoluteFill>
  );
};

export { FPS, DEMO_DURATION, SCENES, COLORS };

