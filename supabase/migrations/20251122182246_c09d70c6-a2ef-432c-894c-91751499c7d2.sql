-- Add event_id column and item_type to cart_items to support both artworks and events
ALTER TABLE cart_items ADD COLUMN event_id uuid REFERENCES events(id) ON DELETE CASCADE;
ALTER TABLE cart_items ADD COLUMN item_type text NOT NULL DEFAULT 'artwork';

-- Add check constraint to ensure either artwork_id or event_id is set, but not both
ALTER TABLE cart_items ADD CONSTRAINT cart_items_item_check 
  CHECK (
    (item_type = 'artwork' AND artwork_id IS NOT NULL AND event_id IS NULL) OR
    (item_type = 'event' AND event_id IS NOT NULL AND artwork_id IS NULL)
  );

-- Create index for event_id for better query performance
CREATE INDEX idx_cart_items_event_id ON cart_items(event_id);