import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Timer,
  Gift,
  Share2,
  ChevronRight,
  Check,
  Lock,
  Globe2,
  Copy,
  MessageCircle,
} from 'lucide-react';

const nations = [
  { id: 'nl', name: 'Netherlands', flag: '🇳🇱' },
  { id: 'fr', name: 'France', flag: '🇫🇷' },
  { id: 'br', name: 'Brazil', flag: '🇧🇷' },
  { id: 'de', name: 'Germany', flag: '🇩🇪' },
  { id: 'ar', name: 'Argentina', flag: '🇦🇷' },
  { id: 'es', name: 'Spain', flag: '🇪🇸' },
  { id: 'pt', name: 'Portugal', flag: '🇵🇹' },
  { id: 'it', name: 'Italy', flag: '🇮🇹' },
  { id: 'gb', name: 'England', flag: '🇬🇧' },
  { id: 'be', name: 'Belgium', flag: '🇧🇪' },
  { id: 'hr', name: 'Croatia', flag: '🇭🇷' },
  { id: 'us', name: 'USA', flag: '🇺🇸' },
  { id: 'mx', name: 'Mexico', flag: '🇲🇽' },
  { id: 'jp', name: 'Japan', flag: '🇯🇵' },
  { id: 'kr', name: 'South Korea', flag: '🇰🇷' },
  { id: 'ma', name: 'Morocco', flag: '🇲🇦' },
  { id: 'sn', name: 'Senegal', flag: '🇸🇳' },
  { id: 'ca', name: 'Canada', flag: '🇨🇦' },
];

const questionsByNation = {
  nl: [
    {
      eyebrow: 'Question 1/3',
      prompt: 'Which player scored THAT flying header against Spain in 2014?',
      options: ['Arjen Robben', 'Robin van Persie', 'Wesley Sneijder'],
      answer: 1,
      image: '🦁',
    },
    {
      eyebrow: 'Question 2/3',
      prompt: 'Which Dutch club was the first to win the European Cup?',
      options: ['PSV Eindhoven', 'Feyenoord', 'Ajax'],
      answer: 1,
      image: '🏆',
    },
    {
      eyebrow: 'Question 3/3',
      prompt: 'Which Dutch legend would you want in your 5-a-side team?',
      options: [
        'Johan Cruijff',
        'Ruud Gullit',
        'Dennis Bergkamp',
        'Marco van Basten',
      ],
      answer: 0,
      image: '🔥',
    },
  ],
  fr: [
    {
      eyebrow: 'Question 1/3',
      prompt: 'Who scored twice for France in the 1998 World Cup final?',
      options: ['Thierry Henry', 'Zinedine Zidane', 'Didier Deschamps'],
      answer: 1,
      image: '🇫🇷',
    },
    {
      eyebrow: 'Question 2/3',
      prompt: 'Which country did France beat in the 2018 World Cup final?',
      options: ['Croatia', 'Belgium', 'Argentina'],
      answer: 0,
      image: '🏆',
    },
    {
      eyebrow: 'Question 3/3',
      prompt: 'Which French icon would you build your dream team around?',
      options: ['Mbappé', 'Zidane', 'Henry', 'Platini'],
      answer: 1,
      image: '⭐',
    },
  ],
  br: [
    {
      eyebrow: 'Question 1/3',
      prompt: 'How many World Cups has Brazil won?',
      options: ['4', '5', '6'],
      answer: 1,
      image: '🇧🇷',
    },
    {
      eyebrow: 'Question 2/3',
      prompt: 'Which Brazilian legend is known as O Rei?',
      options: ['Pelé', 'Ronaldo', 'Ronaldinho'],
      answer: 0,
      image: '👑',
    },
    {
      eyebrow: 'Question 3/3',
      prompt:
        'Which Brazilian skill move belongs in every street football highlight?',
      options: ['Elastico', 'Cruyff turn', 'Panenka', 'Rabona'],
      answer: 0,
      image: '✨',
    },
  ],
  ar: [
    {
      eyebrow: 'Question 1/3',
      prompt: 'Who lifted the World Cup for Argentina in 2022?',
      options: ['Di María', 'Messi', 'Martínez'],
      answer: 1,
      image: '🐐',
    },
    {
      eyebrow: 'Question 2/3',
      prompt: 'Which number is iconic for Messi?',
      options: ['7', '9', '10'],
      answer: 2,
      image: '⭐',
    },
    {
      eyebrow: 'Question 3/3',
      prompt: 'Which Argentine legend would you trust in extra time?',
      options: ['Messi', 'Maradona', 'Batistuta', 'Riquelme'],
      answer: 0,
      image: '🔥',
    },
  ],
};

function generateGenericQuestions(countryName, flag) {
  return [
    {
      eyebrow: 'Question 1/3',
      prompt: `How far do you think ${countryName} will go at the 2026 World Cup?`,
      options: ['Group Stage', 'Quarter Finals', 'Champions'],
      answer: 2,
      image: flag,
    },
    {
      eyebrow: 'Question 2/3',
      prompt: `Which quality best describes ${countryName}'s football style?`,
      options: ['Passion', 'Discipline', 'Creativity', 'Speed'],
      answer: 0,
      image: '⚽',
    },
    {
      eyebrow: 'Question 3/3',
      prompt: `Would you wear the ${countryName} kit every matchday?`,
      options: ['Absolutely', 'Only during tournaments', 'Depends if they win'],
      answer: 0,
      image: '👕',
    },
  ];
}

function Hearts({ score, total = 3, glow = false, large = false }) {
  return (
    <div className="flex justify-center gap-1.5 sm:gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <Heart
          key={i}
          className={`${
            large
              ? 'h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14'
              : 'h-6 w-6 sm:h-8 sm:w-8'
          } ${i < score ? 'fill-red-500 text-red-500' : 'text-white/40'} ${
            glow && i < score ? 'drop-shadow-[0_0_14px_rgba(255,0,80,.95)]' : ''
          }`}
        />
      ))}
    </div>
  );
}

function Button({
  children,
  onClick,
  disabled,
  variant = 'solid',
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 transition active:scale-[.98] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35';
  const styles =
    variant === 'outline'
      ? 'border border-white/20 bg-transparent text-white hover:bg-white/10'
      : variant === 'ghost'
      ? 'bg-transparent text-white/70 hover:bg-white/10'
      : 'bg-lime-400 text-black hover:bg-lime-300';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = '' }) {
  return <div className={`rounded-2xl border ${className}`}>{children}</div>;
}

function Shell({ children }) {
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(180,255,0,.18),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(255,90,0,.15),transparent_30%)]" />
      <div className="fixed inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:44px_44px]" />
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-5 sm:max-w-xl sm:px-6 sm:py-7 lg:max-w-6xl lg:px-10">
        {children}
      </main>
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 font-black tracking-tight">
        <div className="grid h-8 w-8 place-items-center rounded bg-lime-400 text-black">
          D
        </div>
        DUNDLE
      </div>
      <div className="flex items-center gap-3 text-xs text-white/80">
        EN <Globe2 className="h-4 w-4" />
      </div>
    </div>
  );
}

export default function DundleFootballHeartPrototype() {
  const [screen, setScreen] = useState('home');
  const [nation, setNation] = useState(nations[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState('');

  const score = useMemo(() => answers.filter(Boolean).length, [answers]);
  const activeQuestions =
    questionsByNation[nation.id] ||
    generateGenericQuestions(nation.name, nation.flag);
  const currentQuestion = activeQuestions[questionIndex];

  const start = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setSelected(null);
    setScreen('quiz');
  };

  const answer = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const correct = index === currentQuestion.answer;

    setTimeout(() => {
      const nextAnswers = [...answers, correct];
      setAnswers(nextAnswers);
      setSelected(null);

      if (questionIndex === activeQuestions.length - 1) setScreen('result');
      else setQuestionIndex(questionIndex + 1);
    }, 800);
  };

  return (
    <Shell>
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="flex min-h-[calc(100vh-40px)] flex-col lg:min-h-screen"
          >
            <Header />

            <div className="grid flex-1 items-start gap-6 py-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-10 lg:py-10">
              <section className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-black uppercase text-lime-300">
                  <Timer className="h-3.5 w-3.5" /> 30 sec challenge
                </div>

                <h1 className="mt-4 text-4xl font-black uppercase italic leading-[.9] tracking-tight sm:text-6xl lg:text-7xl">
                  Win your national team kit
                </h1>

                <p className="mx-auto mt-4 max-w-sm text-sm text-white/75 sm:text-base lg:mx-0">
                  Pick your country, answer 3 quick football questions and
                  unlock your chance to enter the draw.
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[.04] p-3 text-center text-xs text-white/70 sm:text-sm">
                  <div>
                    <div className="text-lg font-black text-lime-400">1</div>
                    Choose country
                  </div>
                  <div>
                    <div className="text-lg font-black text-lime-400">2</div>
                    Play quiz
                  </div>
                  <div>
                    <div className="text-lg font-black text-lime-400">3</div>
                    Enter draw
                  </div>
                </div>

                <Button
                  onClick={start}
                  className="mt-6 h-12 w-full text-sm font-black uppercase sm:h-14 sm:text-base lg:w-auto lg:px-10"
                >
                  Start with {nation.name} {nation.flag}{' '}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </section>

              <section className="rounded-3xl border border-white/10 bg-white/[.04] p-4 shadow-2xl backdrop-blur sm:p-5 lg:p-6">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-lime-400">
                      Select your team
                    </p>
                    <p className="mt-1 text-sm text-white/60">
                      Currently selected: {nation.flag} {nation.name}
                    </p>
                  </div>
                  <div className="rounded-xl bg-black/30 px-3 py-2 text-xs text-white/60">
                    {nations.length} countries
                  </div>
                </div>

                <div className="max-h-[46vh] overflow-y-auto pr-1 sm:max-h-[52vh] lg:max-h-[62vh]">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {nations.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setNation(n)}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left transition ${
                          nation.id === n.id
                            ? 'border-lime-400 bg-lime-400 text-black shadow-[0_0_24px_rgba(180,255,0,.25)]'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-2xl">{n.flag}</span>
                        <span className="min-w-0 flex-1 truncate text-xs font-black uppercase sm:text-[11px]">
                          {n.name}
                        </span>
                        {nation.id === n.id && (
                          <Check className="h-4 w-4 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}

        {screen === 'quiz' && (
          <motion.div
            key={`q-${questionIndex}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="flex min-h-[calc(100vh-40px)] flex-col lg:min-h-screen lg:justify-center"
          >
            <div className="flex items-center justify-between lg:hidden">
              <div>
                <p className="text-sm font-black uppercase text-lime-400">
                  {currentQuestion.eyebrow}
                </p>
                <div className="mt-3">
                  <Hearts score={score} />
                </div>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-lime-400 text-center font-black sm:h-16 sm:w-16">
                <span>
                  28
                  <br />
                  <small className="text-[9px]">SEC</small>
                </span>
              </div>
            </div>

            <div className="grid flex-1 items-center gap-7 py-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
              <section className="rounded-3xl border border-white/10 bg-white/[.04] p-6 text-center backdrop-blur">
                <div className="hidden items-center justify-between lg:flex">
                  <div className="text-left">
                    <p className="text-sm font-black uppercase text-lime-400">
                      {currentQuestion.eyebrow}
                    </p>
                    <div className="mt-3">
                      <Hearts score={score} />
                    </div>
                  </div>
                  <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-lime-400 text-center font-black">
                    <span>
                      28
                      <br />
                      <small className="text-[9px]">SEC</small>
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-6xl drop-shadow-[0_0_30px_rgba(180,255,0,.35)] sm:text-7xl lg:mt-12 lg:text-9xl">
                  {currentQuestion.image}
                </div>
                <p className="mt-5 text-xs uppercase tracking-[.25em] text-white/40">
                  {nation.name} challenge
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black leading-tight sm:text-3xl lg:text-5xl">
                  {currentQuestion.prompt}
                </h2>
                <div className="mt-6 grid gap-3 sm:mt-8 lg:gap-4">
                  {currentQuestion.options.map((option, i) => {
                    const isCorrect = i === currentQuestion.answer;
                    const isSelected = selected === i;
                    return (
                      <button
                        key={option}
                        onClick={() => answer(i)}
                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition sm:p-5 ${
                          isSelected && isCorrect
                            ? 'border-lime-400 bg-lime-400 text-black'
                            : isSelected
                            ? 'border-red-500 bg-red-500/20'
                            : 'border-white/15 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-sm sm:text-base">
                          <b
                            className={`mr-4 ${
                              isSelected && isCorrect
                                ? 'text-black'
                                : 'text-lime-300'
                            }`}
                          >
                            {String.fromCharCode(65 + i)}
                          </b>
                          {option}
                        </span>
                        {isSelected && isCorrect && (
                          <Check className="h-5 w-5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="grid min-h-[calc(100vh-40px)] items-center gap-8 py-8 text-center lg:min-h-screen lg:grid-cols-[1fr_.8fr] lg:text-left"
          >
            <section>
              <p className="font-black uppercase italic text-white/80">
                Your football heart
              </p>
              <div className="mt-6 flex justify-center lg:justify-start">
                <Hearts score={score} glow large />
              </div>
              <h2 className="mt-7 text-5xl font-black uppercase italic leading-none sm:text-7xl lg:text-8xl">
                <span className="text-lime-400">
                  {score === 3 ? 'Ultimate' : score === 2 ? 'True' : 'Rising'}
                </span>
                <br />
                Fan!
              </h2>
              <p className="mt-5 font-bold text-lime-300">
                You scored {score} out of 3!
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-white/70 lg:mx-0">
                You unlocked a chance to win the official {nation.name} kit.
              </p>
            </section>

            <section>
              <Card className="border-orange-400/60 bg-white/5 text-white">
                <div className="flex items-center gap-4 p-4 text-left sm:p-5">
                  <Gift className="h-10 w-10 shrink-0 text-lime-400" />
                  <p>
                    You unlocked a chance to win the official{' '}
                    <b className="text-orange-400">{nation.name}</b> kit.
                  </p>
                </div>
              </Card>
              <Button
                onClick={() => setScreen('draw')}
                className="mt-5 h-12 w-full text-sm font-black uppercase sm:h-14 sm:text-base"
              >
                Enter the draw <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setScreen('share')}
                className="mt-3 h-12 w-full font-black uppercase"
              >
                Challenge your friends <Share2 className="ml-2 h-4 w-4" />
              </Button>
            </section>
          </motion.div>
        )}

        {screen === 'draw' && (
          <motion.div
            key="draw"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid min-h-[calc(100vh-40px)] items-center gap-8 py-8 lg:min-h-screen lg:grid-cols-[.85fr_1.15fr]"
          >
            <section className="text-center lg:text-left">
              <h2 className="text-3xl font-black uppercase sm:text-5xl lg:text-6xl">
                Enter the draw
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-white/80 lg:mx-0">
                Fill in your details and complete the steps below to enter.
              </p>
              <div className="mx-auto mt-7 grid h-40 w-40 place-items-center rounded-3xl bg-gradient-to-br from-orange-500 to-orange-700 text-7xl shadow-[0_0_50px_rgba(255,100,0,.25)] sm:h-48 sm:w-48 sm:text-8xl lg:mx-0">
                👕
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[.04] p-4 backdrop-blur sm:p-6">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 outline-none focus:border-lime-400"
              />
              <label className="mt-4 flex gap-3 text-sm text-white/80">
                <input type="checkbox" defaultChecked /> Yes, I want exclusive
                offers and football updates from Dundle.
              </label>
              <div className="mt-7 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-black uppercase text-lime-400">
                  To complete your entry:
                </p>
                <p className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-lime-400" /> Subscribe to
                  newsletter
                </p>
                <p className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-lime-400" /> Purchase of €50 or
                  more
                </p>
                <p className="flex items-center gap-2 text-white/40">
                  <Lock className="h-5 w-5" /> Complete purchase
                </p>
              </div>
              <Button
                disabled={!email.includes('@')}
                className="mt-5 h-12 w-full font-black uppercase sm:h-14"
              >
                Complete entry
              </Button>
            </section>
          </motion.div>
        )}

        {screen === 'share' && (
          <motion.div
            key="share"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-[calc(100vh-40px)] items-center gap-8 py-8 lg:min-h-screen lg:grid-cols-[.9fr_1.1fr]"
          >
            <section>
              <h2 className="text-3xl font-black uppercase italic text-lime-400 sm:text-5xl lg:text-6xl">
                Challenge your friends
              </h2>
              <p className="mt-2 text-white/80">Can they beat your score?</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Button className="h-12 bg-green-500 font-bold text-white hover:bg-green-400">
                  <MessageCircle className="mr-2 h-4 w-4" /> Share to WhatsApp
                </Button>
                <Button className="h-12 bg-pink-500 font-bold text-white hover:bg-pink-400">
                  IG Share to Instagram
                </Button>
                <Button className="h-12 bg-blue-600 font-bold text-white hover:bg-blue-500">
                  FB Share to Facebook
                </Button>
                <Button variant="outline" className="h-12">
                  <Copy className="mr-2 h-4 w-4" /> Copy link
                </Button>
              </div>
            </section>

            <section>
              <Card className="border-lime-400/50 bg-gradient-to-br from-white/10 to-lime-400/10 text-white shadow-[0_0_50px_rgba(180,255,0,.12)]">
                <div className="p-7 text-center sm:p-10">
                  <p className="font-black uppercase">{nation.name} fan</p>
                  <div className="mt-5 flex justify-center">
                    <Hearts score={score} glow large />
                  </div>
                  <h3 className="mt-6 text-3xl font-black uppercase text-lime-400 sm:text-5xl">
                    Ultimate Fan
                  </h3>
                  <p className="mt-2 text-sm text-white/70">DUNDLE</p>
                </div>
              </Card>
              <Button
                onClick={() => setScreen('home')}
                variant="ghost"
                className="mt-5 h-12 w-full"
              >
                Restart prototype
              </Button>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}
