/** A minimal Lexical rich-text document: each string becomes a paragraph, `## x` a heading and `- x` lines a list. */
export const richText = (...blocks: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: blocks.map((block) => {
      const text = (value: string) => ({ type: 'text', text: value, format: 0, mode: 'normal', style: '', detail: 0, version: 1 })
      const base = { format: '' as const, indent: 0, version: 1, direction: 'ltr' as const }
      if (block.startsWith('## ')) return { ...base, type: 'heading', tag: 'h2', children: [text(block.slice(3))] }
      if (block.startsWith('- ')) {
        return {
          ...base,
          type: 'list',
          listType: 'bullet',
          tag: 'ul',
          start: 1,
          children: block.split('\n').map((line, i) => ({ ...base, type: 'listitem', value: i + 1, children: [text(line.replace(/^- /, ''))] })),
        }
      }
      return { ...base, type: 'paragraph', textFormat: 0, textStyle: '', children: [text(block)] }
    }),
  },
})
