import BLOG from '@/blog.config'
import { fetchPageFromNotion } from '@/lib/db/notion/getNotionPost'

export default async function handler(req, res) {
  try {
    if (!BLOG.FLOATING_WINDOW_ENABLED || !BLOG.FLOATING_WINDOW_PAGE_ID) {
      return res.status(200).json({ blockMap: null })
    }
    const post = await fetchPageFromNotion(BLOG.FLOATING_WINDOW_PAGE_ID)
    return res.status(200).json({ blockMap: post?.blockMap || null })
  } catch (err) {
    return res.status(500).json({ blockMap: null })
  }
}
