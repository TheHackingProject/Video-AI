import "../index.css";
import { demoShowcaseDuration } from "@repo/ui/remotion";
import { Composition } from "remotion";
import {
  MyComposition,
  TextDemo,
  CodeDemo,
  AudioDemo,
  ThreeDDemo,
  UIDemo,
  DiagramsDemo,
  CharactersDemo,
  TransitionsDemo,
  DemoShowcaseSolarpunkDemo,
} from "./compositions/demos";
import {
  Pilot01Prerequis,
  Pilot02GitVsGithub,
  Pilot03Commit,
  Pilot04Branch,
  Pilot05Merge,
} from "./compositions/serie-01";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />

      {/* Demo compositions for each component category */}
      <Composition
        id="TextDemo"
        component={TextDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="CodeDemo"
        component={CodeDemo}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="AudioDemo"
        component={AudioDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="ThreeDDemo"
        component={ThreeDDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="UIDemo"
        component={UIDemo}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="DiagramsDemo"
        component={DiagramsDemo}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="CharactersDemo"
        component={CharactersDemo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="TransitionsDemo"
        component={TransitionsDemo}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Série 01 – Git & GitHub */}
      <Composition
        id="Pilot01Prerequis"
        component={Pilot01Prerequis}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Pilot02GitVsGithub"
        component={Pilot02GitVsGithub}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Pilot03Commit"
        component={Pilot03Commit}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Pilot04Branch"
        component={Pilot04Branch}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Pilot05Merge"
        component={Pilot05Merge}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Demo - Solarpunk showcase (@repo/ui DemoShowcaseSolarpunk + demo-showcase config) */}
      <Composition
        id="DemoShowcaseSolarpunk"
        component={DemoShowcaseSolarpunkDemo}
        durationInFrames={demoShowcaseDuration}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
