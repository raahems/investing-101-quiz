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
  { question: "When you buy a bond, what are you actually doing?", options: ["Buying a share of ownership in a company", "Lending money to a government or company in exchange for interest", "Purchasing a claim on a company's real estate", "Speculating on a cryptocurrency's price"], answer: 1 },
  
  // Advanced Math/Concepts
  { question: "If your money doubles in 9 years, what is your approximate annual return (Rule of 72)?", options: ["6%", "7%", "8%", "9%"], answer: 2 },
  { question: "Which asset class historically has the highest long-term volatility and return potential?", options: ["Cash", "Bonds", "Equities (Stocks)", "GICs"], answer: 2 },
  { question: "What is the primary purpose of a REIT?", options: ["To hold cash", "To provide income from real estate without owning property", "To avoid all market risk", "To trade options"], answer: 1 },
  { question: "If inflation is 3% and your return is 2%, what is your real purchasing power change?", options: ["Increase", "Neutral", "Decrease", "Doubled"], answer: 2 },
  { question: "What is Survivorship Bias in investing?", options: ["Only focusing on winners while ignoring failures", "The ability to time the market perfectly", "The act of buying dips", "Holding stocks for 30 years"], answer: 0 },

  // Behavior & Market History
  { question: "Historically, what percentage of major market crashes and corrections have eventually recovered?", options: ["Around 50%", "Around 80%", "100%", "It varies too much to say"], answer: 2 },
  { question: "In a scenario where $10,000 is invested right at a market peak before a crash, which investor ends up with the most money: the one who panic-sold at the bottom, the one who held and did nothing, or the one who kept investing $200/month all the way through?", options: ["The one who panic-sold at the bottom", "The one who held and did nothing", "The one who kept investing through the crash", "They all end up equal"], answer: 2 },
  { question: "What is 'dollar-cost averaging'?", options: ["Buying only when a stock hits its lowest price of the year", "Investing a fixed amount on a regular schedule regardless of price", "Averaging the returns of your best and worst holdings", "Selling a fixed percentage every month"], answer: 1 },

  // Deeper Strategy
  { question: "What's the key difference between investing and trading?", options: ["Investing buys ownership for years to decades; trading bets on short-term price moves", "They are the same strategy, just different names", "Trading always charges lower fees", "Investing requires daily monitoring of prices"], answer: 0 },
  { question: "According to the SPIVA Canada report cited in the course, what percentage of active Canadian equity funds underperformed their benchmark over 10 years?", options: ["50%", "75%", "99.8%", "10%"], answer: 2 },
  { question: "In his 2014 letter to Berkshire shareholders, Warren Buffett recommended putting 90% of a portfolio into what?", options: ["Individual growth stocks", "A very low-cost S&P 500 index fund", "Government bonds only", "Real estate"], answer: 1 },
  // Fundamentals & Accounts
  { question: "Saving $20,000/year with 0% growth takes 50 years to reach $1,000,000. Adding a 7% annual return cuts that down to about how long?", options: ["35 years", "22 years", "10 years", "5 years"], answer: 1 },
  { question: "In the course's 'cost of waiting' example ($300/month at 7%, investing until 65), what does delaying your start by several years cost you?", options: ["Nothing, as long as you catch up later", "Only the interest on those few years, easily made back", "More than everything you will ever contribute", "Exactly what you would have contributed in those years"], answer: 2 },

  // Nominal vs. Real Return
  { question: "What is a 'nominal return'?", options: ["The stated, plain percentage growth of an investment, before adjusting for inflation", "The return after subtracting inflation", "The return after subtracting taxes", "The average return over the last 10 years"], answer: 0 },
  { question: "What is a 'real return'?", options: ["The return quoted in a fund's advertisement", "What an investment actually earned after subtracting the effect of inflation", "The nominal return plus any dividends", "The return before compounding is applied"], answer: 1 },

  // Diversification
  { question: "What is 'diversification'?", options: ["Putting all your money into the single stock you believe in most", "Spreading investments across many different assets so no single one can sink the portfolio", "Borrowing money to increase the size of one position", "Timing purchases to only buy at the exact market bottom"], answer: 1 },

  // ETF vs. Index
  { question: "What is the actual difference between an 'index' and an 'index ETF'?", options: ["They are exactly the same thing with different names", "An index is a rulebook that selects and weights companies; an ETF is the tradable fund that actually holds them", "An index can be purchased directly on an exchange, but an ETF cannot", "An index only tracks bonds, while an ETF only tracks stocks"], answer: 1 },

  // Withdrawal Rate
  { question: "What does a 'withdrawal rate' describe in retirement planning?", options: ["The interest rate a bank charges on a mortgage", "The percentage of your portfolio you withdraw and spend each year in retirement", "The tax rate applied to RRSP contributions", "The fee an ETF charges when you sell it"], answer: 1 },
  { question: "If you plan to spend $60,000/year in retirement and use a 4% withdrawal rate, what size nest egg do you need?", options: ["$600,000", "$1,000,000", "$1,500,000", "$2,400,000"], answer: 2 },

  // TFSA, RRSP & FHSA Tax Mechanics
  { question: "How are contributions to a TFSA treated when you deposit them?", options: ["They are tax-deductible, just like an RRSP", "They are made with after-tax dollars; there is no tax deduction", "They are matched dollar-for-dollar by the government", "They can only be made once per lifetime"], answer: 1 },
  { question: "How is growth taxed while money sits invested inside an RRSP?", options: ["Taxed every year like a regular non-registered account", "Tax-deferred, meaning no tax is owed while it grows", "Tax-free forever, even on withdrawal", "Taxed at a flat 50% rate annually"], answer: 1 },
  { question: "How are withdrawals from an RRSP taxed in retirement?", options: ["Completely tax-free", "Taxed as regular income in the year you withdraw", "Taxed only as a capital gain", "Taxed at a fixed 10% rate"], answer: 1 },
  { question: "Which statement correctly contrasts how a TFSA and an RRSP are taxed?", options: ["A TFSA is funded with after-tax dollars and is never taxed again; an RRSP gives a deduction going in but taxes withdrawals as income", "A TFSA taxes you on withdrawal; an RRSP is tax-free forever", "Both accounts are taxed identically at every stage", "Neither account is ever taxed at any stage"], answer: 0 },
  { question: "Of the TFSA, RRSP, and FHSA, which account can skip tax at all three moments (deposit, growth, and withdrawal) when used for its intended purpose?", options: ["TFSA", "RRSP", "FHSA, when used for an eligible first home purchase", "None of them"], answer: 2 },
  { question: "What happens to unused funds in an FHSA if you never end up buying a home?", options: ["They are forfeited entirely", "They can be transferred tax-free into an RRSP", "They must be withdrawn and fully taxed as income", "They automatically convert into a TFSA"], answer: 1 },

  // Behavior
  { question: "In behavioral investing terms, 'FOMO' typically leads an investor to do what?", options: ["Buy into a trend after it has already run up, chasing the hype", "Calmly rebalance during a downturn", "Increase their emergency fund", "Diversify more broadly across asset classes"], answer: 0 },
  { question: "What is the main danger of using leverage (borrowed money) to invest?", options: ["It guarantees a higher return", "It can turn an ordinary market drop into a much larger, sometimes total, loss", "It reduces your overall risk", "It is only available to professional investors"], answer: 1 },
  { question: "Concentrating your entire portfolio into a single stock or idea is usually driven by which behavior?", options: ["Diversification", "Ego", "Dollar-cost averaging", "Asset allocation"], answer: 1 },
  { question: "According to the course, what usually causes a portfolio to 'die', more often than bad math does?", options: ["Rising interest rates", "Investor behavior, like panic-selling or chasing trends", "Government regulation", "Currency exchange rates"], answer: 1 }
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
            <p className="text-slate-600 mt-2">Advanced {QUIZ_DATA.length}-Question Challenge</p>
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
                {score / QUIZ_DATA.length >= 0.7 ? "Excellent! You have a solid grasp of Canadian investing mechanics." :
                 score / QUIZ_DATA.length >= 0.45 ? "Good work! Keep reviewing the glossary to master the concepts." :
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
