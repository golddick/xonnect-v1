import { X, Users, DollarSign, Crown, BarChart3, Play, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, formatDate, formatTime } from "@/lib/utils";
import { Event, Video } from "@/lib/type/content";

interface DetailModalProps {
  selectedItem: Event | Video | null;
  activeTab: string;
//   currentUserRole: string;
  onClose: () => void;
}

const DetailModal = ({ selectedItem, activeTab, onClose }: DetailModalProps) => {
  if (!selectedItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border p-6 hover:bg-card/70 transition-all duration-300 text-foreground rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {activeTab === "events" ? "Event Details" : "Video Details"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-6 mb-6">
            <img
              src={selectedItem.thumbnail}
              alt={selectedItem.title}
              className="w-32 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-2">{selectedItem.title}</h4>
              <div className="flex items-center space-x-4 mb-4">
                {activeTab === "events" && (
                  <Badge className={getStatusColor((selectedItem as Event).status)}>
                    {(selectedItem as Event).status}
                  </Badge>
                )}
                <span className="text-muted-foreground">{selectedItem.category}</span>
                {activeTab === "events" && (selectedItem as Event).isPaid && (
                  <div className="flex items-center text-yellow-500">
                    <Crown className="w-4 h-4 mr-1" />
                    <span className="text-sm">Paid</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Creator</p>
                  <p>{selectedItem.creator}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p>{(selectedItem as any).email}</p>
                </div>
                {activeTab === "events" ? (
                  <>
                    <div>
                      <p className="text-muted-foreground">Scheduled Time</p>
                      <p>
                        {(selectedItem as Event).scheduledTime
                          ? `${formatDate((selectedItem as Event).scheduledTime)} ${formatTime(
                              (selectedItem as Event).scheduledTime
                            )}`
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Start Time</p>
                      <p>
                        {(selectedItem as Event).startTime
                          ? `${formatDate((selectedItem as Event).startTime)} ${formatTime((selectedItem as Event).startTime)}`
                          : "-"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p>{(selectedItem as Video).duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Upload Date</p>
                      <p>{formatDate((selectedItem as Video).uploadDate)}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted p-4 rounded-lg text-center">
              <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {activeTab === "events" ? "Current Viewers" : "Total Views"}
              </p>
              <p className="font-bold">
                {activeTab === "events" 
                  ? (selectedItem as Event).viewers.toLocaleString()
                  : (selectedItem as Video).views.toLocaleString()
                }
              </p>
            </div>
            {activeTab === "events" && (
              <div className="bg-muted p-4 rounded-lg text-center">
                <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Peak Viewers</p>
                <p className="font-bold">{(selectedItem as Event).peakViewers.toLocaleString()}</p>
              </div>
            )}
            <div className="bg-muted p-4 rounded-lg text-center">
              <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="font-bold text-green-400">{selectedItem.revenue}</p>
            </div>
            {activeTab === "events" && (selectedItem as Event).isPaid && (
              <div className="bg-muted p-4 rounded-lg text-center">
                <Crown className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Fee</p>
                <p className="font-bold text-yellow-400">{(selectedItem as Event).Fee}</p>
              </div>
            )}
          </div>

          {activeTab === "events" && (selectedItem as Event).tags && (selectedItem as Event).tags.length > 0 && (
            <div className="mb-6">
              <p className="text-muted-foreground mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {(selectedItem as Event).tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs text-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end space-x-4">
            <Button variant="outline" className="border-border bg-transparent">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Play className="w-4 h-4 mr-2" />
              {activeTab === "events" ? "Watch Event" : "Play Video"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
