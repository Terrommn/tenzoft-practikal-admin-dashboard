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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      candidate_career_history: {
        Row: {
          candidate_id: string
          company_name: string
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          position: string
          start_date: string
        }
        Insert: {
          candidate_id: string
          company_name: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          position: string
          start_date: string
        }
        Update: {
          candidate_id?: string
          company_name?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          position?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_career_history_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["uid"]
          },
        ]
      }
      candidate_certificates: {
        Row: {
          candidate_id: string
          certificate_name: string
          created_at: string | null
          credential_id: string | null
          expiry_date: string | null
          id: string
          issue_date: string
          issuing_organization: string
        }
        Insert: {
          candidate_id: string
          certificate_name: string
          created_at?: string | null
          credential_id?: string | null
          expiry_date?: string | null
          id?: string
          issue_date: string
          issuing_organization: string
        }
        Update: {
          candidate_id?: string
          certificate_name?: string
          created_at?: string | null
          credential_id?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string
          issuing_organization?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_certificates_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["uid"]
          },
        ]
      }
      candidate_education_history: {
        Row: {
          candidate_id: string
          created_at: string | null
          degree: string
          end_date: string | null
          field_of_study: string | null
          id: string
          institution: string
          start_date: string
        }
        Insert: {
          candidate_id: string
          created_at?: string | null
          degree: string
          end_date?: string | null
          field_of_study?: string | null
          id?: string
          institution: string
          start_date: string
        }
        Update: {
          candidate_id?: string
          created_at?: string | null
          degree?: string
          end_date?: string | null
          field_of_study?: string | null
          id?: string
          institution?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_education_history_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["uid"]
          },
        ]
      }
      candidate_languages: {
        Row: {
          candidate_id: string
          created_at: string | null
          id: string
          language: string
          proficiency_level: string
        }
        Insert: {
          candidate_id: string
          created_at?: string | null
          id?: string
          language: string
          proficiency_level: string
        }
        Update: {
          candidate_id?: string
          created_at?: string | null
          id?: string
          language?: string
          proficiency_level?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_languages_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["uid"]
          },
        ]
      }
      candidate_soft_skills: {
        Row: {
          candidate_id: string
          created_at: string | null
          id: string
          proficiency_level: string
          skill_name: string
        }
        Insert: {
          candidate_id: string
          created_at?: string | null
          id?: string
          proficiency_level: string
          skill_name: string
        }
        Update: {
          candidate_id?: string
          created_at?: string | null
          id?: string
          proficiency_level?: string
          skill_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_soft_skills_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["uid"]
          },
        ]
      }
      candidate_technical_skills: {
        Row: {
          candidate_id: string
          created_at: string | null
          id: string
          proficiency_level: string
          skill_name: string
          years_of_experience: number | null
        }
        Insert: {
          candidate_id: string
          created_at?: string | null
          id?: string
          proficiency_level: string
          skill_name: string
          years_of_experience?: number | null
        }
        Update: {
          candidate_id?: string
          created_at?: string | null
          id?: string
          proficiency_level?: string
          skill_name?: string
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_technical_skills_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["uid"]
          },
        ]
      }
      candidates: {
        Row: {
          age: number | null
          created_at: string | null
          cv_formatted_long_bucket_url: string | null
          cv_formatted_short_bucket_url: string | null
          cv_original_bucket_url: string | null
          cv_uid: string
          email: string
          linkedin_url: string | null
          name: string
          phone_number: string | null
          uid: string
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          cv_formatted_long_bucket_url?: string | null
          cv_formatted_short_bucket_url?: string | null
          cv_original_bucket_url?: string | null
          cv_uid: string
          email: string
          linkedin_url?: string | null
          name: string
          phone_number?: string | null
          uid?: string
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          cv_formatted_long_bucket_url?: string | null
          cv_formatted_short_bucket_url?: string | null
          cv_original_bucket_url?: string | null
          cv_uid?: string
          email?: string
          linkedin_url?: string | null
          name?: string
          phone_number?: string | null
          uid?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_name: string
          created_at: string | null
          uid: string
          updated_at: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          uid?: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          uid?: string
          updated_at?: string | null
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
