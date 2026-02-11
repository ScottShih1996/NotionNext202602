import SmartLink from '@/components/SmartLink'
// import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage';

/**
 * Logo图标
 * @param {*} props
 * @returns
 */
export default function LogoBar (props) {
  const { siteInfo } = props
  return (
    <div id='top-wrapper' className='w-full flex items-center mr-2 pb-1'>
          <SmartLink href='/' className='text-md md:text-xl dark:text-gray-200 r'>
            <LazyImage className='h-6 md:h-8 mr-6' src={siteInfo?.icon}/>
          </SmartLink>
          {/* <div>{siteConfig('TITLE')}</div> */}
    </div>
  );
}
