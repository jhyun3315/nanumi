import React from 'react';
import styles from '../../styles/Global';
import assets from '../../assets';

type ButtonProps = {
  assetUrl: string;
  link: string;
};
const Button = ({ assetUrl, link }: ButtonProps) => {
  return (
    <div
      className={styles.btnBlack}
      onClick={() => window.open(link, '_blank')}
    >
      <img src={assetUrl} alt="expo_icon" className={styles.btnIcon} />
      <div className="flex flex-col justify-start ml-4">
        <p className={`${styles.btnText} font-normal text-xs`}>나누미</p>
        <p className={`${styles.btnText} font-bold text-sm`}>다운로드</p>
      </div>
    </div>
  );
};

export default Button;
