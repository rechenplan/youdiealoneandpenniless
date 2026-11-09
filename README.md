# You die alone and penniless

This is a piece of non-linear fiction. It includes content such as addiction, cancer, and other diseases, suicidal ideation and death. You will be given a short amount of text involving a decision to be made. You will be presented with several options. The "Back" link in the lower left will return you to your previous decision. The "TOC" link in the lower right will return you to the table of contents. View it live at https://rechenplan.github.io/youdiealoneandpenniless.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell |
| `css/styles.css` | Theme and layout |
| `js/story.js` | **Your story — edit this** |
| `js/app.js` | Engine and UI |
| `fonts/` | Latin Modern Roman (bundled, GUST Font License) |

## Story format

The story is a Markdown-like template string in `js/story.js`:

```js
window.STORY = `
# My Story

## start

A passage.

- [Go left](#left)
- [Go right](#right)

## left

Another passage.

## right

The road ends here.
`;
```

- `# Title` sets the page title.
- `## passage-id` starts a passage.
- `- [Choice text](#passage-id)` adds a choice.
- A blank line separates paragraphs.
- Text and choices can be interspersed; each choice appears where it is written.
- A passage with no choices is terminal.
- The first passage is the start.
- Text supports `*italic*` and `**bold**`.

## Using the app

- Choose by clicking a choice.
- Go back with the Back button.
- Return to the table of contents with the TOC button.
- The page follows the system light/dark theme.
- If a choice points at a missing passage, the app shows a message in its place.
