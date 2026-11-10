
import { Button } from '@/components/ui/button';
import { ChevronRight, MessageCircle, ShieldCheck, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import JobSubmission from '@/components/JobSubmission';
import MobileTransfer from '@/components/MobileTransfer';
import HeroStage from '@/components/HeroStage';
import GlassChip from '@/components/GlassChip';
import tmhLogo from '@/assets/tmh-logo.png';

const rise = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center pt-24 pb-24 overflow-hidden hero-surface">
      {/* Ambient depth layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-24 h-[520px] w-[520px] rounded-full bg-primary/40 blur-[120px]" />
        <div className="absolute -bottom-52 -left-24 h-[560px] w-[560px] rounded-full bg-sky/40 blur-[130px]" />
        <div className="absolute top-1/3 left-1/4 h-[380px] w-[380px] rounded-full bg-berry/25 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-[45vh] hero-grid opacity-70" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <HeroStage>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center space-y-8 preserve-3d"
          >
            {/* Floating badge */}
            <motion.div variants={rise} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={{ transform: 'translateZ(90px)' }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/70 backdrop-blur text-xs font-medium tracking-wide uppercase text-muted-foreground shadow-sm">
                <Hammer className="h-3.5 w-3.5 text-primary" />
                Professional Handyman Services
              </span>
            </motion.div>

            {/* Crest flanked by glass badges — no overlap, even on mobile */}
            <div className="relative z-10 w-full">
              <div className="mx-auto grid w-full max-w-4xl grid-cols-2 items-center justify-items-center gap-4 sm:gap-5 lg:max-w-5xl lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10 xl:gap-14">
                <div className="col-span-2 row-start-1 flex justify-center lg:col-span-1 lg:col-start-2 lg:row-start-1">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-primary-glow/50 blur-3xl" />
                    <img
                      src={tmhLogo}
                      alt="Truckee Meadows Handyman TMH crest logo"
                      width={1024}
                      height={1024}
                      className="mx-auto h-auto w-[228px] object-contain drop-shadow-2xl sm:w-[270px] lg:w-[330px] xl:w-[360px]"
                    />
                  </div>
                </div>

                <GlassChip
                  icon={Hammer}
                  label="Got Work?"
                  from="left"
                  delay={0.85}
                  className="row-start-2 col-span-1 justify-self-end lg:col-span-1 lg:col-start-1 lg:row-start-1"
                />
                <GlassChip
                  icon={ShieldCheck}
                  label="5 Year Warranty"
                  from="right"
                  delay={1.05}
                  className="row-start-2 col-span-1 justify-self-start lg:col-span-1 lg:col-start-3 lg:row-start-1"
                />
              </div>
            </div>

            {/* Headline */}
            <motion.div
              variants={rise}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5 max-w-3xl"
              style={{ transform: 'translateZ(70px)' }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                Get Your Home Repairs Done
                <span className="relative ml-2 inline-block">
                  <span className="relative z-10 text-gradient-primary">Right</span>
                  <span className="absolute bottom-1 left-0 h-3 w-full rounded-full bg-primary-glow/50" />
                </span>
                <span className="block mt-3 text-2xl md:text-3xl font-semibold text-foreground/80">
                  Licensed &amp; insured, locally in Reno / Sparks
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional, reliable and affordable handyman services across the Truckee Meadows.
                Submit your job details and we&apos;ll get back to you fast.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={rise}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 items-center"
              style={{ transform: 'translateZ(110px)' }}
            >
              <Button
                size="lg"
                className="relative group overflow-hidden shadow-glow"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10">More Information</span>
                <span className="absolute inset-0 bg-primary-foreground/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <ChevronRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button size="lg" variant="outline" className="border-2 rounded-full gap-2 backdrop-blur bg-card/50">
                <MessageCircle className="h-5 w-5 text-primary" />
                Ask our Chatbot
              </Button>
            </motion.div>

            {/* Form + QR on a lifted plane */}
            <motion.div
              variants={rise}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full pt-6"
              style={{ transform: 'translateZ(40px)' }}
            >
              <JobSubmission />
              <div className="mt-10 max-w-md mx-auto">
                <MobileTransfer />
              </div>
            </motion.div>
          </motion.div>
        </HeroStage>
      </div>
    </section>
  );
};

export default Hero;
