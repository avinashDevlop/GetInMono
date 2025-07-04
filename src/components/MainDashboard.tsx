import { useState, useEffect, useCallback } from "react";
import { 
  Lightbulb, 
  ClipboardList, 
  Edit, 
  TimerReset, 
  Play, 
  Pause,
  BarChart2,
  Eye,
  Check,
  Trash2,
  AlarmClock,
  Settings,
  X
} from "lucide-react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  autoStartNext: boolean;
}

export const MainDashboard = () => {
  const [focusMode, setFocusMode] = useState(false);
  const [note, setNote] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [pomodoroPhase, setPomodoroPhase] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [workCount, setWorkCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<PomodoroSettings>({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    autoStartNext: false
  });
  const [tempSettings, setTempSettings] = useState<PomodoroSettings>({...settings});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const validateSettings = (values: PomodoroSettings) => {
    const newErrors: Record<string, string> = {};
    
    if (!values.workDuration || values.workDuration < 1 || values.workDuration > 60) {
      newErrors.workDuration = "Must be between 1-60 minutes";
    }
    
    if (!values.shortBreakDuration || values.shortBreakDuration < 1 || values.shortBreakDuration > 30) {
      newErrors.shortBreakDuration = "Must be between 1-30 minutes";
    }
    
    if (!values.longBreakDuration || values.longBreakDuration < 1 || values.longBreakDuration > 60) {
      newErrors.longBreakDuration = "Must be between 1-60 minutes";
    }
    
    if (!values.longBreakInterval || values.longBreakInterval < 1 || values.longBreakInterval > 10) {
      newErrors.longBreakInterval = "Must be between 1-10 sessions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([
        ...tasks,
        {
          id: generateId(),
          text: taskInput.trim(),
          completed: false
        }
      ]);
      setTaskInput("");
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const notifyPhaseChange = (phase: 'work' | 'shortBreak' | 'longBreak') => {
    let message = "";
    if (phase === 'work') {
      message = "Time to focus! Work session started";
    } else if (phase === 'shortBreak') {
      message = "Take a short break! You've earned it";
    } else {
      message = "Take a long break! Relax and recharge";
    }
      
    toast.info(
      <div className="flex items-center gap-2">
        <AlarmClock className="w-5 h-5" />
        <span>{message}</span>
      </div>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  const saveSettings = () => {
    if (validateSettings(tempSettings)) {
      setSettings(tempSettings);
      setShowSettings(false);
      
      if (!isPomodoroRunning) {
        setPomodoroTime(tempSettings.workDuration * 60);
        setPomodoroPhase('work');
        setWorkCount(0);
      }
    }
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTempSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value === "" ? "" : parseInt(value) || 0
    }));
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      e.target.value = "";
      setTempSettings(prev => ({
        ...prev,
        [e.target.name]: ""
      }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 1;
    
    setTempSettings(prev => ({
      ...prev,
      [name]: numValue
    }));
  };

  const openSettings = () => {
    setTempSettings({...settings});
    setErrors({});
    setShowSettings(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isPomodoroRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prevTime) => {
          if (prevTime <= 1) {
            let nextPhase: 'work' | 'shortBreak' | 'longBreak';
            let nextTime: number;
            
            if (pomodoroPhase === 'work') {
              const shouldTakeLongBreak = (workCount + 1) % settings.longBreakInterval === 0;
              nextPhase = shouldTakeLongBreak ? 'longBreak' : 'shortBreak';
              nextTime = shouldTakeLongBreak 
                ? settings.longBreakDuration * 60 
                : settings.shortBreakDuration * 60;
              
              setWorkCount(prev => prev + 1);
            } else {
              nextPhase = 'work';
              nextTime = settings.workDuration * 60;
            }

            notifyPhaseChange(nextPhase);

            setTimeout(() => {
              setPomodoroPhase(nextPhase);
              setPomodoroTime(nextTime);
              if (settings.autoStartNext) {
                setIsPomodoroRunning(true);
              } else {
                setIsPomodoroRunning(false);
              }
            }, 100);
            
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPomodoroRunning, pomodoroTime, pomodoroPhase, workCount, settings]);

  const togglePomodoro = useCallback(() => {
    setIsPomodoroRunning(!isPomodoroRunning);
  }, [isPomodoroRunning]);

  const resetPomodoro = useCallback(() => {
    setIsPomodoroRunning(false);
    setPomodoroPhase('work');
    setPomodoroTime(settings.workDuration * 60);
    setWorkCount(0);
  }, [settings.workDuration]);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-12 min-h-screen bg-gradient-to-br from-slate-900 to-gray-950 text-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-white mb-10">
          Your Productivity Tools
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FocusModeCard 
            focusMode={focusMode} 
            onToggle={() => setFocusMode(!focusMode)} 
          />

          <QuickNotesCard 
            note={note} 
            setNote={setNote} 
          />

          <TasksCard 
            taskInput={taskInput}
            setTaskInput={setTaskInput}
            tasks={tasks}
            onAddTask={addTask}
            onToggleTask={toggleTaskCompletion}
            onDeleteTask={deleteTask}
          />

          <PomodoroCard 
            time={formatTime(pomodoroTime)}
            isRunning={isPomodoroRunning}
            phase={pomodoroPhase}
            workCount={workCount}
            onToggle={togglePomodoro}
            onReset={resetPomodoro}
            onSettingsClick={openSettings}
            settings={settings}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-md border border-slate-700/50">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-5">
              <BarChart2 className="w-5 h-5 text-blue-400" />
              Quick Stats
            </h3>
            <div className="space-y-3 text-sm">
              <StatRow 
                label="Work Sessions" 
                value={workCount.toString()} 
                valueColor="text-blue-400" 
              />
              <StatRow 
                label="Current Phase" 
                value={
                  pomodoroPhase === 'work' ? "Work" : 
                  pomodoroPhase === 'shortBreak' ? "Short Break" : "Long Break"
                } 
                valueColor={
                  pomodoroPhase === 'work' ? "text-rose-400" : 
                  pomodoroPhase === 'shortBreak' ? "text-green-400" : "text-teal-400"
                } 
              />
              <StatRow 
                label="Next Phase" 
                value={
                  pomodoroPhase === 'work' ? 
                    ((workCount + 1) % settings.longBreakInterval === 0 ? "Long Break" : "Short Break") : 
                    "Work"
                } 
                valueColor="text-amber-400" 
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0a0c2a] via-[#140e34] to-[#0a0c2a] rounded-xl p-6 text-white shadow-md border border-violet-700/30">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-violet-400" />
              Pro Tip
            </h3>
            <p className="text-sm text-slate-300">
              {workCount % settings.longBreakInterval === 0 && workCount > 0 ? 
                `After ${settings.longBreakInterval} work sessions, take a ${settings.longBreakDuration} minute break!` : 
                `Follow the Pomodoro technique: ${settings.workDuration} minutes work, ${settings.shortBreakDuration} minutes break. Repeat ${settings.longBreakInterval} times then take a ${settings.longBreakDuration} minute break.`}
            </p>
          </div>
        </div>

        {focusMode && (
          <div className="mt-10 bg-gradient-to-r from-slate-800 via-green-900 to-slate-800 text-green-200 p-6 rounded-xl text-center shadow-lg shadow-green-500/10">
            <div className="text-2xl mb-2">🎯 Focus Mode Enabled</div>
            <p>Distractions hidden. Use your time wisely!</p>
          </div>
        )}
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Pomodoro Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Work Duration (minutes)
                </label>
                <input
                  type="number"
                  name="workDuration"
                  min="1"
                  max="60"
                  value={tempSettings.workDuration === 0 ? "" : tempSettings.workDuration}
                  onChange={handleSettingsChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.workDuration && (
                  <p className="text-red-400 text-xs mt-1">{errors.workDuration}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Short Break Duration (minutes)
                </label>
                <input
                  type="number"
                  name="shortBreakDuration"
                  min="1"
                  max="30"
                  value={tempSettings.shortBreakDuration === 0 ? "" : tempSettings.shortBreakDuration}
                  onChange={handleSettingsChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.shortBreakDuration && (
                  <p className="text-red-400 text-xs mt-1">{errors.shortBreakDuration}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Long Break Duration (minutes)
                </label>
                <input
                  type="number"
                  name="longBreakDuration"
                  min="1"
                  max="60"
                  value={tempSettings.longBreakDuration === 0 ? "" : tempSettings.longBreakDuration}
                  onChange={handleSettingsChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.longBreakDuration && (
                  <p className="text-red-400 text-xs mt-1">{errors.longBreakDuration}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Long Break Interval (work sessions)
                </label>
                <input
                  type="number"
                  name="longBreakInterval"
                  min="1"
                  max="10"
                  value={tempSettings.longBreakInterval === 0 ? "" : tempSettings.longBreakInterval}
                  onChange={handleSettingsChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.longBreakInterval && (
                  <p className="text-red-400 text-xs mt-1">{errors.longBreakInterval}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoStartNext"
                  name="autoStartNext"
                  checked={tempSettings.autoStartNext}
                  onChange={handleSettingsChange}
                  className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="autoStartNext" className="text-sm text-slate-300">
                  Auto-start next session
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveSettings}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
                disabled={Object.keys(errors).length > 0}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

interface FocusModeCardProps {
  focusMode: boolean;
  onToggle: () => void;
}

const FocusModeCard = ({ focusMode, onToggle }: FocusModeCardProps) => (
  <div className={`rounded-xl p-5 sm:p-6 shadow-md flex flex-col justify-between transition-all duration-300 ${
    focusMode ? "bg-teal-600 text-white" : "bg-teal-100"
  }`}>
    <div className="flex flex-col items-center text-center">
      <div className={`${
        focusMode ? "bg-teal-800 text-teal-200" : "bg-teal-600 text-white"
      } w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
        <Eye className="w-5 h-5" />
      </div>
      <h2 className="font-bold text-lg">Focus Mode</h2>
      <p className={`mt-1 text-sm ${
        focusMode ? "text-teal-100" : "text-slate-700"
      }`}>
        {focusMode ? "Distractions hidden" : "Hide distracting apps"}
      </p>
    </div>
    <button
      onClick={onToggle}
      className={`mt-6 font-medium py-2 px-4 rounded-lg transition-colors ${
        focusMode 
          ? "bg-white text-teal-600 hover:bg-teal-50" 
          : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90"
      }`}
    >
      {focusMode ? "Disable Focus" : "Enable Focus"}
    </button>
  </div>
);

interface QuickNotesCardProps {
  note: string;
  setNote: (val: string) => void;
}

const QuickNotesCard = ({ note, setNote }: QuickNotesCardProps) => (
  <div className="bg-yellow-50 rounded-xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
    <div>
      <h2 className="text-orange-600 font-bold text-lg flex items-center gap-2 mb-3">
        <Edit className="w-5 h-5" />
        Quick Notes
      </h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={500}
        placeholder="Capture your thoughts instantly..."
        className="w-full h-28 p-3 border border-yellow-300 rounded-md text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
      />
      <div className="flex justify-between items-center mt-1">
        <p className="text-sm text-slate-600">{note.length}/500 characters</p>
        {note.length > 0 && (
          <button 
            onClick={() => setNote("")}
            className="text-xs text-orange-600 hover:text-orange-800"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  </div>
);

interface TasksCardProps {
  taskInput: string;
  setTaskInput: (val: string) => void;
  tasks: Task[];
  onAddTask: () => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TasksCard = ({
  taskInput,
  setTaskInput,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask
}: TasksCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAddTask();
    }
  };

  return (
    <div className="bg-blue-50 rounded-xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-blue-600 font-bold text-lg flex items-center gap-2 mb-3">
          <ClipboardList className="w-5 h-5" />
          Tasks
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className="flex-1 p-2 rounded-md border border-blue-300 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={onAddTask}
            disabled={!taskInput.trim()}
            className={`bg-indigo-500 text-white px-3 py-2 rounded-md transition-opacity ${
              !taskInput.trim() ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            +
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {tasks.length === 0 ? (
            <li className="text-slate-500 italic text-sm py-2">
              No tasks yet. Add one above!
            </li>
          ) : (
            tasks.map((task) => (
              <li 
                key={task.id} 
                className="flex items-center justify-between group"
              >
                <div className="flex items-center">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`w-5 h-5 rounded mr-3 flex items-center justify-center transition-colors ${
                      task.completed 
                        ? "bg-green-500 text-white" 
                        : "border border-blue-400 hover:border-blue-600"
                    }`}
                  >
                    {task.completed && <Check className="w-3 h-3" />}
                  </button>
                  <span className={`${
                    task.completed ? "line-through text-slate-500" : "text-slate-700"
                  }`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-70 text-slate-500 hover:text-red-500 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

interface PomodoroCardProps {
  time: string;
  isRunning: boolean;
  phase: 'work' | 'shortBreak' | 'longBreak';
  workCount: number;
  onToggle: () => void;
  onReset: () => void;
  onSettingsClick: () => void;
  settings: PomodoroSettings;
}

const PomodoroCard = ({ 
  time, 
  isRunning, 
  phase, 
  workCount, 
  onToggle, 
  onReset,
  onSettingsClick,
  settings
}: PomodoroCardProps) => {
  const phaseConfig = {
    work: {
      label: "Work Time",
      bgColor: "bg-rose-100",
      textColor: "text-rose-600",
      cardBg: "bg-rose-50",
      timeColor: "text-rose-500",
      buttonColor: "bg-rose-500 hover:bg-rose-600",
      nextLabel: `Next: ${settings.shortBreakDuration}:00 ${(workCount + 1) % settings.longBreakInterval === 0 ? "Long" : "Short"} Break`
    },
    shortBreak: {
      label: "Short Break",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      cardBg: "bg-green-50",
      timeColor: "text-green-500",
      buttonColor: "bg-green-500 hover:bg-green-600",
      nextLabel: `Next: ${settings.workDuration}:00 Work`
    },
    longBreak: {
      label: "Long Break",
      bgColor: "bg-teal-100",
      textColor: "text-teal-600",
      cardBg: "bg-teal-50",
      timeColor: "text-teal-500",
      buttonColor: "bg-teal-500 hover:bg-teal-600",
      nextLabel: `Next: ${settings.workDuration}:00 Work`
    }
  };

  const currentPhase = phaseConfig[phase];

  return (
    <div className={`rounded-xl p-5 sm:p-6 shadow-md flex flex-col justify-between ${currentPhase.cardBg}`}>
      <div className="text-center">
        <div className="flex justify-between items-start mb-1">
          <h2 className={`${currentPhase.timeColor} font-bold text-lg flex items-center gap-2`}>
            <TimerReset className="w-5 h-5" />
            Pomodoro
          </h2>
          <button 
            onClick={onSettingsClick}
            className="text-slate-500 hover:text-slate-700 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
        <div className={`${currentPhase.bgColor} ${currentPhase.textColor} px-3 py-1 rounded-full text-sm font-medium mb-1`}>
          {currentPhase.label}
        </div>
        <div className="text-xs text-slate-500 mb-2">
          Session {workCount + (phase === 'work' ? 1 : 0)} of {settings.longBreakInterval}
        </div>
        <div className={`text-4xl font-extrabold ${currentPhase.timeColor} mt-2 font-mono`}>
          {time}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button 
            onClick={onToggle}
            className={`p-3 rounded-full transition-all ${
              isRunning 
                ? "bg-amber-500 hover:bg-amber-600" 
                : currentPhase.buttonColor
            } text-white shadow-md flex items-center justify-center`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button 
            onClick={onReset}
            className="p-3 rounded-full bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors shadow-md"
          >
            ↺
          </button>
        </div>
        <div className="mt-4 text-xs text-slate-500">
          {currentPhase.nextLabel}
        </div>
      </div>
    </div>
  );
};

interface StatRowProps {
  label: string;
  value: string;
  valueColor: string;
}

const StatRow = ({ label, value, valueColor }: StatRowProps) => (
  <div className="flex justify-between items-center">
    <span className="text-slate-300">{label}</span>
    <span className={`font-semibold ${valueColor}`}>{value}</span>
  </div>
);