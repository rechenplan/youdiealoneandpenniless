/* Passage engine and UI. Edit js/story.js for content. */
(() => {
  function parse(source) {
    const story = { title: 'Passage', nodes: {} };
    let node, text = [];
    const flush = () => {
      if (node && text.length) node.blocks.push({ type: 'text', text: text.join(' ') });
      text = [];
    };
    for (const line of source.split('\n')) {
      const h = line.match(/^##\s+(.+)/);
      const c = line.match(/^-\s+\[(.+)\]\(#(.+)\)/);
      if (line.startsWith('# ')) story.title = line.slice(2).trim();
      else if (h) { flush(); node = story.nodes[h[1].trim()] = { blocks: [] }; story.start ||= h[1].trim(); }
      else if (c && node) { flush(); node.blocks.push({ type: 'choice', text: c[1], to: c[2].trim() }); }
      else if (!line.trim()) flush();
      else if (node) text.push(line.trim());
    }
    flush();
    return story;
  }

  const story = parse(window.STORY);
  const $ = (id) => document.getElementById(id);
  const prose = $('prose'), back = $('back'), restart = $('restart');
  let node = story.start, history = [];

  const inline = (s) => String(s ?? '')
    .replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

  function show() {
    const current = story.nodes[node] || { blocks: [{ type: 'text', text: `Missing passage: ${node}` }] };
    const blocks = current.blocks || [];
    const html = [];
    let choices = [];
    const flushChoices = () => {
      if (!choices.length) return;
      html.push(`<div class="choices" role="group" aria-label="Choices">${choices.map((c) => `<button class="choice" data-i="${c.i}">${inline(c.text)}</button>`).join('')}</div>`);
      choices = [];
    };
    blocks.forEach((block, i) => {
      if (block.type === 'choice') choices.push({ ...block, i });
      else { flushChoices(); html.push(`<p>${inline(block.text)}</p>`); }
    });
    flushChoices();
    prose.innerHTML = html.join('');
    back.disabled = !history.length;
  }

  function go(to) { history.push(node); node = to; show(); }
  function undo() { if (history.length) { node = history.pop(); show(); } }
  prose.addEventListener('click', (e) => {
    const button = e.target.closest('[data-i]');
    if (!button) return;
    const block = story.nodes[node]?.blocks?.[Number(button.dataset.i)];
    if (block?.type === 'choice') go(block.to);
  });
  back.addEventListener('click', undo);
  restart.addEventListener('click', () => { history = []; node = story.start; show(); });
  $('title').textContent = story.title;
  show();
})();
