import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { FiGithub, FiCode, FiChevronRight } from "react-icons/fi";
import { HiCode, HiChartBar, HiCollection, HiCubeTransparent } from "react-icons/hi";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const StatsCard = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px -15px rgba(147, 51, 234, 0.4)",
    }}
    className={`${className} transform-gpu`}
  >
    {children}
  </motion.div>
);

const ViewProfileButton = ({ href, icon, label }) => (
  <motion.a
    whileHover={{
      scale: 1.05,
      y: -2,
      boxShadow: "0 15px 30px -5px rgba(147, 51, 234, 0.4)"
    }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 
             text-white rounded-xl font-medium text-sm sm:text-base
             hover:from-purple-500 hover:to-pink-500
             transform transition-all duration-300 
             shadow-lg shadow-purple-900/30
             hover:shadow-xl hover:shadow-purple-600/40
             backdrop-blur-md border border-purple-500/20
             flex items-center gap-2 text-white"
  >
    {icon}
    <span className="text-white">{label}</span>
    <FiChevronRight className="text-white group-hover:translate-x-1 transition-transform" />
  </motion.a>
);

const GithubStat = ({ icon, value, color }) => (
  <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-400/30 transition-all">
    <div className={`text-3xl sm:text-4xl mb-1 ${color}`}>{icon}</div>
    <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
  </div>
);

const CodingStats = () => {
  const leetcodeUsername = "cyberboyayush";
  const githubUsername = "cyberboyayush";
  const [githubStats, setGithubStats] = useState({
    repos: "...",
    commits: "...",
    streak: "...",
    totalContributions: "...",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${githubUsername}`
        );
        const userData = await userResponse.json();

        const statsResponse = await fetch(
          `https://api.github.com/users/${githubUsername}/repos`
        );
        const repos = await statsResponse.json();

        let totalCommits = 0;
        await Promise.all(
          repos.map(async (repo) => {
            const commitResponse = await fetch(
              `https://api.github.com/repos/${githubUsername}/${repo.name}/commits?per_page=1`
            );
            const commitData = await commitResponse.json();
            if (Array.isArray(commitData)) {
              totalCommits += repo.size;
            }
          })
        );

        const calendarResponse = await fetch(
          `https://github-contributions-api.deno.dev/${githubUsername}`
        );
        const calendarData = await calendarResponse.json();

        setGithubStats({
          repos: userData.public_repos,
          commits: Math.floor(totalCommits / 100),
          streak: calendarData?.currentStreak || "0",
          totalContributions: calendarData?.totalContributions || "0",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesConfig = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: { value: "#9333ea" },
      links: {
        enable: true,
        color: "#9333ea",
        opacity: 0.1,
        width: 1,
        distance: 150
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      },
      opacity: {
        value: 0.2,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 2,
        random: true
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble"
        }
      },
      modes: {
        bubble: {
          distance: 150,
          size: 4,
          opacity: 0.5
        }
      }
    }
  };

  const StatsSkeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-purple-800/20 rounded-xl"></div>
        ))}
      </div>
      <div className="h-48 sm:h-64 bg-purple-800/20 rounded-xl mb-4"></div>
      <div className="h-8 w-32 mx-auto bg-purple-800/20 rounded-full"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full py-20 px-4 sm:px-6" id="stats">
      <Particles
        id="statsParticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0 -z-10"
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-900/30 text-purple-400 
                      text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-purple-700/30"
          >
            My Progress
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
            Coding Activity
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Explore my coding journey, progress, and commitment to continuous improvement through GitHub and LeetCode.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <StatsCard
            className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 
                     backdrop-blur-sm border border-purple-500/30 rounded-3xl p-6 sm:p-8
                     group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/5 opacity-0 
                       group-hover:opacity-100 transition-opacity duration-500"
            />
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text 
                       bg-gradient-to-r from-purple-300 to-pink-300 
                       mb-6 flex items-center gap-2"
            >
              <FiGithub className="text-2xl sm:text-3xl" /> 
              GitHub Statistics
            </motion.h3>

            {loading ? (
              <StatsSkeleton />
            ) : (
              <div className="space-y-6">

                <motion.div className="space-y-4 mt-6">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&theme=midnight-purple&bg_color=0D1117&title_color=A78BFA&icon_color=9F7AEA&text_color=FFFFFF&include_all_commits=true`}
                    alt="Github stats"
                    className="w-full rounded-2xl shadow-lg hover:shadow-purple-500/30 
                             transition-all duration-300"
                  />
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=highcontrast&hide_border=false`}
                    alt="Github streak stats"
                    className="w-full rounded-2xl shadow-lg hover:shadow-purple-500/30 
                             transition-all duration-300"
                  />
                </motion.div>

                <div className="mt-6 flex justify-center">
                  <ViewProfileButton
                    href={`https://github.com/${githubUsername}`}
                    icon={<FiGithub className="text-white" />}
                    label="View GitHub Profile"
                  />
                </div>
              </div>
            )}
          </StatsCard>

          <StatsCard
            className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 
                     backdrop-blur-sm border border-purple-500/30 rounded-3xl p-6 sm:p-8
                     group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/5 opacity-0 
                       group-hover:opacity-100 transition-opacity duration-500"
            />
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text 
                       bg-gradient-to-r from-purple-300 to-pink-300 mb-6 flex items-center gap-2"
            >
              <HiCode className="text-2xl sm:text-3xl" />
              LeetCode Progress
            </motion.h3>

            {loading ? (
              <StatsSkeleton />
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="overflow-hidden rounded-2xl bg-purple-900/20 shadow-lg 
                            hover:shadow-purple-500/30 transition-all duration-300"
                >
                  <img
                    src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=Roboto&ext=heatmap`}
                    alt="LeetCode stats"
                    className="w-full"
                  />
                </motion.div>

                <div className="mt-8 flex justify-center">
                  <ViewProfileButton
                    href={`https://leetcode.com/${leetcodeUsername}`}
                    icon={<HiCode className="text-white" />}
                    label="View LeetCode Profile"
                  />
                </div>
              </>
            )}
          </StatsCard>
        </div>
      </div>
    </div>
  );
};

export default CodingStats;
