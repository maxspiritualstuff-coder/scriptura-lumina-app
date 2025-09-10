
'use client';
import React from 'react';

interface MarkdownRendererProps {
  content: string;
  onTermClick?: (term: string) => void;
}

export function MarkdownRenderer({ content, onTermClick }: MarkdownRendererProps) {
  if (!content) return null;

  // Function to render text with clickable cross-references
  const renderWithCrossLinks = (text: string) => {
    if (typeof text !== 'string') return text;
    
    // Regex to find terms enclosed in [[term]]
    const regex = /(\[\[.*?\]\])/g;
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (regex.test(part)) {
        const termContent = part.substring(2, part.length - 2);
        if (onTermClick) {
            return (
                <button 
                    key={index}
                    onClick={() => onTermClick(termContent)} 
                    className="cross-reference-link"
                >
                    {termContent}
                </button>
            );
        }
        return <strong key={index} className="text-primary">{termContent}</strong>
      }
      // Basic markdown for bold (**text**) and italic (*text*)
      const htmlPart = part
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br />');

      return <span key={index} dangerouslySetInnerHTML={{ __html: htmlPart }} />;
    });
  };
  
  try {
    // Attempt to parse JSON stringified content
    const parsedData = JSON.parse(content);
    
    if(parsedData.quickDefinition) { // Specific check for dictionary output
        return (
            <div className="content-area space-y-4">
                {Object.entries(parsedData).map(([key, value]) => (
                   <div key={key}>
                     <h2 className="text-lg font-semibold text-primary mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/quick/i, '')}</h2>
                     <div className="text-foreground/90 leading-relaxed">
                        {renderWithCrossLinks(value as string)}
                     </div>
                   </div>
                ))}
            </div>
        );
    }


    const orderedKeys = Object.keys(parsedData).sort();

    return (
      <div className="content-area space-y-4">
        {orderedKeys.map(key => {
          let value = parsedData[key];
          
          if (typeof value === 'object' && value !== null) {
              value = JSON.stringify(value, null, 2);
          }
          
          return (
            <div key={key}>
              <h2 className="text-lg font-semibold text-primary mb-2">{key.substring(3)}</h2>
              <div className="text-foreground/90 leading-relaxed">
                {renderWithCrossLinks(value)}
              </div>
            </div>
          );
        })}
      </div>
    );
  } catch (e) {
    // If it's not JSON, treat it as a simple string
    const sections = content.split(/\n\s*\n/);
    return (
       <div className="content-area space-y-4">
        {sections.map((section, index) => {
          const [title, ...bodyParts] = section.split(/:\s/);
          const body = bodyParts.join(': ');
          if (!body) return <div key={index}>{renderWithCrossLinks(title)}</div>
          return (
            <div key={index}>
              <h2 className="text-lg font-semibold text-primary mb-2">{title.replace(/^\w\.\s/, '')}</h2>
              <div className="text-foreground/90 leading-relaxed">
                {renderWithCrossLinks(body)}
              </div>
            </div>
          );
        })}
       </div>
    )
  }
}
