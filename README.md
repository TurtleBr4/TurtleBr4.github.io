# TurtleBr4 Portfolio — GitHub Pages

This is a static HTML/CSS/JavaScript update for the existing `TurtleBr4/TurtleBr4.github.io` user site. It keeps the existing space artwork, project cover images, portrait, project descriptions, itch.io links, email, GitHub and LinkedIn links. Keep your existing PNG/JPG files in the repository root when copying these files over.

## Update the existing repository

1. Download and extract this ZIP.
2. Copy the included files into the root of your existing `TurtleBr4.github.io` repository, replacing `index.html` and `style.css` and adding the new files.
3. Do **not** delete your existing image files (`galactic.png`, `robotgame3.png`, `roboreturn.png`, `CropCoverArt.png`, `me_temp_getaprophotoshootpleaseohgod.jpg`, etc.).
4. Commit and push to `main`. GitHub Pages will publish the update from your configured publishing source.

## Add a project

Add a new object to `projects.json` and give it a unique `id`:

```json
{
  "id": "my-new-game",
  "title": "My New Game",
  "type": "UNITY GAME",
  "year": "2026",
  "description": "A short description of the game.",
  "image": "my-new-game.png",
  "projectUrl": "https://example.com/my-game",
  "webBuild": false,
  "tags": ["Unity", "C#", "Gameplay"]
}
```

Put the thumbnail image in the repository root or use a path like `assets/my-new-game.png`. Keep commas between JSON objects and do not leave a comma after the final object.

## Add a Unity Web build

1. In Unity, switch to the Web platform and build the game.
2. Copy the generated Web build output into `games/<project-id>/`. The folder should contain Unity's generated `index.html` and all its associated files and folders.
3. In `projects.json`, set that project's `"webBuild": true`.
4. Commit and push the build and project entry.

Example:

```text
games/
  my-new-game/
    index.html
    Build/
    TemplateData/
```

The portfolio's Play button opens `play.html?game=my-new-game`, and the player embeds `games/my-new-game/index.html`.

### Unity build settings for GitHub Pages

GitHub Pages is static hosting and does not allow custom per-file response headers. For the simplest deployment, in Unity's Web publishing settings use **Compression Format: Disabled**, then rebuild. Alternatively enable **Decompression Fallback** so Unity emits `.unityweb` files that its loader can decompress. Test your build on the published site: Unity's compressed files may need specific HTTP headers that GitHub Pages cannot configure. See the official [Unity deployment documentation](https://docs.unity.com/en-us/engine/6000.5/manual/platform-specific/webgl/building-distribution/deploying).

## Notes

- This project uses `fetch("projects.json")`, so test via GitHub Pages or a local HTTP server, not by opening `index.html` directly as a `file://` URL.
- A Unity build can be large; GitHub has repository file-size limits. Consider Git LFS or external hosting if the build becomes too large.
- No backend, build step, or package installation is required.
