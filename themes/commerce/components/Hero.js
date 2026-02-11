// import Image from 'next/image'
import CONFIG from '../config'
import LazyImage from '@/components/LazyImage'

/**
 * 顶部全屏大图
 * @returns
 */
const Hero = props => {
  const { siteInfo } = props

  return (
        <header id="header" className="w-full h-72 relative md:flex-shrink-0 z-10" >

            <div className="text-white absolute bottom-0 flex flex-col h-full items-center justify-center w-full "></div>

            <LazyImage id='header-cover' src={siteInfo?.pageCover}
                className={`w-full h-full object-cover object-center absolute top-0 ${CONFIG.HOME_NAV_BACKGROUND_IMG_FIXED ? 'fixed' : ''}`} />

        </header>
  )
}

export default Hero
