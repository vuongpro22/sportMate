"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Save, X, MapPin, Trophy, LogOut, Settings, Plus } from "lucide-react";

export default function MyProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    name: "Nguyễn Minh Tuấn",
    age: 28,
    location: "Thành phố Hồ Chí Minh",
    bio: "Yêu thích bóng đá, tennis và chạy bộ.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    email: "minhtuan@sportmatch.vn",
    phone: "0987654321",
    joinedDate: "2024-01-15",
    rating: 4.8,
    reviews: 24,
    stats: {
      matchesPlayed: 47,
      winRate: "68%",
      hoursActive: "2,340",
      followers: 156,
    },
    sports: [
      { name: "Bóng Đá", level: "Trung Bình" },
      { name: "Tennis", level: "Cao" },
      { name: "Chạy Bộ", level: "Cao" },
    ],
    schedule: [
      { day: "Thứ 2 - Thứ 5", time: "18:00 - 20:00", activity: "Bóng Đá" },
      { day: "Thứ 7", time: "07:00 - 09:00", activity: "Chạy Bộ" },
      { day: "Chủ nhật", time: "14:00 - 16:00", activity: "Tennis" },
    ],
  });

  const [editData, setEditData] = useState(user);
  const [newSportName, setNewSportName] = useState("");
  const [newSportLevel, setNewSportLevel] = useState("Trung Bình");
  const [newScheduleDay, setNewScheduleDay] = useState("");
  const [newScheduleTime, setNewScheduleTime] = useState("");
  const [newScheduleActivity, setNewScheduleActivity] = useState("");

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Hồ Sơ Của Tôi</h1>
            <p className="mt-2 text-muted-foreground">
              Quản lý thông tin cá nhân và cài đặt tài khoản
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={
              isEditing
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-primary hover:bg-primary/90"
            }
          >
            {isEditing ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Hủy
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh Sửa
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Personal Info Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Thông Tin Cá Nhân</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <label className="mb-2 block text-sm text-muted-foreground">
                            Tên
                          </label>
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) =>
                              setEditData({ ...editData, name: e.target.value })
                            }
                            className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-2 block text-sm text-muted-foreground">
                              Tuổi
                            </label>
                            <input
                              type="number"
                              value={editData.age}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  age: parseInt(e.target.value),
                                })
                              }
                              className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm text-muted-foreground">
                              Thành Phố
                            </label>
                            <input
                              type="text"
                              value={editData.location}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  location: e.target.value,
                                })
                              }
                              className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-muted-foreground">
                            Tiểu sử
                          </label>
                          <textarea
                            value={editData.bio}
                            onChange={(e) =>
                              setEditData({ ...editData, bio: e.target.value })
                            }
                            className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground"
                            rows={3}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                        <p className="mt-1 flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {user.age} tuổi • {user.location}
                        </p>
                        <p className="mt-3 text-foreground">{user.bio}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Thông Tin Liên Hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="mb-2 block text-sm text-muted-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-muted-foreground">
                        Số Điện Thoại
                      </label>
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) =>
                          setEditData({ ...editData, phone: e.target.value })
                        }
                        className="w-full rounded border border-border bg-secondary px-3 py-2 text-foreground"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Số Điện Thoại</p>
                      <p className="font-medium text-foreground">{user.phone}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Tabs for Sports & Schedule */}
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <Tabs defaultValue="sports" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-secondary">
                    <TabsTrigger value="sports">Môn Thể Thao</TabsTrigger>
                    <TabsTrigger value="schedule">Lịch Trình</TabsTrigger>
                  </TabsList>

                  {/* Sports Tab */}
                  <TabsContent value="sports" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {(isEditing ? editData.sports : user.sports).map((sport, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded border border-border bg-secondary p-4"
                        >
                          <h4 className="font-medium text-foreground">{sport.name}</h4>
                          <Badge className="bg-primary/15 text-primary border-primary/40">
                            {sport.level}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    {isEditing && (
                      <div className="mt-4 space-y-3 border-t border-border pt-4">
                        <p className="text-sm font-medium text-foreground">
                          Thêm môn thể thao
                        </p>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                          <input
                            type="text"
                            placeholder="Tên môn (vd: Bóng Bàn)"
                            value={newSportName}
                            onChange={(e) => setNewSportName(e.target.value)}
                            className="rounded border border-border bg-secondary px-3 py-2 text-sm text-foreground"
                          />
                          <select
                            value={newSportLevel}
                            onChange={(e) => setNewSportLevel(e.target.value)}
                            className="rounded border border-border bg-secondary px-3 py-2 text-sm text-foreground"
                          >
                            <option value="Cơ Bản">Cơ Bản</option>
                            <option value="Trung Bình">Trung Bình</option>
                            <option value="Cao">Cao</option>
                            <option value="Chuyên Nghiệp">Chuyên Nghiệp</option>
                          </select>
                          <Button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => {
                              if (!newSportName.trim()) return;
                              setEditData({
                                ...editData,
                                sports: [
                                  ...editData.sports,
                                  {
                                    name: newSportName.trim(),
                                    level: newSportLevel || "Trung Bình",
                                  },
                                ],
                              });
                              setNewSportName("");
                              setNewSportLevel("Trung Bình");
                            }}
                          >
                            <Plus className="h-4 w-4" /> Thêm Môn
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Schedule Tab */}
                  <TabsContent value="schedule" className="space-y-4">
                    {(isEditing ? editData.schedule : user.schedule).map((item, idx) => (
                      <div key={idx} className="rounded border border-border bg-secondary p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">{item.activity}</p>
                            <p className="text-sm text-muted-foreground">{item.day}</p>
                          </div>
                          <p className="font-medium text-primary">{item.time}</p>
                        </div>
                      </div>
                    ))}

                    {isEditing && (
                      <div className="mt-4 space-y-3 border-t border-border pt-4">
                        <p className="text-sm font-medium text-foreground">Thêm lịch trình</p>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                          <input
                            type="text"
                            placeholder="Ngày (vd: Thứ 7)"
                            value={newScheduleDay}
                            onChange={(e) => setNewScheduleDay(e.target.value)}
                            className="rounded border border-border bg-secondary px-3 py-2 text-sm text-foreground"
                          />
                          <input
                            type="text"
                            placeholder="Giờ (vd: 18:00 - 20:00)"
                            value={newScheduleTime}
                            onChange={(e) => setNewScheduleTime(e.target.value)}
                            className="rounded border border-border bg-secondary px-3 py-2 text-sm text-foreground"
                          />
                          <input
                            type="text"
                            placeholder="Hoạt động (vd: Bóng Đá)"
                            value={newScheduleActivity}
                            onChange={(e) => setNewScheduleActivity(e.target.value)}
                            className="rounded border border-border bg-secondary px-3 py-2 text-sm text-foreground"
                          />
                        </div>
                        <Button
                          type="button"
                          className="flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => {
                            if (
                              !newScheduleDay.trim() ||
                              !newScheduleTime.trim() ||
                              !newScheduleActivity.trim()
                            )
                              return;
                            setEditData({
                              ...editData,
                              schedule: [
                                ...editData.schedule,
                                {
                                  day: newScheduleDay.trim(),
                                  time: newScheduleTime.trim(),
                                  activity: newScheduleActivity.trim(),
                                },
                              ],
                            });
                            setNewScheduleDay("");
                            setNewScheduleTime("");
                            setNewScheduleActivity("");
                          }}
                        >
                          <Plus className="h-4 w-4" /> Thêm Lịch Trình
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Save Button */}
            {isEditing && (
              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Lưu Thay Đổi
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  Hủy
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Thống Kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Trận Đấu</p>
                  <p className="text-2xl font-bold text-primary">
                    {user.stats.matchesPlayed}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tỷ Lệ Thắng</p>
                  <p className="text-2xl font-bold text-primary">{user.stats.winRate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Giờ Hoạt Động</p>
                  <p className="text-2xl font-bold text-primary">
                    {user.stats.hoursActive}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Người Theo Dõi</p>
                  <p className="text-2xl font-bold text-primary">
                    {user.stats.followers}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Rating Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Đánh Giá</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">{user.rating}</span>
                  <span className="text-muted-foreground">/ 5.0</span>
                </div>
                <p className="text-sm text-muted-foreground">{user.reviews} đánh giá</p>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-card border-border">
              <CardContent className="space-y-3 pt-6">
                <Button
                  className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => router.push("/match/create-match")}
                >
                  + Tạo Trận Đấu
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-border hover:bg-secondary"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Cài Đặt Tài Khoản
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-border hover:bg-secondary"
                  onClick={() => router.push("/")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng Xuất
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

