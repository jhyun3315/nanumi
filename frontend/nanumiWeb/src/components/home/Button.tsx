import styles from '../../styles/Global';

type ButtonProps = {
  assetUrl: string;
};
const Button = ({ assetUrl }: ButtonProps) => {
  return (
    <a
      className={styles.btnWhite}
      href="./assets/nanumi.apk"
      download
      type="application/vnd.android.package-archive"
    >
      <img src={assetUrl} alt="expo_icon" className={styles.btnIcon} />
      <div className="flex flex-col justify-start ml-4">
        <p className={`${styles.btnText} font-normal text-xs`}>나누미</p>
        <p className={`${styles.btnText} font-bold text-sm`}>다운로드</p>
      </div>
    </a>
  );
};

export default Button;
