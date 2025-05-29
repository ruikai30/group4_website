export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      citations: {
        Row: {
          cited_chunk_id: string
          cited_in_answer_id: string
          id: string
        }
        Insert: {
          cited_chunk_id: string
          cited_in_answer_id: string
          id?: string
        }
        Update: {
          cited_chunk_id?: string
          cited_in_answer_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "citations_cited_chunk_id_fkey"
            columns: ["cited_chunk_id"]
            isOneToOne: false
            referencedRelation: "doc_chunks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "citations_cited_in_answer_id_fkey"
            columns: ["cited_in_answer_id"]
            isOneToOne: false
            referencedRelation: "questions_answers"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      doc_chunks: {
        Row: {
          chunk_data: Json | null
          chunk_index: number
          content: string
          content_hash: string | null
          created_at: string | null
          doc_id: string
          hoprag_embedding: number[] | null
          id: string
          language: string | null
          page: number | null
          paragraph: number | null
          transformer_embedding: string | null
          updated_at: string | null
          word2vec_embedding: string | null
        }
        Insert: {
          chunk_data?: Json | null
          chunk_index: number
          content: string
          content_hash?: string | null
          created_at?: string | null
          doc_id: string
          hoprag_embedding?: number[] | null
          id: string
          language?: string | null
          page?: number | null
          paragraph?: number | null
          transformer_embedding?: string | null
          updated_at?: string | null
          word2vec_embedding?: string | null
        }
        Update: {
          chunk_data?: Json | null
          chunk_index?: number
          content?: string
          content_hash?: string | null
          created_at?: string | null
          doc_id?: string
          hoprag_embedding?: number[] | null
          id?: string
          language?: string | null
          page?: number | null
          paragraph?: number | null
          transformer_embedding?: string | null
          updated_at?: string | null
          word2vec_embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doc_chunks_doc_id_fkey"
            columns: ["doc_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["doc_id"]
          },
        ]
      }
      documents: {
        Row: {
          chunks: Json | null
          country: string | null
          created_at: string | null
          doc_id: string
          download_attempts: number | null
          download_error: string | null
          downloaded_at: string | null
          extracted_text: string | null
          file_path: string | null
          file_size: number | null
          language: string | null
          last_download_attempt: string | null
          processed_at: string | null
          scraped_at: string | null
          submission_date: string | null
          title: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          chunks?: Json | null
          country?: string | null
          created_at?: string | null
          doc_id: string
          download_attempts?: number | null
          download_error?: string | null
          downloaded_at?: string | null
          extracted_text?: string | null
          file_path?: string | null
          file_size?: number | null
          language?: string | null
          last_download_attempt?: string | null
          processed_at?: string | null
          scraped_at?: string | null
          submission_date?: string | null
          title?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          chunks?: Json | null
          country?: string | null
          created_at?: string | null
          doc_id?: string
          download_attempts?: number | null
          download_error?: string | null
          downloaded_at?: string | null
          extracted_text?: string | null
          file_path?: string | null
          file_size?: number | null
          language?: string | null
          last_download_attempt?: string | null
          processed_at?: string | null
          scraped_at?: string | null
          submission_date?: string | null
          title?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_country_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      logical_relationships: {
        Row: {
          confidence: number
          created_at: string | null
          evidence: string | null
          id: string
          method: string | null
          relationship_type: string
          source_chunk_id: string
          target_chunk_id: string
        }
        Insert: {
          confidence: number
          created_at?: string | null
          evidence?: string | null
          id?: string
          method?: string | null
          relationship_type: string
          source_chunk_id: string
          target_chunk_id: string
        }
        Update: {
          confidence?: number
          created_at?: string | null
          evidence?: string | null
          id?: string
          method?: string | null
          relationship_type?: string
          source_chunk_id?: string
          target_chunk_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "logical_relationships_source_chunk_id_fkey"
            columns: ["source_chunk_id"]
            isOneToOne: false
            referencedRelation: "doc_chunks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logical_relationships_target_chunk_id_fkey"
            columns: ["target_chunk_id"]
            isOneToOne: false
            referencedRelation: "doc_chunks"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          id: number
          question: string
        }
        Insert: {
          id: number
          question: string
        }
        Update: {
          id?: number
          question?: string
        }
        Relationships: []
      }
      questions_answers: {
        Row: {
          country: string
          detailed_response: string | null
          id: string
          question: number
          summary: string | null
          timestamp: string | null
        }
        Insert: {
          country: string
          detailed_response?: string | null
          id?: string
          question: number
          summary?: string | null
          timestamp?: string | null
        }
        Update: {
          country?: string
          detailed_response?: string | null
          id?: string
          question?: number
          summary?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_answers_country_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_answers_question_fkey"
            columns: ["question"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
