# You die alone and penniless

This is a piece of non-linear fiction. It includes content such as addiction, cancer, and other diseases, suicidal ideation and death. You will be given a short amount of text involving a decision to be made. You will be presented with several options. The "Back" link in the lower left will return you to your previous decision. The "Restart" link in the lower right will return you to the title page.

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
