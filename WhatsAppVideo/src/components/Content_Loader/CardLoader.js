import React from 'react';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

const CardLoader = props => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#BCCDC1"
        foregroundColor="#E3F2E9"
        {...props}>
        <Rect x="28" y="10" rx="3" ry="3" width="335" height="123" />
        <Rect x="28" y="138" rx="0" ry="0" width="335" height="26" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#BCCDC1"
        foregroundColor="#E3F2E9"
        {...props}>
        <Rect x="28" y="10" rx="3" ry="3" width="335" height="123" />
        <Rect x="28" y="138" rx="0" ry="0" width="335" height="26" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#BCCDC1"
        foregroundColor="#E3F2E9"
        {...props}>
        <Rect x="28" y="10" rx="3" ry="3" width="335" height="123" />
        <Rect x="28" y="138" rx="0" ry="0" width="335" height="26" />
      </ContentLoader>
    </>
  );
};

export default CardLoader;
