import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Award, BarChart3, Calculator, TrendingUp } from 'lucide-react';

const QUIZ_DATA = [
  // Core Concepts
  { question: "Wealth is calculated as Savings × Return × Time. Which variable is your most powerful unfair advantage?", options: ["Savings", "Return", "Time", "All are equal"], answer: 2 },
  { question: "If an investment earns a 6% annual return, how many years does it take to double (Rule of 72)?", options: ["6 years", "12 years", "18 years", "72 years"], answer: 1 },
  { question: "What does the '4% Rule' estimate for a retirement nest egg?", options: ["The tax rate on withdrawals", "A safe annual withdrawal rate for longevity", "The expected inflation rate", "The management fee cap"], answer: 1 },
  { question: "Which term describes a portfolio that offers the highest expected return for a given level of risk?", options: ["Bear Market", "Efficient Frontier", "Market Correction", "Fee Drag"], answer: 1 },
  { question: "If you have a $1,000,000 portfolio, according to the 4% Rule, how much should you withdraw in year one?", options: ["$4,000", "$10,000", "$40,000", "$100,000"], answer: 2 },
  
  // Account Specifics
  { question: "What is the lifetime contribution limit for the First Home Savings Account (FHSA)?", options: ["$8,000", "$20,000", "$40,000", "$50,000"], answer: 2 },
  { question: "In a TFSA, what happens to the room you created by withdrawing money?", options: ["It is gone forever", "It is added back on Jan 1st of the next year", "It must be reported to the CRA", "It reduces your RRSP room"], answer: 1 },
  { question: "RRSP contributions are best made during which phase of your career?", options: ["When income is lowest", "During your peak earning years", "Only when you are retired", "Never"], answer: 1 },
  { question: "What tax treatment do FHSA withdrawals receive for a qualifying home purchase?", options: ["Fully taxed", "Tax-free", "Taxed as capital gains", "Only principal is tax-free"], answer: 1 },
  { question: "Which account is best for 100% tax-free growth for life?", options: ["RRSP", "Corporate Account", "TFSA", "Non-registered account"], answer: 2 },
  
  // Strategy & Market
  { question: "What is the primary difference between a Passive Index ETF and an Active Mutual Fund?", options: ["Index ETFs are only for stocks", "Active funds charge much higher fees", "Active funds always perform better", "Index ETFs require daily trading"], answer: 1 },
  { question: "What is 'Fee Drag'?", options: ["The cost of buying a house", "The negative impact of high MER fees on compounding", "A tax on trading crypto", "The fee to open a TFSA"], answer: 1 },
  { question: "What is a 'Market Correction'?", options: ["A price drop of 10%+", "A price drop of 50%+", "The end of the stock market", "A change in tax law"], answer: 0 },
  { question: "Why is 'Time' the most important variable in the wealth formula?", options: ["It allows for compound growth to become exponential", "It prevents market crashes", "It eliminates inflation", "It guarantees stock picks"], answer: 0 },
  { question: "What does a Bond represent in your portfolio?", options: ["A share of a company", "A loan you make to a government or corp", "A derivative of crypto", "A real estate rental contract"], answer: 1 },
  
  // Advanced Math/Concepts
  { question: "If your money doubles in 9 years, what is your approximate annual return (Rule of 72)?", options: ["6%", "7%", "8%", "9%"], answer: 2 },
  { question: "Which asset class historically has the highest long-term volatility and return potential?", options: ["Cash", "Bonds", "Equities (Stocks)", "GICs"], answer: 2 },
  { question: "What is the primary purpose of a REIT?", options: ["To hold cash", "To provide income from real estate without owning property", "To avoid all market risk", "To trade options"], answer: 1 },
  { question: "If inflation is 3% and your return is 2%, what is your real purchasing power change?", options: ["Increase", "Neutral", "Decrease", "Doubled"], answer: 2 },
  { question: "What is Survivorship Bias in investing?", options: ["Only focusing on winners while ignoring failures", "The ability to time the market perfectly", "The act of buying dips", "Holding stocks for 30 years"], answer: 0 }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === QUIZ_DATA[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < QUIZ_DATA.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="min-h-screen bg-[#F2EFE8] flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-2xl bg-white border-2 border-slate-800 shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] p-8">
        
        <div className="mb-8 border-b-2 border-slate-800 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight text-[#D35400]">Investing 101</h1>
            <p className="text-slate-600 mt-2">Advanced 20-Question Challenge</p>
          </div>
          <TrendingUp className="text-[#D35400]" size={40} />
        </div>

        {!showResult ? (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <span className="text-sm font-bold uppercase tracking-widest text-[#D35400]">
                Question {currentQuestion + 1} of {QUIZ_DATA.length}
              </span>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#D35400] transition-all duration-300" 
                  style={{ width: `${((currentQuestion + 1) / QUIZ_DATA.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-xl font-medium mb-6">{QUIZ_DATA[currentQuestion].question}</h2>

            <div className="space-y-3">
              {QUIZ_DATA[currentQuestion].options.map((option, index) => {
                let buttonStyle = "w-full text-left p-4 border-2 border-slate-200 hover:border-[#D35400] transition-all ";
                
                if (isAnswered) {
                  if (index === QUIZ_DATA[currentQuestion].answer) {
                    buttonStyle += "bg-green-100 border-green-600 text-green-800";
                  } else if (index === selectedOption) {
                    buttonStyle += "bg-red-100 border-red-600 text-red-800";
                  } else {
                    buttonStyle += "opacity-50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={buttonStyle}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <button
                onClick={nextQuestion}
                className="mt-8 flex items-center gap-2 bg-[#D35400] text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors w-full justify-center"
              >
                {currentQuestion + 1 === QUIZ_DATA.length ? "See Results" : "Next Question"}
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award size={64} className="mx-auto text-[#D35400] mb-4" />
            <h2 className="text-3xl font-bold mb-2">Results</h2>
            <div className="text-6xl font-black text-slate-800 my-4">
              {Math.round((score / QUIZ_DATA.length) * 100)}%
            </div>
            <p className="text-xl mb-6">You scored {score} out of {QUIZ_DATA.length}</p>
            
            <div className="bg-slate-50 p-4 border border-slate-200 mb-8 text-left rounded">
              <p className="font-bold mb-2 flex items-center gap-2">
                <BarChart3 size={18} /> Quick Feedback:
              </p>
              <p className="text-slate-600">
                {score >= 15 ? "Excellent! You have a solid grasp of Canadian investing mechanics." : 
                 score >= 10 ? "Good work! Keep reviewing the glossary to master the concepts." : 
                 "Keep studying! Understanding these mechanics is the key to long-term wealth."}
              </p>
            </div>

            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 mx-auto bg-slate-800 text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-[#D35400] transition-colors"
            >
              <RotateCcw size={18} />
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
