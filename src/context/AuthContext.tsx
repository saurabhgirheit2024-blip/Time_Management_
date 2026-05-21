import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  streak: number;
  totalMinutes: number;
  tasksCompleted: number;
  xp: number;
  level: number;
  createdAt: string;
  lastActive?: string;
}

interface FirebaseUserWrapper {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: FirebaseUserWrapper | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addXP: (amount: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUserWrapper | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const u = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        setUser(u);
        
        try {
          const profileRef = doc(db, 'users', firebaseUser.uid);
          const profileSnap = await getDoc(profileRef);
          
          if (profileSnap.exists()) {
            setProfile(profileSnap.data() as UserProfile);
          } else {
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              role: 'student',
              streak: 0,
              totalMinutes: 0,
              tasksCompleted: 0,
              xp: 0,
              level: 1,
              createdAt: new Date().toISOString(),
            };
            await setDoc(profileRef, newProfile);
            setProfile(newProfile);
          }
        } catch (err) {
          console.error("Firestore loading error, using local fallback profile:", err);
          // Local fallback
          const localProfiles = JSON.parse(localStorage.getItem('time_profiles') || '{}');
          if (localProfiles[firebaseUser.uid]) {
            setProfile(localProfiles[firebaseUser.uid]);
          } else {
            const localProfile: UserProfile = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              role: 'student',
              streak: 0,
              totalMinutes: 0,
              tasksCompleted: 0,
              xp: 0,
              level: 1,
              createdAt: new Date().toISOString(),
            };
            localProfiles[firebaseUser.uid] = localProfile;
            localStorage.setItem('time_profiles', JSON.stringify(localProfiles));
            setProfile(localProfile);
          }
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;
    
    const newProfile: UserProfile = {
      uid: firebaseUser.uid,
      displayName: name,
      email: email,
      role: 'student',
      streak: 0,
      totalMinutes: 0,
      tasksCompleted: 0,
      xp: 0,
      level: 1,
      createdAt: new Date().toISOString(),
    };
    
    try {
      await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
    } catch (err) {
      console.warn("Could not save to Firestore, registering local profile copy:", err);
    }
    
    const localProfiles = JSON.parse(localStorage.getItem('time_profiles') || '{}');
    localProfiles[firebaseUser.uid] = newProfile;
    localStorage.setItem('time_profiles', JSON.stringify(localProfiles));
    setProfile(newProfile);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user || !profile) return;
    const updated = { ...profile, ...data };
    
    try {
      await updateDoc(doc(db, 'users', user.uid), data);
    } catch (err) {
      console.warn("Firestore update skipped, applying locally:", err);
    }
    
    const localProfiles = JSON.parse(localStorage.getItem('time_profiles') || '{}');
    localProfiles[user.uid] = updated;
    localStorage.setItem('time_profiles', JSON.stringify(localProfiles));
    setProfile(updated);
  };

  const addXP = async (amount: number) => {
    if (!user || !profile) return;
    
    let newXP = (profile.xp || 0) + amount;
    let newLevel = profile.level || 1;
    const xpToNextLevel = newLevel * 100;
    
    if (newXP >= xpToNextLevel) {
      newXP -= xpToNextLevel;
      newLevel += 1;
    }
    
    const updatedFields = {
      xp: newXP,
      level: newLevel,
      tasksCompleted: (profile.tasksCompleted || 0) + 1
    };
    
    const updatedProfile = { 
      ...profile, 
      ...updatedFields
    };
    
    try {
      await updateDoc(doc(db, 'users', user.uid), updatedFields);
    } catch (err) {
      console.warn("Firestore XP update skipped, applying locally:", err);
    }
    
    const localProfiles = JSON.parse(localStorage.getItem('time_profiles') || '{}');
    localProfiles[user.uid] = updatedProfile;
    localStorage.setItem('time_profiles', JSON.stringify(localProfiles));
    setProfile(updatedProfile);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, logout, updateProfile, addXP }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
