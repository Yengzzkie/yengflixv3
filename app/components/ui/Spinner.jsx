export function CustomSpinner() {
  return (
    <div className="flex items-center justify-center w-screen h-[90vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
      <span className="ml-4 text-lg font-medium">Loading...</span>
    </div>
  );
}
