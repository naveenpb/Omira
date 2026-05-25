import { groq } from 'next-sanity'

// ─────────────────────────────────────────────────────────────────────────────
// B2C CONDITION QUERIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch a single condition by slug for a given locale.
 * Falls back to English for all localised fields.
 */
export const conditionBySlugQuery = (locale: string) => groq`
  *[_type == "omira_b2c_condition" && slug.current == $slug && isPublished == true][0] {
    _id,
    diseaseName,
    slug,
    patientType,
    icon,
    featuredImage { asset->, alt },
    // Localised fields: return locale version or fall back to English
    "seoTitle":          coalesce(localizedContent.${locale}.seoTitle,         seoTitle),
    "seoDescription":    coalesce(localizedContent.${locale}.seoDescription,   seoDescription),
    "patientPainPoint":  coalesce(localizedContent.${locale}.patientPainPoint, patientPainPoint),
    "targetedRelief":    coalesce(localizedContent.${locale}.targetedRelief,   targetedRelief),
    // Non-localised clinical fields
    primaryKeyword,
    secondaryKeywords,
    ogImage { asset->, alt },
    faqSchema,
    pathology,
    allopathicMedicines,
    allopathicSideEffects,
    clinicalOutcomeClaim,
    evidenceReference,
    richBodyContent,
    packageName,
    duration,
    practices,
    contraindications,
    crmTag,
    ctaHeading,
    ctaSubtext,
    publishedAt,
    lastReviewedAt,
    sortPriority,
    // Referenced documents
    category->{ name, slug },
    certifiedBy->{ name, role, photo { asset-> }, certifications, yearsExperience },
    reviewedBy->{ name, role, photo { asset-> } },
    relatedConditions[]->{ diseaseName, slug, icon, clinicalOutcomeClaim, patientType }
  }
`

/**
 * Fetch all published conditions (for /b2c listing page and sitemap).
 */
export const allConditionsQuery = groq`
  *[_type == "omira_b2c_condition" && isPublished == true] | order(sortPriority asc) {
    _id,
    diseaseName,
    slug,
    patientType,
    icon,
    seoTitle,
    seoDescription,
    primaryKeyword,
    clinicalOutcomeClaim,
    featuredImage { asset->, alt },
    category->{ name, slug },
    publishedAt
  }
`

/**
 * Fetch all condition slugs (for Next.js generateStaticParams).
 */
export const allConditionSlugsQuery = groq`
  *[_type == "omira_b2c_condition" && isPublished == true && defined(slug.current)] {
    "slug": slug.current
  }
`

/**
 * Fetch conditions by category slug (for /treatments/category/[category] pages).
 */
export const conditionsByCategoryQuery = groq`
  *[_type == "omira_b2c_condition" && isPublished == true && category->slug.current == $category]
  | order(sortPriority asc) {
    _id,
    diseaseName,
    slug,
    patientType,
    icon,
    seoTitle,
    clinicalOutcomeClaim,
    featuredImage { asset->, alt }
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY QUERIES
// ─────────────────────────────────────────────────────────────────────────────

export const allCategoriesQuery = groq`
  *[_type == "omira_b2c_category"] | order(sortOrder asc) {
    _id,
    name,
    slug,
    description,
    icon,
    seoTitle,
    seoDescription
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// BLOG / ARTICLE QUERIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch a single blog article by slug.
 */
export const blogBySlugQuery = groq`
  *[_type == "omira_content_blog" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    slug,
    seoTitle,
    seoDescription,
    primaryKeyword,
    secondaryKeywords,
    ogImage { asset->, alt },
    faqSchema,
    excerpt,
    body,
    category,
    readTime,
    publishedAt,
    lastUpdatedAt,
    funnelTarget->{ diseaseName, slug, packageName, ctaHeading, crmTag },
    funnelCtaText,
    author->{ name, role, photo { asset-> }, certifications, bio, linkedIn },
    reviewedBy->{ name, role, photo { asset-> } },
    relatedArticles[]->{ title, slug, excerpt, category, readTime, publishedAt, ogImage { asset-> } }
  }
`

/**
 * Fetch all published blog posts (for /blog listing and sitemap).
 */
export const allBlogPostsQuery = groq`
  *[_type == "omira_content_blog" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    seoTitle,
    excerpt,
    category,
    readTime,
    publishedAt,
    primaryKeyword,
    ogImage { asset->, alt },
    author->{ name, role }
  }
`

/**
 * Fetch all blog slugs (for generateStaticParams).
 */
export const allBlogSlugsQuery = groq`
  *[_type == "omira_content_blog" && isPublished == true && defined(slug.current)] {
    "slug": slug.current
  }
`

/**
 * Fetch blog posts filtered by category.
 */
export const blogByCategoryQuery = groq`
  *[_type == "omira_content_blog" && isPublished == true && category == $category]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    readTime,
    publishedAt,
    ogImage { asset->, alt },
    author->{ name, role }
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// B2B DEPARTMENT QUERIES
// ─────────────────────────────────────────────────────────────────────────────

export const allB2BDepartmentsQuery = groq`
  *[_type == "omira_b2b_department" && isPublished == true] | order(sortOrder asc) {
    _id,
    department,
    slug,
    priority,
    icon,
    painPoint,
    hospitalBaseline,
    omiraIntervention,
    clinicalOutcome,
    researchEvidence,
    patientMetrics,
    savingsValue,
    financialSavings,
    pilotDuration,
    commissionModel
  }
`

export const b2bDepartmentBySlugQuery = groq`
  *[_type == "omira_b2b_department" && slug.current == $slug && isPublished == true][0] {
    _id,
    department,
    slug,
    priority,
    icon,
    painPoint,
    hospitalBaseline,
    omiraIntervention,
    clinicalOutcome,
    researchEvidence,
    patientMetrics,
    savingsValue,
    financialSavings,
    pilotDuration,
    commissionModel
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDY QUERIES
// ─────────────────────────────────────────────────────────────────────────────

export const allCaseStudiesQuery = groq`
  *[_type == "omira_b2b_caseStudy" && isPublished == true] | order(isFeatured desc, publishedAt desc) {
    _id,
    hospitalName,
    slug,
    department,
    keyMetric,
    testimonial,
    testimonialBy,
    logo { asset-> },
    isFeatured
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// AUTHOR QUERIES
// ─────────────────────────────────────────────────────────────────────────────

export const allAuthorsQuery = groq`
  *[_type == "omira_global_author"] | order(yearsExperience desc) {
    _id,
    name,
    slug,
    role,
    photo { asset->, alt },
    bio,
    certifications,
    yearsExperience,
    specializations,
    linkedIn,
    schemaOrgType
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// SITEMAP QUERIES
// ─────────────────────────────────────────────────────────────────────────────

export const sitemapQuery = groq`
  {
    "conditions": *[_type == "omira_b2c_condition" && isPublished == true] {
      "slug": slug.current,
      "lastmod": lastReviewedAt
    },
    "blogs": *[_type == "omira_content_blog" && isPublished == true] {
      "slug": slug.current,
      "lastmod": lastUpdatedAt
    },
    "categories": *[_type == "omira_b2c_category"] {
      "slug": slug.current
    },
    "b2bDepts": *[_type == "omira_b2b_department" && isPublished == true] {
      "slug": slug.current
    },
    "caseStudies": *[_type == "omira_b2b_caseStudy" && isPublished == true] {
      "slug": slug.current,
      "lastmod": publishedAt
    }
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// PATIENT-TYPE FILTERED QUERIES (for /rehabilitation and /post-care hubs)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all conditions of a specific patientType.
 * Used for: /rehabilitation (patientType='rehab') and /post-care (patientType='post-care')
 */
export const conditionsByPatientTypeQuery = groq`
  *[_type == "omira_b2c_condition" && isPublished == true && patientType == $patientType]
  | order(sortPriority asc) {
    _id,
    diseaseName,
    slug,
    patientType,
    icon,
    clinicalOutcomeClaim,
    evidenceReference,
    practices,
    featuredImage { asset->, alt },
    category->{ name, slug }
  }
`

/**
 * Fetch slugs for a specific patientType (for generateStaticParams).
 */
export const slugsByPatientTypeQuery = groq`
  *[_type == "omira_b2c_condition" && isPublished == true && patientType == $patientType && defined(slug.current)] {
    "slug": slug.current
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY BY SLUG QUERY
// ─────────────────────────────────────────────────────────────────────────────

export const categoryBySlugQuery = groq`
  *[_type == "omira_b2c_category" && slug.current == $category][0] {
    _id,
    name,
    slug,
    description,
    icon,
    seoTitle,
    seoDescription
  }
`

/**
 * Fetch all category slugs (for generateStaticParams on /treatments/category/[category]).
 */
export const allCategorySlugsQuery = groq`
  *[_type == "omira_b2c_category" && defined(slug.current)] {
    "slug": slug.current
  }
`

