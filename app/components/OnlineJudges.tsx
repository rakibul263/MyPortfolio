'use client';

import Image from 'next/image';
import * as Tooltip from '@radix-ui/react-tooltip';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Brush, ReferenceArea, ReferenceLine } from 'recharts';
import { useState, useEffect } from 'react';

type RatingHistory = {
  date: string;
  rating: number;
};

type Profile = {
  platform: string;
  handle: string;
  icon: string;
  link: string;
  solveCount: number;
  rating?: number;
  maxRating?: number;
  rank?: string;
  globalRank?: number;
  contestCount?: number;
  ratingHistory?: RatingHistory[];
  color?: string;
};

const platformColors = {
  Codeforces: '#1890FF',
  CodeChef: '#F44336',
  LeetCode: '#FFA116',
  AtCoder: '#2D2D2D',
  VJudge: '#0A84FF',
  Toph: '#2196F3',
  Beecrowd: '#2E7D32'
};

const getRankColor = (platform: string, rank?: string, rating?: number): string => {
  if (!rank && !rating) return '#8892B0';

  switch (platform) {
    case 'Codeforces':
      if (rating) {
        if (rating >= 2400) return '#FF0000';  // Red - International Grandmaster
        if (rating >= 2100) return '#FF8C00';  // Orange - Grandmaster
        if (rating >= 1900) return '#AA00AA';  // Purple - International Master
        if (rating >= 1600) return '#0000FF';  // Blue - Expert
        if (rating >= 1400) return '#03A89E';  // Cyan - Specialist
        if (rating >= 1200) return '#008000';  // Green - Pupil
      }
      return '#808080';  // Gray - Newbie

    case 'CodeChef':
      if (rating) {
        if (rating >= 2500) return '#FF1B1B';  // 7★
        if (rating >= 2200) return '#FF9A3D';  // 6★
        if (rating >= 2000) return '#CCCC00';  // 5★
        if (rating >= 1800) return '#0066CC';  // 4★
        if (rating >= 1600) return '#1E7D22';  // 3★
      }
      return '#666666';  // 1-2★

    case 'AtCoder':
      if (rating) {
        if (rating >= 2800) return '#FF0000';  // Red
        if (rating >= 2400) return '#FFA500';  // Orange
        if (rating >= 2000) return '#C0C000';  // Yellow
        if (rating >= 1600) return '#0000FF';  // Blue
        if (rating >= 1200) return '#00C0C0';  // Cyan
        if (rating >= 800) return '#008000';   // Green
        if (rating >= 400) return '#804000';   // Brown
      }
      return '#808080';  // Gray

    case 'LeetCode':
      if (rank) {
        if (rank.includes('Guardian')) return '#FF2D55';
        if (rank.includes('Knight')) return '#FFA116';
        if (rank.includes('Master')) return '#FFC01E';
      }
      return '#808080';

    default:
      return '#8892B0';
  }
};

const profiles: Profile[] = [
  {
    platform: 'Codeforces',
    handle: 'EmptyStack',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png',
    link: 'https://codeforces.com/profile/EmptyStack',
    solveCount: 210,
    rating: 931,
    maxRating: 931,
    rank: 'Newbie',
    contestCount: 6,
    color: platformColors.Codeforces,
  },
  {
    platform: 'Codeforces',
    handle: 'inert_argon',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png',
    link: 'https://codeforces.com/profile/inert_argon',
    solveCount: 190,
    rating: 851,
    maxRating: 918,
    rank: 'Newbie',
    contestCount: 8,
    color: platformColors.Codeforces
  },
  {
    platform: 'CodeChef',
    handle: 'inert_argon',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/codechef.svg',
    link: 'https://www.codechef.com/users/inert_argon',
    solveCount: 58,
    rating: 1280,
    maxRating: 1280,
    rank: '1★',
    contestCount: 20,
    color: platformColors.CodeChef
  },
  {
    platform: 'CodeChef',
    handle: 'empty_stack',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/codechef.svg',
    link: 'https://www.codechef.com/users/empty_stack',
    solveCount: 154,
    rating: 1156,
    maxRating: 1156,
    rank: '1★',
    contestCount: 13,
    color: platformColors.CodeChef
  },
  {
    platform: 'LeetCode',
    handle: 'inert_argon',
    icon: 'https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png',
    link: 'https://leetcode.com/inert_argon',
    solveCount: 23,
    color: platformColors.LeetCode
  },
  {
    platform: 'VJudge',
    handle: 'inert_argon',
    icon: 'https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/303619273_450614343776273_4312090158253002764_n.png?stp=dst-png_s480x480&_nc_cat=100&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=RNkpziinpecQ7kNvgHjPJeL&_nc_oc=Adhwdj01yJN8_2iuvm5D5pZiL3L00BRdaSLMaFfiC8fCBkTG2TaX0PFQiWTmjJOmst4&_nc_zt=24&_nc_ht=scontent.fdac14-1.fna&_nc_gid=ARolqS5c0hPWKHCglmRKStz&oh=00_AYD339FHwdbSLkCvdsdCEwlhTyD0ctA2zA-cDj085V75fA&oe=67BD2C2D',
    link: 'https://vjudge.net/user/inert_argon',
    solveCount: 174,
    color: platformColors.VJudge
  },
  {
    platform: 'AtCoder',
    handle: 'inert_argon',
    icon: 'https://img.atcoder.jp/assets/atcoder.png',
    link: 'https://atcoder.jp/users/inert_argon',
    solveCount: 0,
    color: platformColors.AtCoder
  },
  {
    platform: 'Toph',
    handle: 'rakibul_263',
    icon: 'https://toph.co/images/logo.png',
    link: 'https://toph.co/u/rakibul_263',
    solveCount: 11,
    color: platformColors.Toph
  },
  {
    platform: 'Beecrowd',
    handle: '780978',
    icon: 'https://resources.beecrowd.com.br/judge/img/5.0/logo-beecrowd.png?1635097036',
    link: 'https://judge.beecrowd.com/en/profile/780978',
    solveCount: 145,
    color: platformColors.Beecrowd
  },
];

// Add loading and error states
type ProfileState = {
  data: Profile[];
  isLoading: boolean;
  error: string | null;
};

// Update the ZoomState type
type ZoomState = {
  refAreaLeft: string | null;
  refAreaRight: string | null;
  data: RatingHistory[];
  left: 'dataMin' | 'dataMax' | string;
  right: 'dataMin' | 'dataMax' | string;
  top: number | 'auto';
  bottom: number | 'auto';
};

// Enhanced RatingGraph with annotations and better typing
const RatingGraph = ({ history, color }: { history: RatingHistory[], color: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [zoom, setZoom] = useState<ZoomState>({
    refAreaLeft: null,
    refAreaRight: null,
    data: history,
    left: 'dataMin',
    right: 'dataMax',
    top: 'auto',
    bottom: 'auto'
  });

  const [activePoint, setActivePoint] = useState<RatingHistory | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseDown = (e: any) => {
    if (!e) return;
    setZoom(prev => ({ ...prev, refAreaLeft: e.activeLabel }));
  };

  const handleMouseMove = (e: any) => {
    if (!e || !zoom.refAreaLeft) return;
    setZoom(prev => ({ ...prev, refAreaRight: e.activeLabel }));
  };

  const handleMouseUp = () => {
    if (!zoom.refAreaLeft || !zoom.refAreaRight) return;

    // Convert dates to timestamps for comparison
    const leftDate = new Date(zoom.refAreaLeft).getTime();
    const rightDate = new Date(zoom.refAreaRight).getTime();
    
    const [start, end] = [leftDate, rightDate].sort((a, b) => a - b);
    const filteredRatings = history
      .filter(item => {
        const itemDate = new Date(item.date).getTime();
        return itemDate >= start && itemDate <= end;
      })
      .map(item => item.rating);

    setZoom({
      refAreaLeft: null,
      refAreaRight: null,
      data: history,
      left: new Date(start).toISOString().split('T')[0],
      right: new Date(end).toISOString().split('T')[0],
      top: Math.max(...filteredRatings) + 100,
      bottom: Math.min(...filteredRatings) - 100
    });
  };

  const handleZoomOut = () => {
    setZoom({
      refAreaLeft: null,
      refAreaRight: null,
      data: history,
      left: 'dataMin',
      right: 'dataMax',
      top: 'auto',
      bottom: 'auto'
    });
    setActivePoint(null);
  };

  // Find max and min rating points
  const maxRating = history.reduce((max, point) => 
    point.rating > max.rating ? point : max, history[0]);
  const minRating = history.reduce((min, point) => 
    point.rating < min.rating ? point : min, history[0]);

  // Custom tooltip content
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#0A192F] border border-[#233554] rounded-lg p-2">
          <p className="text-[#CCD6F6] text-sm">{`Date: ${data.date}`}</p>
          <p className="text-[#64FFDA] text-sm">{`Rating: ${data.rating}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`h-24 w-full mt-2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex justify-between mb-1">
        <div className="text-xs text-[#8892B0]">
          {activePoint ? (
            `${activePoint.date}: ${activePoint.rating}`
          ) : (
            `Max: ${maxRating.rating} (${maxRating.date})`
          )}
        </div>
        <button
          onClick={handleZoomOut}
          className="text-xs text-[#8892B0] hover:text-[#64FFDA] transition-colors"
        >
          Reset Zoom
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={history}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setActivePoint(null)}
        >
          <XAxis
            dataKey="date"
            tick={{ fill: '#8892B0', fontSize: 10 }}
            axisLine={{ stroke: '#233554' }}
            domain={['dataMin', 'dataMax']}
            type="category"
          />
          <YAxis
            tick={{ fill: '#8892B0', fontSize: 10 }}
            axisLine={{ stroke: '#233554' }}
            domain={[zoom.bottom, zoom.top]}
          />
          <RechartsTooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#64FFDA', strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 3 }}
            activeDot={{
              r: 5,
              fill: '#64FFDA',
              onMouseOver: (data: any) => setActivePoint(data.payload)
            }}
            animationDuration={1000}
            animationBegin={300}
          />
          <Brush
            dataKey="date"
            height={20}
            stroke="#233554"
            fill="#112240"
            travellerWidth={10}
          />
          {zoom.refAreaLeft && zoom.refAreaRight && (
            <ReferenceArea
              x1={zoom.refAreaLeft}
              x2={zoom.refAreaRight}
              strokeOpacity={0.3}
              fill="#64FFDA"
              fillOpacity={0.1}
            />
          )}
          <ReferenceLine
            y={maxRating.rating}
            stroke="#64FFDA"
            strokeDasharray="3 3"
            label={{
              value: `Max: ${maxRating.rating}`,
              fill: '#64FFDA',
              fontSize: 10,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Update the loading skeleton with more animations
const ProfileSkeleton = () => (
  <div className="bg-[#112240] p-6 rounded-lg animate-pulse relative overflow-hidden">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-[#233554] rounded-full relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#64FFDA] to-transparent animate-shimmer" />
      </div>
      <div className="space-y-2 flex-1">
        <div className="h-6 w-24 bg-[#233554] rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#64FFDA] to-transparent animate-shimmer" />
        </div>
        <div className="h-4 w-32 bg-[#233554] rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#64FFDA] to-transparent animate-shimmer" />
        </div>
        <div className="h-4 w-40 bg-[#233554] rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#64FFDA] to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  </div>
);

// Error component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-[#112240] p-6 rounded-lg border-l-4 border-red-500">
    <p className="text-red-400">{message}</p>
    <button 
      onClick={() => window.location.reload()} 
      className="mt-2 text-sm text-[#64FFDA] hover:underline"
    >
      Try again
    </button>
  </div>
);

const ProfileTooltip = ({ profile }: { profile: Profile }) => {
  return (
    <div className="rounded-lg p-4 bg-[#112240] border border-[#233554] shadow-lg min-w-[250px] transition-all duration-300 hover:border-[#64FFDA]">
      <div className="space-y-3">
        <div 
          className="font-medium text-[#CCD6F6] border-b border-[#233554] pb-2 mb-2"
          style={{ borderColor: profile.color }}
        >
          {profile.platform} Profile
        </div>
        
        {profile.rating && (
          <div className="flex justify-between text-sm items-center group">
            <span className="text-[#8892B0] group-hover:text-[#CCD6F6] transition-colors">
              Current Rating:
            </span>
            <span 
              style={{ color: getRankColor(profile.platform, profile.rank, profile.rating) }}
              className="font-medium transition-transform group-hover:scale-110"
            >
              {profile.rating}
            </span>
          </div>
        )}
        
        {profile.maxRating && (
          <div className="flex justify-between text-sm items-center group">
            <span className="text-[#8892B0] group-hover:text-[#CCD6F6] transition-colors">
              Max Rating:
            </span>
            <span className="text-[#64FFDA] font-medium transition-transform group-hover:scale-110">
              {profile.maxRating}
            </span>
          </div>
        )}
        
        {profile.globalRank && (
          <div className="flex justify-between text-sm items-center group">
            <span className="text-[#8892B0] group-hover:text-[#CCD6F6] transition-colors">
              Global Rank:
            </span>
            <span className="text-[#64FFDA] font-medium transition-transform group-hover:scale-110">
              #{profile.globalRank}
            </span>
          </div>
        )}
        
        {profile.contestCount && (
          <div className="flex justify-between text-sm items-center group">
            <span className="text-[#8892B0] group-hover:text-[#CCD6F6] transition-colors">
              Contests:
            </span>
            <span className="text-[#64FFDA] font-medium transition-transform group-hover:scale-110">
              {profile.contestCount}
            </span>
          </div>
        )}
        
        {profile.ratingHistory && profile.ratingHistory.length > 0 && (
          <div className="mt-4">
            <div className="text-[#8892B0] text-sm mb-1">Rating Progress</div>
            <RatingGraph 
              history={profile.ratingHistory} 
              color={profile.color || '#64FFDA'} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

const OnlineJudges = () => {
  const [profileState, setProfileState] = useState<ProfileState>({
    data: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfileState({
          data: profiles, // Replace with actual API call
          isLoading: false,
          error: null
        });
      } catch (error) {
        setProfileState({
          data: [],
          isLoading: false,
          error: 'Failed to load profiles. Please try again later.'
        });
      }
    };

    fetchProfiles();
  }, []);

  const totalSolves = profileState.data.reduce((sum, profile) => sum + profile.solveCount, 0);

  if (profileState.error) {
    return (
      <section className="section-padding bg-[#0A192F]">
        <div className="container">
          <ErrorMessage message={profileState.error} />
        </div>
      </section>
    );
  }

  return (
    <Tooltip.Provider>
      <section id="online-judges" className="section-padding bg-[#0A192F]">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-[#CCD6F6]">Coding Profiles</h2>
            <div className="text-[#64FFDA]">
              {profileState.isLoading ? (
                <div className="h-6 w-40 bg-[#233554] rounded animate-pulse"></div>
              ) : (
                `Total Problems Solved: ${totalSolves}`
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileState.isLoading ? (
              Array(6).fill(0).map((_, i) => <ProfileSkeleton key={i} />)
            ) : (
              profileState.data.map((profile) => (
                <Tooltip.Root key={`${profile.platform}-${profile.handle}`}>
                  <Tooltip.Trigger asChild>
                    <a
                      href={profile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#112240] p-6 rounded-lg transform hover:-translate-y-2 transition-transform duration-300 group relative"
                      style={{ 
                        borderLeft: `3px solid ${profile.color || '#64FFDA'}`,
                        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` 
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12">
                          <Image
                            src={profile.icon}
                            alt={profile.platform}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-[#CCD6F6] text-xl font-bold group-hover:text-[#64FFDA] transition-colors">
                            {profile.platform}
                          </h3>
                          <p className="text-[#8892B0]">{profile.handle}</p>
                          <p className="text-[#64FFDA] text-sm mt-1">
                            {profile.solveCount} problems solved
                          </p>
                          {(profile.rating || profile.rank || profile.contestCount) && (
                            <div className="text-sm mt-1 space-y-0.5">
                              {profile.rating && (
                                <div>
                                  <span style={{ color: getRankColor(profile.platform, profile.rank, profile.rating) }}>
                                    Rating: {profile.rating}
                                    {profile.maxRating && ` (max: ${profile.maxRating})`}
                                  </span>
                                </div>
                              )}
                              {profile.rank && (
                                <div style={{ color: getRankColor(profile.platform, profile.rank, profile.rating) }}>
                                  {profile.rank}
                                </div>
                              )}
                              {profile.contestCount && (
                                <div className="text-[#8892B0]">
                                  Contests: {profile.contestCount}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </a>
                  </Tooltip.Trigger>
                  
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={5}
                      className="z-50 animate-slideUpAndFade"
                    >
                      <ProfileTooltip profile={profile} />
                      <Tooltip.Arrow className="fill-[#233554]" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              ))
            )}
          </div>
        </div>
      </section>
    </Tooltip.Provider>
  );
};

export default OnlineJudges; 