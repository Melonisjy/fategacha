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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              🔮 운명가챠
            </h1>
            <p className="text-purple-100 text-lg">
              2026년, 당신에게 하나의 사건이 일어난다
            </p>
          </motion.div>

          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isVisible.form ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <NameForm />
          </motion.div>

          <motion.p
            ref={footerRef}
            initial={{ opacity: 0 }}
            animate={isVisible.footer ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/60 text-sm mt-12"
          >
            made with 💫 by fategacha
          </motion.p>
        </div>
      </main>
    </PageTransition>
  );
}
