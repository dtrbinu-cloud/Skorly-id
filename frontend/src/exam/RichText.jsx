import React from 'react';

/**
 * RichText parser tanpa dangerouslySetInnerHTML.
 * Mendukung:
 * - **tebal** -> <strong>
 * - *miring* -> <em>
 * - _{subskrip} -> <sub>
 * - ^{superskrip} -> <sup>
 * - baris kosong (\n\n) -> paragraf baru <p>
 * - baris baru tunggal (\n) -> <br>
 */

function parseInlineTokens(text) {
  if (!text) return [];

  // Pola token: **bold**, *italic*, _{sub}, ^{sup}
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|_\{[^}]+\}|\^\{[^}]+\})/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    // Teks sebelum kecocokan
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={`b-${match.index}`} className="ex-bold">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={`i-${match.index}`} className="ex-italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('_{') && token.endsWith('}')) {
      parts.push(
        <sub key={`sub-${match.index}`} className="ex-sub">
          {token.slice(2, -1)}
        </sub>
      );
    } else if (token.startsWith('^{') && token.endsWith('}')) {
      parts.push(
        <sup key={`sup-${match.index}`} className="ex-sup">
          {token.slice(2, -1)}
        </sup>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  // Sisa teks setelah kecocokan terakhir
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function RichText({
  content = '',
  textSize = 'md',
  className = '',
}) {
  if (!content) return null;

  // Split berdasarkan baris kosong untuk membuat paragraf
  const paragraphs = String(content)
    .trim()
    .split(/\n\s*\n+/);

  return (
    <div className={`ex-rich-text ex-text-${textSize} ${className}`}>
      {paragraphs.map((p, pIdx) => {
        const lines = p.split('\n');
        return (
          <p key={pIdx} className="ex-paragraph">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {parseInlineTokens(line)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
