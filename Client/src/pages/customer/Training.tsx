import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, CheckCircle, Clock, Award, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockTrainingModules } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Training = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const completedModules = mockTrainingModules.filter((m) => m.completed).length;
  const totalProgress = Math.round(
    mockTrainingModules.reduce((sum, m) => sum + m.progress, 0) / mockTrainingModules.length
  );

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Training Modules</h1>
            <p className="text-muted-foreground mt-1">
              Learn trading fundamentals and advanced strategies
            </p>
          </div>
          <Badge variant="outline" className="w-fit border-primary/30 text-primary bg-primary/10">
            <Award className="w-4 h-4 mr-2" />
            {completedModules} of {mockTrainingModules.length} completed
          </Badge>
        </div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card className="trading-card-highlight">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Your Learning Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete all modules to become a certified trader
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary tabular-nums">{totalProgress}%</p>
                    <p className="text-sm text-muted-foreground">Overall</p>
                  </div>
                  <div className="w-24 h-24 relative">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${totalProgress * 2.51} 251`}
                        className="text-primary transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <BookOpen className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrainingModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
            >
              <Card
                className={cn(
                  'h-full transition-all duration-300 hover:shadow-lg cursor-pointer',
                  module.completed && 'border-gain/30 bg-gain/5'
                )}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                    </div>
                    {module.completed ? (
                      <div className="p-2 rounded-full bg-gain/10">
                        <CheckCircle className="w-5 h-5 text-gain" />
                      </div>
                    ) : (
                      <Badge variant="secondary">{module.progress}%</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {module.description}
                  </p>
                  
                  <Progress value={module.progress} className="h-2" />

                  <div className="flex items-center justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant={module.completed ? 'outline' : 'default'}
                          className={cn(
                            'flex-1 mr-2',
                            !module.completed && 'gradient-primary hover:opacity-90'
                          )}
                        >
                          {module.completed ? (
                            'Review'
                          ) : module.progress > 0 ? (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Continue
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start
                            </>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{module.title}</DialogTitle>
                          <DialogDescription>{module.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {/* Video Placeholder */}
                          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Play className="w-16 h-16 mx-auto text-muted-foreground mb-2" />
                              <p className="text-muted-foreground">Video Content Placeholder</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {module.duration}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline">Previous</Button>
                              <Button className="gradient-primary">Next Lesson</Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {module.hasQuiz && (
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {module.hasQuiz && (
                    <Button variant="outline" className="w-full">
                      <Award className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Training;
