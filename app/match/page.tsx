'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, Users, Trophy, CheckCircle, AlertCircle, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock matches data - in a real app, this would come from an API
const matches = [
  {
    id: '1',
    sport: 'Bóng Đá',
    title: 'Trận Đấu Bóng Đá Thứ Năm',
    location: 'Đai học FPT, Đà Nẵng',
    date: '8 Tháng 3',
    time: '14:00 - 16:00',
    currentPlayers: 8,
    maxPlayers: 10,
    skillLevel: 'Trung Bình',
    price: 'Miễn phí',
  },
  {
    id: '2',
    sport: 'Bóng Rổ',
    title: 'Giao Hữu Bóng Rổ Cuối Tuần',
    location: 'Sân Thể Thao Mỹ Đình, Hà Nội',
    date: '10 Tháng 3',
    time: '18:00 - 20:00',
    currentPlayers: 6,
    maxPlayers: 12,
    skillLevel: 'Trung Bình - Cao',
    price: '50.000đ/người',
  },
  {
    id: '3',
    sport: 'Cầu Lông',
    title: 'Giải Đấu Cầu Lông Giao Lưu',
    location: 'Trung Tâm Thể Thao Thanh Xuân, Hà Nội',
    date: '12 Tháng 3',
    time: '10:00 - 12:00',
    currentPlayers: 4,
    maxPlayers: 4,
    skillLevel: 'Cao',
    price: '100.000đ/người',
  },
  {
    id: '4',
    sport: 'Quần Vợt',
    title: 'Trận Quần Vợt Chiều Thứ Tư',
    location: 'CLB Quần Vợt Hoàn Kiếm, Hà Nội',
    date: '15 Tháng 3',
    time: '19:00 - 21:00',
    currentPlayers: 2,
    maxPlayers: 4,
    skillLevel: 'Trung Bình',
    price: '150.000đ/giờ',
  },
];

// Default detail data (we'll override basic fields from selected match)
const baseMatchDetail = {
  id: '1',
  sport: 'Bóng Đá',
  title: 'Trận Đấu Bóng Đá Thứ Năm',
  location: 'Công Viên Tây Hồ, Hà Nội',
  date: '8 Tháng 3',
  time: '14:00 - 16:00',
  currentPlayers: 8,
  maxPlayers: 10,
  skillLevel: 'Trung Bình',
  price: 'Miễn phí',
  description: 'Một trận đấu bóng đá thú vị cho những ai yêu thích thể thao. Chúng tôi đang tìm kiếm các cầu thủ tài năng để tham gia trận đấu này. Đây là cơ hội tuyệt vời để gặp gỡ những người cùng đam mê.',
  organizer: {
    name: 'Nguyễn Văn A',
    rating: 4.8,
    matchesOrganized: 24,
    avatar: '/api/placeholder/60/60'
  },
  participants: [
    { id: 1, name: 'Trần Văn B', level: 'Cao', avatar: '/api/placeholder/40/40' },
    { id: 2, name: 'Phạm Thị C', level: 'Trung Bình', avatar: '/api/placeholder/40/40' },
    { id: 3, name: 'Hoàng Văn D', level: 'Cao', avatar: '/api/placeholder/40/40' },
    { id: 4, name: 'Đào Thị E', level: 'Trung Bình', avatar: '/api/placeholder/40/40' },
    { id: 5, name: 'Lý Văn F', level: 'Cao', avatar: '/api/placeholder/40/40' },
    { id: 6, name: 'Vũ Thị G', level: 'Trung Bình', avatar: '/api/placeholder/40/40' },
    { id: 7, name: 'Tô Văn H', level: 'Cao', avatar: '/api/placeholder/40/40' },
    { id: 8, name: 'Dương Thị I', level: 'Trung Bình', avatar: '/api/placeholder/40/40' }
  ],
  requirements: [
    'Có kinh nghiệm chơi bóng đá',
    'Mang theo đôi giày thể thao',
    'Đến sớm 15 phút trước giờ bắt đầu',
    'Tuân thủ các quy tắc an toàn'
  ],
  rules: [
    'Trận đấu kéo dài 2 giờ',
    'Đội hình 11 người trên sân',
    'Mỗi hiệp 45 phút',
    'Những người vi phạm quy tắc sẽ được cảnh báo hoặc loại khỏi trận'
  ]
};

function getMatchFromSearch(): typeof baseMatchDetail {
  if (typeof window === 'undefined') return baseMatchDetail;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '1';
  const basic = matches.find((m) => m.id === id) || matches[0];

  return {
    ...baseMatchDetail,
    id: basic.id,
    sport: basic.sport,
    title: basic.title,
    location: basic.location,
    date: basic.date,
    time: basic.time,
    currentPlayers: basic.currentPlayers,
    maxPlayers: basic.maxPlayers,
    skillLevel: basic.skillLevel,
    price: basic.price,
  };
}

export default function MatchDetailPage() {
  const matchData = useMemo(() => getMatchFromSearch(), []);
  const [isJoined, setIsJoined] = useState(false);
  const [currentPlayers, setCurrentPlayers] = useState(matchData.currentPlayers);
  const [isFavorite, setIsFavorite] = useState(false);
  const availableSpots = matchData.maxPlayers - currentPlayers;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    matchData.location,
  )}&output=embed`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4 w-fit">
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </Link>
            <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{matchData.title}</h1>
              <p className="text-muted-foreground text-lg">{matchData.sport}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`h-10 w-10 p-0 flex items-center justify-center ${
                  isFavorite ? 'bg-primary/20 border-primary' : ''
                }`}
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 flex items-center justify-center"
              >
                <Share2 size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Information */}
            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Thông Tin Trận Đấu</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={18} />
                    <span className="text-sm">Thời gian</span>
                  </div>
                  <p className="text-foreground font-semibold">{matchData.time}</p>
                  <p className="text-sm text-muted-foreground">{matchData.date}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={18} />
                    <span className="text-sm">Địa điểm</span>
                  </div>
                  <p className="text-foreground font-semibold">{matchData.location.split(',')[0]}</p>
                  <p className="text-sm text-muted-foreground">{matchData.location.split(',')[1]}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={18} />
                    <span className="text-sm">Người chơi</span>
                  </div>
                  <p className="text-foreground font-semibold">
                    {currentPlayers}/{matchData.maxPlayers}
                  </p>
                  <p className="text-sm text-primary">{availableSpots} chỗ trống</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Trophy size={18} />
                    <span className="text-sm">Trình độ</span>
                  </div>
                  <p className="text-foreground font-semibold">{matchData.skillLevel}</p>
                  <p className="text-sm text-muted-foreground">{matchData.price}</p>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Mô Tả</h2>
              <p className="text-foreground leading-relaxed">{matchData.description}</p>
            </Card>

            {/* Requirements */}
            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Yêu Cầu</h2>
              <ul className="space-y-3">
                {matchData.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                    <span className="text-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Rules */}
            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Quy Tắc</h2>
              <ul className="space-y-3">
                {matchData.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                    <span className="text-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Participants */}
            <Card className="bg-card border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Những Người Tham Gia ({matchData.participants.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {matchData.participants.map((participant) => (
                  <div key={participant.id} className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <Image
                      src={participant.avatar}
                      alt={participant.name}
                      width={40}
                      height={40}
                      className="rounded-full mb-2"
                    />
                    <p className="text-sm font-semibold text-foreground">{participant.name}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{participant.level}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Card */}
            <Card className={`border p-6 ${isJoined ? 'bg-primary/20 border-primary' : 'bg-card border-border'}`}>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Tình trạng</p>
                  {availableSpots > 0 ? (
                    <Badge className="bg-primary/20 text-primary border-primary">
                      {availableSpots} chỗ trống
                    </Badge>
                  ) : (
                    <Badge className="bg-destructive/20 text-destructive border-destructive/40">
                      Đã đầy
                    </Badge>
                  )}
                </div>

                <Button
                  onClick={() => {
                    if (!isJoined && availableSpots > 0) {
                      setIsJoined(true);
                      setCurrentPlayers((prev) => prev + 1);
                    }
                  }}
                  className={isJoined ? 'w-full bg-primary text-primary-foreground hover:bg-primary/90' : 'w-full'}
                  disabled={availableSpots === 0 && !isJoined}
                  size="lg"
                >
                  {isJoined ? '✓ Bạn đã tham gia' : 'Tham Gia Ngay'}
                </Button>

                {isJoined && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (isJoined && currentPlayers > 0) {
                        setIsJoined(false);
                        setCurrentPlayers((prev) => Math.max(prev - 1, 0));
                      }
                    }}
                  >
                    Hủy Tham Gia
                  </Button>
                )}
              </div>
            </Card>

            {/* Organizer Card */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Người Tổ Chức</h3>
              <div className="flex items-center gap-4 pb-4 border-b border-border mb-4">
                <Image
                  src={matchData.organizer.avatar}
                  alt={matchData.organizer.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{matchData.organizer.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm text-muted-foreground">⭐ {matchData.organizer.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Đã tổ chức <span className="font-semibold text-foreground">{matchData.organizer.matchesOrganized}</span> trận đấu
              </p>
              <Button variant="outline" className="w-full">
                Liên Hệ
              </Button>
            </Card>

            {/* Location Map */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Vị Trí</h3>
              <div className="w-full h-40 bg-muted rounded-lg overflow-hidden">
                <iframe
                  title={`Bản đồ ${matchData.location}`}
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
              <p className="text-sm text-foreground mt-3">{matchData.location}</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
