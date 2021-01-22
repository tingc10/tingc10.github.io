import * as React from 'react';
import $script from 'scriptjs';

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
  React.useEffect(() => {
    if (window && window.__CPEmbed) {
      window.__CPEmbed();
    } else {
      $script('https://static.codepen.io/assets/embed/ei.js');
    }
  }, [])

  return (
    <figure className={className}>
      <p
        data-height="500"
        data-theme-id="dark"
        data-slug-hash={slugHash}
        data-default-tab="result"
        data-user="tingc10"
        data-pen-title={title}
        className="codepen">
        See the Pen<a href={`https://codepen.io/tingc10/pen/${slugHash}/`}>{title}</a> by Ting Chen (<a href="https://codepen.io/tingc10">@tingc10</a>) on <a href="https://codepen.io">CodePen</a>.
      </p>
    </figure>
  );
}

export default CodepenEmbed;
