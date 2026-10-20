import { useState, type FormEvent } from 'react'
import { Activity, Apple, Bell, CalendarDays, Check, ChevronDown, Dumbbell, Flame, HeartPulse, Home, Menu, Plus, Search, Settings, Sparkles, Target, TrendingUp, UserRound, Zap } from 'lucide-react'

type Page = 'Overview' | 'Workouts' | 'Nutrition' | 'Progress' | 'AI Coach' | 'Profile'
type Workout = { name: string; desc: string; time: string }
const initialWorkouts: Workout[] = [
  { name: 'Upper body strength', desc: 'Chest, shoulders & triceps', time: '45 min' },
  { name: 'Zone 2 cardio', desc: 'Steady-state conditioning', time: '20 min' },
  { name: 'Mobility & stretch', desc: 'Hips, back & shoulders', time: '10 min' },
]

export default function App() {
  const [page, setPage] = useState<Page>('Overview')
  const [done, setDone] = useState<boolean[]>([true, false, false])
  const [water, setWater] = useState(4)
  const [weight, setWeight] = useState('81.4')
  const [goal, setGoal] = useState('75')
  const [newWorkout, setNewWorkout] = useState('')
  const [items, setItems] = useState<Workout[]>(initialWorkouts)
  const [chat, setChat] = useState('')
  const [reply, setReply] = useState('Welcome to your training corner. Ask about workout structure, recovery, or building consistent habits. This demo provides general guidance only.')
  const [mobile, setMobile] = useState(false)
  const complete = done.filter(Boolean).length
  const nav = [
    { name: 'Overview' as Page, icon: Home }, { name: 'Workouts' as Page, icon: Dumbbell },
    { name: 'Nutrition' as Page, icon: Apple }, { name: 'Progress' as Page, icon: TrendingUp },
    { name: 'AI Coach' as Page, icon: Sparkles }, { name: 'Profile' as Page, icon: UserRound },
  ]
  const addWorkout = () => {
    if (!newWorkout.trim()) return
    setItems([...items, { name: newWorkout.trim(), desc: 'Custom session · Make it count', time: '30 min' }])
    setDone([...done, false])
    setNewWorkout('')
  }
  const askCoach = (e: FormEvent) => {
    e.preventDefault()
    if (!chat.trim()) return
    setReply(`Coach note: ${chat}. Keep the next step realistic: warm up, use controlled reps, log your effort, and adjust if you feel pain. For personal medical advice, consult a qualified professional.`)
    setChat('')
  }
  return <div className="app">
    <aside className={`sidebar ${mobile ? 'opened' : ''}`}>
      <div className="brand"><span className="brandmark"><Zap fill="currentColor" /></span><div><b>fitforge<span>.ai</span></b><small>YOUR FITNESS OS</small></div></div>
      <div className="navlabel">WORKSPACE</div>
      <nav>{nav.map(({ name, icon: Icon }) => <button key={name} className={`navitem ${page === name ? 'selected' : ''}`} onClick={() => { setPage(name); setMobile(false) }}><Icon size={18} />{name}{name === 'AI Coach' && <i>AI</i>}</button>)}</nav>
      <div className="sidebottom">
        <div className="upgrade"><Sparkles size={18} /><b>Unlock your potential</b><p>Your next level starts with a plan.</p><button onClick={() => setPage('AI Coach')}>Meet your AI coach ↗</button></div>
        <button className="navitem" onClick={() => setPage('Profile')}><Settings size={18} />Settings</button>
        <div className="user"><span>P</span><div><b>Your profile</b><small>Free plan</small></div></div>
      </div>
    </aside>
    {mobile && <button className="scrim" aria-label="Close menu" onClick={() => setMobile(false)} />}
    <main>
      <header><button className="menu" aria-label="Open menu" onClick={() => setMobile(!mobile)}><Menu /></button><div className="crumb">Workspace <span>/</span> <b>{page}</b></div><div className="topright"><div className="search"><Search size={15} /><input aria-label="Search" placeholder="Search your fitness space" /></div><button className="bell" aria-label="Notifications"><Bell size={18} /></button><span className="userdot">P</span></div></header>
      <div className="content">
        <div className="heading"><div><div className="eyebrow"><i /> YOUR PERSONAL FITNESS COMMAND CENTER</div><h1>{page === 'Overview' ? 'Build a stronger you.' : page === 'AI Coach' ? 'Your coach, always on.' : `Let’s work on ${page.toLowerCase()}.`}</h1><p>Small wins compound. Here’s your momentum today.</p></div><span className="date"><CalendarDays size={15} /> Today <ChevronDown size={14} /></span></div>
        {page === 'Overview' && <>
          <section className="hero"><div><span className="tag"><Sparkles size={13} /> YOUR DAILY BRIEFING</span><h2>Consistency looks<br />good on you.</h2><p>You’ve completed <b>{complete} of {items.length}</b> planned sessions. Keep your streak alive — the work you do today builds the body you want tomorrow.</p><button className="primary" onClick={() => setPage('Workouts')}>Continue today’s plan ↗</button><div className="herometa"><span><Flame size={14} /> 6 day streak</span><span><Target size={14} /> Goal in sight</span></div></div><div className="heroart"><div className="orbit one" /><div className="orbit two" /><div className="dumbbell"><Dumbbell size={58} /></div><div className="float top"><Flame size={16} /><b>428 <small>kcal burned</small></b></div><div className="float bottom"><TrendingUp size={16} /><b>+12.8% <small>this month</small></b></div></div></section>
          <div className="stats"><Stat icon={<Activity />} label="Daily activity" value="7,842" unit="steps" /><Stat icon={<Flame />} label="Calories burned" value="428" unit="kcal" /><Stat icon={<HeartPulse />} label="Current weight" value={weight} unit="kg" /><Stat icon={<Target />} label="Daily goal" value={`${Math.round(complete / Math.max(items.length, 1) * 100)}%`} unit="complete" /></div>
          <div className="columns"><section className="panel"><div className="secthead"><div><small>STAY ON TRACK</small><h3>Today’s training</h3></div><button className="link" onClick={() => setPage('Workouts')}>View plan →</button></div><div className="progresslabel"><span>Daily completion</span><b>{Math.round(complete / Math.max(items.length, 1) * 100)}%</b></div><div className="track"><span style={{ width: `${complete / Math.max(items.length, 1) * 100}%` }} /></div>{items.map((w, i) => <div className="task" key={`${w.name}-${i}`}><button className={`check ${done[i] ? 'checked' : ''}`} aria-label={`Toggle ${w.name}`} onClick={() => setDone(done.map((x, j) => i === j ? !x : x))}><Check size={14} /></button><span className="taskicon"><Dumbbell size={17} /></span><div className="taskcopy"><b>{w.name}</b><small>{w.desc}</small></div><small className="time">{w.time}</small></div>)}<div className="addrow"><input value={newWorkout} onChange={e => setNewWorkout(e.target.value)} placeholder="Add a workout…" onKeyDown={e => e.key === 'Enter' && addWorkout()} /><button onClick={addWorkout}><Plus size={16} /> Add</button></div></section>
          <section className="panel"><div className="secthead"><div><small>THE BIG PICTURE</small><h3>Progress snapshot</h3></div><span className="pill">7 days</span></div><div className="weight"><strong>{weight}<small> kg</small></strong><span>Sample trend</span></div><div className="mini-chart">{[72, 64, 68, 53, 47, 37, 29].map((h, i) => <div key={i}><span style={{ height: `${h}%` }} /><small>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</small></div>)}</div><div className="goalrow"><span>Target weight</span><b>{goal} kg</b></div><div className="track"><span style={{ width: '63%' }} /></div><button className="wide" onClick={() => setPage('Progress')}>View full analytics <span>→</span></button></section></div>
          <div className="bottomgrid"><section className="panel"><div className="secthead"><div><small>FUEL YOUR GOALS</small><h3>Nutrition snapshot</h3></div><Apple size={18} /></div><div className="calories"><div><small>Calories consumed</small><b>1,850 <small>/ 2,200 kcal</small></b></div><div className="ring"><b>84<small>%</small></b></div></div>{[['Protein', '141g', '160g', 88], ['Carbs', '188g', '230g', 82], ['Fats', '54g', '70g', 77]].map(m => <div className="macro" key={m[0]}><div><span>{m[0]}</span><b>{m[1]} <small>/ {m[2]}</small></b></div><div className="track"><span style={{ width: `${m[3]}%` }} /></div></div>)}<button className="wide" onClick={() => setPage('Nutrition')}>Open food diary →</button></section>
          <section className="panel"><div className="secthead"><div><small>RECOVER BETTER</small><h3>Hydration</h3></div><span className="watericon">◉</span></div><div className="watercount"><b>{water * 250}<small> ml</small></b><span>of 2,500 ml daily goal</span></div><div className="glasses">{Array.from({ length: 10 }, (_, i) => <button key={i} className={i < water ? 'filled' : ''} onClick={() => setWater(i + 1)} aria-label={`Set water to ${i + 1} glasses`}><span /></button>)}</div><div className="waterfoot"><span>{water * 10}% of daily goal</span><button onClick={() => setWater(Math.min(10, water + 1))}><Plus size={13} /> Add glass</button></div></section>
          <section className="panel coachcard"><Sparkles size={22} /><small>SMARTER TRAINING STARTS HERE</small><h3>Meet your AI coach.</h3><p>Practical guidance for training, nutrition, recovery and consistency.</p><button className="primary" onClick={() => setPage('AI Coach')}>Ask your coach ↗</button></section></div>
        </>}
        {page === 'Workouts' && <section className="panel standalone"><div className="secthead"><div><small>YOUR PLAN</small><h3>Workout checklist</h3></div><Dumbbell /></div><p className="sub">Check off sessions as you finish. Consistency beats perfection.</p>{items.map((w, i) => <div className="task" key={`${w.name}-${i}`}><button className={`check ${done[i] ? 'checked' : ''}`} onClick={() => setDone(done.map((x, j) => i === j ? !x : x))}><Check size={14} /></button><span className="taskicon"><Dumbbell size={17} /></span><div className="taskcopy"><b>{w.name}</b><small>{w.desc}</small></div><small className="time">{w.time}</small></div>)}<div className="tip"><Sparkles size={17} /> Warm up for 5–10 minutes and use a weight you can control with good form.</div></section>}
        {page === 'Nutrition' && <section className="panel standalone"><div className="secthead"><div><small>TODAY’S FUEL</small><h3>Food diary preview</h3></div><Apple /></div><p className="sub">Sample meal data — edit to match your actual intake.</p>{[['Breakfast', 'Greek yogurt, oats & berries', '420 kcal', '32g protein'], ['Lunch', 'Chicken, rice & vegetables', '610 kcal', '48g protein'], ['Snack', 'Banana & whey shake', '280 kcal', '27g protein'], ['Dinner', 'Paneer bowl with quinoa', '540 kcal', '34g protein']].map(m => <div className="meal" key={m[0]}><span><Apple /></span><div><b>{m[0]}</b><small>{m[1]}</small></div><div><b>{m[2]}</b><small>{m[3]}</small></div></div>)}<div className="tip">These are illustrative values, not a personalized diet prescription.</div></section>}
        {page === 'Progress' && <section className="panel standalone"><div className="secthead"><div><small>YOUR DATA</small><h3>Progress & milestones</h3></div><TrendingUp /></div><div className="weight"><strong>{weight} kg</strong><span>Target: {goal} kg</span></div><div className="mini-chart large">{[72, 64, 68, 53, 47, 37, 29].map((h, i) => <div key={i}><span style={{ height: `${h}%` }} /><small>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</small></div>)}</div><p className="sub">Chart values are sample data for the UI preview. Add real measurements to track your actual progress.</p></section>}
        {page === 'AI Coach' && <section className="panel standalone coachchat"><div className="coachhead"><span><Sparkles /></span><div><b>Forge AI Coach</b><small>General guidance · Demo mode</small></div><i>DEMO</i></div><div className="message"><b>Your coach</b><p>{reply}</p></div><div className="suggestions">{['Help me plan a workout', 'How can I improve recovery?', 'Explain protein goals'].map(s => <button key={s} onClick={() => setChat(s)}>{s}</button>)}</div><form className="chatinput" onSubmit={askCoach}><input value={chat} onChange={e => setChat(e.target.value)} placeholder="Ask about workouts, nutrition or recovery…" /><button className="primary">Ask ↗</button></form><p className="sub">No external AI service is connected yet. This is a local interactive demo.</p></section>}
        {page === 'Profile' && <section className="panel standalone profile"><div className="secthead"><div><small>YOUR BASELINE</small><h3>Fitness profile</h3></div><UserRound /></div><p className="sub">Local demo settings — sign-in and database syncing will be added later.</p><label>Current weight (kg)<input type="number" value={weight} onChange={e => setWeight(e.target.value)} /></label><label>Target weight (kg)<input type="number" value={goal} onChange={e => setGoal(e.target.value)} /></label><button className="primary" onClick={() => setPage('Overview')}>Save profile locally ✓</button></section>}
        <footer><span>© 2026 FitForge AI</span><span>● Built for progress, not perfection.</span><button onClick={() => setPage('Profile')}>Profile & settings</button></footer>
      </div>
    </main>
  </div>
}
function Stat({ icon, label, value, unit }: { icon: React.ReactNode; label: string; value: string; unit: string }) {
  return <div className="panel stat"><span>{icon}</span><small>{label}</small><b>{value}<i> {unit}</i></b><em>↗ Demo metric</em></div>
}
