
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Instagram, Linkedin, MessageCircle, Mail, Phone } from "lucide-react";

export const UniversalInbox = () => {
  const mockMessages = [
    { 
      platform: "whatsapp", 
      sender: "Sarah Johnson", 
      message: "Hey! Are we still on for the meeting tomorrow?", 
      time: "2 min ago", 
      unread: true,
      icon: MessageSquare,
      color: "text-green-400"
    },
    { 
      platform: "linkedin", 
      sender: "Michael Chen", 
      message: "Thanks for connecting! I'd love to discuss the project opportunity...", 
      time: "8 min ago", 
      unread: true,
      icon: Linkedin,
      color: "text-blue-500"
    },
    { 
      platform: "instagram", 
      sender: "designstudio", 
      message: "Loved your latest portfolio update! 🎨", 
      time: "15 min ago", 
      unread: false,
      icon: Instagram,
      color: "text-pink-400"
    },
    { 
      platform: "telegram", 
      sender: "DevTeam", 
      message: "New deployment is ready for testing", 
      time: "23 min ago", 
      unread: true,
      icon: MessageCircle,
      color: "text-blue-400"
    },
    { 
      platform: "messenger", 
      sender: "Alex Rodriguez", 
      message: "Can you review the design mockups when you get a chance?", 
      time: "45 min ago", 
      unread: false,
      icon: Mail,
      color: "text-purple-400"
    },
    { 
      platform: "whatsapp", 
      sender: "Mom", 
      message: "Don't forget about dinner this Sunday!", 
      time: "1h ago", 
      unread: false,
      icon: MessageSquare,
      color: "text-green-400"
    },
  ];

  const unreadCount = mockMessages.filter(msg => msg.unread).length;

  return (
    <Card className="h-full bg-white/5 backdrop-blur-lg border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Universal Inbox</h2>
            <p className="text-sm text-slate-400">All your messages in one place</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-red-500 text-white font-bold px-3 py-1">
            {unreadCount}
          </Badge>
        )}
      </div>
      
      <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
        {mockMessages.map((msg, idx) => {
          const IconComponent = msg.icon;
          return (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border transition-all duration-200 hover:bg-white/10 cursor-pointer ${
                msg.unread 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <IconComponent className={`h-5 w-5 ${msg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold text-sm truncate">{msg.sender}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-xs whitespace-nowrap">{msg.time}</span>
                      {msg.unread && (
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{msg.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
