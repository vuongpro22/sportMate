'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Trophy, Clock } from "lucide-react";
import Link from 'next/link';

export default function CreateMatchPage() {
  const [formData, setFormData] = useState({
    sport: 'Bóng Đá',
    title: '',
    location: '',
    date: '',
    time: '',
    maxPlayers: 10,
    minSkillLevel: 'Tất Cả',
    description: '',
    rules: '',
  });

  const sports = [
    'Bóng Đá',
    'Bóng Rổ',
    'Cầu Lông',
    'Quần Vợt',
    'Bóng Chuyền',
    'Chạy Bộ',
    'Bơi Lội',
    'Khác'
  ];

  const skillLevels = ['Tất Cả', 'Sơ Cấp', 'Trung Bình', 'Cao', 'Chuyên Nghiệp'];
  const maxPlayerOptions = [4, 6, 8, 10, 12, 16, 20];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Match created:', formData);
    // Handle form submission
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/my-profile">
            <Button
              variant="outline"
              size="sm"
              className="h-10 w-10 p-0 flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Tạo Trận Đấu Mới</h1>
            <p className="text-muted-foreground mt-2">Tổ chức một trận đấu mới và tìm những người chơi phù hợp</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sport Selection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Chọn Môn Thể Thao
              </CardTitle>
              <CardDescription>Loại hình thể thao bạn muốn tổ chức</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sports.map(sport => (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, sport }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.sport === sport
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 text-foreground'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Thông Tin Cơ Bản</CardTitle>
              <CardDescription>Chi tiết về trận đấu của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Tên Trận Đấu</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="ví dụ: Bóng Đá Vui Vẻ Cuối Tuần"
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Địa Điểm</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Công Viên Tây Hồ, Hà Nội"
                    className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Ngày</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Giờ</label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Match Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Cài Đặt Trận Đấu
              </CardTitle>
              <CardDescription>Số lượng người chơi và yêu cầu kỹ năng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Số Lượng Người Chơi Tối Đa</label>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {maxPlayerOptions.map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, maxPlayers: num }))}
                        className={`px-3 py-2 rounded-lg border transition-all ${
                          formData.maxPlayers === num
                            ? 'border-primary bg-primary/10 text-primary font-medium'
                            : 'border-border hover:border-primary/50 text-foreground'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Yêu Cầu Kỹ Năng Tối Thiểu</label>
                <div className="flex flex-wrap gap-2">
                  {skillLevels.map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, minSkillLevel: level }))}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        formData.minSkillLevel === level
                          ? 'border-primary bg-primary/10 text-primary font-medium'
                          : 'border-border hover:border-primary/50 text-foreground'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description & Rules */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Mô Tả & Luật Lệ</CardTitle>
              <CardDescription>Thêm chi tiết bổ sung về trận đấu của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Mô Tả Chi Tiết</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mô tả về trận đấu, địa hình, trang thiết bị có sẵn, v.v."
                  rows={4}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Luật Lệ & Quy Định</label>
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleInputChange}
                  placeholder="Mô tả các luật lệ cụ thể, thời gian nghỉ, cách tính điểm, v.v."
                  rows={4}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 h-12 text-base"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Tạo Trận Đấu
            </Button>
            <Link href="/my-profile" className="flex-1">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base"
              >
                Hủy
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
