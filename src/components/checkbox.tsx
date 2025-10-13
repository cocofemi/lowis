import React from "react";

export function Checkbox({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`h-5 w-5 rounded border flex items-center justify-center ${
        checked
          ? "bg-black text-white border-black"
          : "bg-white text-transparent border-gray-300"
      } ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
      aria-pressed={checked}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
