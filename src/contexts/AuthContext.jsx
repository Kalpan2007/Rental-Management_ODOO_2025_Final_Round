import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored auth data on app start
    const storedToken = localStorage.getItem('rentalease_token');
    const storedUser = localStorage.getItem('rentalease_user');
    
    if (storedToken && storedUser) {
      dispatch({
        type: 'LOGIN',
        payload: {
          token: storedToken,
          user: JSON.parse(storedUser)
        }
      });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('rentalease_token', token);
    localStorage.setItem('rentalease_user', JSON.stringify(userData));
    dispatch({
      type: 'LOGIN',
      payload: { user: userData, token }
    });
  };

  const logout = () => {
    localStorage.removeItem('rentalease_token');
    localStorage.removeItem('rentalease_user');
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};