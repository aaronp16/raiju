import React, { ChangeEvent } from 'react';

import Jellyfin from '../../assets/jellyfin.svg';
import useTransmission from '../../hooks/useTransmission';
import { JellyfinUploadContainer } from './style';

const JellyfinUploader = () => {
  const { uploadFiles } = useTransmission();
  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.currentTarget?.files;

    if (files) {
      uploadFiles.call({
        payload: {
          files,
        },
      });
    }
  };

  return (
    <JellyfinUploadContainer>
      <img src={Jellyfin} />
      <input accept=".torrent" type="file" multiple onChange={onUpload} />
    </JellyfinUploadContainer>
  );
};

export default JellyfinUploader;
