import { useState } from 'react';
import { Calendar, X, ChevronRight, MapPin, Clock } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const events = [
  { id: 1, name: 'Startup Pitch Night', date: 'Dec 15', time: '6:00 PM', location: 'Hub47 Dubai' },
  { id: 2, name: 'Founder Mixer', date: 'Dec 18', time: '7:00 PM', location: 'JLT Cluster' },
  { id: 3, name: 'Tech Talk: AI in Fintech', date: 'Dec 22', time: '5:00 PM', location: 'Online' },
  { id: 4, name: 'Investor Office Hours', date: 'Jan 5', time: '2:00 PM', location: 'Hub47 Dubai' },
  { id: 5, name: 'Demo Day Cohort 3', date: 'Jan 12', time: '4:00 PM', location: 'DIFC Hub' },
];

export default function EventsSidebar() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-2 px-3 py-3 bg-primary text-primary-foreground rounded-l-xl shadow-lg hover:pr-5 transition-all duration-300 group">
          <Calendar className="w-5 h-5" />
          <span className="text-sm font-semibold hidden md:inline group-hover:inline">Events</span>
          <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
        </button>
      </SheetTrigger>
      
      <SheetContent className="w-[340px] sm:w-[400px] bg-card/95 backdrop-blur-xl border-l border-border/50">
        <SheetHeader className="pb-6 border-b border-border/50">
          <SheetTitle className="flex items-center gap-3 text-h3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            Upcoming Events
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-2">
          {events.map((event) => (
            <a
              key={event.id}
              href={`/events/${event.id}`}
              className={`block p-4 rounded-xl transition-all duration-300 ${
                hoveredEvent === event.id 
                  ? 'bg-primary/10 shadow-md' 
                  : 'bg-muted/30 hover:bg-muted/50'
              }`}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-primary uppercase">{event.date.split(' ')[0]}</span>
                  <span className="text-lg font-bold text-foreground leading-none">{event.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm mb-1 truncate">{event.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-all ${
                  hoveredEvent === event.id ? 'translate-x-1 text-primary' : ''
                }`} />
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-border/50">
          <a 
            href="/events" 
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View All Events
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
