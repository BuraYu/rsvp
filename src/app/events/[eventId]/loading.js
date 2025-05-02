import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";

export default function Loading({ isAuthenticated }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuthenticated={isAuthenticated} />

      <div className="max-w-[1440px] mx-auto p-4 lg:flex gap-6">
        <div className="flex-1">
          <Card className="animate-pulse overflow-hidden rounded-xl p-0">
            <div className="bg-gray-300 h-64 w-full" />
            <div className="p-6 space-y-4">
              <div className="h-4 w-1/3 bg-gray-300 rounded" />
              <div className="h-4 w-1/4 bg-gray-300 rounded" />
              <div className="h-4 w-1/2 bg-gray-300 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/3 bg-gray-300 rounded" />
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <Card className="p-6 animate-pulse space-y-4">
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
          </Card>
        </div>
      </div>
    </div>
  );
}
