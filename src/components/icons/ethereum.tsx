import { FC, SVGProps } from 'react';

export const Ethereum: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
        fill="#50AD64"
      />
      <path
        d="M17.247 13.146 12.17 15.32a.404.404 0 0 1-.34 0l-5.077-2.173a.213.213 0 0 0-.252.327l5.16 6.638a.43.43 0 0 0 .678 0l5.16-6.638a.213.213 0 0 0-.252-.327Z"
        fill="#86FDAA"
      />
      <path
        d="M12 15.356v4.92a.442.442 0 0 1-.34-.165L6.5 13.473a.213.213 0 0 1 .253-.327l5.077 2.173a.404.404 0 0 0 .17.037Z"
        fill="#6DE08E"
      />
      <path
        d="M17.61 10.672 12.336 3.89a.422.422 0 0 0-.67 0l-5.276 6.782a.427.427 0 0 0 .17.65l5.275 2.263a.431.431 0 0 0 .331 0l5.276-2.264a.428.428 0 0 0 .17-.65Z"
        fill="#86FDAA"
      />
      <path
        d="M17.69 11.015 12 8.98V3.724a.433.433 0 0 1 .335.166l5.276 6.782a.418.418 0 0 1 .078.343ZM12 8.98v4.638a.437.437 0 0 1-.166-.033l-5.276-2.263a.42.42 0 0 1-.248-.307L12 8.98Z"
        fill="#6DE08E"
      />
      <path
        d="M12 3.724V8.98l-5.69 2.036a.419.419 0 0 1 .079-.343l5.275-6.782A.433.433 0 0 1 12 3.724Z"
        fill="#5FC77D"
      />
    </svg>
  );
};
