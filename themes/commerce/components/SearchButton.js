import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useRef } from 'react'

const AlgoliaSearchModal = dynamic(() => import('@/components/AlgoliaSearchModal'), { ssr: false })

/**
 * 搜索按钮
 * @returns
 */
export default function SearchButton(props) {
  const { locale } = useGlobal()
  const router = useRouter()
  const searchModal = useRef(null)

  function handleSearch() {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
    } else {
      router.push('/search')
    }
  }

  return (
    <>
      <div
        onClick={handleSearch}
        title={locale.NAV.SEARCH}
        alt={locale.NAV.SEARCH}
        className='h-full flex space-x-1 whitespace-nowrap items-center cursor-pointer font-sans menu-link pl-2 pr-4 cursor-pointer transform hover:scale-105 duration-200 dark:text-gray-200 mr-1'
      >         
        <i className='fa-solid fa-magnifying-glass' /> <p>搜尋</p>
      </div>
      <AlgoliaSearchModal cRef={searchModal} {...props} />
    </>
  )
}
