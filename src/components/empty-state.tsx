function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="h-16 w-16 mb-4 opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7v10a2 2 0 002 2h7m5-12v10a2 2 0 01-2 2h-3m-7-6h10M7 11h6M7 15h4M19 7l-7-4-7 4"
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        No content available
      </h3>

      <p className="text-sm text-muted-foreground max-w-md">
        It looks like this lesson doesn’t have any written content yet. You can
        continue to the next section when you're ready.
      </p>
    </div>
  );
}

export default EmptyState;
