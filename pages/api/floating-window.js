import BLOG from '@/blog.config'
import { fetchPageFromNotion } from '@/lib/db/notion/getNotionPost'

export default async function handler(req, res) {
  const debug =
    req?.query?.debug === '1' || process.env.FLOATING_WINDOW_DEBUG === 'true'
  
  try {
    if (!BLOG.FLOATING_WINDOW_ENABLED || !BLOG.FLOATING_WINDOW_PAGE_ID) {
      return res.status(200).json(
        debug
          ? {
              blockMap: null,
              debug: {
                reason: 'floating_window_disabled_or_missing_page_id',
                enabled: BLOG.FLOATING_WINDOW_ENABLED,
                pageId: BLOG.FLOATING_WINDOW_PAGE_ID || null
              }
            }
          : { blockMap: null }
      )
    }
    
    const post = await fetchPageFromNotion(BLOG.FLOATING_WINDOW_PAGE_ID)
    return res.status(200).json(
      debug
        ? {
            blockMap: post?.blockMap || null,
            debug: {
              reason: post?.blockMap ? 'ok' : 'notion_page_not_found_or_unreadable',
              pageId: BLOG.FLOATING_WINDOW_PAGE_ID
            }
          }
        : { blockMap: post?.blockMap || null }
    )
  } catch (err) {
    return res.status(200).json(
      debug
        ? {
            blockMap: post?.blockMap || null,
            debug: {
              reason: post?.blockMap ? 'ok' : 'notion_page_not_found_or_unreadable',
              pageId: BLOG.FLOATING_WINDOW_PAGE_ID
            }
          }
        : { blockMap: post?.blockMap || null }
    )
  }
}
