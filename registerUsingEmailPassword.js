import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCreateUserWithEmailAndPassword,useSignInWithEmailAndPassword ,useSignInWithGoogle} from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

/////////////////////////////////
//firebase credentials
// Your app's Firebase project configuration
const firebaseConfig = {
  // Add your config here
  // in firebase after creating app the api key related all datas
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Firebase auth object
const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
////////////////////////////////


function RegisterUsingEmailPassword() {
  // State variables to store user credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  // Register function that triggers when the user submits the form
  const register = (event) => {
    event.preventDefault(); // Prevents page from refreshing
    auth.createUserWithEmailAndPassword(email, password);
  }

  // Use auth state to redirect the user if they're already logged in
  const [user] = useAuthState(auth);
  if (user) {
    return <Redirect to="/" />;
  }

  // JSX that displays the registration form
  return (
    <form onSubmit={register}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}
function LoginUsingEmailPassword() {
  // State variables to store user credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Login function that triggers when the user submits the form
  const login = (event) => {
    event.preventDefault(); // Prevents page from refreshing
    auth.signInWithEmailAndPassword(email, password);
  }

  // Use auth state to redirect the user if they're already logged in
  const [user] = useAuthState(auth);
  if (user) {
    return <Redirect to="/" />;
  }

  // JSX that displays the login form
  return (
    <form onSubmit={login}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}


const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Registered User: {user.user.email}</p>
      </div>
    );
  }
  return (
    <div className="App">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => createUserWithEmailAndPassword(email, password)}>
        Register
      </button>
    </div>
  );
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
      </div>
    );
  }
  return (
    <div className="App">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signInWithEmailAndPassword(email, password)}>
        Sign In
      </button>
    </div>
  );
};

function GoogleAuth() {
  // Use auth state to redirect the user if they're already logged in
  const [user] = useAuthState(auth);
  if (user) {
    return <Redirect to="/" />;
  }

  // Sign in with Google function that triggers when the user clicks the button
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };

  // JSX that displays the sign in with Google button
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

const SignInWithGoogle = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
      </div>
    );
  }
  return (
    <div className="App">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signInWithGoogle()}>Sign In</button>
    </div>
  );
};

export  {RegisterUsingEmailPassword,LoginUsingEmailPassword,CreateUser,SignIn,GoogleAuth,SignInWithGoogle};

