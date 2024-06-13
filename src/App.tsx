import { useEffect } from 'react';
import './App.scss';
import Sidebar from './Components/Sidebar/Sidebar'
import Chat from './Components/chat/Chat'
import Login from './Components/login/Login'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { auth } from './firebase';
import { login, logout } from './app/features/userSlice';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './utils/ErrorFallback';

function App() {

  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if(loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName
          })
        );
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch])
  return (
    <div className="App">
      {user ? (
        <>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Sidebar/>
        </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <>
          <Login/>
        </>
      )}
    </div>
  );
}

export default App;
