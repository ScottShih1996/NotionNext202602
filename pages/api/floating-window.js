import BLOG from '@/blog.config'
import { fetchNotionPageBlocks } from '@/lib/db/notion/getPostBlocks'

const parseBool = value => value === true || value === 'true'

export default async function handler(req, res) {
  const debug =
    req?.query?.debug === '1' || process.env.FLOATING_WINDOW_DEBUG === 'true'

  const enabled = parseBool(process.env.NEXT_PUBLIC_FLOATING_WINDOW_ENABLED ?? true)
  const pageId = process.env.NEXT_PUBLIC_FLOATING_WINDOW_PAGE_ID || '15fc5d78128680bd9ae7f73878de8154'
  
  try {
    if (!enabled || !pageId) {
      return res.status(200).json(
        debug
          ? {
              blockMap: null,
              debug: {
                reason: 'floating_window_disabled_or_missing_page_id',
                enabled,
                pageId: pageId || null
              }
            }
          : { blockMap: null }
      )
    }
    
    const blockMap = await fetchNotionPageBlocks(pageId, 'floating-window')
    return res.status(200).json(
      debug
        ? {
            blockMap: blockMap || null,
            debug: {
              reason: blockMap ? 'ok' : 'notion_page_not_found_or_unreadable',
              pageId
            }
          }
        : { blockMap: blockMap || null }
    )
  } catch (err) {
    return res.status(500).json(
      debug
        ? {
            blockMap: null,
            debug: {
              reason: 'exception_while_fetching_notion_page',
              pageId: pageId || null,
              error: err?.message || 'unknown_error'
            }
          }
        : { blockMap: null }
    )
  }
}
