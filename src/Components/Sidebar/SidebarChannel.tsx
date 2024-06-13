import { DocumentData } from 'firebase/firestore';
import './SidebarChannel.scss'
import { useAppDispatch } from '../../app/hooks';
import { setChannelInfo } from '../../app/features/channelSlice';

type Props = {
  id: string;
  channel: DocumentData;
}

const SidebarChannel = (props: Props) => {
  const {id, channel} = props;
  const dispatch = useAppDispatch()
  return (
    <div className='sidebarChannel' 
    onClick={() => 
      dispatch(
        setChannelInfo(
          {
            channelId: id,
            channelName: channel.channel.channelName,
          })
        )
    }>
        <h4>
            <span className='sidebarChannelHush'>#</span>
            {channel.channel.channelName}
        </h4>
    </div>
  )
}

export default SidebarChannel