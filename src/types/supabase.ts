export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "11.2.2 (f884da7)"
  }
  public: {
    Tables: {
      leetcode_problems: {
        Row: {
          acceptance_rate: number | null
          approach_korean: string | null
          constraints_english: string[] | null
          constraints_korean: string[] | null
          created_at: string | null
          description_english: string
          description_korean: string
          difficulty: string
          examples: Json | null
          explanation_korean: string | null
          github_url: string | null
          id: number
          is_premium: boolean | null
          leetcode_url: string | null
          problem_number: number
          slug: string
          solution_code: string
          solution_language: string
          space_complexity: string | null
          submission_count: number | null
          tags: string[] | null
          time_complexity: string | null
          title: string
          title_korean: string
          updated_at: string | null
        }
        Insert: {
          acceptance_rate?: number | null
          approach_korean?: string | null
          constraints_english?: string[] | null
          constraints_korean?: string[] | null
          created_at?: string | null
          description_english: string
          description_korean: string
          difficulty: string
          examples?: Json | null
          explanation_korean?: string | null
          github_url?: string | null
          id?: number
          is_premium?: boolean | null
          leetcode_url?: string | null
          problem_number: number
          slug: string
          solution_code: string
          solution_language: string
          space_complexity?: string | null
          submission_count?: number | null
          tags?: string[] | null
          time_complexity?: string | null
          title: string
          title_korean: string
          updated_at?: string | null
        }
        Update: {
          acceptance_rate?: number | null
          approach_korean?: string | null
          constraints_english?: string[] | null
          constraints_korean?: string[] | null
          created_at?: string | null
          description_english?: string
          description_korean?: string
          difficulty?: string
          examples?: Json | null
          explanation_korean?: string | null
          github_url?: string | null
          id?: number
          is_premium?: boolean | null
          leetcode_url?: string | null
          problem_number?: number
          slug?: string
          solution_code?: string
          solution_language?: string
          space_complexity?: string | null
          submission_count?: number | null
          tags?: string[] | null
          time_complexity?: string | null
          title?: string
          title_korean?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author: string
          created_at: string
          id: string
          markdown: string
          sub_title: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          created_at?: string
          id?: string
          markdown?: string
          sub_title?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Update: {
          author?: string
          created_at?: string
          id?: string
          markdown?: string
          sub_title?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          id: string
          image: string | null
          name: string | null
          type: string
        }
        Insert: {
          email?: string | null
          id: string
          image?: string | null
          name?: string | null
          type?: string
        }
        Update: {
          email?: string | null
          id?: string
          image?: string | null
          name?: string | null
          type?: string
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
