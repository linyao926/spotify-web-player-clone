import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileInfo } from '~/redux/slices/profileSlice';
import { createPlaylist } from '~/redux/slices/myPlaylistSlice';
import { addToLibrary } from '~/redux/slices/librarySlice';

const useCreatePlaylist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playlists = useSelector((state) => state['my_playlist']);
  const profileInfo = useSelector(selectProfileInfo);

  const [createNewPlaylist, setCreateNewPlaylist] = useState(false);

  const handleCreatePlaylist = () => {
    dispatch(createPlaylist({ profileInfo }));
    setCreateNewPlaylist(true);
  };

  useEffect(() => {
    if (createNewPlaylist) {
      const lastPlaylist = playlists[playlists.length - 1];
      if (lastPlaylist) {
        dispatch(addToLibrary({ type: 'playlists', item: lastPlaylist }));
        navigate(`/my_playlist/${lastPlaylist.id}`);
        setCreateNewPlaylist(false); 
      }
    }
  }, [playlists, createNewPlaylist, dispatch, navigate]);

  return { handleCreatePlaylist };
};

export default useCreatePlaylist;
