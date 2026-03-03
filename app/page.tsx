'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, MapPin, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AuthMode = 'login' | 'register';

const partnersMock = [
  { name: 'Nguyễn Anh', sport: 'Bóng Rổ', level: 'Advanced', gender: 'Nam', district: 'Tây Hồ', distance: 2, rating: 4.9, createdAt: '2026-03-01' },
  { name: 'Trần Minh', sport: 'Cầu Lông', level: 'Intermediate', gender: 'Nam', district: 'Thanh Xuân', distance: 5, rating: 4.5, createdAt: '2026-02-28' },
  { name: 'Phạm Linh', sport: 'Chạy Bộ', level: 'Beginner', gender: 'Nữ', district: 'Hoàn Kiếm', distance: 1, rating: 4.2, createdAt: '2026-03-02' },
  { name: 'Lê Vũ', sport: 'Quyền Anh', level: 'Advanced', gender: 'Nam', district: 'Cầu Giấy', distance: 3, rating: 4.7, createdAt: '2026-02-25' },
  { name: 'Hoàng Yến', sport: 'Yoga', level: 'Intermediate', gender: 'Nữ', district: 'Ba Đình', distance: 4, rating: 4.8, createdAt: '2026-03-03' },
  { name: 'Đặng Hải', sport: 'Bóng Đá', level: 'Advanced', gender: 'Nam', district: 'Hai Bà Trưng', distance: 2.5, rating: 4.6, createdAt: '2026-02-20' },
];

type PartnerFilter = {
  sport: string;
  level: string;
  gender: string;
  district: string;
  time: string;
  search: string;
  sort: 'nearest' | 'newest' | 'topRated';
};

const HeroSection = ({
  onOpenAuth,
  onExplore,
}: {
  onOpenAuth: (mode: AuthMode) => void;
  onExplore: () => void;
}) => (
  <section className="relative min-h-screen bg-gradient-to-b from-muted to-background flex items-center justify-center overflow-hidden">
    {/* Background grid effect */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80caff44_1px,transparent_1px),linear-gradient(to_bottom,#80caff44_1px,transparent_1px)] bg-[size:14px_14px]" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary">
        <Zap className="w-4 h-4" />
        <span className="text-sm font-medium">Find Your Perfect Partner</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-sans">
        Tìm Kiếm <span className="text-primary">Partner</span> Chơi Thể Thao
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
        Kết nối với những vận động viên khác, tìm đối tác luyện tập và nâng cao kỹ năng của bạn. Tham gia cộng đồng thể thao sôi động ngay hôm nay.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => onOpenAuth('register')}
        >
          Đăng Ký Ngay <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
          onClick={onExplore}
        >
          Khám Phá Ngay
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
        <div>
          <p className="text-3xl md:text-4xl font-bold text-primary">50K+</p>
          <p className="text-sm text-muted-foreground">Vận Động Viên Hoạt Động</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-primary">120+</p>
          <p className="text-sm text-muted-foreground">Môn Thể Thao</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-primary">2.5M</p>
          <p className="text-sm text-muted-foreground">Trận Đấu Mỗi Tháng</p>
        </div>
      </div>
    </div>
  </section>
);

const FeaturedPartners = () => {
  const [filters, setFilters] = useState<PartnerFilter>({
    sport: 'Tất cả',
    level: 'Tất cả',
    gender: 'Tất cả',
    district: 'Tất cả',
    time: 'Tất cả',
    search: '',
    sort: 'nearest',
  });

  const filteredPartners = partnersMock
    .filter((p) => (filters.sport === 'Tất cả' ? true : p.sport === filters.sport))
    .filter((p) => (filters.level === 'Tất cả' ? true : p.level === filters.level))
    .filter((p) => (filters.gender === 'Tất cả' ? true : p.gender === filters.gender))
    .filter((p) =>
      filters.district === 'Tất cả'
        ? true
        : p.district.toLowerCase() === filters.district.toLowerCase(),
    )
    .filter((p) => {
      if (!filters.search.trim()) return true;
      const term = filters.search.toLowerCase();
      const haystack = [
        p.name,
        p.sport,
        p.level,
        p.gender,
        p.district,
        `${p.distance}`,
        `${p.rating}`,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    })
    .sort((a, b) => {
      if (filters.sort === 'nearest') return a.distance - b.distance;
      if (filters.sort === 'newest')
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (filters.sort === 'topRated') return b.rating - a.rating;
      return 0;
    });

  const setFilter = (key: keyof PartnerFilter, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section id="featured-partners" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Những Partner Tuyệt Vời
          </h2>
          <p className="text-lg text-muted-foreground">
            Khám phá những vận động viên ưu tú đang tìm kiếm đối tác
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 rounded-xl border border-border bg-card/60 p-4 backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, môn, trình độ, giới tính, địa điểm..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 md:max-w-md"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Sắp xếp theo</span>
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilter('sort', e.target.value as PartnerFilter['sort'])
                }
                className="rounded-md border border-border bg-input px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="nearest">Gần nhất</option>
                <option value="newest">Mới đăng</option>
                <option value="topRated">Được đánh giá cao</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <select
              value={filters.sport}
              onChange={(e) => setFilter('sport', e.target.value)}
              className="rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="Tất cả">Môn thể thao (Tất cả)</option>
              <option value="Bóng Đá">Bóng Đá</option>
              <option value="Bóng Rổ">Bóng Rổ</option>
              <option value="Cầu Lông">Cầu Lông</option>
              <option value="Yoga">Yoga</option>
              <option value="Chạy Bộ">Chạy Bộ</option>
              <option value="Quyền Anh">Quyền Anh</option>
            </select>

            <select
              value={filters.level}
              onChange={(e) => setFilter('level', e.target.value)}
              className="rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="Tất cả">Trình độ (Tất cả)</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select
              value={filters.gender}
              onChange={(e) => setFilter('gender', e.target.value)}
              className="rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="Tất cả">Giới tính (Tất cả)</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>

            <select
              value={filters.time}
              onChange={(e) => setFilter('time', e.target.value)}
              className="rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="Tất cả">Thời gian (Tất cả)</option>
              <option value="Hôm nay">Hôm nay</option>
              <option value="Cuối tuần">Cuối tuần</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredPartners.map((partner, idx) => (
            <div
              key={idx}
              className="group relative cursor-pointer overflow-hidden rounded-lg border border-border/50 bg-card transition-all duration-300 hover:border-primary/50"
            >
              <div className="flex h-64 items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <Users className="h-24 w-24 text-primary/30" />
              </div>

              <div className="relative z-10 p-6">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{partner.name}</h3>
                    <p className="text-sm font-medium text-primary">{partner.sport}</p>
                  </div>
                  <span className="rounded-full bg-primary/20 px-2 py-1 text-xs text-primary">
                    {partner.level}
                  </span>
                </div>

                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{partner.gender}</span>
                  <span>•</span>
                  <span>{partner.district}</span>
                </div>

                <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {partner.distance}km từ bạn
                  </span>
                  <span>⭐ {partner.rating.toFixed(1)}</span>
                </div>

                <Link href="/profile" className="block">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-primary/30 bg-transparent text-primary hover:bg-primary/10"
                  >
                    Xem Hồ Sơ
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedGames = () => (
  <section className="py-20 px-4 bg-muted">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trận Đấu Sắp Tới</h2>
        <p className="text-muted-foreground text-lg">Tham gia hoặc tạo các trận đấu gần bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: '1', sport: 'Bóng Đá', location: 'Công Viên Tây Hồ', players: '8/10', time: 'Thứ Bảy 14:00' },
          { id: '2', sport: 'Bóng Rổ', location: 'Sân Thể Thao Mỹ Đình', players: '6/12', time: 'Thứ Năm 18:00' },
          { id: '3', sport: 'Cầu Lông', location: 'Trung Tâm Thể Thao Thanh Xuân', players: '4/4', time: 'Chủ Nhật 10:00' },
          { id: '4', sport: 'Quần Vợt', location: 'CLB Quần Vợt Hoàn Kiếm', players: '2/4', time: 'Thứ Tư 19:00' },
          { id: '5', sport: 'Chạy Bộ', location: 'Hồ Gươm', players: '12/20', time: 'Sáng Chủ Nhật 06:00' },
          { id: '6', sport: 'Bơi Lội', location: 'Trung Tâm Bơi Lội Quốc Gia', players: '5/10', time: 'Chiều Thứ Sáu 17:00' },
        ].map((game) => (
          <div key={game.id} className="bg-card border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold text-white">{game.sport}</h3>
                </div>
                <p className="text-muted-foreground text-sm flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {game.location}
                </p>
              </div>
              <span className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full font-medium">
                {game.players}
              </span>
            </div>

            <p className="text-muted-foreground text-sm mb-4">{game.time}</p>

            <Link href={`/match?id=${game.id}`} className="block">
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                Tham Gia Ngay
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RankingSection = () => (
  <section className="py-20 px-4 bg-background border-t border-primary/10">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Bảng Xếp Hạng</h2>
        <p className="text-muted-foreground text-lg">
          Xem những vận động viên nổi bật và thống kê hoạt động trên SportMatch.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Vận Động Viên</p>
            <p className="text-2xl font-bold text-primary">50K+</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Trận Đấu Hôm Nay</p>
            <p className="text-2xl font-bold text-primary">2.5K+</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Đang Hoạt Động</p>
            <p className="text-2xl font-bold text-primary">12K+</p>
          </div>
        </div>

        <div className="w-full md:w-auto text-center md:text-right">
          <p className="text-sm text-muted-foreground mb-3">
            Khám phá xếp hạng chi tiết theo người chơi, môn thể thao và khu vực.
          </p>
          <Link href="/ranking">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Xem Bảng Xếp Hạng
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20 px-4 bg-background">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Tại Sao Chọn SportMatch?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Tìm Kiếm Dễ Dàng</h3>
          <p className="text-muted-foreground">Tìm partner phù hợp với mức độ kỹ năng và sở thích của bạn</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Gần Bạn</h3>
          <p className="text-muted-foreground">Kết nối với những người trong khu vực của bạn</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Theo Dõi Tiến Độ</h3>
          <p className="text-muted-foreground">Quản lý hồ sơ và theo dõi thành tích của bạn</p>
        </div>
      </div>
    </div>
  </section>
);

const CTA = ({ onOpenAuth }: { onOpenAuth: (mode: AuthMode) => void }) => (
  <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5 border-t border-primary/20">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Sẵn Sàng Bắt Đầu?</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Tham gia hàng chục nghìn vận động viên khác đang tìm kiếm partner hoàn hảo.
      </p>
      <Button
        size="lg"
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={() => onOpenAuth('register')}
      >
        Đăng Ký Ngay <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  </section>
);

const AuthModal = ({
  open,
  mode,
  onClose,
  onModeChange,
}: {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-background border border-border shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground text-sm"
        >
          Đóng
        </button>

        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-1">Chào bạn</h2>
            <p className="text-sm text-muted-foreground">
              Đăng nhập hoặc tạo tài khoản để bắt đầu tìm partner.
            </p>
          </div>

          <Tabs value={mode} onValueChange={(value) => onModeChange(value as AuthMode)}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="login">Đăng Nhập</TabsTrigger>
              <TabsTrigger value="register">Đăng Ký</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Mật khẩu</label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90">
                  Đăng Nhập
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Mật khẩu</label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="Nhập lại mật khẩu"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border border-border bg-input"
                    required
                  />
                  <span>Đồng ý với điều khoản</span>
                </div>
                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90">
                  Đăng Ký
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('register');

  const handleOpenAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleExplorePartners = () => {
    if (typeof document !== 'undefined') {
      document
        .getElementById('featured-partners')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <main className="bg-background">
        <HeroSection onOpenAuth={handleOpenAuth} onExplore={handleExplorePartners} />
        <FeaturedPartners />
        <FeaturedGames />
        <RankingSection />
      </main>
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onModeChange={setAuthMode}
      />
    </>
  );
}
