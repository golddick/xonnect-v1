import { motion } from "framer-motion";
import { Play, Crown, Video, Eye, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusColor, formatDate, formatTime } from "@/lib/utils";
import Link from "next/link";
import { Event } from "@/lib/type/content";

interface EventTableProps {
  events: Event[];
  // currentUserRole: string;
  onSelect: (event: Event) => void;
}

const EventTable = ({ events,  onSelect }: EventTableProps) => {

   const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <Play className="w-4 h-4 text-red-400" />
      case "scheduled":
        return <Calendar className="w-4 h-4 text-yellow-400" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />
    }
  }
  

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No events found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-transparent border-b border-border rounded-2xl p-4 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5  transition-all duration-300 text-foreground">
          <tr>
            <th className="text-left p-4 font-semibold">Event</th>
            <th className="text-left p-4 font-semibold">Status</th>
            <th className="text-left p-4 font-semibold">Creator</th>
            <th className="text-left p-4 font-semibold">Scheduled Time</th>
            <th className="text-left p-4 font-semibold">Viewers</th>
            <th className="text-left p-4 font-semibold">Revenue</th>
            <th className="text-left p-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <motion.tr
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl transition-colors"
            >
              <td className="p-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.category}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(event.status)}
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
              </td>
              <td className="p-4">
                <p className="font-semibold">{event.creator}</p>
                <p className="text-sm text-muted-foreground">{event.email}</p>
              </td>
              <td className="p-4">
                {event.status === "scheduled" ? (
                  <div>
                    <p className="text-sm">{formatDate(event.scheduledTime)}</p>
                    <p className="text-sm text-muted-foreground">{formatTime(event.scheduledTime)}</p>
                  </div>
                ) : event.startTime ? (
                  <div>
                    <p className="text-sm">{formatDate(event.startTime)}</p>
                    <p className="text-sm text-muted-foreground">{formatTime(event.startTime)}</p>
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="p-4">
                <p className="font-semibold">{event.viewers.toLocaleString()}</p>
              </td>
              <td className="p-4">
                <p className="font-semibold text-green-400">{event.revenue}</p>
              </td>
              <td className="p-4">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border bg-transparent"
                    onClick={() => onSelect(event)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  {event.status === "live" && (
                    <Link href={`/superadmin/content/${event.id}/analytics`}>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Play className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
