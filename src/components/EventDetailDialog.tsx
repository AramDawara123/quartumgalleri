import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string;
  price: number;
  max_attendees: number;
}

interface EventDetailDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EventDetailDialog = ({ event, open, onOpenChange }: EventDetailDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!event) return null;

  const formatEventDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'EEEE, MMMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const formatEventTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'HH:mm');
    } catch {
      return 'Time TBA';
    }
  };

  const isUpcoming = (eventDate: string) => {
    return new Date(eventDate) > new Date();
  };

  const handleCheckout = async () => {
    if (!isUpcoming(event.event_date)) {
      toast({
        title: "Event Passed",
        description: "This event has already taken place",
        variant: "destructive",
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      // Add event as a special cart item (we'll treat it like an artwork for checkout)
      await addToCart(event.id, {
        id: event.id,
        title: `Event: ${event.title}`,
        price: event.price || 0,
        image_url: event.image_url,
        artist_name: formatEventDate(event.event_date),
        artist_id: null,
        available: true,
      } as any);

      toast({
        title: "Added to Cart",
        description: `${event.title} has been added to your cart`,
      });

      onOpenChange(false);
      navigate('/cart');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add event to cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif font-bold text-primary pr-8">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Image */}
          {event.image_url && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={isUpcoming(event.event_date) ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}>
                  {isUpcoming(event.event_date) ? 'Upcoming' : 'Past'}
                </Badge>
              </div>
            </div>
          )}

          {/* Event Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <Calendar className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formatEventDate(event.event_date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                <Clock className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{formatEventTime(event.event_date)}</p>
                </div>
              </div>

              {event.location && (
                <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                  <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
              )}

              {event.max_attendees && (
                <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                  <Users className="h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{event.max_attendees} attendees max</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold mb-2">About this event</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>

            {/* Price and Checkout */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border border-border rounded-lg bg-muted/20">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ticket Price</p>
                <p className="text-3xl font-bold text-accent">
                  {event.price > 0 ? `€${event.price.toFixed(2)}` : 'Free'}
                </p>
              </div>
              
              {isUpcoming(event.event_date) ? (
                <Button 
                  size="lg" 
                  onClick={handleCheckout}
                  disabled={isAddingToCart}
                  className="w-full sm:w-auto"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {isAddingToCart ? 'Adding...' : event.price > 0 ? 'Register & Checkout' : 'Register for Free'}
                </Button>
              ) : (
                <Button variant="outline" size="lg" disabled className="w-full sm:w-auto">
                  Event Ended
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
