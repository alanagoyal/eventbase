export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          end_timestampz: string | null
          event_name: string | null
          event_url: string
          id: string
          location: string | null
          location_url: string | null
          og_image: string | null
          start_timestampz: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_timestampz?: string | null
          event_name?: string | null
          event_url: string
          id?: string
          location?: string | null
          location_url?: string | null
          og_image?: string | null
          start_timestampz?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_timestampz?: string | null
          event_name?: string | null
          event_url?: string
          id?: string
          location?: string | null
          location_url?: string | null
          og_image?: string | null
          start_timestampz?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      guests: {
        Row: {
          company_name: string | null
          dietary_restrictions: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          company_name?: string | null
          dietary_restrictions?: string | null
          email: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string | null
          dietary_restrictions?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      rsvps: {
        Row: {
          comments: string | null
          created_at: string | null
          discussion_topics: string | null
          email: string | null
          event_id: string | null
          id: string
          rsvp_type: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          discussion_topics?: string | null
          email?: string | null
          event_id?: string | null
          id?: string
          rsvp_type?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          discussion_topics?: string | null
          email?: string | null
          event_id?: string | null
          id?: string
          rsvp_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rsvps_email_fkey"
            columns: ["email"]
            referencedRelation: "guests"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "rsvps_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
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
