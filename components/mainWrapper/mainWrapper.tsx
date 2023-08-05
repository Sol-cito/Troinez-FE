import styles from './mainWrapper.module.scss';

type ContentType = {
  content: React.ReactNode;
};

export default function MainWrapper(props: ContentType) {
  const { content } = props;
  return <main className={styles.main}>{content}</main>;
}
