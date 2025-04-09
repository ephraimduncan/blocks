export default function Alert01() {
  return (
    <div className="space-y-4 w-full px-6">
      <div className="w-full h-14 p-4 rounded bg-green-200 border border-green-500 flex items-center justify-between">
        <p className="text-green-500">A simple success alert</p>
        <div className="w-5 h-5 border border-green-500 rounded-full flex items-center justify-center">
          <span className="font-semibold text-green-500 text-sm">!</span>
        </div>
      </div>

      <div className="w-full h-14 p-4 rounded bg-red-200 border border-red-500 flex items-center justify-between">
        <p className="text-red-500">A simple error alert</p>
        <div className="w-5 h-5 border border-red-500 rounded-full flex items-center justify-center">
          <span className="font-semibold text-red-500 text-sm">!</span>
        </div>
      </div>

      <div className="w-full h-14 p-4 rounded bg-amber-200 border border-amber-500 flex items-center justify-between">
        <p className="text-amber-500">A simple warning alert</p>
        <div className="w-5 h-5 border border-amber-500 rounded-full flex items-center justify-center">
          <span className="font-semibold text-amber-500 text-sm">!</span>
        </div>
      </div>

      <div className="w-full h-14 p-4 rounded bg-gray-200 border border-gray-500 flex items-center justify-between">
        <p className="text-gray-500">A simple neutral alert</p>
        <div className="w-5 h-5 border border-gray-500 rounded-full flex items-center justify-center">
          <span className="font-semibold text-gray-500 text-sm">!</span>
        </div>
      </div>
    </div>
  );
}
