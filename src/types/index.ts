export type RiskLevel = 'critical' | 'high' | 'medium' | 'low'

export type DetectionStatus = 'pending' | 'approved' | 'takedown' | 'monetized'

export interface Detection {
  id: string
  user_id: string
  platform: string
  content_url: string
  thumbnail_url: string
  detected_at: string
  risk_level: RiskLevel
  status: DetectionStatus
  match_confidence: number
  created_at: string
  deleted_at: string | null
}

export interface EarningsRecord {
  id: string
  user_id: string
  platform: string
  amount: number
  cpm: number
  impressions: number
  period_start: string
  period_end: string
  created_at: string
  deleted_at: string | null
}

export interface WeirProfile {
  id: string
  user_id: string
  display_name: string
  creator_type: string
  protection_score: number
  total_earnings: number
  plan: 'free' | 'creator' | 'pro'
  created_at: string
  deleted_at: string | null
}

export interface LicenseTemplate {
  id: string
  user_id: string
  name: string
  platform: string
  monetization_type: string
  terms: string
  active: boolean
  created_at: string
  deleted_at: string | null
}
