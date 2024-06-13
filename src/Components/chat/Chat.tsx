import "./Chat.scss"
import ChatHeader from './ChatHeader'
import ChatMessage from "./ChatMessage"
import  AddCircleOutlineIcon  from "@mui/icons-material/AddCircleOutline"
import  CardGiftcardIcon  from "@mui/icons-material/CardGiftcard"
import  GifIcon  from "@mui/icons-material/Gif"
import  EmojiEmotionsIcon  from "@mui/icons-material/EmojiEmotions"
import { useAppSelector } from "../../app/hooks"
import { useState } from "react"
import { CollectionReference, DocumentData, DocumentReference, Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebase"
import useSubCollection from "../../hooks/useSubCollection"



const Chat = () => {
    const [inputText, setInputText] = useState<string>("");
    const channelId = useAppSelector((state) => state.channel.channelId);
    const channelName = useAppSelector((state) => state.channel.channelName);
    const user = useAppSelector((state) => state.user.user);
    const {subDocuments: messages} = useSubCollection("channels", "messages");

    
    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const collectionRef: CollectionReference<DocumentData> = collection(db, "channels", String(channelId), "messages");

        await addDoc(collectionRef, {
            message: inputText,
            timestamp: serverTimestamp(),
            user: user,
        });
        setInputText("");
    }

  return (
    <div className="chat">
        <ChatHeader channelName={channelName}/>
        <div className="chatMessage">
            {messages.map((message, index) => (
                <ChatMessage 
                    key={index} 
                    message={message.message}
                    timestamp={message.timestamp}
                    user={message.user}/>
            ))}
        </div>
        <div className="chatInput">
            <AddCircleOutlineIcon />
            <form>
                <input
                    type="text" 
                    placeholder="#へメッセージを送信" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
                    value={inputText}
                />
                <button 
                    type="submit" 
                    className="chatInputButton" 
                    onClick={
                        (e: React.MouseEvent<HTMLButtonElement>) => sendMessage(e)
                    }/>
            </form>
            <div className="chatInputIcons">
                <CardGiftcardIcon />
                <GifIcon />
                <EmojiEmotionsIcon />
            </div>
        </div>
    </div>
  )
}

export default Chat