"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import NameForm from "@/components/NameForm";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState({
    title: false,
    form: false,
    footer: false,
  });

  useEffect(() => {
    // 페이지 로드 시 바로 표시 (스크롤 없이도 보이도록)
    setIsVisible({
      title: true,
      form: true,
      footer: true,
    });

    // Intersection Observer로 스크롤 애니메이션
    const observers: IntersectionObserver[] = [];

    const createObserver = (
      ref: React.RefObject<HTMLDivElement>,
      key: keyof typeof isVisible
    ) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(ref.current);
      observers.push(observer);
    };

    createObserver(titleRef, "title");
    createObserver(formRef, "form");
    createObserver(footerRef, "footer");

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
        <BackgroundAnimation />

        <div className="w-full max-w-[420px] mx-auto text-center space-y-8">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isVisible.title ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1], // 개선된 ease-out-expo
              opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }, // 약간의 bounce
            }}
            className="space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible.title ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{
                delay: 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-6xl md:text-7xl font-black text-white brutal-title tracking-tight"
            >
              🔮 운명가챠
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible.title ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                delay: 0.2,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-white text-xl md:text-2xl font-bold tracking-wide"
            >
              2026년, 당신에게 하나의 사건이 일어난다
            </motion.p>
          </motion.div>

          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isVisible.form ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }, // ease-in-out
            }}
          >
            <NameForm />
          </motion.div>

          <motion.p
            ref={footerRef}
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible.footer ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-white/60 text-sm mt-12"
          >
            made with 💫 by fategacha
          </motion.p>
        </div>
      </main>
    </PageTransition>
  );
}
