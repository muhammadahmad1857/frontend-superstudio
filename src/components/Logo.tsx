import { useTheme } from '@/hooks/useTheme';

const Logo = () => {
   const {isDark}=  useTheme()
  return (
    <img className='size-full object-contain' src={isDark ? '/Apollo nft-01-white.png' : '/Apollo nft-01-black.png'}/>
  )
}

export default Logo
;
