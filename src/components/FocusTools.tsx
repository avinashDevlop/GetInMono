
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  Plus, 
  Check, 
  Trash2, 
  Play, 
  Pause, 
  RotateCcw,
  StickyNote,
  Timer,
  CheckSquare,
  Eye,
  EyeOff,
  Brain,
  Coffee,
  Settings
} from "lucide-react";

interface FocusToolsProps {
  focusMode: boolean;
  onToggleFocusMode: () => void;
}

export const FocusTools = ({ focusMode, onToggleFocusMode }: FocusToolsProps) => {
  const [notes, setNotes] = useState("");
  const [todos, setTodos] = useState<Array<{id: number, text: string, completed: boolean}>>([]);
  const [newTodo, setNewTodo] = useState("");
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [customPomodoroMinutes, setCustomPomodoroMinutes] = useState(25);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');
  const [showPomodoroSettings, setShowPomodoroSettings] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      if (pomodoroMode === 'work') {
        setPomodoroMode('break');
        setPomodoroTime(5 * 60);
        toast({
          title: "Work session complete!",
          description: "Take a well-deserved 5-minute break.",
        });
      } else {
        setPomodoroMode('work');
        setPomodoroTime(customPomodoroMinutes * 60);
        toast({
          title: "Break time over!",
          description: "Ready for another work session?",
        });
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroActive, pomodoroTime, pomodoroMode, customPomodoroMinutes, toast]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTask = { id: Date.now(), text: newTodo, completed: false };
      setTodos([...todos, newTask]);
      setNewTodo("");
      toast({
        title: "Task added successfully!",
        description: `"${newTodo}" has been added to your tasks.`,
      });
    }
  };

  const toggleTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    
    if (todo) {
      toast({
        title: todo.completed ? "Task reopened" : "Task completed!",
        description: `"${todo.text}" has been ${todo.completed ? 'reopened' : 'marked as complete'}.`,
      });
    }
  };

  const deleteTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    
    if (todo) {
      toast({
        title: "Task deleted successfully",
        description: `"${todo.text}" has been removed from your tasks.`,
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetPomodoro = () => {
    setPomodoroTime(customPomodoroMinutes * 60);
    setPomodoroActive(false);
    setPomodoroMode('work');
    toast({
      title: "Pomodoro timer reset",
      description: `Timer reset to ${customPomodoroMinutes} minutes.`,
    });
  };

  const updatePomodoroTime = () => {
    if (customPomodoroMinutes >= 1 && customPomodoroMinutes <= 60) {
      setPomodoroTime(customPomodoroMinutes * 60);
      setPomodoroActive(false);
      setPomodoroMode('work');
      setShowPomodoroSettings(false);
      toast({
        title: "Pomodoro time updated",
        description: `Work session set to ${customPomodoroMinutes} minutes.`,
      });
    }
  };

  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 flex items-center justify-center">
          <Brain className="h-8 w-8 mr-3 text-emerald-400" />
          Focus Control Center
        </h3>
        <p className="text-slate-300">Maximize your productivity with smart focus tools</p>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Focus Mode Toggle */}
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-lg border-emerald-500/20 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              {focusMode ? <EyeOff className="h-8 w-8 text-white" /> : <Eye className="h-8 w-8 text-white" />}
            </div>
            <h4 className="text-white font-semibold mb-2">Focus Mode</h4>
            <p className="text-slate-400 text-sm mb-4">Hide distracting apps and stay focused</p>
            <Button 
              onClick={onToggleFocusMode}
              className={focusMode 
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              }
            >
              {focusMode ? "Exit Focus" : "Enable Focus"}
            </Button>
            {focusMode && (
              <Badge className="mt-3 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                🎯 Active
              </Badge>
            )}
          </div>
        </Card>

        {/* Quick Notes */}
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-lg border-yellow-500/20 p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-3">
              <StickyNote className="h-5 w-5 text-white" />
            </div>
            <h4 className="text-white font-semibold">Quick Notes</h4>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Capture your thoughts instantly..."
            className="w-full h-28 bg-slate-800/50 border border-yellow-500/20 rounded-lg p-3 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50"
            maxLength={500}
          />
          <div className="mt-2 text-xs text-slate-400">
            {notes.length}/500 characters
          </div>
        </Card>

        {/* Enhanced Todo List */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-lg border-blue-500/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-3">
                <CheckSquare className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-white font-semibold">Tasks</h4>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {completedTodos}/{todos.length}
            </Badge>
          </div>
          
          <div className="flex gap-2 mb-4">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="bg-slate-800/50 border-blue-500/20 text-white text-sm focus:border-blue-500/50 focus:ring-blue-500/20"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <Button size="sm" onClick={addTodo} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 max-h-32 overflow-y-auto">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-2 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 group">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${
                    todo.completed 
                      ? "bg-emerald-500 border-emerald-500 scale-110" 
                      : "border-slate-500 hover:border-blue-400"
                  }`}
                >
                  {todo.completed && <Check className="h-3 w-3 text-white" />}
                </button>
                <span className={`text-sm flex-1 transition-all ${
                  todo.completed ? "text-slate-500 line-through" : "text-white"
                }`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          
          {todos.length === 0 && (
            <div className="text-center text-slate-400 text-sm py-4">
              No tasks yet. Add one above!
            </div>
          )}
        </Card>

        {/* Enhanced Editable Pomodoro Timer */}
        <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-lg border-red-500/20 p-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                {pomodoroMode === 'work' ? <Timer className="h-6 w-6 text-white" /> : <Coffee className="h-6 w-6 text-white" />}
              </div>
              <div>
                <h4 className="text-white font-semibold">Pomodoro</h4>
                <Badge className={`text-xs ${
                  pomodoroMode === 'work' 
                    ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                    : 'bg-green-500/20 text-green-400 border-green-500/30'
                }`}>
                  {pomodoroMode === 'work' ? 'Work Time' : 'Break Time'}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPomodoroSettings(!showPomodoroSettings)}
                className="ml-2 text-slate-400 hover:text-white"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            
            {showPomodoroSettings && (
              <div className="mb-4 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    type="number"
                    min="1"
                    max="60"
                    value={customPomodoroMinutes}
                    onChange={(e) => setCustomPomodoroMinutes(Number(e.target.value))}
                    className="bg-slate-700/50 border-slate-600/50 text-white text-sm w-20"
                  />
                  <span className="text-slate-300 text-sm">minutes</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={updatePomodoroTime}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
                >
                  Update Timer
                </Button>
              </div>
            )}
            
            <div className={`text-4xl font-bold mb-4 ${
              pomodoroTime <= 60 ? 'text-red-400 animate-pulse' : 'text-white'
            }`}>
              {formatTime(pomodoroTime)}
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button
                size="sm"
                onClick={() => setPomodoroActive(!pomodoroActive)}
                className={pomodoroActive 
                  ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700" 
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                }
              >
                {pomodoroActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={resetPomodoro}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
