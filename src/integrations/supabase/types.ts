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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_gen_events: {
        Row: {
          created_at: string
          id: string
          ip: string
        }
        Insert: {
          created_at?: string
          id?: string
          ip: string
        }
        Update: {
          created_at?: string
          id?: string
          ip?: string
        }
        Relationships: []
      }
      analytics_counters: {
        Row: {
          id: string
          name: string
          updated_at: string
          value: number
        }
        Insert: {
          id?: string
          name: string
          updated_at?: string
          value?: number
        }
        Update: {
          id?: string
          name?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      blogs: {
        Row: {
          country: string | null
          cover_image: string | null
          created_at: string
          id: string
          is_published: boolean
          query: string
          sections: Json
          title: string
        }
        Insert: {
          country?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          query: string
          sections?: Json
          title: string
        }
        Update: {
          country?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          query?: string
          sections?: Json
          title?: string
        }
        Relationships: []
      }
      business_invitations: {
        Row: {
          charges: string
          country: string
          created_at: string
          id: string
          notes: string | null
          requirements: string | null
          service_text: string
          source_file: string | null
          source_page: number | null
          status: string
        }
        Insert: {
          charges?: string
          country: string
          created_at?: string
          id?: string
          notes?: string | null
          requirements?: string | null
          service_text: string
          source_file?: string | null
          source_page?: number | null
          status?: string
        }
        Update: {
          charges?: string
          country?: string
          created_at?: string
          id?: string
          notes?: string | null
          requirements?: string | null
          service_text?: string
          source_file?: string | null
          source_page?: number | null
          status?: string
        }
        Relationships: []
      }
      country_leads: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
          passport_number: string
          phone: string
          source_type: string
          target_country: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id?: string
          last_name: string
          passport_number: string
          phone: string
          source_type: string
          target_country: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
          passport_number?: string
          phone?: string
          source_type?: string
          target_country?: string
        }
        Relationships: []
      }
      tour_packages: {
        Row: {
          country: string
          created_at: string
          duration_text: string | null
          id: string
          inclusions: Json
          itinerary: Json
          notes: string | null
          price_text: string | null
          source_file: string | null
          source_page: number | null
          status: string
          title: string
          travel_dates: string | null
        }
        Insert: {
          country: string
          created_at?: string
          duration_text?: string | null
          id?: string
          inclusions?: Json
          itinerary?: Json
          notes?: string | null
          price_text?: string | null
          source_file?: string | null
          source_page?: number | null
          status?: string
          title: string
          travel_dates?: string | null
        }
        Update: {
          country?: string
          created_at?: string
          duration_text?: string | null
          id?: string
          inclusions?: Json
          itinerary?: Json
          notes?: string | null
          price_text?: string | null
          source_file?: string | null
          source_page?: number | null
          status?: string
          title?: string
          travel_dates?: string | null
        }
        Relationships: []
      }
      tourist_visas: {
        Row: {
          charges: string
          country: string
          created_at: string
          documents: string | null
          duration_options: string | null
          id: string
          notes: string | null
          payment_options: string | null
          processing_time: string | null
          source_file: string | null
          source_page: number | null
          status: string
          visa_type: string
        }
        Insert: {
          charges?: string
          country: string
          created_at?: string
          documents?: string | null
          duration_options?: string | null
          id?: string
          notes?: string | null
          payment_options?: string | null
          processing_time?: string | null
          source_file?: string | null
          source_page?: number | null
          status?: string
          visa_type: string
        }
        Update: {
          charges?: string
          country?: string
          created_at?: string
          documents?: string | null
          duration_options?: string | null
          id?: string
          notes?: string | null
          payment_options?: string | null
          processing_time?: string | null
          source_file?: string | null
          source_page?: number | null
          status?: string
          visa_type?: string
        }
        Relationships: []
      }
      umrah_packages: {
        Row: {
          airline: string
          created_at: string
          currency: string
          departure_city: string
          departure_date: string | null
          duplicate_note: string | null
          flights: Json
          id: string
          madinah_distance: string
          madinah_hotel: string
          madinah_nights: number | null
          makkah_distance: string
          makkah_hotel: string
          makkah_nights: number | null
          notes: string | null
          pkg_no: string
          poster_no: string | null
          price_double: number
          price_quad: number
          price_sharing: number
          price_triple: number
          return_date: string | null
          route: string
          source_file: string
          source_page: number | null
          source_ref: string | null
          status: string
          total_nights: number | null
        }
        Insert: {
          airline: string
          created_at?: string
          currency?: string
          departure_city?: string
          departure_date?: string | null
          duplicate_note?: string | null
          flights?: Json
          id?: string
          madinah_distance?: string
          madinah_hotel: string
          madinah_nights?: number | null
          makkah_distance?: string
          makkah_hotel: string
          makkah_nights?: number | null
          notes?: string | null
          pkg_no: string
          poster_no?: string | null
          price_double: number
          price_quad: number
          price_sharing: number
          price_triple: number
          return_date?: string | null
          route: string
          source_file: string
          source_page?: number | null
          source_ref?: string | null
          status?: string
          total_nights?: number | null
        }
        Update: {
          airline?: string
          created_at?: string
          currency?: string
          departure_city?: string
          departure_date?: string | null
          duplicate_note?: string | null
          flights?: Json
          id?: string
          madinah_distance?: string
          madinah_hotel?: string
          madinah_nights?: number | null
          makkah_distance?: string
          makkah_hotel?: string
          makkah_nights?: number | null
          notes?: string | null
          pkg_no?: string
          poster_no?: string | null
          price_double?: number
          price_quad?: number
          price_sharing?: number
          price_triple?: number
          return_date?: string | null
          route?: string
          source_file?: string
          source_page?: number | null
          source_ref?: string | null
          status?: string
          total_nights?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      work_demands: {
        Row: {
          advance_payment: string | null
          benefits: string | null
          charges: string
          country: string
          created_at: string
          eligibility: string | null
          experience: string | null
          id: string
          job_title: string
          notes: string | null
          requirements: string | null
          salary_text: string | null
          source_file: string | null
          source_page: number | null
          status: string
          total_cost: string | null
          vacancies: number | null
        }
        Insert: {
          advance_payment?: string | null
          benefits?: string | null
          charges?: string
          country: string
          created_at?: string
          eligibility?: string | null
          experience?: string | null
          id?: string
          job_title: string
          notes?: string | null
          requirements?: string | null
          salary_text?: string | null
          source_file?: string | null
          source_page?: number | null
          status?: string
          total_cost?: string | null
          vacancies?: number | null
        }
        Update: {
          advance_payment?: string | null
          benefits?: string | null
          charges?: string
          country?: string
          created_at?: string
          eligibility?: string | null
          experience?: string | null
          id?: string
          job_title?: string
          notes?: string | null
          requirements?: string | null
          salary_text?: string | null
          source_file?: string | null
          source_page?: number | null
          status?: string
          total_cost?: string | null
          vacancies?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_counter: { Args: { counter_name: string }; Returns: number }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
