import * as React from 'react';
import Codepen from 'ts-react-codepen-embed'

declare global {
  interface Window { __CPEmbed: any; }
}

const CodepenEmbed: React.FC<{
  title: string,
  slugHash: string,
  className?: string,
}> = ({
  title,
  slugHash,
  className
}) => {
  return (
    <figure className={className}>
      <Codepen hash={slugHash} user="tingc10" height={500} defaultTab="result" title={title} />
    </figure>
  );
}

export default CodepenEmbed;
