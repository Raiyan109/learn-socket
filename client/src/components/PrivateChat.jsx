import React, { useEffect, useRef } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { CiSearch } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { IoIosAttach, IoMdSend } from "react-icons/io";

const PrivateChat = () => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3, borderBottom: '2px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', right: 0, bottom: 0, color: '#4CAF50' }}>
                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                            </svg>
                        </span>
                        <img
                            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=144&h=144"
                            alt="Profile"
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        />
                    </Box>
                    <Box sx={{ ml: 2 }}>
                        <Box sx={{ fontSize: '20px', fontWeight: '600', color: '#4A4A4A' }}>Anderson Vanhron</Box>
                        <Box sx={{ fontSize: '14px', color: '#757575' }}>Junior Developer</Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" sx={{ color: '#757575' }}>
                        <CiSearch />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#757575' }}>
                        <MdFavorite />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#757575' }}>
                        <IoIosAttach />
                    </IconButton>
                </Box>
            </Box>

            <Box
                id="messages"
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    p: 3,
                    '&::-webkit-scrollbar': { width: '0.25rem', height: '0.25rem' },
                    '&::-webkit-scrollbar-track': { backgroundColor: '#F7FAFC' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#EDF2F7', borderRadius: '0.25rem' },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, maxWidth: '75%' }}>
                        <Box sx={{ backgroundColor: '#E0E0E0', borderRadius: '8px', p: 1.5, color: '#424242' }}>
                            Can be verified on any platform using docker
                        </Box>
                    </Box>
                    <img
                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=144&h=144"
                        alt="User"
                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', mb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '75%' }}>
                        <Box sx={{ backgroundColor: '#1976D2', borderRadius: '8px', p: 1.5, color: '#fff' }}>
                            Your error message says permission denied, npm global installs must be given root privileges.
                        </Box>
                    </Box>
                    <img
                        src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=144&h=144"
                        alt="User"
                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, maxWidth: '75%' }}>
                        <Box sx={{ backgroundColor: '#E0E0E0', borderRadius: '8px', p: 1.5, color: '#424242' }}>
                            Command was run with root privileges. I'm sure about that.
                        </Box>
                        <Box sx={{ backgroundColor: '#E0E0E0', borderRadius: '8px', p: 1.5, color: '#424242' }}>
                            I've updated the description so it's more obvious now.
                        </Box>
                        <Box sx={{ backgroundColor: '#E0E0E0', borderRadius: '8px', p: 1.5, color: '#424242' }}>
                            FYI https://askubuntu.com/a/700266/510172
                        </Box>
                        <Box sx={{ backgroundColor: '#E0E0E0', borderRadius: '8px', p: 1.5, color: '#424242' }}>
                            Check the line above (it ends with a # so, I'm running it as root)
                            <pre># npm install -g @vue/devtools</pre>
                        </Box>
                    </Box>
                    <img
                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=144&h=144"
                        alt="User"
                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                    />
                </Box>

                <div ref={messagesEndRef} />
            </Box>

            <Box sx={{ borderTop: '2px solid #e0e0e0', px: 2, pt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="large" sx={{ color: '#757575' }}>
                        <CiSearch />
                    </IconButton>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Write your message!"
                        sx={{ bgcolor: '#E0E0E0', borderRadius: '8px' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton size="large" sx={{ color: '#757575' }}>
                                        <IoMdSend />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PrivateChat;
