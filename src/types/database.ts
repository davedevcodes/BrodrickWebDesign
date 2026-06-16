export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      admins: {
        Row: {
          id: string;
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: string;
          created_at?: string;
        };
      };
      service_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          client_name: string | null;
          category: string;
          description: string | null;
          results: string | null;
          tech_stack: string[];
          live_url: string | null;
          case_study_url: string | null;
          featured_image: string | null;
          is_featured: boolean;
          status: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          client_name?: string | null;
          category: string;
          description?: string | null;
          results?: string | null;
          tech_stack?: string[];
          live_url?: string | null;
          case_study_url?: string | null;
          featured_image?: string | null;
          is_featured?: boolean;
          status?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          client_name?: string | null;
          category?: string;
          description?: string | null;
          results?: string | null;
          tech_stack?: string[];
          live_url?: string | null;
          case_study_url?: string | null;
          featured_image?: string | null;
          is_featured?: boolean;
          status?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          image_url: string;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          image_url: string;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          image_url?: string;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      templates: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          features: string[];
          category: string;
          demo_url: string | null;
          featured_image: string | null;
          price_min: number | null;
          price_max: number | null;
          is_featured: boolean;
          status: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          features?: string[];
          category: string;
          demo_url?: string | null;
          featured_image?: string | null;
          price_min?: number | null;
          price_max?: number | null;
          is_featured?: boolean;
          status?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          features?: string[];
          category?: string;
          demo_url?: string | null;
          featured_image?: string | null;
          price_min?: number | null;
          price_max?: number | null;
          is_featured?: boolean;
          status?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      template_images: {
        Row: {
          id: string;
          template_id: string;
          image_url: string;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          template_id: string;
          image_url: string;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          template_id?: string;
          image_url?: string;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          service_needed: string | null;
          budget: string | null;
          message: string;
          status: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          service_needed?: string | null;
          budget?: string | null;
          message: string;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          service_needed?: string | null;
          budget?: string | null;
          message?: string;
          status?: string;
          source?: string;
          created_at?: string;
        };
      };
      template_inquiries: {
        Row: {
          id: string;
          template_id: string | null;
          name: string;
          email: string;
          phone: string | null;
          message: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          template_id?: string | null;
          name: string;
          email: string;
          phone?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          template_id?: string | null;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          client_name: string;
          client_role: string | null;
          client_company: string | null;
          avatar_url: string | null;
          content: string;
          rating: number;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          client_role?: string | null;
          client_company?: string | null;
          avatar_url?: string | null;
          content: string;
          rating?: number;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          client_role?: string | null;
          client_company?: string | null;
          avatar_url?: string | null;
          content?: string;
          rating?: number;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          agency_name: string;
          logo_url: string | null;
          email: string | null;
          phone: string | null;
          whatsapp: string | null;
          facebook_url: string | null;
          instagram_url: string | null;
          linkedin_url: string | null;
          twitter_url: string | null;
          footer_text: string | null;
          seo_title: string | null;
          seo_description: string | null;
          address: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          agency_name?: string;
          logo_url?: string | null;
          email?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          facebook_url?: string | null;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          footer_text?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          address?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          agency_name?: string;
          logo_url?: string | null;
          email?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          facebook_url?: string | null;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          footer_text?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          address?: string | null;
          updated_at?: string;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          admin_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          admin_id?: string | null;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          description?: string | null;
          created_at?: string;
        };
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}

// Convenience types
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectImage = Database["public"]["Tables"]["project_images"]["Row"];
export type Template = Database["public"]["Tables"]["templates"]["Row"];
export type TemplateImage = Database["public"]["Tables"]["template_images"]["Row"];
export type ContactSubmission = Database["public"]["Tables"]["contact_submissions"]["Row"];
export type TemplateInquiry = Database["public"]["Tables"]["template_inquiries"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Settings = Database["public"]["Tables"]["settings"]["Row"];
export type ServiceCategory = Database["public"]["Tables"]["service_categories"]["Row"];
export type ActivityLog = Database["public"]["Tables"]["activity_logs"]["Row"];
export type Admin = Database["public"]["Tables"]["admins"]["Row"];
