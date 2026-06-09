export type PdfSectionId =
  | 'profile'
  | 'identity'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'aiExperiments'
  | 'toyProjects'
  | 'activities'
  | 'awards'
  | 'certifications'
  | 'education'
  | 'contact'

export type PdfProfileField =
  | 'name'
  | 'alias'
  | 'nameRoman'
  | 'title'
  | 'tagline'
  | 'summary'
  | 'location'
  | 'yearsOfExperience'

export type PdfProjectField =
  | 'description'
  | 'features'
  | 'challenges'
  | 'challengeDetail'
  | 'contributions'
  | 'links'
  | 'media'

export interface PdfSelectionState {
  sections: Record<PdfSectionId, boolean>
  sectionOrder: PdfSectionId[]
  profileFields: Record<PdfProfileField, boolean>
  excludedContacts: Record<string, boolean>
  excludedProjectSlugs: Record<string, boolean>
  excludedAiSlugs: Record<string, boolean>
  excludedToyCategories: Record<string, boolean>
  excludedActivitySlugs: Record<string, boolean>
  excludedAwardKeys: Record<string, boolean>
  excludedCertificationKeys: Record<string, boolean>
  excludedEducationKeys: Record<string, boolean>
  excludedExperienceKeys: Record<string, boolean>
  projectFields: Record<string, Record<PdfProjectField, boolean>>
}
