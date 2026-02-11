import { useEffect, useState } from 'react'
import { NotionRenderer } from 'react-notion-x'
import { siteConfig } from '@/lib/config'

const FloatingWindow = () => {
  const enabled = siteConfig('FLOATING_WINDOW_ENABLED')
  const [blockMap, setBlockMap] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const today = new Date().toISOString().split('T')[0]
    const hidden = localStorage.getItem('floating-window-hide') === today
    if (hidden) return
    fetch('/api/floating-window')
      .then(res => res.json())
      .then(data => {
        if (data?.blockMap) {
          setBlockMap(data.blockMap)
          setVisible(true)
        }
      })
  }, [enabled])

  const handleClose = () => setVisible(false)

  const handleCheck = e => {
    const checked = e.target.checked
    const today = new Date().toISOString().split('T')[0]
    if (checked) {
      localStorage.setItem('floating-window-hide', today)
    } else {
      localStorage.removeItem('floating-window-hide')
    }
  }

  if (!visible || !blockMap) return <></>

  return (
    <div className='fixed right-5 bottom-5 z-50 bg-white dark:bg-gray-800 p-4 shadow-lg max-w-sm'>
      <div className='flex justify-between items-center mb-2 text-sm'>
        <label className='flex items-center'>
          <input type='checkbox' className='mr-1' onChange={handleCheck} />
          今日不要再顯示
        </label>
        <button onClick={handleClose} aria-label='close' className='font-bold'>✕</button>
      </div>
      <NotionRenderer recordMap={blockMap} />
    </div>
  )
}

export default FloatingWindow
