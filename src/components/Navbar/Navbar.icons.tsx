import { useMemo } from "react";
import { INavbarIcon } from "./Navbar.interface";

export default function Icon({ type, ...props }: INavbarIcon) {
  const icon = useMemo(() => {
    switch (type) {
      case "light":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M24 30.35q2.6 0 4.5-1.85t1.9-4.5q0-2.6-1.875-4.5T24 17.6q-2.6 0-4.475 1.875Q17.65 21.35 17.65 24q0 2.6 1.85 4.475 1.85 1.875 4.5 1.875Zm0 3.85q-4.25 0-7.225-2.975Q13.8 28.25 13.8 24t2.975-7.25q2.975-3 7.225-3t7.25 3q3 3 3 7.25t-3 7.225Q28.25 34.2 24 34.2ZM3.5 25.9q-.8 0-1.35-.55T1.6 24q0-.8.55-1.375t1.35-.575h5q.8 0 1.375.575T10.45 24q0 .8-.575 1.35T8.5 25.9Zm36 0q-.8 0-1.35-.55T37.6 24q0-.8.55-1.375t1.35-.575h5q.8 0 1.375.575T46.45 24q0 .8-.575 1.35t-1.375.55ZM24 10.4q-.8 0-1.35-.55T22.1 8.5v-5q0-.8.55-1.375T24 1.55q.8 0 1.375.575T25.95 3.5v5q0 .8-.575 1.35T24 10.4Zm0 36q-.8 0-1.35-.55t-.55-1.35v-5q0-.8.55-1.375T24 37.55q.8 0 1.375.575t.575 1.375v5q0 .8-.575 1.35T24 46.4Zm-12.25-32L8.9 11.6q-.6-.6-.6-1.4 0-.8.55-1.4.55-.5 1.35-.5t1.4.55l2.85 2.85q.5.55.5 1.35t-.5 1.3q-.55.6-1.375.6t-1.325-.55Zm24.7 24.7-2.85-2.85q-.55-.5-.55-1.275 0-.775.6-1.375.5-.55 1.3-.55t1.35.55l2.85 2.75q.55.65.55 1.45 0 .8-.5 1.35-.6.55-1.4.55-.8 0-1.35-.6Zm-2.8-24.7q-.6-.55-.6-1.35t.6-1.35l2.75-2.85q.6-.55 1.4-.55.8 0 1.4.5.5.6.5 1.4 0 .8-.55 1.35L36.3 14.4q-.55.55-1.35.55t-1.3-.55ZM8.85 39.15q-.55-.55-.55-1.35t.6-1.4l2.85-2.85q.5-.5 1.275-.525.775-.025 1.375.525.55.6.55 1.4 0 .8-.55 1.3l-2.75 2.85q-.65.6-1.45.6-.8 0-1.35-.55ZM24 24Z" />
          </svg>
        );
      case "dark":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M24 42.35q-7.7 0-13.025-5.325T5.65 24q0-7.7 5.325-13.05Q16.3 5.6 24 5.6q.25 0 .65.025t1.15.075q-1.55 1.7-2.375 3.975Q22.6 11.95 22.6 14.3q0 4.65 3.25 7.875 3.25 3.225 7.9 3.225 2.45 0 4.625-.7t3.925-2.25q0 .55.05.925t.05.625q0 7.7-5.375 13.025T24 42.35Zm0-3.9q4.9 0 8.725-2.975Q36.55 32.5 37.6 28.4q-.95.4-2.075.625-1.125.225-2.175.225-6-.15-10.2-4.325-4.2-4.175-4.4-10.225 0-.9.175-1.975.175-1.075.725-2.475-4.45 1.5-7.275 5.325T9.55 24q0 6.05 4.2 10.25T24 38.45Zm-.4-14.1Z" />
          </svg>
        );
      case "menu":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
          </svg>
        );
      case "github":
        return (
          <svg {...props} viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        );
      case "linkedin":
        return (
          <svg {...props} viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      case "paper":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M15.95 35.5h16.1v-3h-16.1Zm0-8.5h16.1v-3h-16.1ZM11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h18.05L40 14.95V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-27.7V7H11v34h26V16.3ZM11 7v9.3V7v34V7Z" />
          </svg>
        );
      default:
        return;
    }
  }, [props, type]);

  return icon;
}
