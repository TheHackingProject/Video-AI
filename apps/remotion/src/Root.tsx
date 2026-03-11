import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import {
  TextDemo,
  CodeDemo,
  AudioDemo,
  ThreeDDemo,
  UIDemo,
  DiagramsDemo,
  CharactersDemo,
  TransitionsDemo,
} from "./demos";

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
    </>
  );
};
