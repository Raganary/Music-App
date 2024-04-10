import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {HiOutlineMenu} from 'react-icons/hi'
import {RiCloseLine} from 'react-icons/ri';
import {logo} from '../assets';
import {links} from '../assets/constants';
import { FiFeather } from "react-icons/fi";


const NavLinks = ({handleClick}) => (
  <div className='justify-end mt-3'>
    {links.map((item) => (
      <NavLink 
      key={item.name}
      to={item.to}
      className='flex flex-row justify-start items-center my-2 text-m font-normal text-white hover:bg-[#3B0D11] py-3 px-7 rounded-md cursor-pointer'
      onClick={() => handleClick && handleClick()}
      >
        <item.icon className='w-6 h-6 mr-2'/>
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
    <div className='md:flex hidden items-center flex-col w-[240px] py-10 px-4 bg-[#000000]'>
      <FiFeather className='w-16 h-16 mb-10 object-contain text-white'/>
      <NavLinks/>
    </div>

    <div className='absolute md:hidden block top-6 right-3'>
      {mobileMenuOpen ? (<RiCloseLine className='w-6 h-6 text-white mr-2' onClick={() => setMobileMenuOpen(false)}/> ):
      <HiOutlineMenu className='w-6 h-6 text-white mr-2' onClick={() => setMobileMenuOpen(true)}/>}
    </div>

    <div className={`flex flex-col items-center absolute top-36 h-3/8 w-1/3 bg-[#000000] outline-white outline rounded-lg z-10 p-4 md:hidden smooth-transition ${mobileMenuOpen ? '-left-2' : '-left-full'}`}>
      <FiFeather className='mt-3 w-14 h-14 object-contain text-white bg-[#000000] rounded-lg p-1'/>
      <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
    </div>
    </>
  )
}

export default Sidebar;
