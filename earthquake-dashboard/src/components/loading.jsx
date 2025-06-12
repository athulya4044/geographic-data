// This component displays a loading indicator while data is being fetched.
export default function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="mt-2 text-gray-600 text-sm">Loading data...</span>
    </div>
  );
}
