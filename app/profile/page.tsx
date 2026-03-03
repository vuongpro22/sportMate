'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MapPin, Award, Clock } from "lucide-react";

export default function ProfilePage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = {
    id: 1,
    name: "Nguyễn Minh Tuấn",
    age: 28,
    location: "Thành phố Hồ Chí Minh",
    bio: "Yêu thích bóng đá, tennis và chạy bộ. Tìm partner có cùng đam mê và năng lực tương đương.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    joinedDate: "2024-01-15",
    rating: 4.8,
    reviews: 24,
    sports: [
      { name: "Bóng Đá", level: "Trung Bình", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop" },
      { name: "Tennis", level: "Cao", image: "https://images.unsplash.com/photo-1554224311-beee415c15ac?w=200&h=200&fit=crop" },
      { name: "Chạy Bộ", level: "Cao", image: "https://images.unsplash.com/photo-1552674605-5defe6aa44bb?w=200&h=200&fit=crop" },
    ],
    stats: {
      matchesPlayed: 47,
      winRate: "68%",
      hoursActive: "2,340",
      followers: 156,
    },
    schedule: [
      { day: "Thứ 2 - Thứ 5", time: "18:00 - 20:00", activity: "Bóng Đá" },
      { day: "Thứ 7", time: "07:00 - 09:00", activity: "Chạy Bộ" },
      { day: "Chủ nhật", time: "14:00 - 16:00", activity: "Tennis" },
    ],
    about: "Tôi là một vận động viên người Việt Nam có niềm yêu thích mãnh liệt với các môn thể thao. Sau khi hoàn thành công việc, tôi luôn tìm kiếm cơ hội để luyện tập và cải thiện kỹ năng của mình. Tôi tin rằng thể thao không chỉ là hoạt động thể chất mà còn là một cách tuyệt vời để kết nối với những người có cùng đam mê.",
    achievements: [
      { title: "Streak Master", description: "7 trận liên tiếp chiến thắng" },
      { title: "Social Butterfly", description: "Kết nối với 50+ partners" },
      { title: "Fitness Champion", description: "Tham gia 100+ giờ luyện tập" },
    ],
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header với thông tin cơ bản */}
        <div className="bg-card rounded-lg border border-border overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-primary/30 to-primary/10" />
          
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-12">
              <Avatar className="w-32 h-32 border-4 border-card flex-shrink-0">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 pt-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                    <p className="text-muted-foreground text-lg mt-1">{user.age} tuổi</p>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      className="gap-2"
                      size="lg"
                      variant={isFavorite ? "default" : "outline"}
                      onClick={() => setIsFavorite((prev) => !prev)}
                    >
                      <Heart className={isFavorite ? "w-5 h-5 fill-current" : "w-5 h-5"} />
                      {isFavorite ? "Đã Yêu Thích" : "Yêu Thích"}
                    </Button>
                    <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                      <MessageCircle className="w-5 h-5" />
                      Nhắn Tin
                    </Button>
                    <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                      <Share2 className="w-5 h-5" />
                      Chia Sẻ
                    </Button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold text-primary">{user.rating}</span>
                      <span className="text-sm text-muted-foreground">/ 5.0</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.reviews} đánh giá</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">Thành viên từ</p>
                    <p className="text-muted-foreground">Tháng 1, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{user.stats.matchesPlayed}</p>
                <p className="text-sm text-muted-foreground mt-1">Trận đấu</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{user.stats.winRate}</p>
                <p className="text-sm text-muted-foreground mt-1">Tỷ lệ thắng</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{user.stats.hoursActive}</p>
                <p className="text-sm text-muted-foreground mt-1">Giờ luyện tập</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{user.stats.followers}</p>
                <p className="text-sm text-muted-foreground mt-1">Theo dõi</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="sports" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sports">Môn Thể Thao</TabsTrigger>
            <TabsTrigger value="schedule">Lịch Trình</TabsTrigger>
            <TabsTrigger value="achievements">Thành Tích</TabsTrigger>
            <TabsTrigger value="about">Về Tôi</TabsTrigger>
          </TabsList>

          {/* Sports Tab */}
          <TabsContent value="sports">
            <Card>
              <CardHeader>
                <CardTitle>Môn Thể Thao Yêu Thích</CardTitle>
                <CardDescription>Các môn thể thao tôi đang tham gia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {user.sports.map((sport) => (
                    <div key={sport.name} className="rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
                      <img 
                        src={sport.image || "/placeholder.svg"} 
                        alt={sport.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground">{sport.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline">{sport.level}</Badge>
                          <Button variant="ghost" size="sm">Chi tiết</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Lịch Trình Luyện Tập</CardTitle>
                <CardDescription>Thời gian thường xuyên của tôi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.schedule.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{item.activity}</p>
                        <p className="text-sm text-muted-foreground">{item.day}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Thành Tích & Giải Thưởng</CardTitle>
                <CardDescription>Những kỳ tích của tôi trên nền tảng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {user.achievements.map((achievement, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-secondary/30 border border-border text-center">
                      <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Về Tôi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{user.about}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
