import { type SchemaTypeDefinition } from 'sanity'

// ── ACTIVE SCHEMAS ──────────────────────────────────────────────────────────
import omira_b2c_category    from './omira_b2c_category'
import omira_b2c_condition   from './omira_b2c_condition'
import omira_global_author   from './omira_global_author'
import omira_content_blog    from './omira_content_blog'
import omira_b2b_department  from './omira_b2b_department'
import omira_b2b_caseStudy   from './omira_b2b_caseStudy'
import { omiraTestimonialSchema }   from './omira_testimonial'
import { omiraFounderSchema }       from './omira_founder'
import { omiraHospitalModuleSchema } from './omira_b2b_hospitalModule'
import { omiraProgramSchema }        from './omira_b2c_program'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // ── B2C ─────────────────────────────────────────────────────────
    omira_b2c_category,
    omira_b2c_condition,
    omiraProgramSchema,

    // ── GLOBAL ──────────────────────────────────────────────────────
    omira_global_author,
    omiraFounderSchema,
    omiraTestimonialSchema,

    // ── CONTENT ─────────────────────────────────────────────────────
    omira_content_blog,

    // ── B2B ─────────────────────────────────────────────────────────
    omira_b2b_department,
    omira_b2b_caseStudy,
    omiraHospitalModuleSchema,
  ],
}