import { useMemo } from "react";

export default function Icon({ type, ...props }) {
  const icon = useMemo(() => {
    switch (type) {
      case "play":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M16.3 37.05v-26.3L37 23.9Z" />
          </svg>
        );
      case "pause":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M28.25 38V10H36v28ZM12 38V10h7.75v28Z" />
          </svg>
        );
      case "volume-high":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M29.1 41.65v-3.6q4.75-1.45 7.725-5.3 2.975-3.85 2.975-8.8 0-4.95-2.975-8.825Q33.85 11.25 29.1 9.8V6.2q6.2 1.55 10.15 6.475T43.2 23.95q0 6.35-3.925 11.3-3.925 4.95-10.175 6.4ZM4.8 31.15V16.8h8.65L25.1 5.25v37.5l-11.65-11.6Zm23.3 1.65V15.15q2.9 1.05 4.675 3.425T34.55 24q0 3.05-1.775 5.425T28.1 32.8Z" />
          </svg>
        );
      case "volume-low":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M8.65 31.15V16.8h8.65L28.95 5.25v37.5L17.3 31.15Zm23.3 1.65V15.15q2.75.9 4.6 3.375Q38.4 21 38.4 24q0 3-1.85 5.4-1.85 2.4-4.6 3.4Z" />
          </svg>
        );
      case "fullscreen-enter":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M10 38v-9.65h3V35h6.65v3Zm0-18.35V10h9.65v3H13v6.65ZM28.35 38v-3H35v-6.65h3V38ZM35 19.65V13h-6.65v-3H38v9.65Z" />
          </svg>
        );
      case "fullscreen-exit":
        return (
          <svg {...props} viewBox="0 0 48 48">
            <path d="M16.65 38v-6.65H10v-3h9.65V38Zm11.7 0v-9.65H38v3h-6.65V38ZM10 19.65v-3h6.65V10h3v9.65Zm18.35 0V10h3v6.65H38v3Z" />
          </svg>
        );
      default:
        return null;
    }
  }, [type, props]);

  return icon;
}
