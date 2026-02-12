import NotionPage from '@/components/NotionPage'
import SmartLink from '@/components/SmartLink'
import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'commerce-floating-window-hide-on'

const FloatingNotionWindow = ({ post }) => {
  const [visible, setVisible] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)

  const today = useMemo(() => {
    const now = new Date()
    const month = `${now.getMonth() + 1}`.padStart(2, '0')
    const day = `${now.getDate()}`.padStart(2, '0')
    return `${now.getFullYear()}-${month}-${day}`
  }, [])

  useEffect(() => {
    if (!post) return

    const hiddenDay = window.localStorage.getItem(STORAGE_KEY)
    if (hiddenDay === today) {
      setDontShowToday(true)
      setVisible(false)
      return
    }

    setVisible(true)
  }, [post, today])

  if (!post || !visible) {
    return null
  }

  const postLink = post?.slug ? `/${post.slug}` : '/'

  const handleClose = () => {
    setVisible(false)
  }

  const handleDontShowChange = event => {
    const checked = event.target.checked
    setDontShowToday(checked)

    if (checked) {
      window.localStorage.setItem(STORAGE_KEY, today)
      setVisible(false)
      return
    }

    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className='fixed right-5 bottom-5 z-50'>
      <div className='rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-xl overflow-hidden'>
        <div className='flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-800'>
          <SmartLink href={postLink} className='font-semibold text-sm hover:underline truncate pr-2'>
            {post.title}
          </SmartLink>
          <button
            aria-label='關閉懸浮視窗'
            className='text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl leading-none'
            onClick={handleClose}>
            ×
          </button>
        </div>

        <div className='max-h-[360px] overflow-y-auto px-4'>
          <NotionPage post={post} className='' />
        </div>

        <label className='flex items-center gap-2 px-4 py-2 text-sm border-t border-gray-100 dark:border-gray-800'>
          <input
            type='checkbox'
            checked={dontShowToday}
            onChange={handleDontShowChange}
            className='accent-red-600'
          />
          今日不再顯示
        </label>
      </div>
    </div>
  )
}

export default FloatingNotionWindow
