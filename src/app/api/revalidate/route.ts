import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Sanity Webhook → ISR Revalidation Handler
 *
 * Setup in Sanity Dashboard:
 * 1. Go to sanity.io/manage → your project → API → Webhooks
 * 2. Create a new webhook:
 *    - URL: https://omirawellness.com/api/revalidate
 *    - Trigger on: create, update, delete
 *    - Filter: _type in ["omira_b2c_condition","omira_content_blog","omira_b2b_department","omira_b2b_caseStudy","omira_b2c_category"]
 *    - HTTP Method: POST
 *    - Secret: set SANITY_WEBHOOK_SECRET in .env.local
 *
 * When Sanity publishes content, this route is called.
 * It revalidates the specific page that changed, not the entire site.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  
  // Security: validate webhook secret
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const docType: string = body?._type;
    const slug: string = body?.slug?.current;

    // Revalidate the relevant path(s) based on document type
    switch (docType) {
      case 'omira_b2c_condition':
        revalidatePath('/treatments', 'page');
        if (slug) revalidatePath(`/treatments/${slug}`, 'page');
        break;

      case 'omira_content_blog':
        revalidatePath('/blog', 'page');
        if (slug) revalidatePath(`/blog/${slug}`, 'page');
        break;

      case 'omira_b2b_department':
        revalidatePath('/hospitals', 'page');
        if (slug) revalidatePath(`/hospitals/departments/${slug}`, 'page');
        break;

      case 'omira_b2b_caseStudy':
        revalidatePath('/hospitals/case-studies', 'page');
        if (slug) revalidatePath(`/hospitals/case-studies/${slug}`, 'page');
        break;

      case 'omira_b2c_category':
        revalidatePath('/treatments', 'page');
        if (slug) revalidatePath(`/treatments/category/${slug}`, 'page');
        break;

      case 'omira_global_author':
        // Author change → revalidate all content (authors affect all clinical pages)
        revalidatePath('/treatments', 'layout');
        revalidatePath('/blog', 'layout');
        revalidatePath('/about', 'page');
        break;

      default:
        // Unknown type — revalidate homepage as a safe fallback
        revalidatePath('/', 'page');
    }

    return NextResponse.json({
      revalidated: true,
      type: docType,
      slug: slug || 'n/a',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Revalidate] Error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
