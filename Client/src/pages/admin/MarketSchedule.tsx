import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MainLayout } from '@/components/layout/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ScheduleEvent {
  id: string;
  date: string;
  type: 'holiday' | 'early_close' | 'special';
  description: string;
  closeTime?: string;
}

const MarketSchedule = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<ScheduleEvent[]>([
    { id: '1', date: '2024-02-19', type: 'holiday', description: "Presidents' Day" },
    { id: '2', date: '2024-03-29', type: 'holiday', description: 'Good Friday' },
    { id: '3', date: '2024-07-03', type: 'early_close', description: 'Independence Day Eve', closeTime: '1:00 PM' },
    { id: '4', date: '2024-07-04', type: 'holiday', description: 'Independence Day' },
    { id: '5', date: '2024-11-28', type: 'holiday', description: 'Thanksgiving Day' },
    { id: '6', date: '2024-11-29', type: 'early_close', description: 'Day After Thanksgiving', closeTime: '1:00 PM' },
  ]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    type: 'holiday' as ScheduleEvent['type'],
    description: '',
    closeTime: '',
  });

  const handleAddEvent = () => {
    const newEvent: ScheduleEvent = {
      id: Date.now().toString(),
      ...formData,
    };
    setEvents([...events, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setShowAddDialog(false);
    setFormData({ date: '', type: 'holiday', description: '', closeTime: '' });
    toast({
      title: 'Event Added',
      description: `${formData.description} has been added to the schedule.`,
    });
  };

  const handleDeleteEvent = (event: ScheduleEvent) => {
    setEvents(events.filter((e) => e.id !== event.id));
    toast({
      title: 'Event Removed',
      description: `${event.description} has been removed from the schedule.`,
    });
  };

  const getTypeBadge = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'holiday':
        return <Badge className="bg-loss/10 text-loss border-loss/30">Market Closed</Badge>;
      case 'early_close':
        return <Badge className="bg-warning/10 text-warning border-warning/30">Early Close</Badge>;
      case 'special':
        return <Badge className="bg-primary/10 text-primary border-primary/30">Special</Badge>;
    }
  };

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
            <h1 className="text-3xl font-bold">Market Schedule</h1>
            <p className="text-muted-foreground mt-1">
              Manage holidays and special market hours
            </p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Schedule Event</DialogTitle>
                <DialogDescription>Add a holiday or special market hours</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <div className="flex gap-2">
                    {(['holiday', 'early_close', 'special'] as const).map((type) => (
                      <Button
                        key={type}
                        variant={formData.type === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFormData({ ...formData, type })}
                      >
                        {type === 'holiday' ? 'Holiday' : type === 'early_close' ? 'Early Close' : 'Special'}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="e.g., Memorial Day"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                {formData.type === 'early_close' && (
                  <div className="space-y-2">
                    <Label>Close Time</Label>
                    <Input
                      placeholder="e.g., 1:00 PM"
                      value={formData.closeTime}
                      onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button className="gradient-primary" onClick={handleAddEvent}>
                  Add Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Upcoming Events Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-loss/10">
                    <Calendar className="w-6 h-6 text-loss" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {events.filter((e) => e.type === 'holiday').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Holidays</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-warning/10">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {events.filter((e) => e.type === 'early_close').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Early Closes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{events.length}</p>
                    <p className="text-sm text-muted-foreground">Total Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Events Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Schedule Events</CardTitle>
              <CardDescription>All market holidays and special hours</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Close Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>{event.description}</TableCell>
                      <TableCell>{getTypeBadge(event.type)}</TableCell>
                      <TableCell>
                        {event.closeTime || (event.type === 'holiday' ? 'Closed' : '-')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-loss hover:text-loss"
                          onClick={() => handleDeleteEvent(event)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default MarketSchedule;
