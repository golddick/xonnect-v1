import { BarChart3, Calendar, CheckSquare, DollarSign, Play, Settings, Ticket, Users, Video } from "lucide-react";

export  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", route: "/creator/dashboard" },
    { icon: Video, label: "Events", route: "/creator/events" },
    { icon: Ticket, label: "Tickets", route: "/creator/tickets" },
    { icon: CheckSquare, label: "Check-In", route: "/creator/checkin" },
    { icon: Play, label: "Videos", route: "/creator/videos" },
    { icon: Users, label: "Community", route: "/creator/community" },
    { icon: BarChart3, label: "Analytics", route: "/creator/analytics" },
    { icon: DollarSign, label: "Monetization", route: "/creator/monetization" },
    { icon: Calendar, label: "Schedule", route: "/creator/schedule" },
    { icon: Settings, label: "Settings", route: "/creator/settings" },
  ]