
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Instagram, 
  Twitter, 
  ArrowLeft, 
  Plus, 
  Send, 
  Bell,
  Settings,
  User,
  Heart,
  MessageCircle,
  Repeat2,
  Share
} from "lucide-react";

interface DashboardProps {
  onBack: () => void;
}

export const Dashboard = ({ onBack }: DashboardProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [newTweet, setNewTweet] = useState("");

  const mockMessages = [
    { platform: "whatsapp", sender: "John Doe", message: "Hey! How are you doing?", time: "2 min ago", unread: true },
    { platform: "instagram", sender: "sarah_photos", message: "Loved your latest post! 📸", time: "5 min ago", unread: true },
    { platform: "twitter", sender: "@techguru", message: "Thanks for the retweet!", time: "10 min ago", unread: false },
    { platform: "whatsapp", sender: "Mom", message: "Don't forget dinner tonight!", time: "15 min ago", unread: true },
  ];

  const mockFeedPosts = [
    { platform: "instagram", user: "travel_vibes", content: "Amazing sunset in Bali! 🌅", likes: 234, comments: 12, time: "1h ago" },
    { platform: "twitter", user: "@tech_news", content: "Breaking: New AI breakthrough announced at major tech conference", retweets: 89, likes: 156, time: "2h ago" },
    { platform: "instagram", user: "foodie_life", content: "Homemade pasta night! Recipe in my stories 🍝", likes: 87, comments: 23, time: "3h ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-white">GetInMono Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Bell className="h-4 w-4" />
              <Badge className="ml-2 bg-red-500 text-white text-xs">3</Badge>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
        {/* Unified Inbox */}
        <div className="lg:col-span-1">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Unified Inbox
              </h2>
              <Badge className="bg-red-500 text-white">
                {mockMessages.filter(m => m.unread).length}
              </Badge>
            </div>
            
            <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
              {mockMessages.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-lg border ${msg.unread ? 'bg-white/15 border-white/30' : 'bg-white/5 border-white/10'} hover:bg-white/20 transition-colors cursor-pointer`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {msg.platform === 'whatsapp' && <MessageSquare className="h-4 w-4 text-green-400" />}
                    {msg.platform === 'instagram' && <Instagram className="h-4 w-4 text-pink-400" />}
                    {msg.platform === 'twitter' && <Twitter className="h-4 w-4 text-blue-400" />}
                    <span className="text-white font-medium text-sm">{msg.sender}</span>
                    <span className="text-blue-200 text-xs ml-auto">{msg.time}</span>
                  </div>
                  <p className="text-blue-100 text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input 
                placeholder="Type a message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Consolidated Feed</h2>
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </div>

            {/* Quick Tweet Composer */}
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-2 mb-3">
                <Twitter className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">Compose Tweet</span>
              </div>
              <Textarea 
                placeholder="What's happening?"
                value={newTweet}
                onChange={(e) => setNewTweet(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 mb-3"
                rows={3}
              />
              <div className="flex justify-between items-center">
                <span className="text-blue-200 text-sm">{280 - newTweet.length} characters remaining</span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-2" />
                  Tweet
                </Button>
              </div>
            </div>

            {/* Feed Posts */}
            <div className="space-y-4">
              {mockFeedPosts.map((post, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-2 mb-3">
                    {post.platform === 'instagram' && <Instagram className="h-5 w-5 text-pink-400" />}
                    {post.platform === 'twitter' && <Twitter className="h-5 w-5 text-blue-400" />}
                    <span className="text-white font-medium">{post.user}</span>
                    <span className="text-blue-200 text-sm ml-auto">{post.time}</span>
                  </div>
                  <p className="text-blue-100 mb-3">{post.content}</p>
                  <div className="flex items-center space-x-6 text-blue-200">
                    <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    {post.platform === 'twitter' && (
                      <button className="flex items-center space-x-1 hover:text-green-400 transition-colors">
                        <Repeat2 className="h-4 w-4" />
                        <span className="text-sm">{(post as any).retweets}</span>
                      </button>
                    )}
                    <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                      <Share className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
