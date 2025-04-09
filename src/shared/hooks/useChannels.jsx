import {useState} from 'react'
import toast from 'react-hot-toast'
import { getChannels as getChannelsRequest, getFollowedChannels } from '../../services/api'

export const useChannels = ()=>{

    const [ channels, setChannels ] = useState(null)

    const getChannels = async (isLogged = false) =>{

        const channelsData = await getChannelsRequest()

        if(channelsData.error){
            return toast.error(
                channelsData.e?.response?.data || 'Ocurrio un error'
            )
        }

        if(isLogged){
            return setChannels({
                channels: channelsData.data.channels
            })
        }

        const followedChannelsData = await getFollowedChannels()

        if(followedChannelsData.error){
            return toast.error(
                channelsData.e?.response?.data || 'Ocurrio un error al leerr los canales'
            )
        }

        setChannels({
            channels: channelsData.data.channels,
            followedChannels: channelsData.data.channels.filter(channel =>
                followedChannelsData.data.followedChannels.incluides(channel.id)
            )
        })
    }

    return{
        getChannels,
        isFetching: !Boolean(channels),
        allChannels: channels?.channels,
        followedChannels: channels?.foollowedChannels
    }
}