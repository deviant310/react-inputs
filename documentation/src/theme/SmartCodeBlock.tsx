import CodeBlock, { Props } from '@theme/CodeBlock';

export function SmartCodeBlock ({ children, ...props }: Props) {
  let exportName: string | undefined;

  const parsedChildren = typeof children === 'string'
    ? children
      .replace(/import.*/g, '')
      .trim()
      .replace(/export\s+(\w*\s+)(\w*)/, (_, startText, name) => {
        exportName = name;

        return startText + exportName
      })
    : children;

  const newChildren = [
    parsedChildren,
    exportName && `render(${exportName});`
  ]
    .filter(Boolean)
    .join("\n".repeat(2));

  return (
    <CodeBlock {...props}>
      {newChildren}
    </CodeBlock>
  );
}
