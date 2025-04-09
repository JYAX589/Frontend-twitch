import { useEffect } from 'react'
import {Navbar} from '../../components/navbars/Navbar'
import './dashboardPage.css'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { Content } from '../../components/dashboard/Content'
import { Sidebar } from '../../components/dashboard/Sidebar'
import { useChannels } from '../../shared/hooks/useChannels'
import { useUserDetails } from '../../shared/hooks'

export const DashboardPage = () => {

  const {getChannles, allChannels, isFetching, followedChannels} = useChannels();
  const {isLogged} = useUserDetails()

  useEffect(() =>{
    getChannles(isLogged)
  },[])

  if(isFetching){
    return <LoadingSpinner/>
  }

  return (
    <div className='dashboard-container'>
      <Navbar/>
      <Content channels={allChannels} getChannles={getChannles}/>
      <Sidebar channels={followedChannels}/>
    </div>
  )
}


