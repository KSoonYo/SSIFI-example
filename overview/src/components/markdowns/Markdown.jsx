import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

function Markdown({ filename }) {
  const [mdFile, setMdFile] = useState(``)

  useEffect(() => {
    import(`./${filename}.md`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setMdFile(res))
      })
      .catch(err => console.log(err))
  })

  const CodeBlock = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }

  return (
    <div>
      <div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={CodeBlock}>
          {mdFile}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Markdown
