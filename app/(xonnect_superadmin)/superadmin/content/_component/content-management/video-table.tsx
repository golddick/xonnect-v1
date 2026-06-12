import { motion } from "framer-motion";
import { Eye, Play, VideoOff, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Video } from "@/lib/type/content";

interface VideoTableProps {
  videos: Video[];
  onSelect: (video: Video) => void;
}

const VideoTable = ({ videos, onSelect }: VideoTableProps) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <VideoOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No videos found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-transparent border-b border-border rounded-2xl p-4 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5  transition-all duration-300 text-foreground">
          <tr>
            <th className="text-left p-4 font-semibold">Video</th>
            <th className="text-left p-4 font-semibold">Creator</th>
            <th className="text-left p-4 font-semibold">Duration</th>
            <th className="text-left p-4 font-semibold">Views</th>
            <th className="text-left p-4 font-semibold">Upload Date</th>
            <th className="text-left p-4 font-semibold">Revenue</th>
            <th className="text-left p-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <motion.tr
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5  rounded-2xl transition-colors"
            >
              <td className="p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{video.title}</p>
                    <p className="text-sm text-muted-foreground">{video.category}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <p className="font-semibold">{video.creator}</p>
                <p className="text-sm text-muted-foreground">ID: {video.creatorId}</p>
              </td>
              <td className="p-4">
                <p className="font-semibold">{video.duration}</p>
              </td>
              <td className="p-4">
                <p className="font-semibold">{video.views.toLocaleString()}</p>
              </td>
              <td className="p-4">
                <p className="text-sm">{formatDate(video.uploadDate)}</p>
              </td>
              <td className="p-4">
                <p className="font-semibold text-green-400">{video.revenue}</p>
              </td>
              <td className="p-4">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border bg-transparent"
                    onClick={() => onSelect(video)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTable;
