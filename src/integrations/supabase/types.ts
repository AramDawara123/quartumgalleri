export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      artists: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          id: string
          image_url: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      artworks: {
        Row: {
          artist_id: string | null
          available: boolean
          category: string | null
          created_at: string
          description: string | null
          dimensions: string | null
          id: string
          image_url: string | null
          medium: string | null
          price: number
          title: string
          updated_at: string
          year_created: number | null
        }
        Insert: {
          artist_id?: string | null
          available?: boolean
          category?: string | null
          created_at?: string
          description?: string | null
          dimensions?: string | null
          id?: string
          image_url?: string | null
          medium?: string | null
          price: number
          title: string
          updated_at?: string
          year_created?: number | null
        }
        Update: {
          artist_id?: string | null
          available?: boolean
          category?: string | null
          created_at?: string
          description?: string | null
          dimensions?: string | null
          id?: string
          image_url?: string | null
          medium?: string | null
          price?: number
          title?: string
          updated_at?: string
          year_created?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artworks_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          artwork_id: string | null
          created_at: string
          event_id: string | null
          id: string
          item_type: string
          quantity: number
          session_id: string
          updated_at: string
        }
        Insert: {
          artwork_id?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          item_type?: string
          quantity?: number
          session_id: string
          updated_at?: string
        }
        Update: {
          artwork_id?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          item_type?: string
          quantity?: number
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      discounts: {
        Row: {
          active: boolean
          applies_to: string | null
          code: string
          created_at: string
          current_uses: number | null
          description: string | null
          discount_type: string
          discount_value: number | null
          end_date: string | null
          expires_at: string | null
          id: string
          max_uses: number | null
          min_purchase: number | null
          percentage: number
          start_date: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          applies_to?: string | null
          code: string
          created_at?: string
          current_uses?: number | null
          description?: string | null
          discount_type?: string
          discount_value?: number | null
          end_date?: string | null
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          min_purchase?: number | null
          percentage: number
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          applies_to?: string | null
          code?: string
          created_at?: string
          current_uses?: number | null
          description?: string | null
          discount_type?: string
          discount_value?: number | null
          end_date?: string | null
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          min_purchase?: number | null
          percentage?: number
          start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          event_date: string
          id: string
          image_url: string | null
          location: string | null
          max_attendees: number | null
          price: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date: string
          id?: string
          image_url?: string | null
          location?: string | null
          max_attendees?: number | null
          price?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string
          id?: string
          image_url?: string | null
          location?: string | null
          max_attendees?: number | null
          price?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      incoming_orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          notes: string | null
          shipping_address: string
          status: string
          title: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          shipping_address: string
          status?: string
          title: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          shipping_address?: string
          status?: string
          title?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          artwork_id: string | null
          created_at: string
          id: string
          order_id: string | null
          price: number
          quantity: number
        }
        Insert: {
          artwork_id?: string | null
          created_at?: string
          id?: string
          order_id?: string | null
          price: number
          quantity?: number
        }
        Update: {
          artwork_id?: string | null
          created_at?: string
          id?: string
          order_id?: string | null
          price?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          shipping_address: string
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          shipping_address: string
          status?: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          shipping_address?: string
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          additional_data: Json | null
          content: string
          created_at: string
          id: string
          image_url: string | null
          page_name: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          additional_data?: Json | null
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          page_name: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          additional_data?: Json | null
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          page_name?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
