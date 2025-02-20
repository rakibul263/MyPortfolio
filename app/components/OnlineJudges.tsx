'use client';

import Image from 'next/image';

const profiles = [
  {
    platform: 'Codeforces',
    handle: 'EmptyStack',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png',
    link: 'https://codeforces.com/profile/EmptyStack',
  },
  {
    platform: 'Codeforces',
    handle: 'inert_argon',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png',
    link: 'https://codeforces.com/profile/inert_argon',
  },
  {
    platform: 'CodeChef',
    handle: 'inert_argon',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/codechef.svg',
    link: 'https://www.codechef.com/users/inert_argon',
  },
  {
    platform: 'CodeChef',
    handle: 'empty_stack',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@3.1.0/icons/codechef.svg',
    link: 'https://www.codechef.com/users/empty_stack',
  },
  {
    platform: 'LeetCode',
    handle: 'inert_argon',
    icon: 'https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png',
    link: 'https://leetcode.com/inert_argon',
  },
  {
    platform: 'VJudge',
    handle: 'inert_argon',
    icon: 'https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/303619273_450614343776273_4312090158253002764_n.png?stp=dst-png_s480x480&_nc_cat=100&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=RNkpziinpecQ7kNvgHjPJeL&_nc_oc=Adhwdj01yJN8_2iuvm5D5pZiL3L00BRdaSLMaFfiC8fCBkTG2TaX0PFQiWTmjJOmst4&_nc_zt=24&_nc_ht=scontent.fdac14-1.fna&_nc_gid=ARolqS5c0hPWKHCglmRKStz&oh=00_AYD339FHwdbSLkCvdsdCEwlhTyD0ctA2zA-cDj085V75fA&oe=67BD2C2D',
    link: 'https://vjudge.net/user/inert_argon',
  },
  {
    platform: 'AtCoder',
    handle: 'inert_argon',
    icon: 'https://img.atcoder.jp/assets/atcoder.png',
    link: 'https://atcoder.jp/users/inert_argon',
  },
  {
    platform: 'Toph',
    handle: 'rakibul_263',
    icon: 'https://toph.co/images/logo.png',
    link: 'https://toph.co/u/rakibul_263',
  },
  {
    platform: 'Beecrowd',
    handle: '780978',
    icon: 'https://resources.beecrowd.com.br/judge/img/5.0/logo-beecrowd.png?1635097036',
    link: 'https://judge.beecrowd.com/en/profile/780978',
  },
];

const OnlineJudges = () => {
  return (
    <section id="online-judges" className="section-padding bg-[#0A192F]">
      <div className="container">
        <h2 className="text-4xl font-bold text-[#CCD6F6] mb-12">Coding Profiles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile) => (
            <a
              key={`${profile.platform}-${profile.handle}`}
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#112240] p-6 rounded-lg transform hover:-translate-y-2 transition-transform duration-300 group"
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
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnlineJudges; 