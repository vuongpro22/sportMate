'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, TrendingUp, Users, Activity, Target, Flame } from 'lucide-react';

const topPlayers = [
  { rank: 1, name: 'Trần Minh Hải', sport: 'Bóng Đá', rating: 4.9, matches: 145, wins: 98, image: '👨‍🦰' },
  { rank: 2, name: 'Nguyễn Văn A', sport: 'Bóng Rổ', rating: 4.8, matches: 132, wins: 89, image: '👨‍🦱' },
  { rank: 3, name: 'Phạm Thị B', sport: 'Cầu Lông', rating: 4.7, matches: 128, wins: 85, image: '👩' },
  { rank: 4, name: 'Hoàng Văn C', sport: 'Quần Vợt', rating: 4.6, matches: 119, wins: 78, image: '👨' },
  { rank: 5, name: 'Lê Thị D', sport: 'Bóng Đá', rating: 4.5, matches: 115, wins: 74, image: '👩‍🦳' },
  { rank: 6, name: 'Đặng Minh E', sport: 'Bóng Rổ', rating: 4.4, matches: 108, wins: 70, image: '👨‍🌾' },
  { rank: 7, name: 'Vũ Thị F', sport: 'Cầu Lông', rating: 4.3, matches: 102, wins: 65, image: '👩‍🦰' },
  { rank: 8, name: 'Bùi Văn G', sport: 'Quần Vợt', rating: 4.2, matches: 98, wins: 62, image: '👨‍🎤' },
];

const sportStats = [
  { sport: 'Bóng Đá', players: 12500, matches: 4250, popularity: 98, icon: '⚽' },
  { sport: 'Bóng Rổ', players: 8900, matches: 2890, popularity: 88, icon: '🏀' },
  { sport: 'Cầu Lông', players: 7200, matches: 2100, popularity: 72, icon: '🏸' },
  { sport: 'Quần Vợt', players: 5400, matches: 1800, popularity: 68, icon: '🎾' },
  { sport: 'Bơi Lội', players: 4100, matches: 1200, popularity: 41, icon: '🏊' },
  { sport: 'Yoga', players: 3800, matches: 950, popularity: 38, icon: '🧘' },
  { sport: 'Chạy Bộ', players: 9200, matches: 3100, popularity: 92, icon: '🏃' },
  { sport: 'Cờ Vua', players: 2100, matches: 780, popularity: 21, icon: '♟️' },
];

const regionStats = [
  { region: 'Hà Nội', activeUsers: 18500, matches: 5200, growth: '+12%' },
  { region: 'TP. Hồ Chí Minh', activeUsers: 15800, matches: 4100, growth: '+8%' },
  { region: 'Đà Nẵng', activeUsers: 7200, matches: 1800, growth: '+15%' },
  { region: 'Hải Phòng', activeUsers: 4500, matches: 950, growth: '+5%' },
  { region: 'Cần Thơ', activeUsers: 3800, matches: 750, growth: '+10%' },
];

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState('players');

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-primary" />
            Xếp Hạng & Thống Kê
          </h1>
          <p className="text-muted-foreground text-lg">Theo dõi hiệu suất và xếp hạng của những vận động viên hàng đầu</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary border border-border">
            <TabsTrigger value="players">Xếp Hạng Người Chơi</TabsTrigger>
            <TabsTrigger value="sports">Thống Kê Môn Thể Thao</TabsTrigger>
            <TabsTrigger value="regions">Thống Kê Khu Vực</TabsTrigger>
          </TabsList>

          {/* Players Rankings Tab */}
          <TabsContent value="players" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Top 8 Vận Động Viên</CardTitle>
                <CardDescription>Những vận động viên có rating cao nhất hôm nay</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPlayers.map((player) => (
                    <Link
                      key={player.rank}
                      href="/profile"
                      className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {/* Rank Badge */}
                        <div className="relative">
                          {player.rank <= 3 ? (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                              player.rank === 1 ? 'bg-yellow-500/30 text-yellow-400' :
                              player.rank === 2 ? 'bg-gray-400/30 text-gray-300' :
                              'bg-amber-700/30 text-amber-500'
                            }`}>
                              #{player.rank}
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-primary/20 text-primary">
                              #{player.rank}
                            </div>
                          )}
                        </div>

                        {/* Player Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg font-bold text-foreground">{player.name}</span>
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                              {player.sport}
                            </Badge>
                          </div>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>⭐ {player.rating}</span>
                            <span>🎯 {player.matches} trận</span>
                            <span>✅ {player.wins} thắng</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating Display */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{player.rating}</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sports Stats Tab */}
          <TabsContent value="sports" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Thống Kê Môn Thể Thao</CardTitle>
                <CardDescription>Số lượng người chơi, trận đấu và độ phổ biến</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Môn Thể Thao</th>
                        <th className="text-right py-3 px-4 font-semibold text-foreground">Số Người Chơi</th>
                        <th className="text-right py-3 px-4 font-semibold text-foreground">Số Trận Đấu</th>
                        <th className="text-right py-3 px-4 font-semibold text-foreground">Độ Phổ Biến</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sportStats.map((stat, idx) => (
                        <tr key={idx} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-foreground">{stat.icon} {stat.sport}</td>
                          <td className="py-4 px-4 text-right text-muted-foreground">{stat.players.toLocaleString()}</td>
                          <td className="py-4 px-4 text-right text-muted-foreground">{stat.matches.toLocaleString()}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                  style={{ width: `${stat.popularity}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-primary w-10">{stat.popularity}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Region Stats Tab */}
          <TabsContent value="regions" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Thống Kê Theo Khu Vực</CardTitle>
                <CardDescription>Hoạt động người dùng và trận đấu theo từng khu vực</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {regionStats.map((region, idx) => (
                    <div key={idx} className="p-6 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{region.region}</h3>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span>👥 {region.activeUsers.toLocaleString()} người dùng</span>
                            <span>🎮 {region.matches.toLocaleString()} trận</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${region.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {region.growth}
                          </div>
                          <div className="text-xs text-muted-foreground">Tăng trưởng</div>
                        </div>
                      </div>
                      
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          style={{ width: `${(region.activeUsers / 20000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
