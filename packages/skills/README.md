# Skills pour le workflow Video-AI

Ce dossier centralise les skills utiles a la creation video et au workflow de production.

## Skills utilises dans ce repo

- `Remotion/` : submodule officiel Remotion (`@remotion/skills`) pour les patterns de composition, animation, assets, timing, audio, etc.

## Skills recommandes (externes)

- Mermaid -> SVG (diagrammes) : utiliser une skill de rendu Mermaid vers SVG pour preparer les assets de diagrammes avant integration dans Remotion (workflow recommande pour les videos tres animees, revelation etape par etape).

### Commande rapide (sans skill, CLI officiel)

```bash
bunx @mermaid-js/mermaid-cli -i chemin/vers/diagram.mmd -o apps/remotion/public/diagrams/slug/diagram.svg
```

Detail des emplacements et options : [runbooks/video-ai-development](../../KM/Docs/runbooks/video-ai-development.md) (section 03b, point 3bis).
- Generation SVG par IA : `@neversight/generate-svg` via agentskill.sh  
  Role : generer des illustrations vectorielles (logos, visuels, pictos) exportables en SVG, puis importables dans les scenes Remotion.

## Pourquoi ce workflow

- Garder les diagrammes Mermaid en texte (`.mmd`) facilite diff, review et versioning.
- Generer des SVG en amont rend le rendu Remotion plus stable et deterministe (pas de runtime Mermaid dans la video).
- Remotion reste responsable de l'animation (sequences, opacite, masques, zooms, transitions).
