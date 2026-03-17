import { AbsoluteFill } from "remotion";
import { CodeBlock, Terminal, DiffView } from "@repo/ui/remotion";

export const CodeDemo: React.FC = () => {
  const sampleCode = `function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
  return true;
}`;

  const terminalLines = [
    { type: "command" as const, text: "npm install remotion" },
    { type: "output" as const, text: "Installing packages..." },
    { type: "success" as const, text: "✓ Done in 2.3s" },
  ];

  const diffLines = [
    { type: "removed" as const, content: 'const x = "old value";' },
    { type: "removed" as const, content: "console.log(x);" },
    { type: "added" as const, content: 'const x = "new value";' },
    { type: "added" as const, content: 'const y = "extra";' },
    { type: "added" as const, content: "console.log(x, y);" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 40,
        gap: 40,
      }}
    >
      <div style={{ flex: 1, maxWidth: 400 }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 12 }}>
          CodeBlock
        </p>
        <CodeBlock
          code={sampleCode}
          language="typescript"
          startFrame={0}
          showLineNumbers
        />
      </div>

      <div style={{ flex: 1, maxWidth: 400 }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 12 }}>
          Terminal
        </p>
        <Terminal lines={terminalLines} startFrame={30} typeSpeed={2} />
      </div>

      <div style={{ flex: 1, maxWidth: 400 }}>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 12 }}>
          DiffView
        </p>
        <DiffView
          lines={diffLines}
          title="changes.ts"
          startFrame={90}
        />
      </div>
    </AbsoluteFill>
  );
};
