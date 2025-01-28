export function Spinner({ customText }) {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-[90vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
      <span className="mt-4 text-lg font-medium">Loading...</span>
      {customText && <p className="mt-2 text-sm italic text-center p-4">{customText}</p>}
      <p>test</p>
    </div>
  );
}
